export default function StatCard({ value, label, icon: Icon, light = false }) {
  return (
    <div className={`text-center p-6 rounded-2xl ${light ? 'bg-white/10 backdrop-blur-sm' : 'bg-white shadow-md'}`}>
      {Icon && (
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${
          light ? 'bg-white/20' : 'bg-gold-100'
        }`}>
          <Icon className={`w-5 h-5 ${light ? 'text-gold-300' : 'text-gold-600'}`} />
        </div>
      )}
      <div className={`text-3xl md:text-4xl font-heading font-bold mb-1 ${light ? 'text-white' : 'text-forest-900'}`}>
        {value}
      </div>
      <div className={`text-sm ${light ? 'text-gray-300' : 'text-gray-500'}`}>{label}</div>
    </div>
  );
}
