import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Converter from "./components/Converter";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import SEOContent from "./components/SEOContent";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Converter />
        <HowItWorks />
        <Features />
        <SEOContent />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
