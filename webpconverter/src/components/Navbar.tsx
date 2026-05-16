export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-lavender-veil backdrop-blur-md border-b border-lavender shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-lavender to-lavender-grey flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-slate-800 tracking-tight">
            WebP<span className="text-lavender-grey">Converter</span>
          </span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#converter" className="hover:text-lavender-grey transition-colors">Converter</a>
          <a href="#how-it-works" className="hover:text-lavender-grey transition-colors">How It Works</a>
          <a href="#features" className="hover:text-lavender-grey transition-colors">Features</a>
          <a href="#about-webp" className="hover:text-lavender-grey transition-colors">WebP Guide</a>
          <a href="#faq" className="hover:text-lavender-grey transition-colors">FAQ</a>
        </div>

        {/* CTA */}
        <a
          href="#converter"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-lavender-grey hover:bg-lavender text-white text-sm font-semibold shadow transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Convert Now
        </a>
      </nav>
    </header>
  );
}
