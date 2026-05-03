const features = [
  {
    icon: <img src={`${import.meta.env.BASE_URL}icons/private.webp`} alt="100% Private" className="w-8 h-8" />,
    title: "100% Private",
    description:
      "All conversion happens inside your browser. Your images are never uploaded to any server — not even ours. Complete privacy, guaranteed.",
    highlight: true,
  },
  {
    icon: <img src={`${import.meta.env.BASE_URL}icons/lightning-fast.webp`} alt="Lightning Fast" className="w-8 h-8" />,
    title: "Lightning Fast",
    description:
      "Native browser Canvas API powers the conversion. Most images convert in under a second, regardless of your internet speed.",
    highlight: false,
  },
  {
    icon: <img src={`${import.meta.env.BASE_URL}icons/conversion.webp`} alt="Batch Conversion" className="w-8 h-8" />,
    title: "Batch Conversion",
    description:
      "Convert an entire folder of images in one go. Select multiple files and they'll all be converted and ready to download simultaneously.",
    highlight: true,
  },
  
  {
    icon: <img src={`${import.meta.env.BASE_URL}icons/control.webp`} alt="Quality Control" className="w-8 h-8" />,
    title: "Quality Control",
    description:
      "Fine-tune the output quality from 10% to 100% using the built-in slider. Preview size savings before you even download.",
    highlight: false,
  },
  {
    icon: <img src={`${import.meta.env.BASE_URL}icons/file-code.webp`} alt="All Major Formats" className="w-8 h-8" />,
    title: "All Major Formats",
    description:
      "Supports JPG/JPEG, PNG, GIF, BMP, AVIF, TIFF, and any other format your browser can render — all converted to modern WebP.",
    highlight: true,
  },
  {
    icon: <img src={`${import.meta.env.BASE_URL}icons/money-bag.webp`} alt="Completely Free" className="w-8 h-8" />,
    title: "Completely Free",
    description:
      "No subscriptions, no watermarks, no limits on file count or size. WebP Converter is free forever — no strings attached.",
    highlight: false,
  },
];

const whyWebP = [
  { label: "JPEG", size: "100%", color: "bg-red-400" },
  { label: "PNG", size: "130%", color: "bg-orange-400" },
  { label: "WebP", size: "40%", color: "bg-violet-500" },
  { label: "WebP (lossless)", size: "70%", color: "bg-indigo-400" },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-violet-100 text-violet-600 text-xs font-bold uppercase tracking-widest mb-4">
            Why Use Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Everything You Need, Nothing You Don't
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            A fast, private, and powerful WebP converter built with modern web technologies.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((f) => (
            <div
              key={f.title}
              className={`rounded-2xl p-6 border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                f.highlight
                  ? "bg-gradient-to-br from-violet-50 to-indigo-50 border-violet-200 shadow-violet-100/50"
                  : "bg-slate-50 border-slate-100"
              }`}
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-base font-bold text-slate-800 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Why WebP Section */}
        <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-8 sm:p-12 text-white overflow-hidden relative">
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/5 rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-white/5 rounded-full" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight">
                Why Convert to WebP?
              </h2>
              <ul className="space-y-3 text-violet-100 text-sm">
                {[
                  "WebP images are up to 34% smaller than JPEG at equivalent quality",
                  "Up to 26% smaller than PNG for images with transparency",
                  "Supported by all modern browsers (Chrome, Firefox, Safari, Edge)",
                  "Faster page loads = better SEO rankings on Google",
                  "Supports both lossy and lossless compression",
                  "Supports transparency (alpha channel) like PNG",
                  "Supports animations like GIF but with much smaller file sizes",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 text-violet-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Comparison Bar Chart */}
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold text-violet-200 mb-5 uppercase tracking-wider">
                Relative File Size (same image)
              </p>
              <div className="space-y-4">
                {whyWebP.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-white">{item.label}</span>
                      <span className="text-sm font-bold text-white">{item.size}</span>
                    </div>
                    <div className="h-3 rounded-full bg-white/20 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-700`}
                        style={{ width: item.size }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-violet-300 mt-4">
                * Based on Google's WebP study. Results may vary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
