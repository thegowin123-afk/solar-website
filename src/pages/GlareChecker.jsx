import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  MapPin, ChevronRight, ChevronLeft, AlertTriangle, CheckCircle,
  Sun, Eye, FileText, Phone, Mail, User, Building2, MessageSquare,
  Download, Info, Trash2, Plus, Clock, RotateCcw,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SITE_URL } from '../lib/seo';

const PAGE_URL = `${SITE_URL}/solar-glare-risk-checker`;
const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
const API_URL = import.meta.env.VITE_GLARE_API_URL || '';

const RECEPTOR_TYPES = [
  { value: 'road',        label: 'Road',               color: '#f59e0b' },
  { value: 'residential', label: 'Residential',         color: '#3b82f6' },
  { value: 'railway',     label: 'Railway',             color: '#8b5cf6' },
  { value: 'aviation',    label: 'Aviation (aircraft)', color: '#ef4444' },
  { value: 'helicopter',  label: 'Helicopter',          color: '#f97316' },
  { value: 'atct',        label: 'Air Traffic Control', color: '#dc2626' },
  { value: 'other',       label: 'Other',               color: '#6b7280' },
];

const RISK_CONFIG = {
  low:    { label: 'Low Risk',    bg: 'bg-green-100',  text: 'text-green-800',  border: 'border-green-300', icon: '✓' },
  medium: { label: 'Medium Risk', bg: 'bg-amber-100',  text: 'text-amber-800',  border: 'border-amber-300', icon: '!' },
  high:   { label: 'High Risk',   bg: 'bg-red-100',    text: 'text-red-800',    border: 'border-red-300',   icon: '⚠' },
};

const STEPS = [
  { id: 1, label: 'Location' },
  { id: 2, label: 'Site Map' },
  { id: 3, label: 'Parameters' },
  { id: 4, label: 'Results' },
];

// Load Google Maps via script tag — avoids bundler issues
let mapsPromise = null;
function loadGoogleMaps() {
  if (mapsPromise) return mapsPromise;
  mapsPromise = new Promise((resolve, reject) => {
    if (window.google?.maps) { resolve(window.google); return; }
    const cb = '__gmapsReady__';
    window[cb] = () => { resolve(window.google); delete window[cb]; };
    const s = document.createElement('script');
    s.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places,drawing&callback=${cb}&loading=async`;
    s.async = true;
    s.onerror = () => { mapsPromise = null; reject(new Error('Failed to load Google Maps')); };
    document.head.appendChild(s);
  });
  return mapsPromise;
}

// ─── Subcomponents ──────────────────────────────────────────────────────────

function StepBar({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8 overflow-x-auto">
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            step.id === current
              ? 'bg-forest-900 text-white'
              : step.id < current
              ? 'bg-gold-100 text-gold-800'
              : 'bg-gray-100 text-gray-400'
          }`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
              step.id < current ? 'bg-gold-500 text-white' :
              step.id === current ? 'bg-gold-400 text-white' : 'bg-gray-300 text-gray-500'
            }`}>
              {step.id < current ? '✓' : step.id}
            </span>
            {step.label}
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-6 h-0.5 ${step.id < current ? 'bg-gold-400' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function DisclaimerBox() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 leading-relaxed">
      <div className="flex gap-2">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
        <p>
          <strong>Disclaimer:</strong> This tool provides an indicative preliminary screening only.
          It is not a substitute for a full glint and glare assessment, ForgeSolar modelling,
          aviation assessment, site-specific receptor review, or planning consultant/ecologist advice.
        </p>
      </div>
    </div>
  );
}

function RiskBadge({ level, size = 'sm' }) {
  const cfg = RISK_CONFIG[level] || RISK_CONFIG.low;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-semibold ${cfg.bg} ${cfg.text} ${cfg.border} ${size === 'lg' ? 'text-base px-4 py-1.5' : 'text-xs'}`}>
      {cfg.icon} {cfg.label}
    </span>
  );
}

// ─── Step 1: Location ───────────────────────────────────────────────────────
function LocationStep({ location, onLocationSelect }) {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [inputVal, setInputVal] = useState(location?.address || '');
  const [mapsReady, setMapsReady] = useState(false);
  const [mapError, setMapError] = useState('');

  useEffect(() => {
    if (!MAPS_API_KEY) {
      setMapError('Google Maps API key not configured. Set VITE_GOOGLE_MAPS_API_KEY in your environment variables.');
      return;
    }
    loadGoogleMaps().then((google) => {
      setMapsReady(true);
      if (inputRef.current) {
        autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: 'ie' },
          fields: ['geometry', 'formatted_address', 'name'],
        });
        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current.getPlace();
          if (place.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            onLocationSelect({ lat, lng, address: place.formatted_address || place.name || '' });
            setInputVal(place.formatted_address || place.name || '');
          }
        });
      }
    }).catch(() => setMapError('Failed to load Google Maps. Check your API key.'));
  }, []);

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-forest-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-forest-700" />
        </div>
        <h2 className="text-xl font-heading font-bold text-forest-900 mb-2">Search Your Project Location</h2>
        <p className="text-gray-600 text-sm">Enter the address or townland of the proposed solar site in Ireland.</p>
      </div>

      {mapError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          <strong>Maps Error:</strong> {mapError}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Site location</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="e.g. Edenderry, Co. Offaly"
            className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
          />
        </div>
        {!MAPS_API_KEY && (
          <p className="text-xs text-amber-600 mt-1">
            Add <code>VITE_GOOGLE_MAPS_API_KEY</code> to your .env file to enable location search.
          </p>
        )}
      </div>

      {location && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-800">Location selected</p>
              <p className="text-green-700">{location.address}</p>
              <p className="text-green-600 text-xs mt-1">Lat: {location.lat.toFixed(5)}, Lng: {location.lng.toFixed(5)}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-800">
        <p className="font-semibold mb-1">What happens next?</p>
        <p>After selecting your location, you'll draw the PV array boundary on a satellite map, enter panel parameters, and add nearby receptors (roads, houses, etc.). The tool then screens for potential glare throughout the year.</p>
      </div>
    </div>
  );
}

// ─── Step 2: Unified Site Map ───────────────────────────────────────────────
const SITE_TOOLS = [
  { id: 'move',       label: 'Move/Edit',      icon: '✋', color: '#6b7280', desc: 'Pan and select elements.' },
  { id: 'pv',         label: 'PV Array',        icon: '⬠', color: '#2d6a4f', desc: 'Click to place polygon vertices. Click first point to close.' },
  { id: 'vs',         label: 'Vuln. Site',      icon: '●',  color: '#3b82f6', desc: 'Click to place a vulnerable site point (residential, ATCT, other).' },
  { id: 'fp',         label: '2-Mile FP',       icon: '✈', color: '#ef4444', desc: 'Draw fixed-wing flight path from runway threshold outward. Double-click to finish.' },
  { id: 'heli',       label: 'Helicopter',      icon: '🚁', color: '#f97316', desc: 'Click helipad centre — 8 approach paths auto-drawn.' },
  { id: 'route',      label: 'Road/Route',      icon: '⟶', color: '#f59e0b', desc: 'Click to trace road or railway. Double-click to finish.' },
  { id: 'ob',         label: 'Obstruction',     icon: '⬢', color: '#78716c', desc: 'Click to draw obstruction polygon. Click first point to close.' },
];

const VS_SUBTYPES = [
  { value: 'residential', label: 'Residential', color: '#3b82f6' },
  { value: 'atct',        label: 'Air Traffic Control', color: '#dc2626' },
  { value: 'railway',     label: 'Railway Station', color: '#8b5cf6' },
  { value: 'other',       label: 'Other', color: '#6b7280' },
];

