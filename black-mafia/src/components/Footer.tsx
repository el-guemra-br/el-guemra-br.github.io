/* =============================================
   FOOTER COMPONENT
   Social icons, copyright, contact email
   ============================================= */
import { Mail, ExternalLink } from 'lucide-react';

/* SVG brand icons */
const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const YoutubeIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
  </svg>
);

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Collections', href: '#collections' },
  { label: 'Preview', href: '#preview' },
  { label: 'Download', href: '#download' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Developer', href: '#developer' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-red-900/20 overflow-hidden">
      {/* Top red line */}
      <div className="h-px bg-gradient-to-r from-transparent via-red-700 to-transparent" />

      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(220,38,38,0.06) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Main footer content */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-cinzel text-2xl font-black text-white tracking-widest mb-3">
              <span className="text-red-600">BLACK</span> MAFIA
            </h3>
            <p className="font-rajdhani text-gray-300 text-sm leading-relaxed mb-6">
              A cinematic digital Mafia party game with 6 unique thematic collections.
              Built with passion by an indie developer for friends who love to play together.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/el-guemra-br"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-pink-900/30 border border-white/10 hover:border-pink-700/50 flex items-center justify-center text-gray-500 hover:text-pink-400 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href="https://github.com/el-guemra-br"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-gray-800/50 border border-white/10 hover:border-gray-600/50 flex items-center justify-center text-gray-500 hover:text-white transition-all duration-300"
                aria-label="GitHub"
              >
                <GithubIcon size={17} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-red-900/30 border border-white/10 hover:border-red-700/50 flex items-center justify-center text-gray-500 hover:text-red-400 transition-all duration-300"
                aria-label="YouTube"
              >
                <YoutubeIcon size={17} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-red-900/30 border border-white/10 hover:border-red-700/50 flex items-center justify-center text-gray-500 hover:text-red-400 transition-all duration-300"
                aria-label="Portfolio"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-gray-500 tracking-[0.4em] uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="font-rajdhani text-sm text-gray-300 hover:text-red-300 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-3 h-px bg-red-800/50 group-hover:w-5 group-hover:bg-red-600 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-gray-500 tracking-[0.4em] uppercase mb-5">
              Contact
            </h4>
            <div className="space-y-4">
              <a
                href="https://el-guemra-br.github.io/#contact" 
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-600 group-hover:border-red-700/50 transition-colors">
                  <Mail size={16} />
                </div>
                <span className="font-rajdhani text-sm text-gray-300 group-hover:text-red-300 transition-colors">
                  https://el-guemra-br.dev/#contact
                </span>
              </a>

              {/* Download button */}
              <div className="pt-4">
                <a
                  href="#download"
                  onClick={(e) => { e.preventDefault(); scrollTo('#download'); }}
                  className="inline-flex items-center gap-2 bg-red-900/40 hover:bg-red-800/50 border border-red-800/40 hover:border-red-600/60 text-red-300 font-rajdhani font-semibold tracking-widest text-xs uppercase px-5 py-2.5 rounded-lg transition-all"
                >
                  Download APK →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-red-900/15 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-rajdhani text-xs text-white tracking-widest">
            © {new Date().getFullYear()} Black Mafia · All rights reserved.
          </p>
          <div className="flex items-center gap-1 font-rajdhani text-xs text-gray-700">
             
            <span className="text-white">Developed by{' '} </span>
            <span className="text-red-700">el-guemra-br</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
