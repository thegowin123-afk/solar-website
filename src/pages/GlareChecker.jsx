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
  { id: 2, label: 'Draw Array' },
  { id: 3, label: 'Parameters' },
  { id: 4, label: 'Receptors' },
  { id: 5, label: 'Results' },
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

// ─── Step 2: Draw Array ─────────────────────────────────────────────────────
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
const DEFAULT_HEIGHTS = { road: 1.2, residential: 1.5, railway: 1.8, aviation: 100, atct: 10, other: 1.5 };

// ─── Step 4: Receptors ──────────────────────────────────────────────────────
function ReceptorsStep({ location, polygon, receptors, onReceptorsChange }) {
  const mapDivRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const clickListenerRef = useRef(null);
  const [addingType, setAddingType] = useState('road');
  const [placingOnMap, setPlacingOnMap] = useState(false);
  const [autoDetecting, setAutoDetecting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Centre of polygon for search
  const centre = polygon?.length
    ? { lat: polygon.reduce((s, p) => s + p.lat, 0) / polygon.length, lng: polygon.reduce((s, p) => s + p.lng, 0) / polygon.length }
    : location;

  useEffect(() => {
    if (!location || !mapDivRef.current || mapRef.current) return;
    loadGoogleMaps().then((google) => {
      const bounds = new google.maps.LatLngBounds();
      if (polygon?.length) polygon.forEach(p => bounds.extend(p));
      else bounds.extend(location);
      const map = new google.maps.Map(mapDivRef.current, { mapTypeId: 'hybrid', tilt: 0 });
      map.fitBounds(bounds, 100);
      mapRef.current = map;
      if (polygon?.length >= 3) {
        new google.maps.Polygon({ paths: polygon, fillColor: '#2d6a4f', fillOpacity: 0.35, strokeColor: '#2d6a4f', strokeWeight: 2, map });
      }
      renderMarkers(google, map, receptors);
    });
  }, [location, polygon]);

  const renderMarkers = (google, map, recs) => {
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];
    recs.forEach(rec => {
      const typeConf = RECEPTOR_TYPES.find(t => t.value === rec.type);
      const m = new google.maps.Marker({
        position: { lat: rec.lat, lng: rec.lng }, map, title: rec.name,
        icon: { path: google.maps.SymbolPath.CIRCLE, scale: 9, fillColor: typeConf?.color || '#6b7280', fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 },
        label: { text: rec.type[0].toUpperCase(), color: '#fff', fontSize: '10px', fontWeight: 'bold' },
      });
      markersRef.current.push(m);
    });
  };

  useEffect(() => {
    if (mapRef.current && window.google) renderMarkers(window.google, mapRef.current, receptors);
  }, [receptors]);

  const startPlacing = () => {
    const map = mapRef.current; if (!map || !window.google) return;
    if (clickListenerRef.current) window.google.maps.event.removeListener(clickListenerRef.current);
    map.setOptions({ draggableCursor: 'crosshair' });
    setPlacingOnMap(true);
    clickListenerRef.current = window.google.maps.event.addListener(map, 'click', (e) => {
      const typeConf = RECEPTOR_TYPES.find(t => t.value === addingType);
      const newRec = {
        id: `rec-${Date.now()}`, type: addingType,
        name: `${typeConf?.label} ${receptors.length + 1}`,
        lat: e.latLng.lat(), lng: e.latLng.lng(),
        height: DEFAULT_HEIGHTS[addingType] ?? 1.5,
      };
      onReceptorsChange([...receptors, newRec]);
      window.google.maps.event.removeListener(clickListenerRef.current);
      map.setOptions({ draggableCursor: null });
      setPlacingOnMap(false);
    });
  };

  const autoDetect = async () => {
    if (!window.google || !mapRef.current) return;
    setAutoDetecting(true);
    const google = window.google;
    const service = new google.maps.places.PlacesService(mapRef.current);
    const searchRadius = 500;

    const searches = [
      { keyword: 'road', type: 'road' },
      { keyword: 'residential house', type: 'residential' },
      { keyword: 'airport', type: 'aviation' },
      { keyword: 'railway station', type: 'railway' },
    ];

    const found = [];
    await Promise.all(searches.map(s => new Promise(resolve => {
      service.nearbySearch({ location: centre, radius: searchRadius, keyword: s.keyword }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results?.length) {
          const top = results.slice(0, s.type === 'aviation' ? 2 : 1);
          top.forEach(r => {
            const typeConf = RECEPTOR_TYPES.find(t => t.value === s.type);
            found.push({
              id: `rec-${Date.now()}-${Math.random()}`, type: s.type,
              name: r.name || typeConf?.label,
              lat: r.geometry.location.lat(), lng: r.geometry.location.lng(),
              height: DEFAULT_HEIGHTS[s.type] ?? 1.5,
            });
          });
        }
        resolve();
      });
    })));

    // Deduplicate by type keeping first
    const seen = new Set(receptors.map(r => r.type));
    const newRecs = found.filter(r => !seen.has(r.type));
    onReceptorsChange([...receptors, ...newRecs]);
    setAutoDetecting(false);
  };

  const updateReceptor = (id, field, value) => {
    onReceptorsChange(receptors.map(r => r.id === id ? { ...r, [field]: field === 'height' ? parseFloat(value) || 0 : value } : r));
  };

  const removeReceptor = (id) => {
    onReceptorsChange(receptors.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-heading font-bold text-forest-900 mb-1">Add Receptors</h2>
        <p className="text-sm text-gray-600">Add nearby sensitive receptors — roads, residential buildings, airports, railways. Set the eye/sensor height for each.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-4">
        {/* Map */}
        <div>
          <div ref={mapDivRef} className="w-full rounded-xl overflow-hidden border border-gray-200" style={{ height: '380px' }} />
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={autoDetect}
              disabled={autoDetecting}
              className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg border bg-gold-500 text-white border-gold-500 hover:bg-gold-600 transition-colors disabled:opacity-60"
            >
              {autoDetecting ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Sun className="w-4 h-4" />}
              {autoDetecting ? 'Detecting…' : 'Auto-detect nearby'}
            </button>
            <div className="flex items-center gap-2">
              <select value={addingType} onChange={e => setAddingType(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-400">
                {RECEPTOR_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <button onClick={startPlacing} disabled={placingOnMap}
                className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg border transition-colors ${placingOnMap ? 'bg-forest-900 text-white border-forest-900' : 'bg-white text-forest-900 border-forest-300 hover:bg-forest-50'}`}>
                <MapPin className="w-4 h-4" />{placingOnMap ? 'Click map…' : 'Place on map'}
              </button>
            </div>
          </div>
          {placingOnMap && (
            <p className="text-xs text-forest-700 mt-2 bg-forest-50 border border-forest-200 rounded-lg px-3 py-2">
              Click on the map to place a <strong>{RECEPTOR_TYPES.find(t => t.value === addingType)?.label}</strong> receptor.
            </p>
          )}
        </div>

        {/* Receptor list */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-gray-700">Receptors ({receptors.length})</p>
          {receptors.length === 0 ? (
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400 text-sm">
              No receptors yet. Click <strong>Auto-detect</strong> or place manually.
            </div>
          ) : (
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {receptors.map(rec => {
                const typeConf = RECEPTOR_TYPES.find(t => t.value === rec.type);
                const isEditing = editingId === rec.id;
                return (
                  <div key={rec.id} className="bg-white border border-gray-200 rounded-xl p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: typeConf?.color || '#6b7280' }}>
                        {rec.type[0].toUpperCase()}
                      </span>
                      {isEditing ? (
                        <input value={rec.name} onChange={e => updateReceptor(rec.id, 'name', e.target.value)}
                          className="flex-1 text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gold-400" />
                      ) : (
                        <p className="flex-1 text-sm font-medium text-gray-800 truncate">{rec.name}</p>
                      )}
                      <button onClick={() => setEditingId(isEditing ? null : rec.id)} className="text-gray-400 hover:text-gray-600 text-xs px-1">
                        {isEditing ? 'Done' : 'Edit'}
                      </button>
                      <button onClick={() => removeReceptor(rec.id)} className="text-gray-300 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{rec.lat.toFixed(4)}, {rec.lng.toFixed(4)}</span>
                      <label className="flex items-center gap-1 ml-auto">
                        <span className="text-gray-600 font-medium">Eye height:</span>
                        <input type="number" min="0" step="0.1" value={rec.height ?? DEFAULT_HEIGHTS[rec.type] ?? 1.5}
                          onChange={e => updateReceptor(rec.id, 'height', e.target.value)}
                          className="w-16 border border-gray-300 rounded px-1.5 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold-400" />
                        <span>m</span>
                      </label>
                    </div>
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
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs font-semibold text-gray-600 mb-2">Default eye heights</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {RECEPTOR_TYPES.map(t => (
                <div key={t.value} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
                  {t.label}: {DEFAULT_HEIGHTS[t.value]}m
                </div>
              ))}
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
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLead, setShowLead] = useState(false);
  const [leadDone, setLeadDone] = useState(false);

  const canNext = () => {
    if (step === 1) return !!location;
    if (step === 2) return polygon.length >= 3;
    if (step === 3) return true;
    if (step === 4) return receptors.length >= 1;
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
          receptors,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || `Server error ${res.status}`);
      }
      const data = await res.json();
      setResults(data);
      setStep(5);
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
        <div className="container-custom max-w-5xl">
          <StepBar current={step} />

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10">
            {step === 1 && (
              <LocationStep location={location} onLocationSelect={setLocation} />
            )}
            {step === 2 && (
              <DrawingStep location={location} polygon={polygon} onPolygonChange={setPolygon} />
            )}
            {step === 3 && (
              <ParamsStep params={params} onChange={setParams} />
            )}
            {step === 4 && (
              <ReceptorsStep
                location={location} polygon={polygon}
                receptors={receptors} onReceptorsChange={setReceptors}
              />
            )}
            {step === 5 && results && (
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
            {step < 5 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setStep(s => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800 disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>

                {step < 4 ? (
                  <button
                    onClick={() => setStep(s => s + 1)}
                    disabled={!canNext()}
                    className="btn-primary px-7 py-2.5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={runCheck}
                    disabled={loading || !canNext()}
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
