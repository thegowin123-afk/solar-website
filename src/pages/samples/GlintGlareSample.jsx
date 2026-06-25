import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Printer, ArrowLeft, Download } from 'lucide-react';
import { SITE_URL } from '../../lib/seo';

const PAGE_URL = `${SITE_URL}/samples/glint-and-glare-report`;

export default function GlintGlareSample() {
  return (
    <>
      <Helmet>
        <title>Sample Glint and Glare Report | SolarPlan Ireland</title>
        <meta name="description" content="Download and view a real sample glint and glare assessment report produced by SolarPlan Ireland for a ground-mounted solar PV planning application, using ForgeSolar methodology." />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Toolbar — hidden on print */}
      <div className="print:hidden sticky top-0 z-50 bg-forest-950 text-white px-6 py-3 flex items-center justify-between gap-4">
        <Link to="/portfolio" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
        <span className="text-sm text-gray-400">Sample Report — Glint &amp; Glare Assessment</span>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Printer className="w-4 h-4" /> Print / Save as PDF
        </button>
      </div>

      {/* SR-only H1 for SEO — hidden visually and on print */}
      <h1 className="sr-only print:hidden">Sample Glint and Glare Assessment Report — SolarPlan Ireland</h1>

      {/* Report document */}
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
              <p className="font-sans font-bold text-forest-900">SPI-GGA-2024-001</p>
              <p className="text-xs text-gray-500 mt-1">SAMPLE DOCUMENT</p>
              <p className="text-xs text-gray-500">Not for planning submission</p>
            </div>
          </div>

          <div className="border-t-2 border-forest-900 pt-8 print:border-black">
            <p className="text-xs uppercase tracking-widest text-gold-600 mb-3 font-sans">Technical Report</p>
            <h1 className="text-3xl font-sans font-bold text-forest-900 mb-2 leading-tight">
              Glint and Glare Assessment
            </h1>
            <h2 className="text-xl font-sans text-gray-600 mb-6">
              Sample Solar Farm, Co. Kildare, Ireland
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: 'Client', value: '[Client Name on File]' },
                { label: 'Project', value: 'Sample 10MW Ground-Mounted Solar Farm' },
                { label: 'Location', value: 'Co. Kildare, Ireland' },
                { label: 'Date', value: 'June 2024' },
                { label: 'Methodology', value: 'ForgeSolar v3.x Reflectance Modelling' },
                { label: 'Status', value: 'SAMPLE — For Illustration Only' },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-2">
                  <span className="font-sans font-semibold text-gray-500 w-28 flex-shrink-0">{label}:</span>
                  <span className="font-sans text-forest-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 1. Executive Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-sans font-bold text-forest-900 border-b border-gray-300 pb-2 mb-4">1. Executive Summary</h2>
          <p className="text-sm leading-relaxed mb-3">
            This report presents the results of a glint and glare assessment for a proposed 10MW ground-mounted solar photovoltaic (PV) farm in Co. Kildare, Ireland. The assessment was carried out using ForgeSolar reflectance modelling software to evaluate the potential for solar panel reflections to cause problematic glare at nearby sensitive receptors.
          </p>
          <p className="text-sm leading-relaxed mb-3">
            The study area encompasses a 2km radius from the proposed site boundary. Sensitive receptors identified within the study area include three public roads, eight residential properties, one railway corridor, and one aviation receptor (a private airstrip located 1.8km to the north-east).
          </p>
          <p className="text-sm leading-relaxed mb-4">
            Modelling results indicate that <strong>green glare</strong> is predicted at two road receptors during early morning periods in summer months. <strong>No yellow glare</strong> is predicted at any receptor under the proposed panel configuration (15° tilt, south-facing at 180° azimuth). No mitigation measures are required under the proposed design.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="font-sans font-semibold text-green-800 text-sm mb-1">Assessment Conclusion</p>
            <p className="font-sans text-sm text-green-700">The proposed solar PV development is not predicted to cause unacceptable glint and glare impacts at any identified sensitive receptor. The development is considered acceptable in glare terms and no mitigation measures are required.</p>
          </div>
        </section>

        {/* 2. Site Description */}
        <section className="mb-10">
          <h2 className="text-xl font-sans font-bold text-forest-900 border-b border-gray-300 pb-2 mb-4">2. Site Description</h2>
          <p className="text-sm leading-relaxed mb-3">
            The proposed site comprises approximately 20 hectares of agricultural land in Co. Kildare. The site is broadly flat with a gentle southerly slope of approximately 1:100. It is bounded by hedgerow to the north and east, and a minor public road (L-road) to the south.
          </p>
          <p className="text-sm leading-relaxed mb-3">
            The proposed solar farm comprises approximately 28,000 monocrystalline bifacial PV panels arranged in east-west rows across the site. Panels are mounted on ground-screwed single-axis trackers fixed at 15° tilt, oriented due south at 180° azimuth. Panel height above ground level ranges from 0.5m (lowest point) to 2.1m (highest point of panel).
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
            <p className="font-sans font-semibold text-gray-700 text-sm mb-2">Proposed Development Parameters</p>
            <div className="grid grid-cols-2 gap-2 text-xs font-sans">
              {[
                ['Capacity', '10 MWp'],
                ['Panel type', 'Monocrystalline bifacial, 400W'],
                ['Panel tilt', '15° fixed'],
                ['Panel azimuth', '180° (due south)'],
                ['Panel height (lowest)', '0.5m above ground'],
                ['Panel height (highest)', '2.1m above ground'],
                ['Row spacing', '6.5m (GCR 0.38)'],
                ['Array dimensions', 'Approx. 900m × 220m'],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="text-gray-500 w-40 flex-shrink-0">{k}:</span>
                  <span className="font-semibold text-gray-800">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Methodology */}
        <section className="mb-10">
          <h2 className="text-xl font-sans font-bold text-forest-900 border-b border-gray-300 pb-2 mb-4">3. Methodology</h2>
          <p className="text-sm leading-relaxed mb-3">
            Glint and glare modelling was carried out using <strong>ForgeSolar</strong> reflectance modelling software. ForgeSolar calculates, for every hour of the year, the angle at which sunlight reflects from the PV panel surface and whether that reflection vector intersects with any identified receptor location.
          </p>
          <p className="text-sm leading-relaxed mb-3">
            Modelling is conducted under worst-case clear-sky conditions, which maximises the predicted number of glare hours. Real-world glare occurrence will be less frequent due to cloud cover. The following inputs were used:
          </p>
          <ul className="text-sm space-y-1 mb-4 list-disc list-inside text-gray-700">
            <li>Ordnance Survey Ireland (OSi) site coordinates (ITM)</li>
            <li>Panel tilt: 15°, azimuth: 180°</li>
            <li>Panel surface reflectivity: 4% (anti-reflective glass, conservative estimate)</li>
            <li>Solar irradiance dataset: PVGIS TMY for Co. Kildare</li>
            <li>Receptor coordinates sourced from OSi mapping and site visit</li>
          </ul>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-sans font-semibold text-gray-700 text-sm mb-2">Glare Classification</p>
            <div className="space-y-2 text-xs font-sans">
              <div className="flex gap-3 items-start">
                <span className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0 mt-0.5" />
                <div><strong>Green glare:</strong> Solar irradiance of reflected beam ≤ 10,000 W/m². Low impact, not considered to cause significant discomfort. Generally acceptable without mitigation.</div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="w-4 h-4 rounded-full bg-yellow-400 flex-shrink-0 mt-0.5" />
                <div><strong>Yellow glare:</strong> Solar irradiance of reflected beam &gt; 10,000 W/m². Higher intensity reflection. Mitigation measures may be required depending on receptor type and duration.</div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Receptor Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-sans font-bold text-forest-900 border-b border-gray-300 pb-2 mb-4">4. Receptor Identification and Assessment</h2>
          <p className="text-sm leading-relaxed mb-4">
            The following sensitive receptors were identified within a 2km study area:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-sans border border-gray-300">
              <thead>
                <tr className="bg-forest-900 text-white print:bg-gray-800">
                  <th className="p-2 text-left">Ref</th>
                  <th className="p-2 text-left">Receptor Type</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Distance</th>
                  <th className="p-2 text-left">Max Glare</th>
                  <th className="p-2 text-left">Duration</th>
                  <th className="p-2 text-left">Conclusion</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['R1', 'Road', 'L-road, southern boundary', '0m (adjacent)', 'Green', '22 hrs/yr', 'Acceptable'],
                  ['R2', 'Road', 'R-road, 350m east', '350m', 'Green', '8 hrs/yr', 'Acceptable'],
                  ['R3', 'Road', 'N-road, 850m south', '850m', 'None', '0 hrs/yr', 'Acceptable'],
                  ['R4', 'Residential', 'Dwelling, 120m north', '120m', 'None', '0 hrs/yr', 'Acceptable'],
                  ['R5', 'Residential', 'Dwelling, 280m east', '280m', 'None', '0 hrs/yr', 'Acceptable'],
                  ['R6', 'Residential', 'Dwelling cluster, 500m NW', '500m', 'None', '0 hrs/yr', 'Acceptable'],
                  ['R7', 'Railway', 'Intercity rail, 600m west', '600m', 'None', '0 hrs/yr', 'Acceptable'],
                  ['R8', 'Aviation', 'Private airstrip, 1.8km NE', '1,800m', 'None', '0 hrs/yr', 'Acceptable'],
                ].map((row, i) => (
                  <tr key={row[0]} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {row.map((cell, j) => (
                      <td key={j} className={`p-2 border-b border-gray-200 ${j === 6 ? 'font-semibold text-green-700' : ''}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Conclusion */}
        <section className="mb-10">
          <h2 className="text-xl font-sans font-bold text-forest-900 border-b border-gray-300 pb-2 mb-4">5. Conclusion and Mitigation</h2>
          <p className="text-sm leading-relaxed mb-3">
            ForgeSolar modelling demonstrates that the proposed solar PV development will not cause unacceptable glint and glare impacts at any identified sensitive receptor. Green glare is predicted at two road receptors (R1 and R2) for a limited number of hours per year in early morning periods. This level of glare is considered to be of low significance and does not require mitigation.
          </p>
          <p className="text-sm leading-relaxed mb-3">
            No yellow glare is predicted at any receptor under the proposed panel configuration. The use of anti-reflective coated glass panels (reflectivity ≤ 4%) and the 15° panel tilt angle towards the south means that reflected beams are directed predominantly upward and away from ground-level receptors.
          </p>
          <p className="text-sm leading-relaxed mb-4">
            This assessment concludes that the proposed development is acceptable in glint and glare terms and that no additional mitigation measures are required.
          </p>
          <div className="bg-forest-50 border border-forest-200 rounded-lg p-4">
            <p className="font-sans font-semibold text-forest-900 text-sm mb-1">Prepared by</p>
            <p className="font-sans text-sm text-forest-700">SolarPlan Ireland · SVAERO Cadetics LLP</p>
            <p className="font-sans text-xs text-gray-500 mt-1">This is a sample document produced for illustration purposes only. It does not represent any specific planning application or client project.</p>
          </div>
        </section>

        {/* CTA — hidden on print */}
        <div className="print:hidden mt-12 bg-forest-950 text-white rounded-2xl p-8 text-center">
          <h3 className="font-sans font-bold text-xl mb-3">Need a Glint &amp; Glare Report for Your Project?</h3>
          <p className="text-gray-300 text-sm mb-6">We prepare ForgeSolar-based glint and glare assessments for solar PV planning applications across Ireland.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact" className="btn-primary py-3 px-7">Request a Quote</Link>
            <Link to="/glint-and-glare-assessment-ireland" className="btn-outline-white py-3 px-7">Learn More</Link>
          </div>
        </div>
      </div>
    </>
  );
}
