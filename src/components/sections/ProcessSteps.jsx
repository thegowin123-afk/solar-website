import SectionHeader from '../ui/SectionHeader';

const steps = [
  {
    number: '01',
    title: 'Free Consultation',
    desc: 'Tell us about your project. We\'ll assess what planning documentation is required and provide a fixed-fee quote — no surprises.',
  },
  {
    number: '02',
    title: 'Proposal & Kick-off',
    desc: 'Accept our proposal and we assign a dedicated consultant. We\'ll agree the programme, data requirements, and key milestones.',
  },
  {
    number: '03',
    title: 'Survey & Analysis',
    desc: 'Our specialists carry out the required analysis — site visits, modelling, data gathering — to the standard required by your planning authority.',
  },
  {
    number: '04',
    title: 'Draft Report Delivery',
    desc: 'We deliver a draft report for your review. Two rounds of revisions are included. We address all your comments before final sign-off.',
  },
  {
    number: '05',
    title: 'Planning Submission',
    desc: 'We prepare a planning-ready submission pack and can liaise directly with your planning agent or solicitor for a seamless application.',
  },
  {
    number: '06',
    title: 'Post-Submission Support',
    desc: 'We respond to further information requests and planning authority queries. We support you through to final decision — and beyond.',
  },
];

export default function ProcessSteps() {
  return (
    <section className="py-24 bg-gradient-to-b from-forest-950 to-forest-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />
      <div className="container-custom relative z-10">
        <SectionHeader
          eyebrow="Our Process"
          title="How We Work"
          subtitle="A clear, transparent process from first enquiry to planning permission — designed around the realities of Irish planning timelines."
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative p-7 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
            >
              <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center shadow-lg">
                <span className="text-xs font-bold text-white">{step.number}</span>
              </div>
              <div className="pt-4">
                <h3 className="font-heading font-bold text-white text-lg mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gold-500/40" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
