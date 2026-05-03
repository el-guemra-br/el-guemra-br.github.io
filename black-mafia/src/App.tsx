/* =============================================
   BLACK MAFIA – LANDING PAGE
   Main App Component
   Developer: el-guemra-br
   Game: Digital Mafia Party Game
   ============================================= */

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
