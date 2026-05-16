export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-lavender-grey text-slate-800">
      {/* Top Banner */}
      <div className="py-10 px-4 text-center" style={{ backgroundColor: 'var(--lavender)', color: '#021025' }}>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
          Ready to shrink your images?
        </h2>
        <p className="mb-6 text-sm sm:text-base text-thistle">
          Free, instant, private — no sign-up required.
        </p>
        <a
          href="#converter"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lavender-veil text-lavender-grey font-bold text-sm shadow-lg hover:opacity-90 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Convert Images Now
        </a>
      </div>

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-lavender to-lavender-grey flex items-center justify-center shadow">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">
              WebP<span className="text-lavender-veil">Converter</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            A free, browser-based tool to convert your images to the modern WebP format.
            No uploads, no sign-ups, no limits.
          </p>
          <div className="flex gap-3 mt-5">
            {/* Supported formats badges */}
            {["JPG", "PNG", "GIF", "BMP", "AVIF"].map((f) => (
              <span key={f} className="px-2 py-0.5 rounded bg-lavender-grey/80 text-thistle text-xs font-mono border border-lavender">
                {f}
              </span>
            ))}
            <span className="px-2 py-0.5 rounded bg-lavender/80 text-lavender-grey text-xs font-mono border border-lavender">
              → WebP
            </span>
          </div>
        </div>

        {/* Tool Links */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Tool</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#converter" className="hover:text-violet-400 transition-colors">Image Converter</a></li>
            <li><a href="#how-it-works" className="hover:text-violet-400 transition-colors">How It Works</a></li>
            <li><a href="#features" className="hover:text-violet-400 transition-colors">Features</a></li>
            <li><a href="#about-webp" className="hover:text-violet-400 transition-colors">WebP Guide</a></li>
            <li><a href="#faq" className="hover:text-violet-400 transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* Why WebP */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Why WebP?</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-1.5">
              <span className="text-violet-400">✓</span> Smaller file sizes
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-violet-400">✓</span> Faster websites
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-violet-400">✓</span> Better SEO
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-violet-400">✓</span> Transparency support
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-violet-400">✓</span> All browsers supported
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-5 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <p>© {year} WebPConverter. All rights reserved.</p>
          <p>
            Developed by <a href="https://github.com/el-guemra-br" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition-colors">el-guemra-br</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
