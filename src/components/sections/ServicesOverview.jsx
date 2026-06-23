import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import ServiceCard from '../ui/ServiceCard';
import { services } from '../../data/services';

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <SectionHeader
          eyebrow="What We Deliver"
          title="Technical Services for Your Solar Pipeline"
          subtitle="Specialist reports and design services your business can rely on — prepared to Irish planning authority standard and delivered on your timeline."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <div className="text-center">
          <Link to="/services" className="btn-secondary inline-flex">
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
