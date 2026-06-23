import SectionHeader from '../ui/SectionHeader';

const steps = [
  {
    number: '01',
    title: 'Initial Brief',
    desc: 'Send us your project brief — site location, scale, and what reports you need. We turn around a fixed-fee proposal within one business day.',
  },
  {
    number: '02',
    title: 'Onboarding & Kick-off',
    desc: 'We assign a dedicated consultant to your account. We agree deliverables, timelines, and how you\'d like reports branded — your way.',
  },
  {
    number: '03',
    title: 'Technical Analysis',
    desc: 'Our specialists carry out glint & glare modelling, landscape plan drafting, or PV design — to the standard required by Irish planning authorities.',
  },
  {
    number: '04',
    title: 'Draft for Your Review',
    desc: 'You receive a draft report to review on behalf of your client. Two revision rounds included. We incorporate all feedback before sign-off.',
  },
  {
    number: '05',
    title: 'Final Delivery',
    desc: 'Final reports delivered in your preferred format — ready to submit under your brand or as standalone technical appendices.',
  },
  {
    number: '06',
    title: 'Ongoing Partnership',
    desc: 'We stay available post-submission for further information responses, planning queries, and your next project in the pipeline.',
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
          eyebrow="How We Partner"
          title="Integrated Into Your Workflow From Day One"
          subtitle="A simple, transparent process designed to fit around your business — not the other way around."
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
