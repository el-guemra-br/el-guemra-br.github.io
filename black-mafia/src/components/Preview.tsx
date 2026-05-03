/* =============================================
   GAME PREVIEW SECTION
   Embedded video + screenshot gallery/carousel
   ============================================= */
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/* Screenshot gallery items using the uploaded card images */
const screenshots = [
  {
    src: '/images/collection-anime.webp',
    caption: 'Anime Collection – Mafia Noir',
    label: 'Anime',
  },
  {
    src: '/images/collection-egypt.webp',
    caption: 'Old Egyptian Collection – Pharaohs of Deceit',
    label: 'Egyptian',
  },
  {
    src: '/images/collection-gothic.webp',
    caption: 'Victorian Gothic Collection – Darkness Reigns',
    label: 'Gothic',
  },
  {
    src: '/images/collection-pirates.webp',
    caption: 'Pirates Collection – Seas of Betrayal',
    label: 'Pirates',
  },
  {
    src: '/images/collection-samurai.webp',
    caption: 'Samurai Era Collection – Honor & Shadow',
    label: 'Samurai',
  },
  {
    src: '/images/collection-wildwest.webp',
    caption: 'Wild West Collection – Dust & Gunpowder',
    label: 'Wild West',
  },
];

export default function Preview() {
  const { ref, inView } = useInView(0.1);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const prev = () => setActiveSlide((s) => (s === 0 ? screenshots.length - 1 : s - 1));
  const next = () => setActiveSlide((s) => (s === screenshots.length - 1 ? 0 : s + 1));

  return (
    <section id="preview" className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />

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
            See it in Action
          </p>
          <h2 className="font-cinzel text-4xl sm:text-5xl font-black text-white section-title tracking-wide">
            Game Preview
          </h2>
        </div>

        {/* Video Preview */}
        <div
          className="mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease 200ms, transform 0.7s ease 200ms',
          }}
        >
          <div className="relative glass rounded-xl overflow-hidden border border-red-900/30 aspect-video max-w-4xl mx-auto">
            {showVideo ? (
              <>
                {/* Embedded YouTube - replace VIDEO_ID with real ID */}
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/"
                  title="Black Mafia Game Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white rounded-full p-2 transition-colors z-10"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              /* Video thumbnail placeholder */
              <div className="relative w-full h-full min-h-[280px] sm:min-h-[400px] flex items-center justify-center bg-black">
                <img
                  src="/images/hero-bg.webp"
                  alt="Video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <button
                  onClick={() => setShowVideo(true)}
                  className="relative z-10 group flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-full bg-red-700/80 border-4 border-red-500/60 flex items-center justify-center group-hover:bg-red-600 group-hover:scale-110 transition-all duration-300 glow-red">
                    <Play size={32} className="text-white translate-x-1" />
                  </div>
                  <span className="font-cinzel text-white text-lg tracking-widest uppercase">
                    Watch Trailer
                  </span>
                </button>

                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-red-600/60" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-red-600/60" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-red-600/60" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-red-600/60" />
              </div>
            )}
          </div>
        </div>

        {/* Screenshot Carousel */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease 400ms, transform 0.7s ease 400ms',
          }}
        >
          <h3 className="font-cinzel text-xl font-bold text-center text-white mb-8 tracking-widest uppercase">
            Collection Screenshots
          </h3>

          <div className="relative max-w-5xl mx-auto">
            {/* Main slide */}
            <div className="glass rounded-xl overflow-hidden border border-red-900/20 aspect-[16/9] relative">
              <img
                src={screenshots[activeSlide].src}
                alt={screenshots[activeSlide].caption}
                className="screenshot-img w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <p className="font-rajdhani text-gray-200 text-sm tracking-widest uppercase">
                  {screenshots[activeSlide].caption}
                </p>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/70 hover:bg-red-900/80 border border-red-900/40 hover:border-red-600 rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/70 hover:bg-red-900/80 border border-red-900/40 hover:border-red-600 rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-5">
              {screenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeSlide
                      ? 'w-6 h-2 bg-red-600'
                      : 'w-2 h-2 bg-gray-700 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            {/* Thumbnail strip */}
            <div className="grid grid-cols-6 gap-2 mt-4">
              {screenshots.map((shot, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`rounded-lg overflow-hidden transition-all duration-300 ${
                    i === activeSlide
                      ? 'ring-2 ring-red-600 scale-105'
                      : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <img
                    src={shot.src}
                    alt={shot.label}
                    className="w-full aspect-square object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
