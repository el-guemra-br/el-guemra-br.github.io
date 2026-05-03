/* =============================================
   NAVBAR COMPONENT
   Sticky glassmorphism navigation bar
   ============================================= */
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Collections', href: '#collections' },
  { label: 'Preview', href: '#preview' },
  { label: 'Download', href: '#download' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Developer', href: '#developer' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-red-900/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          className="font-cinzel text-xl font-black tracking-widest text-white glow-red-text"
        >
          <span className="text-red-600">BLACK</span>{' '}
          <span className="text-blue-500">MAFIA</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="nav-link font-rajdhani text-sm font-semibold tracking-widest text-gray-100 hover:text-red-400 uppercase transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#download"
          onClick={(e) => { e.preventDefault(); handleNavClick('#download'); }}
          className="hidden md:inline-flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white font-rajdhani font-bold tracking-widest text-sm uppercase px-5 py-2 rounded-sm transition-all glow-red"
        >
          Download APK
        </a>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-black/95 backdrop-blur-md border-t border-red-900/30 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="font-rajdhani text-sm font-semibold tracking-widest text-gray-100 hover:text-red-400 uppercase py-2 border-b border-gray-800 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#download"
            onClick={(e) => { e.preventDefault(); handleNavClick('#download'); }}
            className="mt-2 text-center bg-red-700 hover:bg-red-600 text-white font-rajdhani font-bold tracking-widest text-sm uppercase px-5 py-3 rounded-sm transition-all"
          >
            Download APK
          </a>
        </div>
      </div>
    </nav>
  );
}
