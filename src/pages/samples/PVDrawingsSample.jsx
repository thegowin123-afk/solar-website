import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Printer, ArrowLeft } from 'lucide-react';
import { SITE_URL } from '../../lib/seo';

const PAGE_URL = `${SITE_URL}/samples/pv-planning-drawings`;

export default function PVDrawingsSample() {
  return (
    <>
      <Helmet>
        <title>Sample Solar PV Planning Drawing Pack | SolarPlan Ireland</title>
        <meta name="description" content="Sample solar PV planning drawing pack for a ground-mounted solar farm planning application in Ireland — site layout, elevations, cross-sections." />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Toolbar */}
      <div className="print:hidden sticky top-0 z-50 bg-forest-950 text-white px-6 py-3 flex items-center justify-between gap-4">
        <Link to="/portfolio" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
        <span className="text-sm text-gray-400">Sample Drawing Pack — Solar PV Planning</span>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Printer className="w-4 h-4" /> Print / Save as PDF
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 print:px-0 print:py-0 font-serif text-gray-900">

        {/* Cover / Title Block */}
        <div className="border-2 border-forest-900 p-10 mb-10 print:border-black">
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Prepared by</p>
              <p className="font-sans font-bold text-forest-900 text-lg">SolarPlan Ireland</p>
              <p className="font-sans text-xs text-gray-500">SVAERO Cadetics LLP · Mumbai, India</p>
              <p className="font-sans text-xs text-gray-500">info@solarplanningireland.com</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Drawing Pack Reference</p>
              <p className="font-sans font-bold text-forest-900">SPI-DRG-2024-001</p>
              <p className="text-xs text-gray-500 mt-1">SAMPLE DOCUMENT</p>
              <p className="text-xs text-gray-500">Not for planning submission</p>
            </div>
          </div>
          <div className="border-t-2 border-forest-900 pt-8 print:border-black">
            <p className="text-xs uppercase tracking-widest text-gold-600 mb-3 font-sans">Planning Drawing Pack</p>
            <h1 className="text-3xl font-sans font-bold text-forest-900 mb-2 leading-tight">
              Solar PV Planning Drawings
            </h1>
            <h2 className="text-xl font-sans text-gray-600 mb-6">
              Sample Solar Farm, Co. Tipperary, Ireland
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: 'Client', value: '[Client Name on File]' },
                { label: 'Project', value: 'Sample 20MW Ground-Mounted Solar Farm' },
                { label: 'Location', value: 'Co. Tipperary, Ireland' },
                { label: 'Planning Authority', value: 'Tipperary County Council' },
                { label: 'Produced in', value: 'AutoCAD 2024 — PDF + DWG' },
                { label: 'Status', value: 'SAMPLE — For Illustration Only' },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-2">
                  <span className="font-sans font-semibold text-gray-500 w-36 flex-shrink-0">{label}:</span>
                  <span className="font-sans text-forest-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drawing Register */}
        <section className="mb-10">
          <h2 className="text-xl font-sans font-bold text-forest-900 border-b border-gray-300 pb-2 mb-4">Drawing Register</h2>
          <p className="text-sm leading-relaxed mb-4">The following drawings form the planning drawing pack for this project. All drawings are produced in AutoCAD and delivered as both PDF (A1 size) and DWG format.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-sans border border-gray-300">
              <thead>
                <tr className="bg-forest-900 text-white print:bg-gray-800">
                  <th className="p-2 text-left">Dwg No.</th>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Scale</th>
                  <th className="p-2 text-left">Sheet Size</th>
                  <th className="p-2 text-left">Rev</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['SPI-001', 'Site Location Plan', '1:10,000', 'A3', 'P1', 'For Planning'],
                  ['SPI-002', 'Existing Site Survey Plan', '1:2,500', 'A1', 'P1', 'For Planning'],
                  ['SPI-003', 'Proposed Site Layout Plan', '1:2,500', 'A1', 'P1', 'For Planning'],
                  ['SPI-004', 'Panel Array Layout — Sheet 1 of 3', '1:500', 'A1', 'P1', 'For Planning'],
                  ['SPI-005', 'Panel Array Layout — Sheet 2 of 3', '1:500', 'A1', 'P1', 'For Planning'],
                  ['SPI-006', 'Panel Array Layout — Sheet 3 of 3', '1:500', 'A1', 'P1', 'For Planning'],
                  ['SPI-007', 'Panel Elevations — Front & Side', '1:50', 'A1', 'P1', 'For Planning'],
                  ['SPI-008', 'Panel Cross-Section A–A through Site', '1:200', 'A1', 'P1', 'For Planning'],
                  ['SPI-009', 'Substation & Inverter Building Elevations', '1:100', 'A1', 'P1', 'For Planning'],
                  ['SPI-010', 'Access Track & Security Fence Details', '1:200', 'A1', 'P1', 'For Planning'],
                ].map((row, i) => (
                  <tr key={row[0]} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {row.map((cell, j) => (
                      <td key={j} className={`p-2 border-b border-gray-200 ${j === 5 ? 'font-semibold text-green-700' : ''}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Site Layout Plan — SVG Mockup */}
        <section className="mb-10">
          <h2 className="text-xl font-sans font-bold text-forest-900 border-b border-gray-300 pb-2 mb-4">Drawing SPI-003 — Proposed Site Layout Plan (Illustration)</h2>
          <p className="text-sm text-gray-500 mb-4 font-sans italic">This is a simplified schematic for illustration purposes. Actual drawings are produced in AutoCAD at 1:2,500 on A1.</p>

          {/* SVG site layout mockup */}
          <div className="border border-gray-300 bg-gray-50 p-2">
            <svg viewBox="0 0 800 560" xmlns="http://www.w3.org/2000/svg" className="w-full">
              {/* Background */}
              <rect width="800" height="560" fill="#f9fafb" />
              {/* Border */}
              <rect x="10" y="10" width="780" height="540" fill="none" stroke="#1a3a2a" strokeWidth="2" />

              {/* Site boundary */}
              <polygon points="80,80 720,80 720,460 80,460" fill="#e8f5e9" stroke="#1a3a2a" strokeWidth="2" strokeDasharray="8,4" />

              {/* Panel rows */}
              {[100,130,160,190,220,250,280,310,340,370,400,430].map((y, i) => (
                <g key={i}>
                  <rect x="100" y={y} width="580" height="14" rx="2" fill="#2d6a4f" opacity="0.8" />
                </g>
              ))}

              {/* Access track */}
              <rect x="80" y="460" width="640" height="20" fill="#d1c4a0" stroke="#8B7355" strokeWidth="1" />
              <rect x="390" y="80" width="20" height="400" fill="#d1c4a0" stroke="#8B7355" strokeWidth="1" />

              {/* Substation */}
              <rect x="660" y="380" width="50" height="40" fill="#4a90d9" stroke="#1565C0" strokeWidth="1.5" />
              <text x="685" y="404" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif">SUB</text>

              {/* Security fence */}
              <rect x="75" y="75" width="650" height="390" fill="none" stroke="#555" strokeWidth="1" strokeDasharray="4,3" />

              {/* North arrow */}
              <g transform="translate(730,100)">
                <circle cx="0" cy="0" r="20" fill="white" stroke="#333" strokeWidth="1" />
                <polygon points="0,-15 5,5 0,0 -5,5" fill="#1a3a2a" />
                <text x="0" y="25" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fill="#333">N</text>
              </g>

              {/* Scale bar */}
              <g transform="translate(100,500)">
                <rect x="0" y="0" width="100" height="6" fill="#333" />
                <rect x="100" y="0" width="100" height="6" fill="white" stroke="#333" strokeWidth="1" />
                <text x="0" y="20" fontSize="9" fontFamily="sans-serif" fill="#333">0</text>
                <text x="95" y="20" fontSize="9" fontFamily="sans-serif" fill="#333">250m</text>
                <text x="195" y="20" fontSize="9" fontFamily="sans-serif" fill="#333">500m</text>
                <text x="50" y="-4" fontSize="8" fontFamily="sans-serif" fill="#333" textAnchor="middle">Scale 1:2,500</text>
              </g>

              {/* Legend */}
              <g transform="translate(470,490)">
                <rect x="0" y="0" width="12" height="10" fill="#2d6a4f" opacity="0.8" />
                <text x="16" y="9" fontSize="9" fontFamily="sans-serif" fill="#333">Solar PV panels</text>
                <rect x="100" y="0" width="12" height="10" fill="#d1c4a0" stroke="#8B7355" strokeWidth="1" />
                <text x="116" y="9" fontSize="9" fontFamily="sans-serif" fill="#333">Access track</text>
                <rect x="200" y="0" width="12" height="10" fill="#4a90d9" stroke="#1565C0" strokeWidth="1.5" />
                <text x="216" y="9" fontSize="9" fontFamily="sans-serif" fill="#333">Substation</text>
              </g>

              {/* Title block */}
              <rect x="10" y="490" width="200" height="60" fill="white" stroke="#1a3a2a" strokeWidth="1" />
              <text x="20" y="505" fontSize="8" fontFamily="sans-serif" fill="#666">SOLARPLAN IRELAND / SVAERO CADETICS LLP</text>
              <text x="20" y="518" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#1a3a2a">PROPOSED SITE LAYOUT PLAN</text>
              <text x="20" y="530" fontSize="8" fontFamily="sans-serif" fill="#666">Sample Solar Farm, Co. Tipperary</text>
              <text x="20" y="543" fontSize="8" fontFamily="sans-serif" fill="#666">DWG: SPI-003 | Rev P1 | SAMPLE ONLY</text>
            </svg>
          </div>
        </section>

        {/* Panel Elevation Mockup */}
        <section className="mb-10">
          <h2 className="text-xl font-sans font-bold text-forest-900 border-b border-gray-300 pb-2 mb-4">Drawing SPI-007 — Panel Elevations (Illustration)</h2>
          <div className="border border-gray-300 bg-gray-50 p-2">
            <svg viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <rect width="800" height="320" fill="#f9fafb" />
              <rect x="10" y="10" width="780" height="300" fill="none" stroke="#1a3a2a" strokeWidth="2" />

              {/* Front elevation */}
              <text x="200" y="35" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" fill="#1a3a2a">FRONT ELEVATION</text>
              {/* Ground line */}
              <line x1="50" y1="240" x2="360" y2="240" stroke="#8B7355" strokeWidth="2" />
              <text x="205" y="258" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#666">Ground Level</text>
              {/* Panel (tilted) */}
              <polygon points="80,140 330,140 330,230 80,230" fill="#2d6a4f" opacity="0.85" stroke="#1a3a2a" strokeWidth="1.5" />
              {/* Grid lines on panel */}
              {[113,146,179,212,245,278,311].map(x => (
                <line key={x} x1={x} y1="140" x2={x} y2="230" stroke="#4a9070" strokeWidth="0.5" />
              ))}
              {[163,186,209].map(y => (
                <line key={y} x1="80" y1={y} x2="330" y2={y} stroke="#4a9070" strokeWidth="0.5" />
              ))}
              {/* Mounting post */}
              <line x1="205" y1="230" x2="205" y2="240" stroke="#555" strokeWidth="3" />
              {/* Dimension arrows */}
              <line x1="340" y1="140" x2="340" y2="240" stroke="#333" strokeWidth="1" markerEnd="url(#arrow)" />
              <text x="355" y="195" fontSize="9" fontFamily="sans-serif" fill="#333">2.1m</text>
              <line x1="80" y1="250" x2="330" y2="250" stroke="#333" strokeWidth="1" />
              <text x="205" y="268" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#333">2.278m (panel width)</text>
              {/* Ground clearance */}
              <line x1="50" y1="230" x2="50" y2="240" stroke="#333" strokeWidth="1" />
              <text x="30" y="236" fontSize="9" fontFamily="sans-serif" fill="#333">0.5m</text>

              {/* Side elevation */}
              <text x="580" y="35" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" fill="#1a3a2a">SIDE ELEVATION (SHOWING TILT)</text>
              <line x1="430" y1="240" x2="730" y2="240" stroke="#8B7355" strokeWidth="2" />
              {/* Tilted panel side view */}
              <polygon points="480,230 620,140 640,155 500,245" fill="#2d6a4f" opacity="0.85" stroke="#1a3a2a" strokeWidth="1.5" />
              {/* Mounting post */}
              <line x1="560" y1="200" x2="560" y2="240" stroke="#555" strokeWidth="3" />
              {/* Tilt angle arc */}
              <path d="M 520,240 A 40,40 0 0,1 548,207" fill="none" stroke="#e65100" strokeWidth="1.5" strokeDasharray="4,2" />
              <text x="510" y="225" fontSize="10" fontFamily="sans-serif" fill="#e65100" fontWeight="bold">15°</text>
              {/* Row spacing */}
              <line x1="480" y1="255" x2="680" y2="255" stroke="#333" strokeWidth="1" />
              <text x="580" y="272" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#333">Row spacing: 6.5m (GCR 0.38)</text>

              {/* Title block */}
              <rect x="10" y="278" width="200" height="30" fill="white" stroke="#1a3a2a" strokeWidth="1" />
              <text x="20" y="291" fontSize="8" fontFamily="sans-serif" fill="#666">SOLARPLAN IRELAND</text>
              <text x="20" y="302" fontSize="9" fontFamily="sans-serif" fontWeight="bold" fill="#1a3a2a">PANEL ELEVATIONS | SPI-007 | SAMPLE</text>
            </svg>
          </div>
        </section>

        {/* Drawing Standards */}
        <section className="mb-10">
          <h2 className="text-xl font-sans font-bold text-forest-900 border-b border-gray-300 pb-2 mb-4">Drawing Standards and Deliverables</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="font-sans font-semibold text-forest-900 mb-3 text-sm">Software & Formats</h3>
              <ul className="space-y-1.5 text-xs text-gray-700 font-sans">
                {['AutoCAD 2024 (DWG format)', 'PDF export at A1 / A3 as required', 'Georeferenced to Irish Transverse Mercator (ITM)', 'OSi basemap underlay included', 'Revision cloud and revision table on all sheets', 'ISO title block with client details'].map(item => (
                  <li key={item} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="font-sans font-semibold text-forest-900 mb-3 text-sm">What Each Drawing Shows</h3>
              <ul className="space-y-1.5 text-xs text-gray-700 font-sans">
                {['Site boundary in red line', 'Panel array layout with row dimensions', 'Security fence and gate positions', 'Access tracks and turning areas', 'Substation, inverter and battery positions', 'CCTV mast locations', 'Proposed and existing contours', 'Landscape planting zones (cross-ref to SPI-LAP)'].map(item => (
                  <li key={item} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <div className="bg-forest-50 border border-forest-200 rounded-lg p-4 mb-8">
          <p className="font-sans font-semibold text-forest-900 text-sm mb-1">Prepared by</p>
          <p className="font-sans text-sm text-forest-700">SolarPlan Ireland · SVAERO Cadetics LLP</p>
          <p className="font-sans text-xs text-gray-500 mt-1">This is a sample drawing pack produced for illustration purposes only. Schematic drawings are not to scale and do not represent any specific planning application or client project.</p>
        </div>

        {/* CTA */}
        <div className="print:hidden mt-8 bg-forest-950 text-white rounded-2xl p-8 text-center">
          <h3 className="font-sans font-bold text-xl mb-3">Need a Planning Drawing Pack?</h3>
          <p className="text-gray-300 text-sm mb-6">We prepare AutoCAD planning drawing packs for solar PV applications across all 31 Irish counties.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact" className="btn-primary py-3 px-7">Request a Quote</Link>
            <Link to="/solar-pv-planning-drawings-ireland" className="btn-outline-white py-3 px-7">Learn More</Link>
          </div>
        </div>
      </div>
    </>
  );
}
