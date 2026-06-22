import { Award, Users, FileCheck, Zap, MapPin, TrendingDown, Globe } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import StatCard from '../ui/StatCard';

const reasons = [
  {
    icon: Globe,
    title: 'Mumbai-Based, Irish Planning Focused',
    desc: 'Our Mumbai team is trained exclusively in Irish planning law and the requirements of all 31 local authorities — this is all we do.',
  },
  {
    icon: TrendingDown,
    title: '30–50% Cost Saving',
    desc: 'Outsourcing rates without outsourcing quality. Our clients get the same standard of report as a top Dublin agency, at significantly lower cost.',
  },
  {
    icon: FileCheck,
    title: 'First-Application Success',
    desc: 'Over 94% of our planning applications are approved without further information requests. Our reports proactively address every planning concern.',
  },
  {
    icon: Zap,
    title: 'Faster Turnaround',
    desc: 'Our IST working day overlaps with Irish afternoons — meaning work progresses overnight and is often ready before your Irish morning begins.',
  },
  {
    icon: Award,
    title: 'Specialist Expertise',
    desc: 'Engineers, landscape architects, and planning specialists — all trained specifically in Irish planning requirements and standards.',
  },
  {
    icon: Users,
    title: 'Dedicated Project Teams',
    desc: 'A named consultant on every project. You always know who you\'re working with and can expect a response within one business day.',
  },
];

const stats = [
  { value: '150+', label: 'Projects Completed' },
  { value: '8yrs', label: 'Irish Planning Experience' },
  { value: '94%', label: 'First-Application Approval Rate' },
  { value: '31', label: 'Counties Served' },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Irish Planning Expertise, Mumbai Efficiency"
          subtitle="We're a Mumbai-based outsourcing company that specialises exclusively in Irish solar planning documentation. Same quality as a Dublin agency — at a fraction of the cost."
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
