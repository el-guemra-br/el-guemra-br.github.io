export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50 pt-16 pb-12">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold uppercase tracking-widest mb-6 border border-violet-200">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          100% Free · No Sign-up · No Server Uploads
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
          Convert Images to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
            WebP Format
          </span>{" "}
          Instantly
        </h1>

        {/* Sub-heading */}
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
          Transform your JPG, PNG, GIF, BMP, and AVIF images into the modern WebP format
          right in your browser. Smaller files, faster websites — no quality compromises.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {[
            { value: "Up to 80%", label: "Smaller File Size" },
            { value: "100%", label: "Private & Secure" },
            { value: "Instant", label: "No Waiting" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-extrabold text-violet-600">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Arrow */}
        <a
          href="#converter"
          className="inline-flex flex-col items-center gap-1 text-slate-400 hover:text-violet-600 transition-colors group"
        >
          <span className="text-sm font-medium">Start Converting</span>
          <svg
            className="w-5 h-5 animate-bounce group-hover:text-violet-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
