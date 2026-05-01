const steps = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
    step: "01",
    title: "Upload Your Images",
    description:
      "Drag and drop your JPG, PNG, GIF, BMP, AVIF, or TIFF files onto the converter — or click to browse. You can upload multiple images at once.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
    step: "02",
    title: "Choose Quality",
    description:
      "Use the quality slider to find the perfect balance between file size and visual quality. Higher quality means sharper images; lower quality means smaller files.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="#7f22fe">
        <path d="M6.8762659,15.1237341 C7.93014755,16.8486822 9.83062143,18 12,18 C14.6124377,18 16.8349158,16.3303847 17.6585886,14 L19.747965,14 C18.8598794,17.4504544 15.7276789,20 12,20 C9.28005374,20 6.87714422,18.6426044 5.43172915,16.5682708 L3,19 L3,13 L9,13 L6.8762659,15.1237341 Z M17.1245693,8.87543068 C16.0703077,7.15094618 14.1695981,6 12,6 C9.3868762,6 7.16381436,7.66961525 6.33992521,10 L4.25,10 C5.13831884,6.54954557 8.27134208,4 12,4 C14.7202162,4 17.123416,5.35695218 18.5692874,7.43071264 L21,5 L21,11 L15,11 L17.1245693,8.87543068 Z" id="Shape"> 
        </path>
      </svg>
    ),
    step: "03",
    title: "Instant Conversion",
    description:
      "The conversion happens instantly in your browser using the Canvas API. No server needed. Your images are processed locally — completely private.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    step: "04",
    title: "Download WebP Files",
    description:
      "See the size savings immediately, then download your converted WebP images with a single click. Ready to use on your website right away.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-slate-50 to-violet-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-violet-100 text-violet-600 text-xs font-bold uppercase tracking-widest mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Converting images to WebP has never been easier. Four simple steps and you're done.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative flex flex-col items-center text-center group">
              {/* Connector line (hidden on last) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-violet-200 to-indigo-200 z-0" />
              )}

              {/* Icon circle */}
              <div className="relative z-10 w-20 h-20 rounded-2xl bg-white border-2 border-violet-100 shadow-lg shadow-violet-100/50 flex items-center justify-center text-violet-600 mb-5 group-hover:scale-105 group-hover:border-violet-300 transition-all duration-200">
                {s.icon}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow">
                  {s.step}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-800 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
