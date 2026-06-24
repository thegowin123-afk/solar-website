"""
Solar Glare Risk Screening Engine
Preliminary glint & glare check — NOT a planning-grade assessment.
"""
import warnings
import numpy as np
import pandas as pd
import pvlib
from typing import List, Dict, Any, Optional


# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
ANGULAR_THRESHOLD_DEG = 1.0   # Conservative: 2× sun disk diameter
YEAR = 2024                    # Reference year for solar geometry
INTERVAL_MINUTES = 10          # Time step for solar position calculations
MIN_ELEVATION_DEG = 2.0        # Skip very low sun (horizon errors)

REFLECTIVITY = {
    'anti-reflective': 0.04,
    'standard': 0.10,
}

RECEPTOR_EYE_HEIGHT = {
    'road':        1.2,
    'residential': 3.0,
    'railway':     3.0,
    'aviation':   30.0,   # aircraft on approach
    'atct':       20.0,   # control tower cab
    'other':       1.5,
}


# ---------------------------------------------------------------------------
# Geometry helpers
# ---------------------------------------------------------------------------
def lat_lon_to_enu(ref_lat: float, ref_lon: float, lat: float, lon: float):
    """Flat-earth approximation: lat/lon → East, North offsets in metres."""
    R = 6_371_000
    dN = (lat - ref_lat) * np.pi / 180 * R
    dE = (lon - ref_lon) * np.pi / 180 * R * np.cos(np.radians(ref_lat))
    return dE, dN


def panel_normal(tilt_deg: float, azimuth_deg: float) -> np.ndarray:
    """
    Outward normal of panel front face (sky side) in ENU coordinates.
    tilt=0 → horizontal panel (normal = straight up).
    azimuth=180 → south-facing.
    """
    t = np.radians(tilt_deg)
    a = np.radians(azimuth_deg)
    nE = np.sin(t) * np.sin(a)
    nN = np.sin(t) * np.cos(a)   # cos(180°)=-1 → southward for az=180 ✓
    nU = np.cos(t)
    return np.array([nE, nN, nU])


def sun_vector(elevation_deg: float, azimuth_deg: float) -> np.ndarray:
    """Unit vector pointing FROM earth TO sun (ENU)."""
    el = np.radians(elevation_deg)
    az = np.radians(azimuth_deg)
    sE = np.cos(el) * np.sin(az)
    sN = np.cos(el) * np.cos(az)
    sU = np.sin(el)
    return np.array([sE, sN, sU])


def reflected_ray(s: np.ndarray, n: np.ndarray) -> Optional[np.ndarray]:
    """
    Reflected ray direction given sun vector s and panel normal n.
    Returns None if sun is behind the panel (no front-face reflection).
    """
    n_hat = n / np.linalg.norm(n)
    s_hat = s / np.linalg.norm(s)
    dot_sn = float(np.dot(s_hat, n_hat))
    if dot_sn <= 0:
        return None                          # Sun behind panel — no reflection
    incident = -s_hat                        # Ray from sky toward panel
    r = incident - 2 * np.dot(incident, n_hat) * n_hat
    norm_r = np.linalg.norm(r)
    if norm_r < 1e-9:
        return None
    return r / norm_r


def angle_between(v1: np.ndarray, v2: np.ndarray) -> float:
    """Angle in degrees between two vectors."""
    cos_a = np.clip(np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2)), -1, 1)
    return float(np.degrees(np.arccos(cos_a)))


def centroid(polygon: List[Dict]) -> tuple:
    """Mean lat/lon of polygon vertices."""
    lats = [p['lat'] for p in polygon]
    lons = [p['lng'] for p in polygon]
    return sum(lats) / len(lats), sum(lons) / len(lons)


# ---------------------------------------------------------------------------
# Solar position time series
# ---------------------------------------------------------------------------
def get_solar_positions(lat: float, lon: float) -> pd.DataFrame:
    """Return pvlib solar positions for full year at INTERVAL_MINUTES step."""
    times = pd.date_range(
        start=f'{YEAR}-01-01',
        end=f'{YEAR}-12-31 23:{60 - INTERVAL_MINUTES}',
        freq=f'{INTERVAL_MINUTES}min',
        tz='Europe/Dublin',
    )
    loc = pvlib.location.Location(lat, lon, tz='Europe/Dublin', altitude=50)
    with warnings.catch_warnings():
        warnings.simplefilter('ignore')
        solar_pos = loc.get_solarposition(times)
    # Daylight only
    return solar_pos[solar_pos['apparent_elevation'] > MIN_ELEVATION_DEG].copy()


# ---------------------------------------------------------------------------
# Glare window summarisation
# ---------------------------------------------------------------------------
def summarise_windows(intervals: List[Dict]) -> List[Dict]:
    """Collapse consecutive 10-min intervals into glare windows."""
    if not intervals:
        return []
    windows, start, prev_ts = [], None, None
    gap = pd.Timedelta(minutes=INTERVAL_MINUTES + 1)
    for iv in intervals:
        ts = pd.Timestamp(iv['timestamp'])
        if prev_ts is None or (ts - prev_ts) > gap:
            if start is not None:
                windows.append({
                    'start': start['timestamp'],
                    'end': prev_ts.isoformat(),
                    'start_time': pd.Timestamp(start['timestamp']).strftime('%H:%M'),
                    'end_time': prev_ts.strftime('%H:%M'),
                    'month': pd.Timestamp(start['timestamp']).strftime('%b'),
                    'date': pd.Timestamp(start['timestamp']).strftime('%d %b'),
                })
            start = iv
        prev_ts = ts
    if start and prev_ts:
        windows.append({
            'start': start['timestamp'],
            'end': prev_ts.isoformat(),
            'start_time': pd.Timestamp(start['timestamp']).strftime('%H:%M'),
            'end_time': prev_ts.strftime('%H:%M'),
            'month': pd.Timestamp(start['timestamp']).strftime('%b'),
            'date': pd.Timestamp(start['timestamp']).strftime('%d %b'),
        })
    return windows[:12]   # Return first 12 windows for brevity


