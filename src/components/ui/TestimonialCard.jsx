import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  const { name, role, company, quote, rating, projectType, county } = testimonial;
  return (
    <div className="card p-7 flex flex-col h-full">
      <Quote className="w-8 h-8 text-gold-300 mb-4 flex-shrink-0" />
      <p className="text-gray-700 leading-relaxed flex-grow mb-5 italic">"{quote}"</p>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <p className="font-semibold text-forest-900 text-sm">{name}</p>
          <p className="text-xs text-gray-500">{role}</p>
          <p className="text-xs text-gray-400">{company}</p>
        </div>
        <div className="text-right">
          <div className="flex gap-0.5 justify-end mb-1">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
            ))}
          </div>
          <span className="text-xs bg-forest-50 text-forest-700 px-2 py-0.5 rounded-full">{county}</span>
        </div>
      </div>
    </div>
  );
}
