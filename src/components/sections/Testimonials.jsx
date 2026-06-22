import SectionHeader from '../ui/SectionHeader';
import TestimonialCard from '../ui/TestimonialCard';
import { testimonials } from '../../data/testimonials';

export default function Testimonials() {
  const featured = testimonials.slice(0, 3);
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Client Stories"
          title="Trusted by Ireland's Solar Sector"
          subtitle="From individual farmers to national energy companies — here's what our clients say about working with SolarPlan Ireland."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