# ---------------------------------------------------------------------------
# Risk classification
# ---------------------------------------------------------------------------
def classify_risk(annual_minutes: float, receptor_type: str) -> str:
    if receptor_type in ('aviation', 'atct'):
        return 'high' if annual_minutes > 0 else 'low'
    if annual_minutes <= 0:
        return 'low'
    if annual_minutes <= 30:
        return 'low'
    if annual_minutes <= 120:
        return 'medium'
    return 'high'


RISK_ORDER = {'low': 0, 'medium': 1, 'high': 2}


# ---------------------------------------------------------------------------
# Main screening function
# ---------------------------------------------------------------------------
def run_glare_check(
    polygon: List[Dict],
    tilt: float,
    azimuth: float,
    lower_height: float,
    upper_height: float,
    surface_type: str,
    project_type: str,
    receptors: List[Dict],
) -> Dict[str, Any]:
    """
    Full-year glare screening.
    polygon: list of {lat, lng}
    receptors: list of {id, type, name, lat, lng}
    Returns JSON-serialisable result dict.
    """
    # Panel centroid
    c_lat, c_lon = centroid(polygon)
    panel_avg_height = (lower_height + upper_height) / 2.0
    reflectivity = REFLECTIVITY.get(surface_type, 0.10)

    # Solar positions
    solar = get_solar_positions(c_lat, c_lon)

    # Panel vectors
    n_vec = panel_normal(tilt, azimuth)

    receptor_results = []
    overall_risk = 'low'

    for rec in receptors:
        r_lat, r_lon = rec['lat'], rec['lng']
        r_type = rec.get('type', 'other')
        r_name = rec.get('name', r_type.capitalize())
        r_id   = rec.get('id', r_name)

        dE, dN = lat_lon_to_enu(c_lat, c_lon, r_lat, r_lon)
        dist_horiz = float(np.sqrt(dE**2 + dN**2))

        if dist_horiz < 5:
            continue   # Receptor too close to array — skip

        eye_height = RECEPTOR_EYE_HEIGHT.get(r_type, 1.5)
        dU = eye_height - panel_avg_height
        dist_3d = float(np.sqrt(dE**2 + dN**2 + dU**2))
        rec_dir = np.array([dE / dist_3d, dN / dist_3d, dU / dist_3d])

        glare_intervals = []

        for ts, row in solar.iterrows():
            el  = float(row['apparent_elevation'])
            az  = float(row['azimuth'])

            s = sun_vector(el, az)
            r = reflected_ray(s, n_vec)
            if r is None:
                continue

            ang = angle_between(r, rec_dir)
            if ang <= ANGULAR_THRESHOLD_DEG:
                # Approximate irradiance at receptor
                ghi = max(0, 1000 * np.sin(np.radians(el)))
                irr = ghi * reflectivity
                glare_intervals.append({
                    'timestamp': ts.isoformat(),
                    'solar_elevation': round(el, 1),
                    'solar_azimuth': round(az, 1),
                    'angle_deg': round(ang, 3),
                    'estimated_irradiance_w_m2': round(irr),
                })

        annual_minutes = len(glare_intervals) * INTERVAL_MINUTES
        windows = summarise_windows(glare_intervals)
        max_irr = max((g['estimated_irradiance_w_m2'] for g in glare_intervals), default=0)
        risk = classify_risk(annual_minutes, r_type)

        if RISK_ORDER[risk] > RISK_ORDER[overall_risk]:
            overall_risk = risk

        receptor_results.append({
            'id': r_id,
            'type': r_type,
            'name': r_name,
            'distance_m': round(dist_horiz),
            'annual_glare_minutes': annual_minutes,
            'glare_windows': windows,
            'risk_level': risk,
            'max_irradiance_w_m2': round(max_irr),
        })

    return {
        'overall_risk': overall_risk,
        'receptors': receptor_results,
        'site': {'lat': c_lat, 'lon': c_lon},
        'panel_config': {
            'tilt': tilt,
            'azimuth': azimuth,
            'lower_height': lower_height,
            'upper_height': upper_height,
            'surface_type': surface_type,
            'project_type': project_type,
        },
        'notes': [
            'Preliminary screening only — angular threshold 1.0° (conservative).',
            'Calculations use 10-minute solar position intervals for 2024.',
            'Flat-earth geometry used — accurate for distances up to ~10km.',
            'This tool does NOT replace a full ForgeSolar glint & glare assessment.',
            'Aviation and ATCT receptors always require specialist assessment.',
            'Anti-reflective glass assumed at 4% reflectivity; standard glass at 10%.',
        ],
        'disclaimer': (
            'This tool provides an indicative preliminary screening only. '
            'It is not a substitute for a full glint and glare assessment, '
            'ForgeSolar modelling, aviation assessment, site-specific receptor '
            'review, or planning consultant/ecologist advice.'
        ),
    }
