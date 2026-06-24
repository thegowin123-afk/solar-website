import { Sun, Eye, FileText, Layout, TreePine, Home } from 'lucide-react';

export const services = [
  {
    id: 'glint-glare',
    slug: 'glint-glare-analysis',
    title: 'Glint & Glare Analysis',
    shortTitle: 'Glint & Glare',
    tagline: 'Protect neighbours, protect your planning application',
    description:
      'Our specialist glint and glare assessments identify and mitigate potential reflectance impacts from solar panels on surrounding properties, roads, and aviation routes — a critical requirement for Irish planning authorities.',
    longDescription: `Glint and glare from solar PV panels is one of the most commonly raised objections in Irish solar planning applications. Our expert analysis uses ForgeSolar — the industry-standard software for reflectance modelling — to predict, quantify, and mitigate reflective impacts before your application is submitted.

We assess impacts on:
- Residential receptors (neighbouring properties within 500m and beyond)
- Road users and transport corridors (national and regional roads)
- Aviation (IAA requirements for airports, aerodromes, and instrument flight paths)
- Rail corridors and sensitive transport infrastructure
- National Parks and Areas of Outstanding Natural Beauty

Our reports are written to satisfy An Bord Pleanála, local authority planners, and third-party technical reviewers. We present glare results using the ForgeSolar green/yellow classification system and include mitigation recommendations wherever glare risk is identified.

Why submit a glint and glare report proactively? Irish planning authorities routinely request glint and glare assessments as Further Information (FI) when applications are submitted without one. An FI request typically adds 4–8 weeks to your determination timeline. Submitting proactively eliminates this delay and demonstrates thorough technical preparation to the planning authority.`,
    suitableFor: [
      'Ground-mounted solar farms (any size)',
      'Commercial rooftop PV near roads or dwellings',
      'Sites near airports, aerodromes or flight paths',
      'Sites near rail or national road corridors',
      'Projects where neighbours or objectors may raise reflectance concerns',
      'An Bord Pleanála Strategic Infrastructure Development applications',
    ],
    whyItMatters: 'Glint and glare is the most frequently raised technical objection in Irish solar planning. A professional ForgeSolar assessment submitted with your initial application prevents delays, addresses planner and public concerns head-on, and gives your application the best chance of approval at first determination.',
    processSteps: [
      { title: 'Information Request', description: 'We request site layout drawings (DWG/PDF), panel specifications, and receptor coordinates.' },
      { title: 'ForgeSolar Modelling', description: 'We run site-specific glare modelling using ForgeSolar, inputting panel geometry, tilt, azimuth and all identified receptors.' },
      { title: 'Receptor Assessment', description: 'Green and yellow glare results are assessed at each receptor. Mitigation measures are identified where needed.' },
      { title: 'Report Preparation', description: 'We prepare a planning-standard report with maps, methodology, results tables, and conclusions suitable for direct submission.' },
      { title: 'Delivery & Support', description: 'Final PDF report delivered within agreed timeframe. We support any technical queries from the planning authority.' },
    ],
    faqs: [
      {
        question: 'When is a glint and glare assessment required in Ireland?',
        answer: 'It is required for ground-mounted solar farms near roads, dwellings, or aviation routes, and for commercial rooftop PV in sensitive locations. Many planning authorities also request it for sites near rail corridors. Submitting proactively is strongly recommended — a reactive submission after an FI request adds weeks to your timeline.',
      },
      {
        question: 'What is ForgeSolar and why do you use it?',
        answer: 'ForgeSolar is specialist solar glare modelling software used widely in Ireland and the UK. It analyses panel tilt, azimuth, array geometry, and receptor locations to predict glare occurrence under worst-case clear-sky conditions. Irish planning authorities and An Bord Pleanála accept ForgeSolar methodology.',
      },
      {
        question: 'What are green and yellow glare results?',
        answer: 'ForgeSolar classifies glare as green (low impact, generally acceptable) or yellow (higher intensity, may require mitigation). Where yellow glare is identified at sensitive receptors such as road users or dwellings, we include practical mitigation recommendations such as adjusted panel tilt, anti-reflective coatings, or perimeter screening.',
      },
      {
        question: 'Can the assessment be done before the layout is finalised?',
        answer: 'Yes — and we recommend it. Our glare pre-simulation service lets you test different panel configurations at early feasibility stage, identifying high-risk layouts before you commit to planning drawings. This is a low-cost way to de-risk your application.',
      },
      {
        question: 'How long does a glint and glare assessment take?',
        answer: 'Standard turnaround is 2–4 weeks from receipt of complete site information. Expedited delivery in 7–10 working days is available for urgent planning deadlines — contact us to discuss your programme.',
      },
    ],
    icon: 'Eye',
    color: 'gold',
    heroImage: '/images/glint-glare-hero.jpg',
    features: [
      'Zone of Theoretical Visibility (ZTV) mapping',
      'Ray-tracing reflectance modelling',
      'Aviation impact assessment (IAA-compliant)',
      'Residential receptor analysis',
      'Mitigation measures & anti-reflective coating guidance',
      'Expert witness support',
    ],
    deliverables: [
      'Glint & Glare Assessment Report (PDF)',
      'ZTV mapping figures',
      'GIS data files',
      'Planning authority submission pack',
    ],
    timeframe: '2–4 weeks',
    seoTitle: 'Glint & Glare Analysis Ireland | Solar Planning Reports',
    seoDescription:
      'Professional glint and glare assessment reports for solar farm planning applications in Ireland. IAA-compliant, accepted by An Bord Pleanála.',
  },
  {
    id: 'planning-drawings',
    slug: 'pv-planning-drawings',
    title: 'PV Planning Drawings',
    shortTitle: 'Planning Drawings',
    tagline: 'Accurate drawings that satisfy planners first time',
    description:
      'Professionally prepared planning drawings for solar PV systems — from small domestic installations to utility-scale solar farms. We produce all required site layout, elevation, and section drawings to Irish planning standards.',
    longDescription: `Poorly prepared drawings are the number-one reason for requests for further information (RFIs) from planning authorities — delaying your project and adding cost. Our team prepares complete drawing packages to planning authority standards, including all required site layout plans, elevations, cross-sections, and photomontages.

We work with developers at every scale: from single-house rooftop systems to 100MW+ ground-mounted solar farms. All drawings are produced in AutoCAD and supplied in both PDF and DWG formats.

A complete planning drawing package removes ambiguity for the planning authority and reduces the likelihood of RFIs. We include revision rounds as standard and respond quickly to any queries raised during the planning process.`,
    suitableFor: [
      'Ground-mounted solar farm planning applications',
      'Commercial and industrial rooftop solar',
      'Agri-voltaic and dual land-use projects',
      'Strategic Infrastructure Development (SID) applications to An Bord Pleanála',
      'Planning consultants and developers needing a reliable drawing subcontractor',
      'EPC contractors requiring planning-ready AutoCAD packages',
    ],
    whyItMatters: 'Planners need to understand exactly what is being proposed. Incomplete or inaccurate drawings are the leading cause of Further Information requests in solar applications. A complete, accurate drawing set — prepared to the specific standards of the receiving authority — gives your application the best possible start.',
    processSteps: [
      { title: 'Site Information', description: 'We receive your site boundary, OS maps, proposed layout, and any existing surveys.' },
      { title: 'AutoCAD Drafting', description: 'Our team prepares all drawings in AutoCAD to the scales required by the planning authority.' },
      { title: 'Quality Check', description: 'Drawings are checked against current Irish planning standards and the specific requirements of the local authority.' },
      { title: 'Draft Issue', description: 'Draft drawings issued for your review and approval. Revisions included.' },
      { title: 'Final Delivery', description: 'Final PDF and DWG files delivered, ready for planning submission.' },
    ],
    faqs: [
      {
        question: 'What drawings are required for a solar farm planning application in Ireland?',
        answer: 'A typical solar farm application requires: site location map (1:10,500 or OS Discovery), site layout plan (1:500 to 1:2500), panel elevation drawings, cross-sections through the site, and photomontages from agreed viewpoints. Some authorities also require electrical single-line diagrams and construction layout plans.',
      },
      {
        question: 'Do you produce drawings for both AutoCAD and PDF formats?',
        answer: 'Yes. All drawings are produced natively in AutoCAD and delivered as both DWG (editable) and PDF (for submission). DWG files can be used by your structural or ecological consultants for overlay purposes.',
      },
      {
        question: 'How many revision rounds are included?',
        answer: 'We include two revision rounds in our standard fee. Additional revisions are charged at a modest hourly rate. In practice, most projects are resolved within one or two rounds.',
      },
      {
        question: 'Can you work from an existing layout from our client?',
        answer: 'Yes — we regularly work from concept layouts provided by clients or their energy consultants and convert these into planning-standard drawing packages. Send us what you have and we will advise on what is needed to bring it to planning standard.',
      },
    ],
    icon: 'FileText',
    color: 'forest',
    heroImage: '/images/planning-drawings-hero.jpg',
    features: [
      'Site layout plans (1:500, 1:1000, 1:2500)',
      'Panel elevation and section drawings',
      'Electrical single-line diagrams',
      'Photomontage visualisations',
      'AutoCAD DWG + PDF delivery',
      'Revision service included',
    ],
    deliverables: [
      'Full planning drawing package (PDF + DWG)',
      'Location and site layout plans',
      'Elevations and cross-sections',
      'Photomontage (optional add-on)',
    ],
    timeframe: '1–3 weeks',
    seoTitle: 'Solar PV Planning Drawings Ireland | AutoCAD Solar Plans',
    seoDescription:
      'Professional PV planning drawings for solar farm and rooftop planning applications in Ireland. AutoCAD produced, planning-ready.',
  },
  {
    id: 'ground-mounted',
    slug: 'ground-mounted-solar-design',
    title: 'Ground-Mounted Solar Design',
    shortTitle: 'Ground-Mounted',
    tagline: 'Field-to-grid solar farm design for Irish conditions',
    description:
      'End-to-end design services for ground-mounted solar farms across Ireland, from initial feasibility through to full planning submission. We understand Irish ground conditions, wind loading, and planning policy.',
    longDescription: `Ireland's solar farm pipeline is growing rapidly, but navigating the planning system requires specialist local knowledge. Our ground-mounted solar design service covers all technical elements of your planning application and beyond.

We work with landowners, developers, and energy companies to produce planning-ready design packages for sites from 1MW to 150MW+. Our designs account for Irish wind loading (IS EN 1991-1-4), ground conditions, grid connection requirements, and local authority planning policies.

From initial site feasibility through to full planning submission, we act as a reliable technical delivery partner. We coordinate with your planning consultant, ecologist, landscape architect, and grid connection advisor to ensure every technical document is consistent and planning-ready on time.`,
    suitableFor: [
      'Ground-mounted solar farms from 1MW to 150MW+',
      'Utility-scale solar and battery storage (BESS) projects',
      'Agri-voltaic and bifacial panel projects',
      'Brownfield and quarry solar developments',
      'Projects seeking Strategic Infrastructure Development status',
      'Developers needing a full technical package for planning submission',
    ],
    whyItMatters: 'Ground-mounted solar farms face the most rigorous planning scrutiny in Ireland. A poorly coordinated technical package — with inconsistencies between drawings, glint assessments, and landscape plans — is the most common cause of planning delays. Our end-to-end approach ensures all documents are consistent, complete, and submitted together.',
    processSteps: [
      { title: 'Feasibility Review', description: 'We review your site for planning policy, grid connection potential, and technical constraints.' },
      { title: 'Concept Design', description: 'Initial layout design accounting for setbacks, visibility, wind loading, and agricultural use.' },
      { title: 'Planning Package', description: 'Full drawing set, glint and glare report, and landscape plan prepared for submission.' },
      { title: 'Coordination', description: 'We coordinate with your planning consultant, ecologist, and other specialists for a consistent submission.' },
      { title: 'Submission & Support', description: 'Support through the planning process including response to Further Information requests.' },
    ],
    faqs: [
      {
        question: 'What size solar farms do you design?',
        answer: 'We design ground-mounted solar farms from 1MW community installations to 150MW+ utility-scale projects. The design approach and planning documentation required scales with project size — contact us with your site details for a tailored proposal.',
      },
      {
        question: 'Do you handle An Bord Pleanála applications?',
        answer: 'Yes. We regularly prepare technical packages for Strategic Infrastructure Development (SID) applications to An Bord Pleanála. These require a higher standard of documentation and coordination with prescribed bodies. We are experienced in ABP requirements.',
      },
      {
        question: 'Can you design agri-voltaic systems?',
        answer: 'Yes. Agri-voltaic (dual land-use) design is a growing part of our practice. We design systems with elevated mounting to allow grazing beneath panels, and prepare the farm management plan documentation required for planning.',
      },
    ],
    icon: 'Layout',
    color: 'gold',
    heroImage: '/images/ground-mounted-hero.jpg',
    features: [
      'Site feasibility and yield assessment',
      'Structural design for Irish wind loading',
      'Grid connection coordination',
      'Planning application pack',
      'Environmental impact coordination',
      'Construction-ready technical package',
    ],
    deliverables: [
      'Feasibility report',
      'Full planning drawing package',
      'Technical specification',
      'Grid connection documentation',
    ],
    timeframe: '4–10 weeks (project dependent)',
    seoTitle: 'Ground-Mounted Solar Farm Design Ireland | Planning Consultants',
    seoDescription:
      'Expert ground-mounted solar farm design and planning services across Ireland. From 1MW to 150MW+, planning-ready packages.',
  },
  {
    id: 'roof-mounted',
    slug: 'roof-mounted-solar-design',
    title: 'Roof-Mounted Solar Design',
    shortTitle: 'Roof-Mounted',
    tagline: 'Commercial and domestic rooftop solar — designed right',
    description:
      'Structural and planning design for commercial rooftop solar installations across Ireland — from single warehouse roofs to portfolio-wide programmes. We ensure your installation is safe, compliant, and planning-approved.',
    longDescription: `Roof-mounted solar presents unique structural challenges — particularly on older industrial and agricultural buildings common across Ireland. Our team assesses existing roof structures, designs appropriate mounting systems, and prepares all documentation required for planning and building regulations compliance.

We work with building owners, energy contractors, and facilities managers on projects from small commercial premises to large distribution centres and agri-buildings.

Many commercial rooftop installations are exempt from planning permission under the Planning and Development Regulations, but the exemption criteria must be met precisely. We review your building and system specification against current exemption thresholds and advise whether a planning application is needed. Where planning is required, we prepare the full drawing set.`,
    suitableFor: [
      'Warehouses, distribution centres, and logistics facilities',
      'Agricultural and farm buildings',
      'Manufacturing and industrial facilities',
      'Schools, colleges, and public buildings',
      'Retail parks and business parks',
      'Multi-building portfolio programmes',
    ],
    whyItMatters: 'Roof-mounted solar that is not correctly assessed for structural loading creates long-term liability for building owners and installers. Our structural assessment confirms the roof can safely carry the PV system, satisfies building regulations, and gives your client and their insurer confidence in the installation.',
    processSteps: [
      { title: 'Roof Survey Data', description: 'We receive roof drawings, structural information, and proposed PV layout from your team.' },
      { title: 'Structural Assessment', description: 'We assess the existing roof structure against IS EN 1991 loading for the proposed panel layout.' },
      { title: 'Planning Review', description: 'We confirm whether planning permission is required or if the exemption criteria are satisfied.' },
      { title: 'Drawing Package', description: 'We prepare all drawings required for planning or building regulations submission.' },
      { title: 'Delivery', description: 'Final PDF and DWG files delivered for submission or contractor use.' },
    ],
    faqs: [
      {
        question: 'Does rooftop solar always require planning permission in Ireland?',
        answer: 'No. Rooftop solar on commercial and industrial buildings may be exempt from planning under Class 3 of Schedule 2 of the Planning and Development Regulations, subject to conditions including panel height relative to the roof ridge and panel area limits. We review your specific situation and advise accordingly.',
      },
      {
        question: 'What structural information do you need?',
        answer: 'Ideally we need roof structural drawings (purlins, rafters, trusses), roof cladding specification, and the proposed PV layout. If structural drawings are not available, we can work from site survey information — contact us to discuss.',
      },
      {
        question: 'Can you handle large portfolio programmes across multiple buildings?',
        answer: 'Yes. We work with energy contractors and facilities managers on multi-building programmes, providing consistent drawing packages and structural assessments across entire portfolios. Volume pricing is available for programmes of five or more buildings.',
      },
    ],
    icon: 'Home',
    color: 'forest',
    heroImage: '/images/roof-mounted-hero.jpg',
    features: [
      'Roof structural assessment',
      'Loading calculations (IS EN 1991)',
      'Mounting system design',
      'Planning exemption review',
      'Building regulations compliance',
      'Contractor tender documentation',
    ],
    deliverables: [
      'Structural assessment report',
      'Design drawings package',
      'Planning/exemption documentation',
      'Specification and BOM',
    ],
    timeframe: '2–5 weeks',
    seoTitle: 'Roof-Mounted Solar Design Ireland | Commercial Solar Planning',
    seoDescription:
      'Structural design and planning services for commercial rooftop solar installations across Ireland. Building regulations compliant.',
  },
  {
    id: 'landscape-plan',
    slug: 'landscape-plans',
    title: 'Landscape Plans',
    shortTitle: 'Landscape Plans',
    tagline: 'Landscape plans that complement your LVIA or arboriculture report',
    description:
      'We produce detailed Landscape Plans for solar planning applications in Ireland. Where clients supply an LVIA or arboriculture report, we use those findings to prepare planting schemes and landscape integration drawings that satisfy planning authorities.',
    longDescription: `When your consultant or ecologist has prepared an LVIA or arboriculture report, we translate those findings into a clear, planning-standard Landscape Plan. Our drawings show proposed planting, screening, and mitigation measures in a format accepted by all 31 Irish county councils and An Bord Pleanála.

We do not prepare LVIA or arboriculture reports ourselves — instead we work from the documents your specialists have already produced and ensure the landscape plan submitted with your application accurately reflects their recommendations.

Irish planners expect Landscape Plans to show native species planting, phased establishment programmes, and clear mitigation of visual impacts identified in the LVIA. Our drawings are produced to AutoCAD standard and include a full planting schedule with species, sizes, and spacing. We coordinate with your LVIA consultant to ensure the drawing set is consistent with their written recommendations.`,
    suitableFor: [
      'Ground-mounted solar farm planning applications',
      'Projects with an existing LVIA or landscape visual assessment',
      'Sites with arboriculture reports requiring planting mitigation',
      'Projects where planners have requested a landscape plan or planting scheme',
      'Applications to An Bord Pleanála requiring high-standard landscape documentation',
      'Agri-voltaic projects requiring perimeter landscaping schemes',
    ],
    whyItMatters: 'Visual impact and landscape integration are among the top concerns for Irish planning authorities when assessing solar farm applications. A well-prepared Landscape Plan — that clearly shows how proposed planting will screen and integrate the development — addresses these concerns directly and reduces the risk of landscape-related planning conditions or refusals.',
    processSteps: [
      { title: 'Document Review', description: 'You send us your LVIA or arboriculture report and site layout drawings.' },
      { title: 'Landscape Strategy', description: 'We identify the key landscape mitigation measures recommended in the report and agree the planting strategy with your consultant.' },
      { title: 'AutoCAD Drawing', description: 'We prepare the Landscape Plan in AutoCAD showing planting locations, species, and screening.' },
      { title: 'Planting Schedule', description: 'A full planting schedule with species names, sizes, spacing, and establishment notes is prepared.' },
      { title: 'Delivery', description: 'Final PDF and DWG delivered. We respond to any planning authority queries on the landscape plan.' },
    ],
    faqs: [
      {
        question: 'Do I need to provide an LVIA before you can prepare a Landscape Plan?',
        answer: 'Yes — we prepare Landscape Plans from an existing LVIA or arboriculture report. We translate the written recommendations of your landscape or arboriculture specialist into planning-standard drawings. If you do not yet have an LVIA, we can recommend when one is needed and coordinate the process with your planning consultant.',
      },
      {
        question: 'What species do you specify in planting schemes for Irish solar farms?',
        answer: 'We specify native Irish species wherever possible, consistent with An Bord Pleanála and local authority preferences. Typical species include hawthorn, blackthorn, hazel, holly, and native wildflower mixes. We follow the National Biodiversity Action Plan guidance and coordinate with your ecologist where relevant.',
      },
      {
        question: 'Can the Landscape Plan be used as a planning condition discharge document?',
        answer: 'Yes. Our Landscape Plans are prepared to planning-standard and include all information typically required to discharge landscape planning conditions, including species schedules, establishment periods, and maintenance commitments.',
      },
      {
        question: 'How long does a Landscape Plan take?',
        answer: 'Typically 2–3 weeks from receipt of your LVIA and site layout. Expedited delivery is available — contact us to discuss your planning programme.',
      },
    ],
    icon: 'TreePine',
    color: 'gold',
    heroImage: '/images/lvia-hero.jpg',
    features: [
      'Planting and screening plans based on your LVIA or arboriculture report',
      'Native hedgerow and tree planting schemes',
      'Landscape mitigation drawings to planning-authority standard',
      'Coordination with your LVIA or arboriculture consultant',
      'Phased planting schedules',
      'Revision support during planning process',
    ],
    deliverables: [
      'Landscape Plan drawing (PDF & DWG)',
      'Planting schedule',
      'Mitigation measures drawing',
    ],
    timeframe: '2–4 weeks',
    seoTitle: 'Landscape Plans for Solar Planning Ireland',
    seoDescription:
      'Landscape plans for solar planning applications in Ireland, prepared from your LVIA or arboriculture report. Accepted by all 31 county councils.',
  },
];

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug);
