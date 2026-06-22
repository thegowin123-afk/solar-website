import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { faqs } from '../../data/faqs';

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={`border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 ${isOpen ? 'shadow-md border-gold-200' : 'hover:border-gray-300'}`}>
      <button
        onClick={onToggle}
        className="w-full text-left flex items-center justify-between gap-4 p-6"
      >
        <span className="font-semibold text-forest-900">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gold-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <p className="text-gray-600 leading-relaxed px-6 pb-6">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ({ items = faqs, title = 'Frequently Asked Questions', subtitle }) {
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (i) => setOpenIndex(openIndex === i ? -1 : i);

  return (
    <section className="py-24 bg-white">
      <div className="container-custom max-w-4xl">
        <SectionHeader
          eyebrow="FAQ"
          title={title}
          subtitle={subtitle || 'Quick answers to the questions we hear most often from solar developers and landowners across Ireland.'}
        />
        <div className="space-y-3">
          {items.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
