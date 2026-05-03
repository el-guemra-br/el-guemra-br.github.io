/* =============================================
   CARD SHOWCASE SECTION
   Displays actual game cards from collections
   with a cinematic reveal effect
   ============================================= */
import { useState } from 'react';
import { useInView } from '../hooks/useInView';

interface CardCollectionData {
  id: string;
  name: string;
  previewImg: string;
  color: string;
}

const cardCollections: CardCollectionData[] = [
  {
    id: 'anime',
    name: 'Anime — Mafia Noir',
    previewImg: './images/collection-anime.webp',
    color: 'from-purple-900/60 to-black',
  },
  {
    id: 'egypt',
    name: 'Old Egyptian',
    previewImg: './images/collection-egypt.webp',
    color: 'from-yellow-900/50 to-black',
  },
  {
    id: 'gothic',
    name: 'Victorian Gothic',
    previewImg: './images/collection-gothic.webp',
    color: 'from-purple-950/60 to-black',
  },
  {
    id: 'pirates',
    name: 'Pirates',
    previewImg: './images/collection-pirates.webp',
    color: 'from-blue-950/60 to-black',
  },
  {
    id: 'samurai',
    name: 'Samurai Era',
    previewImg: './images/collection-samurai.webp',
    color: 'from-red-950/60 to-black',
  },
  {
    id: 'wildwest',
    name: 'Wild West',
    previewImg: './images/collection-wildwest.webp',
    color: 'from-orange-950/60 to-black',
  },
];

export default function CardShowcase() {
  const { ref, inView } = useInView(0.08);
  const [selected, setSelected] = useState(0);

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className="text-center mb-12"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="font-rajdhani text-red-600 text-sm tracking-[0.4em] uppercase mb-3">
            The Cards
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-black text-white tracking-wide">
            Stunning Role Cards
          </h2>
          <p className="mt-4 max-w-xl mx-auto font-rajdhani text-gray-400 text-base">
            Every collection features unique, hand-crafted role cards with breathtaking artwork.
          </p>
        </div>

        {/* Collection selector tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-8"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.7s ease 200ms',
          }}
        >
          {cardCollections.map((col, i) => (
            <button
              key={col.id}
              onClick={() => setSelected(i)}
              className={`font-rajdhani text-xs sm:text-sm font-semibold tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
                selected === i
                  ? 'bg-red-700 border-red-600 text-white glow-red'
                  : 'bg-black/40 border-red-900/30 text-gray-300 hover:border-red-700/50 hover:text-gray-100'
              }`}
            >
              {col.name}
            </button>
          ))}
        </div>

        {/* Main card image display */}
        <div
          className="relative rounded-2xl overflow-hidden border border-red-900/20 max-w-4xl mx-auto"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0.95)',
            transition: 'opacity 0.7s ease 300ms, transform 0.7s ease 300ms',
          }}
        >
          {cardCollections.map((col, i) => (
            <div
              key={col.id}
              className="absolute inset-0 transition-opacity duration-500"
              style={{ opacity: selected === i ? 1 : 0, zIndex: selected === i ? 1 : 0 }}
            >
              <img
                src={col.previewImg}
                alt={col.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${col.color} opacity-40`} />
            </div>
          ))}

          {/* Visible container */}
          <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full">
            <img
              src={cardCollections[selected].previewImg}
              alt={cardCollections[selected].name}
              className="w-full h-full object-cover transition-all duration-500"
              loading="lazy"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${cardCollections[selected].color} opacity-50`} />
          </div>

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-6 bg-gradient-to-t from-black/90 to-transparent">
            <p className="font-cinzel text-white text-xl font-bold">
              {cardCollections[selected].name}
            </p>
            <p className="font-rajdhani text-gray-300 text-sm mt-1">
              Tap any collection tab to explore different card themes
            </p>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-red-600/60 z-10" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-red-600/60 z-10" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-red-600/60 z-10" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-red-600/60 z-10" />
        </div>
      </div>
    </section>
  );
}
