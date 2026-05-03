/* =============================================
   HERO SECTION
   Full-screen cinematic hero with logo, tagline
   and animated CTA buttons
   ============================================= */
import { useEffect, useRef } from 'react';
import { Download, Play } from 'lucide-react';

export default function Hero() {
  const particlesRef = useRef<HTMLDivElement>(null);

  /* Floating particle dots */
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 40; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(220,38,38,${Math.random() * 0.5 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particle-float ${Math.random() * 6 + 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 4}s;
      `;
      container.appendChild(dot);
    }
  }, []);

  const scrollToDownload = () => {
    document.querySelector('#download')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToPreview = () => {
    document.querySelector('#preview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* === Background Image === */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.webp')" }}
      />

      {/* === Dark overlay gradient === */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

      {/* === Red vignette at corners === */}
      <div className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(80,0,0,0.6) 100%)'
        }}
      />

      {/* === Scanline effect === */}
      <div className="scanline" />

      {/* === Floating particles === */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* === Hero Content === */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">

        {/* Logo Image */}
        <div className="hero-logo-float mb-6 flex justify-center">
          <img
            src="/images/black-mafia-logo.webp"
            alt="Black Mafia Logo"
            className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 object-contain drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(220,38,38,0.6)) drop-shadow(0 0 60px rgba(220,38,38,0.3))'
            }}
            onError={(e) => {
              /* Fallback text logo if image not found */
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>

        {/* Game Title Text */}
        <h1 className="font-cinzel text-5xl sm:text-7xl md:text-8xl font-black tracking-widest mb-2 leading-none">
          <span
            className="text-white"
            style={{
              textShadow: '0 0 30px rgba(220,38,38,0.6), 0 0 60px rgba(220,38,38,0.3), 0 4px 20px rgba(0,0,0,0.8)'
            }}
          >
            BLACK
          </span>
          <br />
          <span
            className="text-red-600"
            style={{
              textShadow: '0 0 30px rgba(220,38,38,0.9), 0 0 60px rgba(220,38,38,0.5)'
            }}
          >
            MAFIA
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="font-rajdhani text-lg sm:text-2xl md:text-3xl tracking-[0.3em] text-gray-100 mt-4 mb-10 uppercase"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
        >
          One City.{' '}
          <span className="text-red-500">Two Sides.</span>{' '}
          No Mercy.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary - Download APK */}
          <button
            onClick={scrollToDownload}
            className="btn-primary flex items-center gap-3 bg-red-700 hover:bg-red-600 text-white font-cinzel font-bold tracking-widest text-sm uppercase px-8 py-4 rounded-sm transition-all duration-300 hover:scale-105 group w-full sm:w-auto justify-center"
          >
            <Download
              size={18}
              className="group-hover:translate-y-1 transition-transform"
            />
            Download APK
          </button>

          {/* Secondary - Watch Preview */}
          <button
            onClick={scrollToPreview}
            className="btn-secondary flex items-center gap-3 bg-transparent border-2 border-red-700/60 hover:border-red-500 text-white hover:text-red-400 font-cinzel font-bold tracking-widest text-sm uppercase px-8 py-4 rounded-sm transition-all duration-300 hover:scale-105 group w-full sm:w-auto justify-center"
          >
            <Play
              size={18}
              className="group-hover:scale-125 transition-transform"
            />
            Watch Preview
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 opacity-50">
            <span className="font-rajdhani text-xs tracking-widest text-gray-200 uppercase">
              Scroll
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-red-600 to-transparent" />
          </div>
        </div>
      </div>

      {/* === Bottom gradient to next section === */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050507] to-transparent" />
    </section>
  );
}