function SiteMapStep({ location, polygon, onPolygonChange, receptors, onReceptorsChange, obstructions, onObstructionsChange }) {
  const mapDivRef = useRef(null);
  const mapRef = useRef(null);
  const pvOverlayRef = useRef(null);
  const allOverlaysRef = useRef([]);     // persistent overlays (receptors, obstructions)
  const tempOverlaysRef = useRef([]);    // in-progress drawing overlays
  const clickListenerRef = useRef(null);
  const dblClickListenerRef = useRef(null);
  const pathPtsRef = useRef([]);

  const [activeTool, setActiveTool] = useState('pv');
  const [vsSubtype, setVsSubtype] = useState('residential');
  const [routeSubtype, setRouteSubtype] = useState('road');
  const [modeInfo, setModeInfo] = useState({ vertices: 0, length: 0 });
  const [selectedId, setSelectedId] = useState(null);

  const centre = polygon?.length
    ? { lat: polygon.reduce((s,p)=>s+p.lat,0)/polygon.length, lng: polygon.reduce((s,p)=>s+p.lng,0)/polygon.length }
    : location;

  // ── Map init ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!location || !mapDivRef.current || mapRef.current) return;
    loadGoogleMaps().then((google) => {
      const map = new google.maps.Map(mapDivRef.current, {
        center: { lat: location.lat, lng: location.lng },
        zoom: 15, mapTypeId: 'hybrid', tilt: 0,
        mapTypeControlOptions: { position: google.maps.ControlPosition.TOP_LEFT },
      });
      mapRef.current = map;
    });
  }, [location]);

  // ── Render all persistent overlays ────────────────────────────────────────
  const renderAll = () => {
    const google = window.google; const map = mapRef.current;
    if (!google || !map) return;
    allOverlaysRef.current.forEach(o => o.setMap(null));
    allOverlaysRef.current = [];

    // PV polygon
    if (polygon?.length >= 3) {
      const pvPoly = new google.maps.Polygon({
        paths: polygon, fillColor: '#2d6a4f', fillOpacity: 0.4,
        strokeColor: '#2d6a4f', strokeWeight: 2, editable: false, map,
      });
      allOverlaysRef.current.push(pvPoly);
    }

    // Receptors
    receptors.forEach(rec => {
      const color = RECEPTOR_MODE_INFO[rec.type]?.color || '#6b7280';
      if (rec.type === 'helicopter' && !rec.path) {
        const m = new google.maps.Marker({ position: { lat: rec.lat, lng: rec.lng }, map, title: rec.name,
          icon: { path: google.maps.SymbolPath.CIRCLE, scale: 10, fillColor: color, fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 },
          label: { text: 'H', color: '#fff', fontSize: '11px', fontWeight: 'bold' } });
        allOverlaysRef.current.push(m);
        helicopterPaths({ lat: rec.lat, lng: rec.lng }).forEach(({ label, path }) => {
          const spoke = new google.maps.Polyline({ path, strokeColor: color, strokeWeight: 2, strokeOpacity: 0.7, map,
            icons: [{ icon: { path: google.maps.SymbolPath.FORWARD_OPEN_ARROW, scale: 2.5, strokeColor: color }, offset: '100%' }] });
          allOverlaysRef.current.push(spoke);
        });
      } else if (rec.path?.length >= 2) {
        const line = new google.maps.Polyline({ path: rec.path, strokeColor: color, strokeWeight: 4, strokeOpacity: 0.9, map });
        allOverlaysRef.current.push(line);
        const mid = rec.path[Math.floor(rec.path.length/2)];
        const m = new google.maps.Marker({ position: mid, map, title: rec.name,
          icon: { path: google.maps.SymbolPath.CIRCLE, scale: 8, fillColor: color, fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 },
          label: { text: rec.type[0].toUpperCase(), color: '#fff', fontSize: '10px', fontWeight: 'bold' } });
        allOverlaysRef.current.push(m);
        // aviation height labels every ~500m
        if (rec.type === 'aviation' || rec.type === 'fp') {
          samplePolyline(rec.path, 500).forEach(pt => {
            const h = aviationGlideSlopeHeight(pt.distFromStart);
            const lbl = new google.maps.Marker({ position: pt, map,
              icon: { url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', scaledSize: new google.maps.Size(0,0) },
              label: { text: `${Math.round(h)}m`, color: '#fef2f2', fontSize: '9px', fontWeight: 'bold' } });
            allOverlaysRef.current.push(lbl);
          });
        }
      } else if (rec.lat != null) {
        const m = new google.maps.Marker({ position: { lat: rec.lat, lng: rec.lng }, map, title: rec.name,
          icon: { path: google.maps.SymbolPath.CIRCLE, scale: 9, fillColor: color, fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 },
          label: { text: rec.type[0].toUpperCase(), color: '#fff', fontSize: '10px', fontWeight: 'bold' } });
        allOverlaysRef.current.push(m);
      }
    });

    // Obstructions
    obstructions.forEach(ob => {
      if (ob.path?.length >= 3) {
        const poly = new google.maps.Polygon({ paths: ob.path, fillColor: '#78716c', fillOpacity: 0.4, strokeColor: '#78716c', strokeWeight: 2, map });
        allOverlaysRef.current.push(poly);
        const mid = ob.path[Math.floor(ob.path.length/2)];
        const m = new google.maps.Marker({ position: mid, map, title: `${ob.name} (${ob.height}m)`,
          icon: { path: google.maps.SymbolPath.CIRCLE, scale: 7, fillColor: '#78716c', fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 },
          label: { text: 'OB', color: '#fff', fontSize: '8px', fontWeight: 'bold' } });
        allOverlaysRef.current.push(m);
      }
    });
  };

  useEffect(() => { renderAll(); }, [polygon, receptors, obstructions]);

  // ── Clear temp drawing overlays ────────────────────────────────────────────
  const clearTemp = () => {
    tempOverlaysRef.current.forEach(o => o.setMap(null));
    tempOverlaysRef.current = [];
    pathPtsRef.current = [];
    setModeInfo({ vertices: 0, length: 0 });
  };

  // ── Stop any active drawing ────────────────────────────────────────────────
  const stopDrawing = () => {
    const google = window.google; const map = mapRef.current;
    if (google) {
      if (clickListenerRef.current) { google.maps.event.removeListener(clickListenerRef.current); clickListenerRef.current = null; }
      if (dblClickListenerRef.current) { google.maps.event.removeListener(dblClickListenerRef.current); dblClickListenerRef.current = null; }
    }
    if (map) map.setOptions({ draggableCursor: null });
    clearTemp();
  };

  // ── Activate a tool ────────────────────────────────────────────────────────
  const activateTool = (toolId) => {
    stopDrawing();
    setActiveTool(toolId);
    const google = window.google; const map = mapRef.current;
    if (!google || !map || toolId === 'move') return;
    map.setOptions({ draggableCursor: 'crosshair' });

    // ── PV Array (polygon) ──
    if (toolId === 'pv') {
      let pvPts = [];
      let tempLine = null;
      clickListenerRef.current = google.maps.event.addListener(map, 'click', (e) => {
        const pt = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        // Close if near first point
        if (pvPts.length >= 3) {
          const d = haversineDist(pvPts[0], pt);
          if (d < 15) {
            onPolygonChange([...pvPts]);
            stopDrawing(); setActiveTool('move'); return;
          }
        }
        pvPts = [...pvPts, pt];
        const dot = new google.maps.Marker({ position: pt, map,
          icon: { path: google.maps.SymbolPath.CIRCLE, scale: pvPts.length === 1 ? 8 : 5, fillColor: '#2d6a4f', fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 } });
        tempOverlaysRef.current.push(dot);
        if (tempLine) tempLine.setMap(null);
        if (pvPts.length >= 2) {
          tempLine = new google.maps.Polyline({ path: [...pvPts, pvPts[0]], strokeColor: '#2d6a4f', strokeWeight: 2, strokeOpacity: 0.6, map });
          tempOverlaysRef.current.push(tempLine);
        }
        setModeInfo({ vertices: pvPts.length, length: pvPts.length >= 2 ? Math.round(pvPts.reduce((s,p,i,a) => i===0?0:s+haversineDist(a[i-1],p),0)) : 0 });
      });
    }

    // ── Vulnerable Site (point) ──
    else if (toolId === 'vs') {
      clickListenerRef.current = google.maps.event.addListener(map, 'click', (e) => {
        const subConf = VS_SUBTYPES.find(t => t.value === vsSubtype);
        const newRec = {
          id: `rec-${Date.now()}`, type: vsSubtype,
          name: `${subConf?.label} ${receptors.length + 1}`,
          lat: e.latLng.lat(), lng: e.latLng.lng(),
          height: DEFAULT_HEIGHTS[vsSubtype] ?? 1.5,
        };
        onReceptorsChange([...receptors, newRec]);
        stopDrawing(); setActiveTool('move');
      });
    }

    // ── Helicopter ──
    else if (toolId === 'heli') {
      clickListenerRef.current = google.maps.event.addListener(map, 'click', (e) => {
        const newRec = {
          id: `rec-${Date.now()}`, type: 'helicopter',
          name: `Helipad ${receptors.filter(r=>r.type==='helicopter').length + 1}`,
          lat: e.latLng.lat(), lng: e.latLng.lng(),
          height: DEFAULT_HEIGHTS.helicopter,
        };
        onReceptorsChange([...receptors, newRec]);
        stopDrawing(); setActiveTool('move');
      });
    }

    // ── Flight Path: click threshold, click direction → auto-extend to 2 NM ──
    else if (toolId === 'fp') {
      let tempLine = null;
      clickListenerRef.current = google.maps.event.addListener(map, 'click', (e) => {
        const pt = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        pathPtsRef.current = [...pathPtsRef.current, pt];

        // Place marker for this click
        const dot = new google.maps.Marker({ position: pt, map,
          icon: { path: google.maps.SymbolPath.CIRCLE, scale: pathPtsRef.current.length===1?9:6,
            fillColor: '#ef4444', fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 },
          label: pathPtsRef.current.length===1 ? { text:'T', color:'#fff', fontSize:'10px', fontWeight:'bold' } : undefined,
          title: pathPtsRef.current.length===1 ? 'Threshold' : 'Direction point',
        });
        tempOverlaysRef.current.push(dot);

        if (pathPtsRef.current.length === 2) {
          // Two clicks — compute bearing and auto-extend to exactly 2 NM from threshold
          const threshold = pathPtsRef.current[0];
          const dir = pathPtsRef.current[1];
          const TWO_NM = 3704; // metres
          // Compute bearing from threshold to dir click
          const φ1 = threshold.lat * Math.PI/180, φ2 = dir.lat * Math.PI/180;
          const dλ = (dir.lng - threshold.lng) * Math.PI/180;
          const y = Math.sin(dλ)*Math.cos(φ2);
          const x = Math.cos(φ1)*Math.sin(φ2) - Math.sin(φ1)*Math.cos(φ2)*Math.cos(dλ);
          const bearing = (Math.atan2(y,x) * 180/Math.PI + 360) % 360;
          // Sample path every 200m along the 2-NM bearing
          const steps = 12;
          const fullPath = Array.from({ length: steps+1 }, (_,k) => destinationPoint(threshold, bearing, (k/steps)*TWO_NM));
          // Remove temp line/dots and commit
          clearTemp();
          const type = 'aviation';
          const typeConf = RECEPTOR_TYPES.find(t => t.value === type);
          const newRec = {
            id: `rec-${Date.now()}`, type,
            name: `Flight Path ${receptors.filter(r=>r.type===type).length + 1} (${Math.round(bearing)}°)`,
            path: fullPath, lat: fullPath[0].lat, lng: fullPath[0].lng,
            height: DEFAULT_HEIGHTS[type],
            direction: Math.round(bearing),
          };
          onReceptorsChange([...receptors, newRec]);
          stopDrawing(); setActiveTool('move');
        } else {
          setModeInfo({ vertices: 1, length: 0 });
          if (tempLine) tempLine.setMap(null);
        }
      });
    }

    // ── Road/Route: multi-click, double-click to finish ──
    else if (toolId === 'route') {
      const color = '#f59e0b';
      let tempLine = null;
      clickListenerRef.current = google.maps.event.addListener(map, 'click', (e) => {
        const pt = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        pathPtsRef.current = [...pathPtsRef.current, pt];
        const dot = new google.maps.Marker({ position: pt, map,
          icon: { path: google.maps.SymbolPath.CIRCLE, scale: pathPtsRef.current.length===1?8:5, fillColor: color, fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 } });
        tempOverlaysRef.current.push(dot);
        if (tempLine) tempLine.setMap(null);
        if (pathPtsRef.current.length >= 2) {
          tempLine = new google.maps.Polyline({ path: pathPtsRef.current, strokeColor: color, strokeWeight: 3, strokeOpacity: 0.7, map });
          tempOverlaysRef.current.push(tempLine);
        }
        const totalLen = pathPtsRef.current.reduce((s,p,i,a)=>i===0?0:s+haversineDist(a[i-1],p),0);
        setModeInfo({ vertices: pathPtsRef.current.length, length: Math.round(totalLen) });
      });
      dblClickListenerRef.current = google.maps.event.addListener(map, 'dblclick', () => {
        const pts = pathPtsRef.current.slice(0, -1);
        if (pts.length < 2) { stopDrawing(); return; }
        const type = routeSubtype === 'railway' ? 'railway' : 'road';
        const typeConf = RECEPTOR_TYPES.find(t => t.value === type);
        const newRec = {
          id: `rec-${Date.now()}`, type,
          name: `${typeConf?.label} ${receptors.filter(r=>r.type===type).length + 1}`,
          path: pts, lat: pts[0].lat, lng: pts[0].lng,
          height: DEFAULT_HEIGHTS[type] ?? 1.5,
        };
        onReceptorsChange([...receptors, newRec]);
        stopDrawing(); setActiveTool('move');
      });
    }

    // ── Obstruction (polygon) ──
    else if (toolId === 'ob') {
      let obPts = [];
      let tempLine = null;
      clickListenerRef.current = google.maps.event.addListener(map, 'click', (e) => {
        const pt = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        if (obPts.length >= 3 && haversineDist(obPts[0], pt) < 15) {
          const newOb = { id: `ob-${Date.now()}`, name: `Obstruction ${obstructions.length+1}`, path: [...obPts], height: 12 };
          onObstructionsChange([...obstructions, newOb]);
          stopDrawing(); setActiveTool('move'); return;
        }
        obPts = [...obPts, pt];
        const dot = new google.maps.Marker({ position: pt, map,
          icon: { path: google.maps.SymbolPath.CIRCLE, scale: obPts.length===1?8:5, fillColor: '#78716c', fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 } });
        tempOverlaysRef.current.push(dot);
        if (tempLine) tempLine.setMap(null);
        if (obPts.length >= 2) {
          tempLine = new google.maps.Polyline({ path: [...obPts, obPts[0]], strokeColor: '#78716c', strokeWeight: 2, strokeOpacity: 0.7, map });
          tempOverlaysRef.current.push(tempLine);
        }
        setModeInfo({ vertices: obPts.length, length: 0 });
      });
    }
  };

  const updateReceptor = (id, field, value) =>
    onReceptorsChange(receptors.map(r => r.id===id ? {...r,[field]: field==='height'?parseFloat(value)||0:value} : r));
  const removeReceptor = (id) => onReceptorsChange(receptors.filter(r => r.id!==id));
  const updateObstruction = (id, field, value) =>
    onObstructionsChange(obstructions.map(o => o.id===id ? {...o,[field]: field==='height'?parseFloat(value)||0:value} : o));
  const removeObstruction = (id) => onObstructionsChange(obstructions.filter(o => o.id!==id));
  const clearPV = () => { onPolygonChange([]); };

  const toolInfo = SITE_TOOLS.find(t => t.id === activeTool);
  const pvDrawn = polygon?.length >= 3;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-heading font-bold text-forest-900">Site Configuration</h2>
          <p className="text-sm text-gray-500">Draw your PV array, receptors, and obstructions on the map.</p>
        </div>
        {pvDrawn && <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">PV array drawn ✓</span>}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-gray-100 rounded-xl border border-gray-200">
        {SITE_TOOLS.map(tool => (
          <button key={tool.id} onClick={() => activateTool(tool.id)}
            title={tool.desc}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              activeTool === tool.id
                ? 'text-white border-transparent shadow-sm'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
            }`}
            style={activeTool === tool.id ? { backgroundColor: tool.color, borderColor: tool.color } : {}}
          >
            <span>{tool.icon}</span> {tool.label}
          </button>
        ))}

        {/* Sub-type selectors */}
        {activeTool === 'vs' && (
          <select value={vsSubtype} onChange={e=>setVsSubtype(e.target.value)}
            className="ml-1 text-xs border border-gray-300 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400">
            {VS_SUBTYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        )}
        {activeTool === 'route' && (
          <select value={routeSubtype} onChange={e=>setRouteSubtype(e.target.value)}
            className="ml-1 text-xs border border-gray-300 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-yellow-400">
            <option value="road">Road</option>
            <option value="railway">Railway</option>
          </select>
        )}

        {/* Mode info */}
        {(modeInfo.vertices > 0 || activeTool !== 'move') && (
          <div className="ml-auto text-xs text-gray-500 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 flex gap-3">
            {modeInfo.vertices > 0 && <span>Vertices: <strong>{modeInfo.vertices}</strong></span>}
            {modeInfo.length > 0 && <span>Length: <strong>{modeInfo.length >= 1000 ? `${(modeInfo.length/1000).toFixed(2)} km` : `${modeInfo.length} m`}</strong></span>}
            {activeTool !== 'move' && <span className="text-gray-400 italic">{toolInfo?.desc}</span>}
          </div>
        )}
      </div>

      {/* Map + Right panel */}
      <div className="flex gap-3" style={{ height: '520px' }}>
        {/* Map */}
        <div ref={mapDivRef} className="flex-1 rounded-xl overflow-hidden border border-gray-200" />

        {/* Right panel */}
        <div className="w-72 flex flex-col gap-2 overflow-y-auto">
          {/* PV Array */}
          <div className="bg-white border border-gray-200 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-forest-900 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-forest-600 inline-block" /> PV Array
              </p>
              {pvDrawn && <button onClick={clearPV} className="text-xs text-red-400 hover:text-red-600"><RotateCcw className="w-3 h-3" /></button>}
            </div>
            {pvDrawn ? (
              <p className="text-xs text-green-700 font-medium">{polygon.length} vertices drawn</p>
            ) : (
              <p className="text-xs text-gray-400">Click <strong>⬠ PV Array</strong> tool and trace the array boundary on the map.</p>
            )}
          </div>

          {/* Receptors */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 flex-1 overflow-y-auto">
            <p className="text-xs font-bold text-forest-900 mb-2 flex items-center gap-1.5">
              <Eye className="w-3 h-3 text-blue-500" /> Receptors ({receptors.length})
            </p>
            {receptors.length === 0
              ? <p className="text-xs text-gray-400">Use VS, FP, Route, or Heli tools to add receptors.</p>
              : <div className="space-y-2">
                  {receptors.map(rec => {
                    const color = RECEPTOR_MODE_INFO[rec.type]?.color || '#6b7280';
                    const isSelected = selectedId === rec.id;
                    return (
                      <div key={rec.id}
                        onClick={() => setSelectedId(isSelected ? null : rec.id)}
                        className={`rounded-lg border p-2 cursor-pointer transition-colors ${isSelected ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                            style={{ backgroundColor: color }}>{rec.type[0].toUpperCase()}</span>
                          <span className="flex-1 text-xs font-medium text-gray-800 truncate">{rec.name}</span>
                          <button onClick={e=>{e.stopPropagation();removeReceptor(rec.id)}} className="text-gray-300 hover:text-red-500 flex-shrink-0">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        {isSelected && (
                          <div className="mt-2 space-y-1.5 pt-1.5 border-t border-gray-100">
                            <input value={rec.name} onChange={e=>updateReceptor(rec.id,'name',e.target.value)}
                              className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gold-400" />
                            {rec.type === 'aviation' && rec.path ? (
                              <p className="text-xs text-red-600 font-medium">Heights auto: 3° glide slope</p>
                            ) : rec.type === 'helicopter' ? (
                              <p className="text-xs text-orange-600 font-medium">8 directions · 8° slope · auto-heights</p>
                            ) : (
                              <label className="flex items-center gap-1 text-xs">
                                <span className="text-gray-600">Height:</span>
                                <input type="number" min="0" step="0.1" value={rec.height ?? DEFAULT_HEIGHTS[rec.type] ?? 1.5}
                                  onChange={e=>updateReceptor(rec.id,'height',e.target.value)}
                                  className="w-14 border border-gray-300 rounded px-1.5 py-0.5 text-xs focus:outline-none" />
                                <span className="text-gray-500">m</span>
                              </label>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
            }
          </div>

          {/* Obstructions */}
          <div className="bg-white border border-gray-200 rounded-xl p-3">
            <p className="text-xs font-bold text-forest-900 mb-2 flex items-center gap-1.5">
              <span className="text-stone-500">⬢</span> Obstructions ({obstructions.length})
            </p>
            {obstructions.length === 0
              ? <p className="text-xs text-gray-400">Use <strong>⬢ Obstruction</strong> tool to draw hedgerows, buildings, etc.</p>
              : <div className="space-y-2">
                  {obstructions.map(ob => {
                    const isSelected = selectedId === ob.id;
                    return (
                      <div key={ob.id} onClick={()=>setSelectedId(isSelected?null:ob.id)}
                        className={`rounded-lg border p-2 cursor-pointer transition-colors ${isSelected?'border-stone-300 bg-stone-50':'border-gray-200 hover:border-gray-300'}`}>
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded bg-stone-400 flex items-center justify-center text-white text-[9px] font-bold">OB</span>
                          <span className="flex-1 text-xs font-medium text-gray-800 truncate">{ob.name}</span>
                          <button onClick={e=>{e.stopPropagation();removeObstruction(ob.id)}} className="text-gray-300 hover:text-red-500">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        {isSelected && (
                          <div className="mt-2 space-y-1.5 pt-1.5 border-t border-gray-100">
                            <input value={ob.name} onChange={e=>updateObstruction(ob.id,'name',e.target.value)}
                              className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none" />
                            <label className="flex items-center gap-1 text-xs">
                              <span className="text-gray-600">Upper edge height:</span>
                              <input type="number" min="0" step="0.5" value={ob.height}
                                onChange={e=>updateObstruction(ob.id,'height',e.target.value)}
                                className="w-14 border border-gray-300 rounded px-1.5 py-0.5 text-xs focus:outline-none" />
                              <span className="text-gray-500">m</span>
                            </label>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── OLD DrawingStep (kept as dead code placeholder — replaced by SiteMapStep)
function DrawingStep({ location, polygon, onPolygonChange }) {
  const mapDivRef = useRef(null);
  const mapRef = useRef(null);
  const polygonRef = useRef(null);
  const previewLineRef = useRef(null);
  const markersRef = useRef([]);
  const clickListenerRef = useRef(null);
  const drawingPointsRef = useRef([]);
  const [drawingActive, setDrawingActive] = useState(false);

  useEffect(() => {
    if (!location || !mapDivRef.current || mapRef.current) return;
    loadGoogleMaps().then((google) => {
      const map = new google.maps.Map(mapDivRef.current, {
        center: { lat: location.lat, lng: location.lng },
        zoom: 17,
        mapTypeId: 'satellite',
        tilt: 0,
      });
      mapRef.current = map;

      if (polygon && polygon.length >= 3) {
        renderPolygon(google, map, polygon);
      }
    });
  }, [location]);

  const renderPolygon = (google, map, coords) => {
    if (polygonRef.current) polygonRef.current.setMap(null);
    polygonRef.current = new google.maps.Polygon({
      paths: coords,
      fillColor: '#2d6a4f',
      fillOpacity: 0.4,
      strokeColor: '#2d6a4f',
      strokeWeight: 2,
      editable: true,
      map,
    });
    const trackEdit = () => {
      const updated = polygonRef.current.getPath().getArray().map(ll => ({ lat: ll.lat(), lng: ll.lng() }));
      onPolygonChange(updated);
    };
    google.maps.event.addListener(polygonRef.current.getPath(), 'set_at', trackEdit);
    google.maps.event.addListener(polygonRef.current.getPath(), 'insert_at', trackEdit);
  };

  const clearTempDrawing = (google) => {
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];
    if (previewLineRef.current) { previewLineRef.current.setMap(null); previewLineRef.current = null; }
    drawingPointsRef.current = [];
  };

  const startDrawing = () => {
    const google = window.google;
    const map = mapRef.current;
    if (!google || !map) return;

    // Clear existing polygon
    if (polygonRef.current) { polygonRef.current.setMap(null); polygonRef.current = null; }
    clearTempDrawing(google);
    onPolygonChange([]);
    setDrawingActive(true);

    // Change cursor
    map.setOptions({ draggableCursor: 'crosshair' });

    clickListenerRef.current = google.maps.event.addListener(map, 'click', (e) => {
      const pt = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      const pts = drawingPointsRef.current;

      // Check if clicking near first point to close
      if (pts.length >= 3) {
        const first = pts[0];
        const dx = first.lat - pt.lat;
        const dy = first.lng - pt.lng;
        if (Math.sqrt(dx * dx + dy * dy) < 0.0003) {
          // Close polygon
          google.maps.event.removeListener(clickListenerRef.current);
          map.setOptions({ draggableCursor: null });
          clearTempDrawing(google);
          setDrawingActive(false);
          renderPolygon(google, map, pts);
          onPolygonChange([...pts]);
          return;
        }
      }

      drawingPointsRef.current = [...pts, pt];

      // Place marker
      const marker = new google.maps.Marker({
        position: pt,
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: pts.length === 0 ? 7 : 5,
          fillColor: pts.length === 0 ? '#f59e0b' : '#2d6a4f',
          fillOpacity: 1,
          strokeColor: '#fff',
          strokeWeight: 2,
        },
      });
      markersRef.current.push(marker);

      // Update preview polyline
      if (previewLineRef.current) previewLineRef.current.setMap(null);
      if (drawingPointsRef.current.length >= 2) {
        previewLineRef.current = new google.maps.Polyline({
          path: [...drawingPointsRef.current, drawingPointsRef.current[0]],
          strokeColor: '#2d6a4f',
          strokeWeight: 2,
          strokeOpacity: 0.6,
          map,
        });
      }
    });
  };

  const clearPolygon = () => {
    const google = window.google;
    const map = mapRef.current;
    if (!google || !map) return;
    if (clickListenerRef.current) {
      google.maps.event.removeListener(clickListenerRef.current);
      map.setOptions({ draggableCursor: null });
    }
    if (polygonRef.current) { polygonRef.current.setMap(null); polygonRef.current = null; }
    clearTempDrawing(google);
    onPolygonChange([]);
    setDrawingActive(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-heading font-bold text-forest-900">Draw the PV Array</h2>
        <p className="text-sm text-gray-600 mt-1">Use the buttons on the left to draw the boundary of the proposed solar array on the map.</p>
      </div>

      <div className="flex gap-3">
        {/* Toolbar */}
        <div className="flex flex-col gap-2">
          <button
            onClick={startDrawing}
            disabled={drawingActive}
            title="Draw polygon"
            className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${
              drawingActive
                ? 'bg-forest-700 border-forest-700 text-white'
                : 'bg-white border-gray-300 text-forest-800 hover:bg-forest-50 hover:border-forest-400'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" />
            </svg>
          </button>
          <button
            onClick={clearPolygon}
            disabled={!polygon?.length}
            title="Clear and redraw"
            className="w-10 h-10 rounded-lg border border-gray-300 bg-white text-red-500 hover:bg-red-50 hover:border-red-300 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Map */}
        <div ref={mapDivRef} className="flex-1 rounded-xl border border-gray-200" style={{ height: '440px' }} />
      </div>

      {drawingActive && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex gap-2">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          Click on the map to place polygon points. Click the <strong>first point again</strong> to close the shape.
        </div>
      )}
      {polygon?.length >= 3 && !drawingActive && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2 text-sm text-green-800">
          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
          Array boundary drawn — {polygon.length} vertices. Drag vertices to adjust, or click <RotateCcw className="w-3 h-3 inline" /> to redraw.
        </div>
      )}
      {(!polygon || polygon.length < 3) && !drawingActive && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 flex gap-2">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          Click the <strong>polygon icon</strong> on the left to start drawing the array boundary. Minimum 3 points required.
        </div>
      )}
    </div>
  );
}

// ─── Step 3: Panel Parameters ───────────────────────────────────────────────
function ParamsStep({ params, onChange }) {
  const set = (key, val) => onChange({ ...params, [key]: val });
  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold text-forest-900 mb-1">Panel Parameters</h2>
        <p className="text-sm text-gray-600">Enter the proposed panel configuration. These values directly affect the glare calculation.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Project type</label>
        <div className="grid grid-cols-2 gap-3">
          {['ground-mounted', 'rooftop'].map(type => (
            <button
              key={type}
              onClick={() => set('projectType', type)}
              className={`py-3 px-4 rounded-xl border-2 text-sm font-medium capitalize transition-colors ${
                params.projectType === type
                  ? 'border-forest-700 bg-forest-50 text-forest-900'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Panel tilt (°)
            <span className="text-gray-400 font-normal"> — from horizontal</span>
          </label>
          <input
            type="number" min="0" max="90" value={params.tilt}
            onChange={e => set('tilt', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
          <p className="text-xs text-gray-400 mt-1">Typical: 15–35°</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Azimuth (°)
            <span className="text-gray-400 font-normal"> — from North</span>
          </label>
          <input
            type="number" min="0" max="360" value={params.azimuth}
            onChange={e => set('azimuth', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
          <p className="text-xs text-gray-400 mt-1">South = 180°</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Lower edge height (m)</label>
          <input
            type="number" min="0" step="0.1" value={params.lowerHeight}
            onChange={e => set('lowerHeight', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
          <p className="text-xs text-gray-400 mt-1">Typical: 0.3–0.8m</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Upper edge height (m)</label>
          <input
            type="number" min="0" step="0.1" value={params.upperHeight}
            onChange={e => set('upperHeight', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
          <p className="text-xs text-gray-400 mt-1">Typical: 1.8–2.5m</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Panel surface type</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'anti-reflective', label: 'Anti-reflective glass', sub: '~4% reflectivity' },
            { value: 'standard',        label: 'Standard glass',        sub: '~10% reflectivity' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => set('surfaceType', opt.value)}
              className={`py-3 px-4 rounded-xl border-2 text-left text-sm transition-colors ${
                params.surfaceType === opt.value
                  ? 'border-forest-700 bg-forest-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <p className={`font-medium ${params.surfaceType === opt.value ? 'text-forest-900' : 'text-gray-700'}`}>{opt.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{opt.sub}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700 flex gap-2">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        Anti-reflective coated glass (standard on modern panels) significantly reduces glare potential. If unsure, select Anti-reflective for a less conservative result.
      </div>
    </div>
  );
}

// Default eye heights (m) by receptor type
const DEFAULT_HEIGHTS = { road: 1.2, residential: 1.5, railway: 1.8, aviation: 100, helicopter: 2, atct: 10, other: 1.5 };

// Which types use path drawing (vs single point)
const PATH_RECEPTOR_TYPES = new Set(['road', 'railway', 'aviation', 'atct']);

// Haversine distance in metres between two {lat,lng} points
function haversineDist(a, b) {
  const R = 6371000;
  const φ1 = a.lat * Math.PI / 180, φ2 = b.lat * Math.PI / 180;
  const dφ = (b.lat - a.lat) * Math.PI / 180;
  const dλ = (b.lng - a.lng) * Math.PI / 180;
  const x = Math.sin(dφ/2)**2 + Math.cos(φ1)*Math.cos(φ2)*Math.sin(dλ/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
}

// Interpolate point along great circle at fraction t between a and b
function lerpLatLng(a, b, t) {
  return { lat: a.lat + (b.lat - a.lat) * t, lng: a.lng + (b.lng - a.lng) * t };
}

// Sample a polyline path at every intervalM metres; returns [{lat,lng,distFromStart}]
function samplePolyline(path, intervalM) {
  if (path.length < 2) return path.map(p => ({ ...p, distFromStart: 0 }));
  const samples = [];
  let cumDist = 0, segStart = 0, segDist = haversineDist(path[0], path[1]);
  samples.push({ ...path[0], distFromStart: 0 });
  let targetDist = intervalM;
  for (let i = 0; i < path.length - 1; i++) {
    const A = path[i], B = path[i + 1];
    const d = haversineDist(A, B);
    while (targetDist <= cumDist + d) {
      const t = (targetDist - cumDist) / d;
      samples.push({ ...lerpLatLng(A, B, t), distFromStart: targetDist });
      targetDist += intervalM;
    }
    cumDist += d;
  }
  samples.push({ ...path[path.length - 1], distFromStart: cumDist });
  return samples;
}

// Aviation 3° glide-slope height at distM from threshold (near end of drawn path)
function aviationGlideSlopeHeight(distM) {
  const GLIDE_DEG = 3.0;
  const THRESHOLD_HEIGHT = 15; // aircraft height at threshold (m)
  return Math.max(THRESHOLD_HEIGHT, distM * Math.tan(GLIDE_DEG * Math.PI / 180) + THRESHOLD_HEIGHT);
}

// Helicopter 8° approach slope height at distM from helipad
function helicopterApproachHeight(distM) {
  const GLIDE_DEG = 8.0;
  const HOVER_HEIGHT = 2; // height at helipad (m)
  return Math.max(HOVER_HEIGHT, distM * Math.tan(GLIDE_DEG * Math.PI / 180) + HOVER_HEIGHT);
}

// Generate a point at distM and bearingDeg from origin {lat,lng}
function destinationPoint(origin, bearingDeg, distM) {
  const R = 6371000;
  const δ = distM / R;
  const θ = bearingDeg * Math.PI / 180;
  const φ1 = origin.lat * Math.PI / 180;
  const λ1 = origin.lng * Math.PI / 180;
  const φ2 = Math.asin(Math.sin(φ1)*Math.cos(δ) + Math.cos(φ1)*Math.sin(δ)*Math.cos(θ));
  const λ2 = λ1 + Math.atan2(Math.sin(θ)*Math.sin(δ)*Math.cos(φ1), Math.cos(δ)-Math.sin(φ1)*Math.sin(φ2));
  return { lat: φ2 * 180/Math.PI, lng: λ2 * 180/Math.PI };
}

// Build 8 radial approach paths from helipad centre (1 NM = 1852 m each direction)
const HELI_BEARINGS = [0, 45, 90, 135, 180, 225, 270, 315];
const HELI_BEARING_LABELS = ['N','NE','E','SE','S','SW','W','NW'];
const HELI_PATH_DIST = 1852; // 1 NM
function helicopterPaths(centre) {
  return HELI_BEARINGS.map((bearing, i) => {
    const steps = 10;
    const path = Array.from({ length: steps + 1 }, (_, k) => destinationPoint(centre, bearing, (k / steps) * HELI_PATH_DIST));
    return { bearing, label: HELI_BEARING_LABELS[i], path };
  });
}

// Expand path-based receptors into per-point receptors for API
function expandReceptors(receptors) {
  const out = [];
  for (const rec of receptors) {
    // Helicopter: expand into 8 radial approach paths
    if (rec.type === 'helicopter' && !rec.path) {
      helicopterPaths({ lat: rec.lat, lng: rec.lng }).forEach(({ label, path }) => {
        samplePolyline(path, 100).forEach((pt, idx) => {
          out.push({
            id: `${rec.id}_${label}_${idx}`, type: 'helicopter',
            name: `${rec.name} ${label} approach (pt ${idx + 1})`,
            lat: pt.lat, lng: pt.lng,
            height: helicopterApproachHeight(pt.distFromStart),
          });
        });
      });
      continue;
    }
    if (!rec.path || rec.path.length < 2) {
      out.push({ id: rec.id, type: rec.type, name: rec.name, lat: rec.lat, lng: rec.lng, height: rec.height ?? DEFAULT_HEIGHTS[rec.type] ?? 1.5 });
      continue;
    }
    const intervalM = rec.type === 'aviation' ? 200 : 50;
    const samples = samplePolyline(rec.path, intervalM);
    samples.forEach((pt, idx) => {
      const height = rec.type === 'aviation'
        ? aviationGlideSlopeHeight(pt.distFromStart)
        : (rec.height ?? DEFAULT_HEIGHTS[rec.type] ?? 1.5);
      out.push({ id: `${rec.id}_${idx}`, type: rec.type, name: `${rec.name} (pt ${idx + 1})`, lat: pt.lat, lng: pt.lng, height });
    });
  }
  return out;
}

// ─── Step 4: Receptors ──────────────────────────────────────────────────────
const RECEPTOR_MODE_INFO = {
  road:        { draw: 'path',  hint: 'Click to trace the road path. Double-click to finish. Height = 1.2 m (driver eye level).', color: '#f59e0b' },
  residential: { draw: 'point', hint: 'Click on the map to place a residential receptor point.', color: '#3b82f6' },
  railway:     { draw: 'path',  hint: 'Click to trace the railway line. Double-click to finish. Height = 1.8 m (passenger eye level).', color: '#8b5cf6' },
  aviation:    { draw: 'path',  hint: 'Draw from runway threshold outward along approach path. Double-click to finish. Heights calculated automatically from 3° glide slope.', color: '#ef4444' },
  helicopter:  { draw: 'point', hint: 'Click to place the helipad. 8 approach paths (N, NE, E, SE, S, SW, W, NW) are drawn automatically at 8° slope up to 1 NM.', color: '#f97316' },
  atct:        { draw: 'point', hint: 'Click to place the Air Traffic Control Tower. Set the cab height.', color: '#dc2626' },
  other:       { draw: 'point', hint: 'Click to place a custom receptor point.', color: '#6b7280' },
};

function ReceptorsStep({ location, polygon, receptors, onReceptorsChange }) {
  const mapDivRef = useRef(null);
  const mapRef = useRef(null);
  const overlaysRef = useRef([]);
  const tempOverlaysRef = useRef([]);
  const clickListenerRef = useRef(null);
  const dblClickListenerRef = useRef(null);
  const pathPtsRef = useRef([]);

  const [activeType, setActiveType] = useState(null); // null = idle
  const [autoDetecting, setAutoDetecting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const centre = polygon?.length
    ? { lat: polygon.reduce((s, p) => s + p.lat, 0) / polygon.length, lng: polygon.reduce((s, p) => s + p.lng, 0) / polygon.length }
    : location;

  // ── Map init ──
  useEffect(() => {
    if (!location || !mapDivRef.current || mapRef.current) return;
    loadGoogleMaps().then((google) => {
      const bounds = new google.maps.LatLngBounds();
      if (polygon?.length) polygon.forEach(p => bounds.extend(p));
      else bounds.extend(location);
      const map = new google.maps.Map(mapDivRef.current, { mapTypeId: 'hybrid', tilt: 0 });
      map.fitBounds(bounds, 100);
      mapRef.current = map;
      if (polygon?.length >= 3)
        new google.maps.Polygon({ paths: polygon, fillColor: '#2d6a4f', fillOpacity: 0.35, strokeColor: '#2d6a4f', strokeWeight: 2, map });
    });
  }, [location, polygon]);

  // ── Render all receptor overlays ──
  const renderOverlays = (google, map, recs) => {
    overlaysRef.current.forEach(o => o.setMap(null));
    overlaysRef.current = [];
    recs.forEach(rec => {
      const color = RECEPTOR_MODE_INFO[rec.type]?.color || '#6b7280';
      if (rec.path?.length >= 2) {
        const line = new google.maps.Polyline({ path: rec.path, strokeColor: color, strokeWeight: 4, strokeOpacity: 0.9, map });
        overlaysRef.current.push(line);
        // Label at midpoint
        const mid = rec.path[Math.floor(rec.path.length / 2)];
        const m = new google.maps.Marker({ position: mid, map, title: rec.name,
          icon: { path: google.maps.SymbolPath.CIRCLE, scale: 9, fillColor: color, fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 },
          label: { text: rec.type[0].toUpperCase(), color: '#fff', fontSize: '10px', fontWeight: 'bold' } });
        overlaysRef.current.push(m);
        // For aviation: draw small height labels along path
        if (rec.type === 'aviation') {
          samplePolyline(rec.path, 400).forEach(pt => {
            const h = aviationGlideSlopeHeight(pt.distFromStart);
            const label = new google.maps.Marker({ position: pt, map,
              icon: { url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', scaledSize: new google.maps.Size(0,0) },
              label: { text: `${Math.round(h)}m`, color: '#fff', fontSize: '9px', fontWeight: 'bold', className: 'aviation-label' } });
            overlaysRef.current.push(label);
          });
        }
      } else if (rec.type === 'helicopter' && rec.lat != null) {
        // Draw helipad marker + 8 radial spokes
        const centre = { lat: rec.lat, lng: rec.lng };
        const m = new google.maps.Marker({ position: centre, map, title: rec.name,
          icon: { path: google.maps.SymbolPath.CIRCLE, scale: 10, fillColor: color, fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 },
          label: { text: 'H', color: '#fff', fontSize: '11px', fontWeight: 'bold' } });
        overlaysRef.current.push(m);
        helicopterPaths(centre).forEach(({ label, path }) => {
          const spoke = new google.maps.Polyline({ path, strokeColor: color, strokeWeight: 2, strokeOpacity: 0.7, map,
            icons: [{ icon: { path: google.maps.SymbolPath.FORWARD_OPEN_ARROW, scale: 2.5, strokeColor: color }, offset: '100%' }] });
          overlaysRef.current.push(spoke);
          const tip = path[path.length - 1];
          const lbl = new google.maps.Marker({ position: tip, map,
            icon: { url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', scaledSize: new google.maps.Size(0,0) },
            label: { text: label, color: color, fontSize: '10px', fontWeight: 'bold' } });
          overlaysRef.current.push(lbl);
        });
      } else if (rec.lat != null) {
        const m = new google.maps.Marker({ position: { lat: rec.lat, lng: rec.lng }, map, title: rec.name,
          icon: { path: google.maps.SymbolPath.CIRCLE, scale: 9, fillColor: color, fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 },
          label: { text: rec.type[0].toUpperCase(), color: '#fff', fontSize: '10px', fontWeight: 'bold' } });
        overlaysRef.current.push(m);
      }
    });
  };

  useEffect(() => {
    if (mapRef.current && window.google) renderOverlays(window.google, mapRef.current, receptors);
  }, [receptors]);

  // ── Clear temp drawing overlays ──
  const clearTemp = () => {
    tempOverlaysRef.current.forEach(o => o.setMap(null));
    tempOverlaysRef.current = [];
    pathPtsRef.current = [];
  };

  // ── Stop drawing mode ──
  const stopDrawing = () => {
    const google = window.google; const map = mapRef.current;
    if (google) {
      if (clickListenerRef.current) { google.maps.event.removeListener(clickListenerRef.current); clickListenerRef.current = null; }
      if (dblClickListenerRef.current) { google.maps.event.removeListener(dblClickListenerRef.current); dblClickListenerRef.current = null; }
    }
    if (map) map.setOptions({ draggableCursor: null });
    clearTemp();
    setActiveType(null);
  };

  // ── Start drawing a receptor type ──
  const startDrawing = (type) => {
    const google = window.google; const map = mapRef.current;
    if (!google || !map) return;
    stopDrawing();
    setActiveType(type);
    map.setOptions({ draggableCursor: 'crosshair' });
    const mode = RECEPTOR_MODE_INFO[type]?.draw;
    const color = RECEPTOR_MODE_INFO[type]?.color || '#6b7280';
    const typeConf = RECEPTOR_TYPES.find(t => t.value === type);

    if (mode === 'point') {
      clickListenerRef.current = google.maps.event.addListener(map, 'click', (e) => {
        const newRec = {
          id: `rec-${Date.now()}`, type,
          name: `${typeConf?.label} ${receptors.length + 1}`,
          lat: e.latLng.lat(), lng: e.latLng.lng(),
          height: DEFAULT_HEIGHTS[type] ?? 1.5,
        };
        onReceptorsChange([...receptors, newRec]);
        stopDrawing();
      });
    } else {
      // Path drawing
      let tempLine = null;
      clickListenerRef.current = google.maps.event.addListener(map, 'click', (e) => {
        const pt = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        pathPtsRef.current = [...pathPtsRef.current, pt];
        const dot = new google.maps.Marker({ position: pt, map,
          icon: { path: google.maps.SymbolPath.CIRCLE, scale: pathPtsRef.current.length === 1 ? 8 : 5,
            fillColor: color, fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 } });
        tempOverlaysRef.current.push(dot);
        if (tempLine) tempLine.setMap(null);
        if (pathPtsRef.current.length >= 2) {
          tempLine = new google.maps.Polyline({ path: pathPtsRef.current, strokeColor: color, strokeWeight: 3, strokeOpacity: 0.7, map });
          tempOverlaysRef.current.push(tempLine);
        }
      });

      dblClickListenerRef.current = google.maps.event.addListener(map, 'dblclick', (e) => {
        // dblclick also fires click twice — remove the last duplicate point
        const pts = pathPtsRef.current.slice(0, -1);
        if (pts.length < 2) { stopDrawing(); return; }
        const newRec = {
          id: `rec-${Date.now()}`, type,
          name: `${typeConf?.label} ${receptors.length + 1}`,
          path: pts, lat: pts[0].lat, lng: pts[0].lng,
          height: DEFAULT_HEIGHTS[type] ?? 1.5,
        };
        onReceptorsChange([...receptors, newRec]);
        stopDrawing();
      });
    }
  };

  // ── Auto-detect ──
  const autoDetect = async () => {
    if (!window.google || !mapRef.current) return;
    setAutoDetecting(true);
    const google = window.google;
    const service = new google.maps.places.PlacesService(mapRef.current);
    const searches = [
      { keyword: 'residential', type: 'residential' },
      { keyword: 'airport runway', type: 'aviation' },
      { keyword: 'train station', type: 'railway' },
    ];
    const found = [];
    await Promise.all(searches.map(s => new Promise(resolve => {
      service.nearbySearch({ location: centre, radius: 1000, keyword: s.keyword }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results?.length) {
          results.slice(0, 2).forEach(r => {
            found.push({
              id: `rec-${Date.now()}-${Math.random()}`, type: s.type,
              name: r.name,
              lat: r.geometry.location.lat(), lng: r.geometry.location.lng(),
              height: DEFAULT_HEIGHTS[s.type] ?? 1.5,
            });
          });
        }
        resolve();
      });
    })));
    const seen = new Set(receptors.map(r => r.name));
    onReceptorsChange([...receptors, ...found.filter(r => !seen.has(r.name))]);
    setAutoDetecting(false);
  };

  const updateReceptor = (id, field, value) => {
    onReceptorsChange(receptors.map(r => r.id === id
      ? { ...r, [field]: field === 'height' ? parseFloat(value) || 0 : value } : r));
  };
  const removeReceptor = (id) => onReceptorsChange(receptors.filter(r => r.id !== id));

  const modeInfo = activeType ? RECEPTOR_MODE_INFO[activeType] : null;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-heading font-bold text-forest-900 mb-1">Add Receptors</h2>
        <p className="text-sm text-gray-600">Add nearby sensitive receptors. Roads, railways and flight paths are drawn as lines. Click the type button, then draw on the map.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-4">
        {/* Left: toolbar + map */}
        <div className="space-y-3">
          {/* Type buttons */}
          <div className="flex flex-wrap gap-2">
            {RECEPTOR_TYPES.map(t => {
              const isActive = activeType === t.value;
              const mInfo = RECEPTOR_MODE_INFO[t.value];
              return (
                <button key={t.value}
                  onClick={() => isActive ? stopDrawing() : startDrawing(t.value)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                    isActive ? 'text-white border-transparent' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                  style={isActive ? { backgroundColor: mInfo?.color } : {}}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: isActive ? '#fff' : mInfo?.color }} />
                  {t.label}
                  <span className="opacity-60 text-[10px]">{mInfo?.draw === 'path' ? '(line)' : '(point)'}</span>
                </button>
              );
            })}
            <button onClick={autoDetect} disabled={autoDetecting}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border bg-gold-500 text-white border-gold-500 hover:bg-gold-600 disabled:opacity-60 transition-colors ml-auto">
              {autoDetecting ? <RotateCcw className="w-3.5 h-3.5 animate-spin" /> : <Sun className="w-3.5 h-3.5" />}
              Auto-detect
            </button>
          </div>

          {/* Drawing hint */}
          {modeInfo && (
            <div className="rounded-lg px-3 py-2 text-xs font-medium flex items-center gap-2" style={{ backgroundColor: modeInfo.color + '18', color: modeInfo.color, border: `1px solid ${modeInfo.color}40` }}>
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              {modeInfo.hint}
              {activeType === 'aviation' && (
                <span className="ml-1 font-normal opacity-80">Threshold height: 15 m → 2 NM out: ~{Math.round(aviationGlideSlopeHeight(3704))} m</span>
              )}
            </div>
          )}

          {/* Map */}
          <div ref={mapDivRef} className="w-full rounded-xl overflow-hidden border border-gray-200" style={{ height: '400px' }} />
        </div>

        {/* Right: receptor list */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-gray-700">Receptors ({receptors.length})</p>
          {receptors.length === 0 ? (
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400 text-sm">
              No receptors yet.<br />Select a type above and draw on the map.
            </div>
          ) : (
            <div className="space-y-2 max-h-[430px] overflow-y-auto pr-1">
              {receptors.map(rec => {
                const mInfo = RECEPTOR_MODE_INFO[rec.type];
                const color = mInfo?.color || '#6b7280';
                const isEditing = editingId === rec.id;
                const isPath = !!rec.path;
                return (
                  <div key={rec.id} className="bg-white border border-gray-200 rounded-xl p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: color }}>
                        {rec.type[0].toUpperCase()}
                      </span>
                      {isEditing
                        ? <input value={rec.name} onChange={e => updateReceptor(rec.id, 'name', e.target.value)}
                            className="flex-1 text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gold-400" />
                        : <p className="flex-1 text-sm font-medium text-gray-800 truncate">{rec.name}</p>
                      }
                      <button onClick={() => setEditingId(isEditing ? null : rec.id)} className="text-gray-400 hover:text-gray-600 text-xs px-1">
                        {isEditing ? 'Done' : 'Edit'}
                      </button>
                      <button onClick={() => removeReceptor(rec.id)} className="text-gray-300 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {rec.type === 'helicopter' && !isPath ? (
                      <div className="text-xs space-y-0.5" style={{ color: '#f97316' }}>
                        <p className="font-medium">8 approach paths auto-generated (N, NE, E, SE, S, SW, W, NW)</p>
                        <p className="text-gray-500">8° slope · 1 NM · Heights: {Math.round(helicopterApproachHeight(0))} m → {Math.round(helicopterApproachHeight(HELI_PATH_DIST))} m</p>
                      </div>
                    ) : isPath ? (
                      <div className="text-xs text-gray-500 space-y-1">
                        <span className="inline-block bg-gray-100 rounded px-1.5 py-0.5">{rec.path.length} pts drawn</span>
                        {rec.type === 'aviation' && (
                          <p className="text-red-600 font-medium">
                            Heights auto: {Math.round(aviationGlideSlopeHeight(0))} m → {Math.round(aviationGlideSlopeHeight(haversineDist(rec.path[0], rec.path[rec.path.length-1])))} m (3° glide slope)
                          </p>
                        )}
                        {rec.type !== 'aviation' && (
                          <label className="flex items-center gap-1">
                            <span className="text-gray-600 font-medium">Eye height:</span>
                            <input type="number" min="0" step="0.1" value={rec.height ?? DEFAULT_HEIGHTS[rec.type] ?? 1.5}
                              onChange={e => updateReceptor(rec.id, 'height', e.target.value)}
                              className="w-16 border border-gray-300 rounded px-1.5 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold-400" />
                            <span>m</span>
                          </label>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{rec.lat?.toFixed(4)}, {rec.lng?.toFixed(4)}</span>
                        <label className="flex items-center gap-1 ml-auto">
                          <span className="text-gray-600 font-medium">Height:</span>
                          <input type="number" min="0" step="0.1" value={rec.height ?? DEFAULT_HEIGHTS[rec.type] ?? 1.5}
                            onChange={e => updateReceptor(rec.id, 'height', e.target.value)}
                            className="w-16 border border-gray-300 rounded px-1.5 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold-400" />
                          <span>m</span>
                        </label>
                      </div>
                    )}

                    {isEditing && (
                      <select value={rec.type} onChange={e => updateReceptor(rec.id, 'type', e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none">
                        {RECEPTOR_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500 space-y-2">
            <div>
              <p className="font-semibold text-gray-600 mb-1">Fixed-wing approach heights (3° slope)</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                {[0, 500, 1000, 1852, 3704].map(d => (
                  <span key={d}>{d === 0 ? 'Threshold' : d >= 1852 ? `${d/1852} NM` : `${d} m`}: <strong>{Math.round(aviationGlideSlopeHeight(d))} m</strong></span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-gray-600 mb-1">Helicopter approach heights (8° slope)</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                {[0, 200, 500, 926, 1852].map(d => (
                  <span key={d}>{d === 0 ? 'Helipad' : d >= 926 ? `${(d/1852).toFixed(1)} NM` : `${d} m`}: <strong>{Math.round(helicopterApproachHeight(d))} m</strong></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Results ────────────────────────────────────────────────────────────────
function ResultsDisplay({ results, onRequestReport }) {
  const overall = RISK_CONFIG[results.overall_risk] || RISK_CONFIG.low;
  return (
    <div className="space-y-8">
      {/* Overall */}
      <div className={`rounded-2xl border-2 p-6 ${overall.border} ${overall.bg}`}>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 text-center sm:text-left">
            <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${overall.text}`}>Screening Result</p>
            <p className={`text-3xl font-heading font-bold ${overall.text}`}>{overall.label}</p>
            <p className={`text-sm mt-1 ${overall.text} opacity-80`}>
              {results.overall_risk === 'low' && 'No significant glare risk detected for the configured panel array.'}
              {results.overall_risk === 'medium' && 'Potential glare at one or more receptors. A full ForgeSolar assessment is recommended.'}
              {results.overall_risk === 'high' && 'High glare risk detected. A full glint & glare assessment is required for planning.'}
            </p>
          </div>
          <div className={`text-6xl font-bold ${overall.text} opacity-30`}>{overall.icon}</div>
        </div>
      </div>

      {/* Receptor table */}
      <div>
        <h3 className="text-lg font-heading font-bold text-forest-900 mb-3">Receptor Screening Results</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-forest-900 text-white">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Receptor</th>
                <th className="text-left px-4 py-3 font-medium">Type</th>
                <th className="text-right px-4 py-3 font-medium">Distance</th>
                <th className="text-right px-4 py-3 font-medium">Annual glare</th>
                <th className="text-right px-4 py-3 font-medium">Max W/m²</th>
                <th className="text-center px-4 py-3 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {results.receptors.map((rec, i) => (
                <tr key={rec.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 font-medium text-gray-800">{rec.name}</td>
                  <td className="px-4 py-3 text-gray-600 capitalize">{rec.type}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{rec.distance_m}m</td>
                  <td className="px-4 py-3 text-right text-gray-600">
                    {rec.annual_glare_minutes > 0 ? `${rec.annual_glare_minutes} min/yr` : 'None'}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600">
                    {rec.max_irradiance_w_m2 > 0 ? rec.max_irradiance_w_m2 : '—'}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <RiskBadge level={rec.risk_level} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Glare windows */}
      {results.receptors.some(r => r.glare_windows?.length > 0) && (
        <div>
          <h3 className="text-lg font-heading font-bold text-forest-900 mb-3">
            <Clock className="inline w-5 h-5 mr-1 text-gold-600" /> Potential Glare Windows
          </h3>
          <div className="space-y-4">
            {results.receptors.filter(r => r.glare_windows?.length > 0).map(rec => (
              <div key={rec.id} className="bg-gray-50 rounded-xl p-4">
                <p className="font-semibold text-forest-900 text-sm mb-2">{rec.name}</p>
                <div className="flex flex-wrap gap-2">
                  {rec.glare_windows.map((w, i) => (
                    <span key={i} className="text-xs bg-white border border-amber-200 text-amber-800 rounded-lg px-3 py-1.5">
                      {w.date} · {w.start_time}–{w.end_time}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="bg-gray-50 rounded-xl p-5">
        <p className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-gray-500" /> Screening Notes
        </p>
        <ul className="space-y-1">
          {results.notes.map((note, i) => (
            <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
              <span className="text-gray-400 mt-0.5">•</span> {note}
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <DisclaimerBox />

      {/* CTA */}
      <div className="bg-forest-950 text-white rounded-2xl p-8 text-center">
        <h3 className="font-heading font-bold text-xl mb-3">Need a Planning-Grade Report?</h3>
        <p className="text-gray-300 text-sm mb-6 max-w-lg mx-auto">
          This preliminary screening indicates {results.overall_risk === 'low' ? 'low risk — but a formal assessment may still be required by your planning authority.' : 'potential glare risk. A full ForgeSolar-based glint & glare assessment is required for your planning application.'}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={onRequestReport}
            className="btn-primary py-3 px-7 flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Full Screening Report
          </button>
          <Link to="/glint-and-glare-assessment-ireland" className="btn-outline-white py-3 px-7">
            Learn About Our Reports
          </Link>
        </div>
      </div>

      {/* Internal links */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Glint & Glare Assessment Ireland', to: '/glint-and-glare-assessment-ireland' },
          { label: 'Glint & Glare Report Ireland', to: '/glint-and-glare-report-ireland' },
          { label: 'Solar Glare Pre-Simulation', to: '/solar-glare-pre-simulation' },
          { label: 'PV Planning Drawings', to: '/solar-pv-planning-drawings-ireland' },
        ].map(({ label, to }) => (
          <Link
            key={to} to={to}
            className="flex items-center justify-between gap-2 p-3 border border-gray-200 rounded-xl hover:border-gold-300 hover:bg-gold-50 transition-colors text-xs font-medium text-forest-900"
          >
            {label}
            <ChevronRight className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Lead Capture Modal ─────────────────────────────────────────────────────
function LeadModal({ location, checkId, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    message: '', project_location: location?.address || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError('Name and email are required.');
      return;
    }
    setLoading(true);
    setError('');

    // Save to Supabase directly from frontend
    try {
      await supabase.from('glare_leads').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        company: form.company || null,
        message: form.message || null,
        project_location: form.project_location || null,
        glare_check_id: checkId || null,
      });
    } catch (_) {
      // Non-fatal
    }

    // Also try backend
    if (API_URL) {
      try {
        await fetch(`${API_URL}/api/lead`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, glare_check_id: checkId }),
        });
      } catch (_) {}
    }

    setLoading(false);
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-1">Almost there</p>
              <h2 className="text-xl font-heading font-bold text-forest-900">Get Your Screening Report</h2>
              <p className="text-sm text-gray-600 mt-1">Enter your details to download the full results PDF.</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none ml-4">×</button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>
          )}

          {[
            { icon: User, key: 'name', label: 'Full name *', placeholder: 'Your name', type: 'text' },
            { icon: Mail, key: 'email', label: 'Email address *', placeholder: 'you@company.com', type: 'email' },
            { icon: Phone, key: 'phone', label: 'Phone / WhatsApp', placeholder: '+353 …', type: 'tel' },
            { icon: Building2, key: 'company', label: 'Company / Organisation', placeholder: 'Company name', type: 'text' },
          ].map(({ icon: Icon, key, label, placeholder, type }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <div className="relative">
                <Icon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type={type} value={form[key]} placeholder={placeholder}
                  onChange={e => set(key, e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text" value={form.project_location} placeholder="Site address or county"
                onChange={e => set('project_location', e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MessageSquare className="inline w-4 h-4 mr-1 text-gray-400" /> Message (optional)
            </label>
            <textarea
              rows={3} value={form.message} placeholder="Tell us about your project…"
              onChange={e => set('message', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full btn-primary py-3 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {loading ? 'Saving…' : 'Download Screening Report'}
          </button>

          <p className="text-xs text-gray-400 text-center">
            We'll also send you a copy by email. No spam — ever.
          </p>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
const DEFAULT_PARAMS = {
  projectType: 'ground-mounted',
  tilt: 15,
  azimuth: 180,
  lowerHeight: 0.5,
  upperHeight: 2.1,
  surfaceType: 'anti-reflective',
};

export default function GlareChecker() {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState(null);
  const [polygon, setPolygon] = useState([]);
  const [params, setParams] = useState(DEFAULT_PARAMS);
  const [receptors, setReceptors] = useState([]);
  const [obstructions, setObstructions] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLead, setShowLead] = useState(false);
  const [leadDone, setLeadDone] = useState(false);

  const canNext = () => {
    if (step === 1) return !!location;
    if (step === 2) return polygon.length >= 3 && receptors.length >= 1;
    if (step === 3) return true;
    return false;
  };

  const runCheck = async () => {
    setLoading(true);
    setError('');
    try {
      if (!API_URL) {
        throw new Error('Backend API URL not configured. Set VITE_GLARE_API_URL in your environment variables.');
      }
      const res = await fetch(`${API_URL}/api/glare-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          polygon,
          project_type: params.projectType,
          tilt: params.tilt,
          azimuth: params.azimuth,
          lower_height: params.lowerHeight,
          upper_height: params.upperHeight,
          surface_type: params.surfaceType,
          receptors: expandReceptors(receptors),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || `Server error ${res.status}`);
      }
      const data = await res.json();
      setResults(data);
      setStep(4);
    } catch (err) {
      setError(err.message || 'Failed to run glare check. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLeadSubmit = (formData) => {
    setShowLead(false);
    setLeadDone(true);
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>Solar Glare Risk Checker Ireland | Free PV Glint &amp; Glare Screening</title>
        <meta
          name="description"
          content="Check whether a solar PV site in Ireland may have potential glint and glare risk using location, panel tilt, orientation and nearby receptors."
        />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Solar Glare Risk Checker Ireland | Free PV Glint & Glare Screening" />
        <meta property="og:description" content="Free preliminary glint and glare screening for solar PV sites in Ireland." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero */}
      <div className="bg-forest-950 text-white py-14 px-4">
        <div className="container-custom max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            <Sun className="w-4 h-4" /> Free Tool
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Free Solar Glare Risk Checker for Ireland
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-3 max-w-2xl mx-auto">
            Preliminary glint and glare screening tool for solar PV planning projects in Ireland.
            Draw your array, add nearby receptors, and get an indicative risk level in minutes.
          </p>
          <p className="text-amber-300 text-xs">
            This tool provides a preliminary screening only. A full glint and glare assessment may be required for planning submission.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className={`container-custom ${step === 2 ? 'max-w-7xl' : 'max-w-5xl'}`}>
          <StepBar current={step} />

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10">
            {step === 1 && (
              <LocationStep location={location} onLocationSelect={setLocation} />
            )}
            {step === 2 && (
              <SiteMapStep
                location={location}
                polygon={polygon} onPolygonChange={setPolygon}
                receptors={receptors} onReceptorsChange={setReceptors}
                obstructions={obstructions} onObstructionsChange={setObstructions}
              />
            )}
            {step === 3 && (
              <ParamsStep params={params} onChange={setParams} />
            )}
            {step === 4 && results && (
              <ResultsDisplay results={results} onRequestReport={() => setShowLead(true)} />
            )}

            {/* Error */}
            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 flex gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Error:</strong> {error}
                  {error.includes('VITE_GLARE_API_URL') && (
                    <p className="mt-1 text-xs">Deploy the FastAPI backend and set <code>VITE_GLARE_API_URL</code> in Vercel environment variables.</p>
                  )}
                </div>
              </div>
            )}

            {/* Nav buttons */}
            {step < 4 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setStep(s => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800 disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>

                {step < 3 ? (
                  <div className="flex flex-col items-end gap-1">
                    {step === 2 && !canNext() && (
                      <p className="text-xs text-amber-600">
                        {polygon.length < 3 ? 'Draw the PV array first.' : 'Add at least one receptor.'}
                      </p>
                    )}
                    <button
                      onClick={() => setStep(s => s + 1)}
                      disabled={!canNext()}
                      className="btn-primary px-7 py-2.5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={runCheck}
                    disabled={loading}
                    className="btn-primary px-7 py-2.5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Calculating…
                      </>
                    ) : (
                      <>
                        <Sun className="w-4 h-4" /> Run Glare Check
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Disclaimer below tool */}
          <div className="mt-6">
            <DisclaimerBox />
          </div>

          {/* Internal links */}
          {step < 5 && (
            <div className="mt-10">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-4 text-center">Need a full planning-grade report?</p>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Glint & Glare Assessment Ireland', to: '/glint-and-glare-assessment-ireland' },
                  { label: 'Glint & Glare Report Ireland', to: '/glint-and-glare-report-ireland' },
                  { label: 'Solar Glare Pre-Simulation', to: '/solar-glare-pre-simulation' },
                  { label: 'PV Planning Drawings Ireland', to: '/solar-pv-planning-drawings-ireland' },
                ].map(({ label, to }) => (
                  <Link
                    key={to} to={to}
                    className="flex items-center justify-between gap-2 p-3 bg-white border border-gray-200 rounded-xl hover:border-gold-300 hover:bg-gold-50 transition-colors text-xs font-medium text-forest-900"
                  >
                    {label}
                    <ChevronRight className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lead modal */}
      {showLead && (
        <LeadModal
          location={location}
          checkId={results?.check_id}
          onClose={() => setShowLead(false)}
          onSubmit={handleLeadSubmit}
        />
      )}
    </>
  );
}
