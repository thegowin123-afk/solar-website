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
          eyebrow="What We Do"
          title="Solar Planning Services"
          subtitle="Specialist technical reports and design services for every stage of your solar planning journey — prepared to the highest standard for Irish planning authorities."
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
