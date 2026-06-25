import { Award, Users, FileCheck, Zap, MapPin, TrendingDown, Globe } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import StatCard from '../ui/StatCard';

const reasons = [
  {
    icon: Users,
    title: 'Built for Business Partners',
    desc: 'We work exclusively with planning consultants, developers, and solar contractors — not direct consumers. Your business is our business.',
  },
  {
    icon: TrendingDown,
    title: 'Expand Capacity Without Overhead',
    desc: 'Add Irish solar planning expertise to your service offering without hiring. We scale with your pipeline, project by project.',
  },
  {
    icon: FileCheck,
    title: 'Council-Ready Documentation',
    desc: 'Our reports are written to satisfy Irish planning authorities at first submission — protecting your reputation and your clients\' timelines.',
  },
  {
    icon: Zap,
    title: 'Overnight Turnaround',
    desc: 'Our India-based team in Mumbai works while Ireland sleeps. Briefs sent in the afternoon are progressed overnight and ready for your morning review.',
  },
  {
    icon: Award,
    title: 'White-Label Ready',
    desc: 'Our reports are delivered under your brand or as standalone technical documents — seamlessly integrated into your planning submission.',
  },
  {
    icon: Globe,
    title: 'Dedicated Account Management',
    desc: 'A named consultant on every project. Direct communication, no account handoffs, and a response within one business day — always.',
  },
];

const stats = [
  { value: '150+', label: 'Projects Completed' },
  { value: '6+yrs', label: 'Irish Planning Experience' },
  { value: '400MW+', label: 'Capacity Supported' },
  { value: '15+', label: 'Counties Served' },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Why Partner With Us"
          title="The Outsourcing Partner Behind Ireland's Solar Pipeline"
          subtitle="We integrate directly into your workflow — extending your capacity, protecting your margins, and delivering technical reports your clients can depend on."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl border border-gray-100 hover:border-gold-200 hover:shadow-md transition-all duration-200 group">
              <div className="w-11 h-11 rounded-xl bg-gold-100 group-hover:bg-gold-200 flex items-center justify-center mb-4 transition-colors">
                <Icon className="w-5 h-5 text-gold-700" />
              </div>
              <h3 className="font-heading font-bold text-forest-900 text-lg mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
