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
    longDescription: `Glint and glare from solar PV panels is one of the most commonly raised objections in Irish solar planning applications. Our expert analysis uses industry-standard software (AutoCAD-based ray-tracing and zone-of-theoretical-visibility modelling) to predict, quantify, and mitigate reflective impacts before your application is submitted.

We assess impacts on:
- Residential receptors (neighbouring properties)
- Road users and transport corridors
- Aviation (IAA requirements for airports and flight paths)
- National Parks and Areas of Outstanding Natural Beauty

Our reports are written to satisfy An Bord Pleanála, local authority planners, and third-party technical reviewers.`,
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

We work with developers at every scale: from single-house rooftop systems to 100MW+ ground-mounted solar farms. All drawings are produced in AutoCAD and supplied in both PDF and DWG formats.`,
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

We work with landowners, developers, and energy companies to produce planning-ready design packages for sites from 1MW to 150MW+. Our designs account for Irish wind loading (IS EN 1991-1-4), ground conditions, grid connection requirements, and local authority planning policies.`,
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

We work with building owners, energy contractors, and facilities managers on projects from small commercial premises to large distribution centres and agri-buildings.`,
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

We do not prepare LVIA or arboriculture reports ourselves — instead we work from the documents your specialists have already produced and ensure the landscape plan submitted with your application accurately reflects their recommendations.`,
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
