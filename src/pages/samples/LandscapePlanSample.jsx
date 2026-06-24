import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Printer, ArrowLeft } from 'lucide-react';
import { SITE_URL } from '../../lib/seo';

const PAGE_URL = `${SITE_URL}/samples/landscape-plan`;

export default function LandscapePlanSample() {
  return (
    <>
      <Helmet>
        <title>Sample Landscape Plan — Solar PV Ireland | SolarPlan Ireland</title>
        <meta name="description" content="Sample landscape plan and planting schedule for a ground-mounted solar farm planning application in Ireland, prepared to An Bord Pleanála and county council standards." />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Toolbar */}
      <div className="print:hidden sticky top-0 z-50 bg-forest-950 text-white px-6 py-3 flex items-center justify-between gap-4">
        <Link to="/portfolio" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
        <span className="text-sm text-gray-400">Sample Report — Landscape Plan &amp; Planting Schedule</span>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Printer className="w-4 h-4" /> Print / Save as PDF
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 print:px-0 print:py-0 font-serif text-gray-900">

        {/* Cover */}
        <div className="border-2 border-forest-900 p-10 mb-10 print:border-black">
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Prepared by</p>
              <p className="font-sans font-bold text-forest-900 text-lg">SolarPlan Ireland</p>
              <p className="font-sans text-xs text-gray-500">SVAERO Cadetics LLP · Mumbai, India</p>
              <p className="font-sans text-xs text-gray-500">info@solarplanningireland.com</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Report Reference</p>
              <p className="font-sans font-bold text-forest-900">SPI-LAP-2024-001</p>
              <p className="text-xs text-gray-500 mt-1">SAMPLE DOCUMENT</p>
              <p className="text-xs text-gray-500">Not for planning submission</p>
            </div>
          </div>
          <div className="border-t-2 border-forest-900 pt-8 print:border-black">
            <p className="text-xs uppercase tracking-widest text-gold-600 mb-3 font-sans">Landscape Plan &amp; Planting Schedule</p>
            <h1 className="text-3xl font-sans font-bold text-forest-900 mb-2 leading-tight">
              Landscape Plan — Solar PV Farm
            </h1>
            <h2 className="text-xl font-sans text-gray-600 mb-6">
              Sample Solar Farm, Co. Offaly, Ireland
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: 'Client', value: '[Client Name on File]' },
                { label: 'Project', value: 'Sample 15MW Ground-Mounted Solar Farm' },
                { label: 'Location', value: 'Co. Offaly, Ireland' },
                { label: 'LVIA Reference', value: 'As prepared by [LVIA Consultant]' },
                { label: 'Date', value: 'June 2024' },
                { label: 'Status', value: 'SAMPLE — For Illustration Only' },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-2">
                  <span className="font-sans font-semibold text-gray-500 w-32 flex-shrink-0">{label}:</span>
                  <span className="font-sans text-forest-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 1. Introduction */}
        <section className="mb-10">
          <h2 className="text-xl font-sans font-bold text-forest-900 border-b border-gray-300 pb-2 mb-4">1. Introduction and Scope</h2>
          <p className="text-sm leading-relaxed mb-3">
            This Landscape Plan has been prepared by SolarPlan Ireland in support of a planning application for a proposed 15MW ground-mounted solar PV farm in Co. Offaly. The plan translates the mitigation recommendations of the accompanying Landscape and Visual Impact Assessment (LVIA) into a detailed planting and establishment programme.
          </p>
          <p className="text-sm leading-relaxed mb-3">
            The Landscape Plan comprises: (a) an AutoCAD drawing (SPI-LAP-001) showing all proposed planting areas, species zones, and habitat creation areas at 1:2,500; and (b) this accompanying Planting Schedule and Management Plan specifying species, quantities, sizes, spacing, and establishment care.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="font-sans font-semibold text-green-800 text-sm mb-1">Landscape Design Principles</p>
            <ul className="text-sm text-green-700 font-sans space-y-1 list-disc list-inside">
              <li>All species are native to Ireland (BS 8545 / IPCC guidelines)</li>
              <li>Planting designed to enhance existing hedgerow network connectivity</li>
              <li>Wildflower grassland established under and between panel rows</li>
              <li>Planting phased to provide screening within 3–5 years</li>
            </ul>
          </div>
        </section>

        {/* Landscape Plan SVG mockup */}
        <section className="mb-10">
          <h2 className="text-xl font-sans font-bold text-forest-900 border-b border-gray-300 pb-2 mb-4">Drawing SPI-LAP-001 — Landscape Plan (Illustration)</h2>
          <p className="text-sm text-gray-500 mb-4 font-sans italic">Simplified schematic for illustration. Actual drawing produced in AutoCAD at 1:2,500.</p>
          <div className="border border-gray-300 bg-gray-50 p-2">
            <svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <rect width="800" height="520" fill="#f0f4f0" />
              <rect x="10" y="10" width="780" height="500" fill="none" stroke="#1a3a2a" strokeWidth="2" />

              {/* Site boundary */}
              <polygon points="80,70 720,70 720,430 80,430" fill="#e8f5e9" stroke="#1a3a2a" strokeWidth="1.5" strokeDasharray="6,3" />

              {/* Perimeter hedgerow planting — thick green band */}
              <polygon points="80,70 720,70 720,430 80,430" fill="none" stroke="#2d6a4f" strokeWidth="18" opacity="0.4" />

              {/* Panel rows (grey) */}
              {[100,130,160,190,220,250,280,310,340,370,400].map((y, i) => (
                <rect key={i} x="110" y={y} width="560" height="12" rx="1" fill="#90a4ae" opacity="0.6" />
              ))}

              {/* Wildflower grassland under panels */}
              {[100,130,160,190,220,250,280,310,340,370,400].map((y, i) => (
                <rect key={i} x="110" y={y + 12} width="560" height="16" rx="0" fill="#a5d6a7" opacity="0.5" />
              ))}

              {/* Internal hedgerow (east-west through middle) */}
              <rect x="80" y="248" width="640" height="10" fill="#388e3c" opacity="0.7" />

              {/* Corner tree groups */}
              {[[80,70],[700,70],[80,415],[700,415]].map(([x,y], i) => (
                <circle key={i} cx={x+10} cy={y+10} r="16" fill="#1b5e20" opacity="0.7" />
              ))}

              {/* Pond / habitat area */}
              <ellipse cx="650" cy="360" rx="40" ry="25" fill="#64b5f6" opacity="0.6" stroke="#1565C0" strokeWidth="1" />
              <text x="650" y="364" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fill="#0d47a1">POND</text>

              {/* Labels */}
              <text x="400" y="55" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#1b5e20" fontWeight="bold">Native hedgerow reinforcement (all boundaries)</text>
              <text x="400" y="243" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#1b5e20">Internal native hedgerow with tree whips @ 10m ctrs</text>
              <text x="200" y="285" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#388e3c">Wildflower grassland</text>
              <text x="200" y="297" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#388e3c">under &amp; between rows</text>

              {/* North arrow */}
              <g transform="translate(740,90)">
                <circle cx="0" cy="0" r="18" fill="white" stroke="#333" strokeWidth="1" />
                <polygon points="0,-13 4,4 0,0 -4,4" fill="#1a3a2a" />
                <text x="0" y="24" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#333">N</text>
              </g>

              {/* Legend */}
              <g transform="translate(90,450)">
                <rect x="0" y="0" width="14" height="10" fill="#2d6a4f" opacity="0.4" stroke="#2d6a4f" strokeWidth="8" />
                <text x="20" y="9" fontSize="8" fontFamily="sans-serif" fill="#333">Perimeter hedgerow planting</text>
                <rect x="160" y="0" width="14" height="10" fill="#a5d6a7" opacity="0.8" />
                <text x="178" y="9" fontSize="8" fontFamily="sans-serif" fill="#333">Wildflower grassland</text>
                <rect x="290" y="0" width="14" height="10" fill="#388e3c" opacity="0.7" />
                <text x="308" y="9" fontSize="8" fontFamily="sans-serif" fill="#333">Internal hedgerow</text>
                <circle cx="420" cy="5" r="8" fill="#1b5e20" opacity="0.7" />
                <text x="432" y="9" fontSize="8" fontFamily="sans-serif" fill="#333">Tree groups</text>
                <ellipse cx="510" cy="5" rx="12" ry="7" fill="#64b5f6" opacity="0.6" stroke="#1565C0" strokeWidth="1" />
                <text x="526" y="9" fontSize="8" fontFamily="sans-serif" fill="#333">Pond habitat</text>
              </g>

              {/* Title block */}
              <rect x="10" y="462" width="200" height="46" fill="white" stroke="#1a3a2a" strokeWidth="1" />
              <text x="20" y="476" fontSize="7" fontFamily="sans-serif" fill="#666">SOLARPLAN IRELAND / SVAERO CADETICS LLP</text>
              <text x="20" y="488" fontSize="9" fontFamily="sans-serif" fontWeight="bold" fill="#1a3a2a">LANDSCAPE PLAN</text>
              <text x="20" y="499" fontSize="7" fontFamily="sans-serif" fill="#666">Sample Solar Farm, Co. Offaly</text>
              <text x="20" y="510" fontSize="7" fontFamily="sans-serif" fill="#666">DWG: SPI-LAP-001 | Rev P1 | SAMPLE ONLY</text>
            </svg>
          </div>
        </section>

        {/* Planting Schedule */}
        <section className="mb-10">
          <h2 className="text-xl font-sans font-bold text-forest-900 border-b border-gray-300 pb-2 mb-4">2. Planting Schedule</h2>
          <p className="text-sm leading-relaxed mb-4">All species are native Irish provenance. Sizes and spacing as specified below. Planting to be carried out between October and March.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-sans border border-gray-300">
              <thead>
                <tr className="bg-forest-900 text-white print:bg-gray-800">
                  <th className="p-2 text-left">Ref</th>
                  <th className="p-2 text-left">Species</th>
                  <th className="p-2 text-left">Irish Name</th>
                  <th className="p-2 text-left">Size</th>
                  <th className="p-2 text-left">Spacing</th>
                  <th className="p-2 text-left">Qty</th>
                  <th className="p-2 text-left">Location</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['H1', 'Hawthorn (Crataegus monogyna)', 'Sceach Gheal', '60–90cm whip', '0.45m', '2,800', 'All perimeter hedgerows (primary species, 70%)'],
                  ['H2', 'Blackthorn (Prunus spinosa)', 'Draighneán Donn', '60–90cm whip', '0.45m', '600', 'All perimeter hedgerows (20%)'],
                  ['H3', 'Holly (Ilex aquifolium)', 'Cuileann', '60–90cm whip', '0.9m', '300', 'All perimeter hedgerows (10%)'],
                  ['H4', 'Hazel (Corylus avellana)', 'Coll', '60–90cm whip', '1.0m', '120', 'Internal hedgerow (mixed)'],
                  ['T1', 'Oak (Quercus robur)', 'Dair Ghallda', '1.2m std, 8/10 girth', '10.0m', '40', 'Internal hedgerow, corner groups'],
                  ['T2', 'Ash (Fraxinus excelsior)', 'Fuinseog', '1.2m std, 8/10 girth', '10.0m', '20', 'Corner groups (disease-resistant stock)'],
                  ['T3', 'Rowan (Sorbus aucuparia)', 'Caorthann', '1.2m std, 8/10 girth', '8.0m', '15', 'Corner groups'],
                  ['G1', 'Wildflower grassland mix', 'Native meadow blend', 'Seed @ 4g/m²', 'n/a', '5.2ha', 'Under and between panel rows, buffer zones'],
                  ['G2', 'Scrub willow (Salix spp.)', 'Saileach', '1.5–2.0m whip', '1.5m', '60', 'Pond margins and wet areas'],
                ].map((row, i) => (
                  <tr key={row[0]} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {row.map((cell, j) => (
                      <td key={j} className="p-2 border-b border-gray-200">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Establishment */}
        <section className="mb-10">
          <h2 className="text-xl font-sans font-bold text-forest-900 border-b border-gray-300 pb-2 mb-4">3. Establishment and Management</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { phase: 'Year 1', title: 'Establishment', items: ['Install rabbit guards on all whips', 'Water during dry spells (Apr–Sep)', 'Replace failures before Dec Year 1', 'Cut back competing grass around whips'] },
              { phase: 'Years 2–3', title: 'Early Growth', items: ['Remove rabbit guards once whips exceed 1.2m', 'Side-trim hedgerow at 1.2m to encourage basal thickening', 'Mow wildflower areas once after Aug seed-set', 'Inspect for ash dieback, replace if needed'] },
              { phase: 'Years 4–5', title: 'Establishment Complete', items: ['Hedgerows to form effective screen by Year 5', 'Annual hedgerow management cut (Sept–Feb only)', 'Wildflower areas managed as traditional hay meadow', 'Annual condition report to planning authority if required'] },
            ].map(({ phase, title, items }) => (
              <div key={phase} className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-sans text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">{phase}</p>
                <p className="font-sans font-bold text-forest-900 text-sm mb-3">{title}</p>
                <ul className="space-y-1.5 text-xs text-gray-700 font-sans">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="bg-forest-50 border border-forest-200 rounded-lg p-4 mb-8">
          <p className="font-sans font-semibold text-forest-900 text-sm mb-1">Prepared by</p>
          <p className="font-sans text-sm text-forest-700">SolarPlan Ireland · SVAERO Cadetics LLP</p>
          <p className="font-sans text-xs text-gray-500 mt-1">This is a sample document produced for illustration purposes only. It does not represent any specific planning application or client project.</p>
        </div>

        {/* CTA */}
        <div className="print:hidden mt-8 bg-forest-950 text-white rounded-2xl p-8 text-center">
          <h3 className="font-sans font-bold text-xl mb-3">Need a Landscape Plan for Your Solar Farm?</h3>
          <p className="text-gray-300 text-sm mb-6">We prepare Landscape Plans and Planting Schedules for solar PV planning applications across all 31 Irish counties.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact" className="btn-primary py-3 px-7">Request a Quote</Link>
            <Link to="/landscape-plan-solar-pv-ireland" className="btn-outline-white py-3 px-7">Learn More</Link>
          </div>
        </div>
      </div>
    </>
  );
}
