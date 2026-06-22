export default function SectionHeader({ eyebrow, title, subtitle, centered = true, light = false }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <span className={`inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full ${
          light
            ? 'bg-white/10 text-gold-300'
            : 'bg-gold-100 text-gold-700'
        }`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`section-title ${light ? 'text-white' : ''}`}>{title}</h2>
      {subtitle && (
        <p className={`section-subtitle ${light ? 'text-gray-300' : ''} ${centered ? '' : 'max-w-none'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
