/* =============================================
   BLACK MAFIA – LANDING PAGE
   Main App Component
   Developer: el-guemra-br
   Game: Digital Mafia Party Game
   ============================================= */

import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Collections from './components/Collections';
import CardShowcase from './components/CardShowcase';
import Preview from './components/Preview';
import DownloadSection from './components/Download';
import FAQ from './components/FAQ';
import Developer from './components/Developer';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const ADSENSE_CONFIG = {
  enabled: false,
  client: '',
  slot: '',
  testMode: true,
};

function SponsoredPanel() {
  const adSlotRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState(
    ''
  );

  useEffect(() => {
    const adSlot = adSlotRef.current;
    if (!adSlot || adSlot.dataset.initialized === 'true') {
      return;
    }

    adSlot.dataset.initialized = 'true';

    const hasValidConfig =
      ADSENSE_CONFIG.enabled &&
      /^ca-pub-\d{10,}$/.test(String(ADSENSE_CONFIG.client || '').trim()) &&
      /^\d{6,}$/.test(String(ADSENSE_CONFIG.slot || '').trim());

    if (!hasValidConfig) {
      return;
    }

    const adClient = ADSENSE_CONFIG.client.trim();
    const adSlotId = ADSENSE_CONFIG.slot.trim();

    adSlot.innerHTML = '';
    const adIns = document.createElement('ins');
    adIns.className = 'adsbygoogle';
    adIns.style.display = 'block';
    adIns.setAttribute('data-ad-client', adClient);
    adIns.setAttribute('data-ad-slot', adSlotId);
    adIns.setAttribute('data-ad-format', 'auto');
    adIns.setAttribute('data-full-width-responsive', 'true');

    if (ADSENSE_CONFIG.testMode) {
      adIns.setAttribute('data-adtest', 'on');
    }

    adSlot.appendChild(adIns);
    setStatus('Sponsored content may appear in this slot.');

    const renderAd = () => {
      try {
        (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle =
          (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle || [];
        (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle?.push({});
      } catch {
        setStatus('Ad script loaded but ad rendering was blocked by browser settings.');
      }
    };

    const scriptSelector = `script[data-adsense-client="${adClient}"]`;
    const existingScript = document.querySelector<HTMLScriptElement>(scriptSelector);
    if (existingScript) {
      renderAd();
      return;
    }

    const adScript = document.createElement('script');
    adScript.async = true;
    adScript.crossOrigin = 'anonymous';
    adScript.dataset.adsenseClient = adClient;
    adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
    adScript.addEventListener('load', renderAd, { once: true });
    adScript.addEventListener(
      'error',
      () => {
        setStatus('Ad script failed to load. Check network, CSP, and AdSense account status.');
      },
      { once: true }
    );

    document.head.appendChild(adScript);
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-14 bg-[#08090d]" aria-label="Sponsored section">
      <div className="max-w-5xl mx-auto rounded-2xl border border-red-900/60 bg-[#0e0f15] p-6 sm:p-8 shadow-[0_0_30px_rgba(220,38,38,0.15)]">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h2 className="font-cinzel text-xl text-white">Sponsored</h2>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-950/60 text-red-300 border border-red-800/70">
            Monetization Ready
          </span>
        </div>
        <div
          ref={adSlotRef}
          id="black-mafia-ad-slot"
          className="min-h-[120px] w-full rounded-xl border border-dashed border-red-700/50 bg-black/30 flex items-center justify-center p-4"
        >
          <span className="text-sm text-red-200/90 font-medium">Ad slot placeholder</span>
        </div>
        <p id="black-mafia-ad-status" className="mt-3 text-xs text-gray-300/80">
          {status}
        </p>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#050507] text-white">
      {/* === Navigation === */}
      <Navbar />

      {/* === Hero Section === */}
      <Hero />

      {/* === Red divider === */}
      <div className="red-divider" />

      {/* === About the Game === */}
      <About />

      {/* === Red divider === */}
      <div className="red-divider" />

      {/* === Collections Grid === */}
      <Collections />

      {/* === Card Showcase === */}
      <CardShowcase />

      {/* === Red divider === */}
      <div className="red-divider" />

      {/* === Game Preview / Trailer === */}
      <Preview />

      {/* === Red divider === */}
      <div className="red-divider" />

      {/* === Download Section === */}
      <DownloadSection />

      {/* === Red divider === */}
      <div className="red-divider" />

      {/* === Sponsored section === */}
      <SponsoredPanel />

      {/* === Red divider === */}
      <div className="red-divider" />

      {/* === FAQ / Q&A Section === */}
      <FAQ />

      {/* === Red divider === */}
      <div className="red-divider" />

      {/* === Developer Section === */}
      <Developer />

      {/* === Footer === */}
      <Footer />

      {/* === Scroll to Top Button === */}
      <ScrollToTop />
    </div>
  );
}
