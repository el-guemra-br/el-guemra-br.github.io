import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Converter from "./components/Converter";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import SEOContent from "./components/SEOContent";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

const ADSENSE_CONFIG = {
  enabled: false,
  client: "",
  slot: "",
  testMode: true,
};

function SponsoredPanel() {
  const adSlotRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState(
    "Ad slot is currently inactive. Add valid AdSense client and slot values in src/App.tsx to enable it."
  );

  useEffect(() => {
    const adSlot = adSlotRef.current;
    if (!adSlot || adSlot.dataset.initialized === "true") {
      return;
    }

    adSlot.dataset.initialized = "true";

    const hasValidConfig =
      ADSENSE_CONFIG.enabled &&
      /^ca-pub-\d{10,}$/.test(String(ADSENSE_CONFIG.client || "").trim()) &&
      /^\d{6,}$/.test(String(ADSENSE_CONFIG.slot || "").trim());

    if (!hasValidConfig) {
      return;
    }

    const adClient = ADSENSE_CONFIG.client.trim();
    const adSlotId = ADSENSE_CONFIG.slot.trim();

    adSlot.innerHTML = "";
    const adIns = document.createElement("ins");
    adIns.className = "adsbygoogle";
    adIns.style.display = "block";
    adIns.setAttribute("data-ad-client", adClient);
    adIns.setAttribute("data-ad-slot", adSlotId);
    adIns.setAttribute("data-ad-format", "auto");
    adIns.setAttribute("data-full-width-responsive", "true");

    if (ADSENSE_CONFIG.testMode) {
      adIns.setAttribute("data-adtest", "on");
    }

    adSlot.appendChild(adIns);
    setStatus("Sponsored content may appear in this slot.");

    const renderAd = () => {
      try {
        (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle =
          (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle || [];
        (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle?.push({});
      } catch {
        setStatus("Ad script loaded but ad rendering was blocked by browser settings.");
      }
    };

    const scriptSelector = `script[data-adsense-client="${adClient}"]`;
    const existingScript = document.querySelector<HTMLScriptElement>(scriptSelector);
    if (existingScript) {
      renderAd();
      return;
    }

    const adScript = document.createElement("script");
    adScript.async = true;
    adScript.crossOrigin = "anonymous";
    adScript.dataset.adsenseClient = adClient;
    adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
    adScript.addEventListener("load", renderAd, { once: true });
    adScript.addEventListener(
      "error",
      () => {
        setStatus("Ad script failed to load. Check network, CSP, and AdSense account status.");
      },
      { once: true }
    );

    document.head.appendChild(adScript);
  }, []);

  return (
    <section className="py-16 bg-linear-to-br from-slate-50 to-lavender-veil border-y border-lavender" aria-label="Sponsored section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-lavender bg-lavender p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">Sponsored</h2>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-lavender-veil text-lavender border border-lavender-grey">
              Monetization Ready
            </span>
          </div>
          <div
            ref={adSlotRef}
            id="webpconverter-ad-slot"
            className="min-h-[120px] w-full rounded-xl border border-dashed border-lavender-grey bg-lavender-veil/60 flex items-center justify-center p-4"
          >
            <span className="text-sm text-lavender-grey font-medium">Ad slot placeholder</span>
          </div>
          <p id="webpconverter-ad-status" className="mt-3 text-xs text-thistle">
            {status}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-lavender-veil font-sans antialiased">
      <Navbar />
      {/* Visual test block to confirm palette is applied */}
      <div className="max-w-4xl mx-auto p-6 my-6 rounded-lg" style={{ backgroundColor: 'var(--lavender)', color: '#0f172a' }}>
        Palette test — `--lavender` background
      </div>
      <main>
        <Hero />
        <Converter />
        <HowItWorks />
        <Features />
        <SEOContent />
        <SponsoredPanel />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
