/* =============================================
   COLLECTIONS / THEMES SECTION
   Visually rich grid of 6 game collections
   with hover animations and scroll fade-ins
   ============================================= */
import { useInView } from '../hooks/useInView';

interface Collection {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  accentColor: string;
  characters: string[];
}

const collections: Collection[] = [
  {
    id: 'anime',
    name: 'Anime',
    subtitle: 'Mafia Noir',
    description:
      'Step into a neon-lit anime world where the Mafia Boss commands the shadows and style meets street-level danger.',
    image: '/images/collection-anime.webp',
    accentColor: 'from-purple-900/80',
    characters: ['Mafia Boss', 'Sniper', 'Silencer', 'Good Boy', 'Mayor'],
  },
  {
    id: 'egypt',
    name: 'Old Egyptian',
    subtitle: 'Pharaohs of Deceit',
    description:
      'Ancient gods play deadly politics. Set, Pharaoh, Archer of Horus — who truly controls the Nile?',
    image: '/images/collection-egypt.webp',
    accentColor: 'from-yellow-900/80',
    characters: ['Set — God of Chaos', 'Priestess of Isis', 'Tomb Raider', 'Pharaoh', 'Archer of Horus'],
  },
  {
    id: 'wildwest',
    name: 'Wild West',
    subtitle: 'Dust & Gunpowder',
    description:
      'In the lawless frontier, alliances crumble like desert sand. Outlaws versus townsfolk — draw first or die.',
    image: '/images/collection-wildwest.webp',
    accentColor: 'from-orange-900/80',
    characters: ['The Sheriff', 'Outlaw Boss', 'Bounty Hunter', 'Saloon Singer', 'Undertaker'],
  },
  {
    id: 'gothic',
    name: 'Victorian Gothic',
    subtitle: 'Darkness Reigns',
    description:
      'Vampire lords, banshees, and monster hunters collide in fog-draped Victorian streets. Trust no one after dark.',
    image: '/images/collection-gothic.webp',
    accentColor: 'from-purple-950/80',
    characters: ['Vampire Lord', 'Banshee', 'Monster Hunter', 'Burgomaster', 'Alchemist'],
  },
  {
    id: 'pirates',
    name: 'Pirates',
    subtitle: 'Seas of Betrayal',
    description:
      'Sail the treacherous seas with pirate captains and sirens. The crew is your greatest weapon — and your greatest threat.',
    image: '/images/collection-pirates.webp',
    accentColor: 'from-blue-900/80',
    characters: ['Pirate Captain', 'Siren', 'Port Governor', "Crow's Nest Shooter", 'Ship Surgeon'],
  },
  {
    id: 'samurai',
    name: 'Samurai Era',
    subtitle: 'Honor & Shadow',
    description:
      'The Shadow Shogun controls the clan from darkness. Kunoichi, Ronin Spy, and Daimyo — honor has a price.',
    image: '/images/collection-samurai.webp',
    accentColor: 'from-red-950/80',
    characters: ['Shadow Shogun', 'Kunoichi', 'Ronin Spy', 'Daimyo', 'Shrine Monk'],
  },
];

interface CollectionCardProps {
  collection: Collection;
  index: number;
  inView: boolean;
}

function CollectionCard({ collection, index, inView }: CollectionCardProps) {
  return (
    <div
      className="collection-card rounded-xl overflow-hidden cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
        transition: `opacity 0.7s ease ${index * 120}ms, transform 0.7s ease ${index * 120}ms`,
      }}
    >
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay gradient */}
        <div className="card-overlay absolute inset-0" />

        {/* Top badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="font-rajdhani text-xs tracking-widest uppercase text-gray-200 bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full">
            {collection.subtitle}
          </span>
        </div>

        {/* Content overlay (bottom) */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
          <h3 className="font-cinzel text-2xl font-black text-white tracking-wide mb-1">
            {collection.name}
          </h3>
          <div className="w-8 h-0.5 bg-red-600 mb-3 transition-all duration-300 group-hover:w-16" />
          <p className="font-rajdhani text-gray-200 text-sm leading-relaxed line-clamp-2">
            {collection.description}
          </p>

          {/* Characters preview */}
          <div className="mt-3 flex flex-wrap gap-1">
            {collection.characters.slice(0, 3).map((char) => (
              <span
                key={char}
                className="font-rajdhani text-xs text-red-400 bg-red-950/50 border border-red-900/40 px-2 py-0.5 rounded-full"
              >
                {char}
              </span>
            ))}
            {collection.characters.length > 3 && (
              <span className="font-rajdhani text-xs text-gray-300 bg-black/40 px-2 py-0.5 rounded-full">
                +{collection.characters.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Collections() {
  const { ref, inView } = useInView(0.08);

  return (
    <section id="collections" className="relative py-24 px-4 overflow-hidden bg-black/40">
      {/* Background decorative */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(220,38,38,0.08) 0%, transparent 100%)'
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={ref}
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="font-rajdhani text-red-600 text-sm tracking-[0.4em] uppercase mb-3">
            Choose Your World
          </p>
          <h2 className="font-cinzel text-4xl sm:text-5xl font-black text-white section-title tracking-wide">
            Collections
          </h2>
          <p className="mt-8 max-w-2xl mx-auto font-rajdhani text-gray-300 text-lg leading-relaxed">
            Six unique thematic universes. Each collection reimagines the Mafia world through
            stunning art, unique characters, and immersive atmosphere.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        {/* Bottom note */}
        <div
          className="text-center mt-12"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.7s ease 800ms',
          }}
        >
          <p className="font-rajdhani text-gray-400 text-sm tracking-widest uppercase">
            More collections coming soon
          </p>
          <div className="mt-2 flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-red-800/60"
                style={{ animation: `pulse-glow ${1 + i * 0.3}s ease-in-out infinite` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
