const clients = [
  { name: 'Greenvolt Next', logo: '/images/logo-greenvolt-next.svg' },
  { name: 'Entrust', logo: '/images/logo-entrust-colour.svg' },
  { name: 'Coppercoast Renewables', logo: '/images/logo-coppercoast.png' },
];

// Duplicate for seamless infinite scroll
const track = [...clients, ...clients, ...clients];

export default function ClientLogos() {
  return (
    <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
      <p className="text-center text-xs font-bold tracking-widest uppercase text-gray-400 mb-8">
        Trusted by Ireland's Leading Solar Businesses
      </p>
      <div className="relative">
        <div className="flex items-center gap-20 animate-marquee w-max">
          {track.map(({ name, logo }, i) => (
            <div key={`${name}-${i}`} className="opacity-60 hover:opacity-100 transition-opacity flex-shrink-0">
              <img
                src={logo}
                alt={name}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-gray-400 mt-8">
        + many more planning consultants, developers, and EPC contractors across Ireland
      </p>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 12s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
