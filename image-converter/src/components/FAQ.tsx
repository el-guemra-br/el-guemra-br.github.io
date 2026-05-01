import { useState } from "react";

interface FAQItem {
  category: string;
  q: string;
  a: string | string[];
  keywords?: string[];
}

const faqs: FAQItem[] = [
  // ── GENERAL ────────────────────────────────────────────────────
  {
    category: "General",
    q: "Is this WebP converter really free to use?",
    keywords: ["free webp converter", "no cost image converter", "free online image converter"],
    a: [
      "Yes — completely and unconditionally free. There are no hidden subscription plans, no 'Pro' tiers, no per-conversion fees, and no watermarks added to your converted images. You can convert as many images as you want, as large as your browser can handle, without ever being asked for a credit card or an email address.",
      "We believe image format conversion is a basic utility that everyone should have free access to. Many other online converters place artificial limits (e.g. 'only 5 files per day' or 'max 2 MB per file') to push you toward a paid plan. We don't do any of that. WebP Converter is and will remain free for everyone, forever.",
    ],
  },
  {
    category: "General",
    q: "Do I need to create an account or sign up?",
    keywords: ["no signup image converter", "no registration webp converter"],
    a: [
      "No account, no sign-up, and no registration of any kind is required. Simply open the page, drop your images into the converter, and download the results. Nothing is tracked, no cookies are set for analytics, and no personal data is collected.",
      "The entire application runs inside your web browser as a client-side tool. Because conversion happens locally on your device, there is no need for us to know who you are.",
    ],
  },

  // ── PRIVACY & SECURITY ─────────────────────────────────────────
  {
    category: "Privacy & Security",
    q: "Are my images uploaded to a server? Is this converter safe?",
    keywords: ["safe image converter", "private webp converter", "no upload image converter", "images not uploaded to server"],
    a: [
      "Your images are never uploaded anywhere. This is not a marketing claim — it is a technical fact. All conversion logic runs entirely inside your web browser using the built-in HTML5 Canvas API. When you select or drop an image, it is read from your local disk into browser memory, drawn onto an off-screen canvas, and exported as a WebP blob — all without a single byte leaving your device.",
      "This design means the converter also works without an internet connection after the page has loaded. It is safe for converting confidential, proprietary, or personal images — scanned documents, medical images, private photos — because nobody else ever has access to them.",
      "Many online converters receive, store, and process images on their servers, creating real privacy risks. We deliberately chose a browser-native approach so that security is not a concern at all.",
    ],
  },
  {
    category: "Privacy & Security",
    q: "Does the tool work offline or without an internet connection?",
    keywords: ["offline webp converter", "webp converter without internet"],
    a: [
      "Yes. After the page has loaded in your browser, the converter works entirely offline. Because all conversion logic is embedded in the JavaScript running in your browser, no network requests are made during the actual conversion process. You can disconnect from the internet after loading the page and continue converting images without any issue.",
      "This makes it especially useful in environments with restricted network access, such as corporate networks, or when you are working with sensitive files and want the absolute guarantee that data cannot leave your machine.",
    ],
  },

  // ── FORMATS & COMPATIBILITY ────────────────────────────────────
  {
    category: "Formats & Compatibility",
    q: "What image formats can I convert to WebP?",
    keywords: ["jpg to webp", "png to webp", "gif to webp", "bmp to webp", "avif to webp", "tiff to webp", "heic to webp", "supported image formats"],
    a: [
      "You can convert any image format that your browser is capable of rendering. In practice, this includes: JPEG / JPG, PNG, GIF (static and animated), BMP, AVIF, TIFF, SVG, ICO, and WebP itself (useful for re-compressing at a different quality level).",
      "HEIC/HEIF (the format used by iPhone cameras) support depends on your browser. Safari on macOS/iOS supports it natively. On Chrome or Firefox, HEIC files may not be directly readable. In that case, convert HEIC to JPG first using the Photos app or another tool, then convert to WebP here.",
      "We do not support video formats (MP4, MOV, etc.) or PDF — this tool is strictly for raster and vector still images.",
    ],
  },
  {
    category: "Formats & Compatibility",
    q: "Do all browsers and devices support WebP images?",
    keywords: ["browser support webp", "webp safari support", "webp ios support", "webp compatibility"],
    a: [
      "As of 2024, WebP is supported by all major browsers worldwide, covering more than 97% of global internet users. Specifically: Google Chrome (version 23+, 2012), Mozilla Firefox (version 65+, 2019), Microsoft Edge (version 18+, 2018), Safari (version 14+, macOS Big Sur and iOS 14, released 2020), Opera, Samsung Internet, and most other Chromium-based browsers.",
      "If you need to support very old browsers like Internet Explorer 11, WebP will not display. In those rare cases, web developers can use the HTML <picture> element to serve WebP to supported browsers and JPEG/PNG as a fallback. However, for the vast majority of modern websites and apps, WebP is the recommended default format.",
      "On mobile, WebP is supported on all modern Android and iOS devices.",
    ],
  },
  {
    category: "Formats & Compatibility",
    q: "Does WebP support transparent backgrounds (like PNG does)?",
    keywords: ["webp transparency", "webp alpha channel", "transparent webp", "png to webp with transparency"],
    a: [
      "Yes. WebP fully supports an alpha channel (transparency), just like PNG. When you convert a PNG file that has a transparent background or semi-transparent areas to WebP, the transparency is preserved perfectly in the output file.",
      "WebP handles transparency more efficiently than PNG. A transparent WebP file is typically 26% smaller than the equivalent transparent PNG, making it ideal for logos, icons, UI elements, and product images on e-commerce sites.",
      "If you convert a JPEG to WebP, the output will not have a transparent background — because JPEG itself does not support transparency, so there is no transparency data to carry over.",
    ],
  },

  // ── QUALITY & COMPRESSION ──────────────────────────────────────
  {
    category: "Quality & Compression",
    q: "Will I lose image quality when converting to WebP?",
    keywords: ["webp quality loss", "lossy webp conversion", "lossless webp", "webp vs jpeg quality"],
    a: [
      "It depends on the quality setting you choose and the compression mode you want. WebP supports both lossy and lossless compression.",
      "Lossy WebP (quality 1–99): The image is re-compressed, meaning some data is discarded to achieve a smaller file. At quality 80–90, the visual difference compared to the original JPEG or PNG is virtually imperceptible to the human eye, while the file size is significantly smaller. At quality 100 (lossy), the output is very high quality but still slightly lossy.",
      "At very low quality settings (10–40), you will notice visible compression artifacts — blocky or blurry areas. This is useful when file size is the absolute priority (e.g., thumbnail previews) and perfect sharpness is not required.",
      "Recommendation: For photos, use quality 75–85. For UI graphics, logos, and text-heavy images, use quality 85–95 for the best balance. Experiment with the slider and compare the file size savings shown before downloading.",
    ],
  },
  {
    category: "Quality & Compression",
    q: "How much smaller will my images be after converting to WebP?",
    keywords: ["how much smaller webp", "webp file size reduction", "webp compression ratio", "image size savings webp"],
    a: [
      "File size savings vary depending on the original format, the content of the image, and the quality level you choose. Based on Google's official WebP study and real-world testing:",
      "• Compared to JPEG: WebP lossy images are typically 25–34% smaller at equivalent perceptual quality. In some cases (simple graphics, areas of flat color), savings can reach 50%+.",
      "• Compared to PNG: WebP lossy images are typically 60–80% smaller. WebP lossless images (for pixel-perfect reproduction) are still about 26% smaller than equivalent PNGs.",
      "• Compared to GIF: Animated WebP files are 64% smaller than the equivalent animated GIF.",
      "Our converter displays the exact before and after file size and the percentage saved for every image you convert, so you can see your savings in real time.",
    ],
  },
  {
    category: "Quality & Compression",
    q: "What quality setting should I use?",
    keywords: ["best webp quality setting", "webp quality recommendation", "optimal webp quality"],
    a: [
      "Here are our recommended quality settings for different use cases:",
      "• 85% (Default): The best all-round setting. Works well for photographs, product images, and general web content. Provides excellent visual quality with substantial file size savings.",
      "• 90–95%: Use for images where fine detail is critical — portraits, product photography, artwork, medical imaging. Still smaller than JPEG at the same visual quality.",
      "• 75–80%: Great for social media thumbnails, blog post images, and background images where users won't zoom in. Maximizes savings while keeping images sharp at normal viewing sizes.",
      "• 50–70%: Suitable for low-priority images, decorative backgrounds, and images viewed at small sizes. Noticeable quality reduction on close inspection, but very small files.",
      "• 10–40%: Extreme compression. Use only when bandwidth is extremely constrained or for placeholder/blurred preview images (LQIP technique).",
    ],
  },

  // ── TECHNICAL ──────────────────────────────────────────────────
  {
    category: "Technical",
    q: "How does the browser-based conversion actually work?",
    keywords: ["how webp conversion works", "canvas api webp", "browser image conversion", "client side image processing"],
    a: [
      "The conversion uses the HTML5 Canvas API, which is a built-in feature of every modern web browser. Here is the step-by-step process:",
      "1. Your image file is read from disk into browser memory using the FileReader API, creating a temporary object URL.",
      "2. An <img> element loads the image using that URL, triggering the browser's native image decoder (which supports all the formats your browser understands).",
      "3. The decoded image is drawn onto an off-screen <canvas> element at its original pixel dimensions.",
      "4. The canvas.toBlob() method is called with the type 'image/webp' and your chosen quality value (0.0 to 1.0). The browser's built-in WebP encoder compresses the canvas pixel data into a WebP file.",
      "5. The resulting WebP blob is turned into a download URL, and the size, savings percentage, and a preview are shown to you.",
      "Everything happens in milliseconds inside the browser's JavaScript engine. No external libraries, no server calls, no binary executables — just native browser APIs.",
    ],
  },
  {
    category: "Technical",
    q: "Is there a file size or number of files limit?",
    keywords: ["webp converter file size limit", "max image size converter", "how many images can I convert"],
    a: [
      "There is no artificial limit imposed by us. The practical limit is your device's available memory (RAM). Modern browsers can handle image files of several hundred megabytes without issue. For reference, a typical 24-megapixel JPEG photo is around 5–10 MB, and even dozens of those can be processed comfortably.",
      "For batch conversion, you can select and drop as many files as you like. They are processed sequentially to avoid memory spikes. If you are converting extremely large images (50 MB+) in bulk, it is best to do them in smaller batches to avoid browser slowdowns.",
      "There is also no daily limit, no monthly limit, and no session limit. Convert as many files as you need.",
    ],
  },
  {
    category: "Technical",
    q: "Can I convert images in bulk / batch mode?",
    keywords: ["bulk image to webp", "batch convert images webp", "convert multiple images at once webp"],
    a: [
      "Yes. The converter supports batch processing. You can select multiple files at once using your operating system's file picker (hold Ctrl/Cmd or Shift to multi-select) or drag and drop an entire selection of image files onto the drop zone.",
      "Each image is converted individually and all results appear in the results list simultaneously. Each converted file has its own download button. If you want to grab everything at once, use your browser's download manager or right-click each to save — a 'Download All as ZIP' feature is on our roadmap.",
      "All conversions happen in parallel where possible, so converting 20 images takes barely longer than converting 1.",
    ],
  },

  // ── SEO & WEB PERFORMANCE ─────────────────────────────────────
  {
    category: "SEO & Web Performance",
    q: "How does converting to WebP improve my website's SEO and performance?",
    keywords: ["webp seo benefits", "webp page speed", "webp core web vitals", "webp google ranking", "image optimization seo"],
    a: [
      "Image optimization is one of the highest-impact things you can do for web performance, and WebP is the gold standard for web images in 2024. Here's how it helps your SEO:",
      "Faster Page Load Speed: WebP images load faster because they are smaller. Google uses page load speed as a direct ranking factor in its search algorithm. A page that loads 1 second faster can see significantly higher rankings and lower bounce rates.",
      "Core Web Vitals: Google's Core Web Vitals (LCP, CLS, FID) are official ranking signals. Largest Contentful Paint (LCP) — which measures how quickly your main image or hero content appears — is directly improved by using smaller, faster-loading WebP images.",
      "Google PageSpeed Insights: When you run a URL through Google PageSpeed Insights, one of the most common recommendations is 'Serve images in next-gen formats.' WebP is that next-gen format. Switching to WebP can instantly raise your PageSpeed score.",
      "Reduced Bandwidth: Smaller images reduce server bandwidth costs and improve performance on mobile networks, which is where a large portion of web traffic comes from.",
      "Better User Experience: Faster-loading images reduce bounce rates. Google interprets low bounce rates and longer session times as quality signals, which can improve your rankings further.",
    ],
  },
  {
    category: "SEO & Web Performance",
    q: "Should I replace all images on my website with WebP?",
    keywords: ["replace images webp website", "migrate to webp", "webp for all images", "webp website optimization"],
    a: [
      "For most modern websites, yes — converting all images to WebP is the recommended best practice. Since browser support for WebP is now above 97% globally, the risk of compatibility issues is minimal.",
      "To handle the remaining <3% of users on older browsers, use the HTML <picture> element to serve WebP to supported browsers with a JPEG/PNG fallback. Most CMS platforms and image CDNs (Cloudflare, Imgix, Cloudinary) can do this automatically.",
      "Priority candidates for WebP conversion: hero images and banners (largest impact on LCP), product images on e-commerce sites, blog post feature images, gallery images, background images, and any image larger than ~20 KB.",
      "For very small icons and simple graphics, SVG is still often preferred since it scales infinitely without quality loss. For animated content, modern browsers support animated WebP and AVIF, which are far more efficient than GIF.",
    ],
  },

  // ── TROUBLESHOOTING ────────────────────────────────────────────
  {
    category: "Troubleshooting",
    q: "My converted WebP file is larger than the original. Why?",
    keywords: ["webp larger than jpeg", "webp bigger than png", "webp not smaller", "webp conversion size increase"],
    a: [
      "This can happen in some situations, and it is important to understand why:",
      "PNG → WebP at high quality: If the original PNG was already very well compressed (especially for images with flat colors, gradients, or text), a lossy WebP at quality 90+ can sometimes be slightly larger because WebP's lossy codec introduces additional overhead for very simple pixel patterns. Try lowering the quality to 75–85 — you'll likely get a smaller result with no visible difference.",
      "Small images: Very small images (under 10 KB) sometimes see negligible or even negative savings because the WebP file format headers and metadata add a fixed overhead. For tiny thumbnails or small icons, this overhead can outweigh the compression benefit.",
      "JPEG that was already heavily compressed: If the source JPEG was already saved at quality 50–60% by another tool, the file is already quite compressed. Converting it to WebP at quality 85% can produce a larger file because you're upscaling the encoded quality. Match or slightly reduce the quality setting.",
      "Solution: Try different quality settings. The converter shows you the exact output size, so you can experiment until you're satisfied. If the original is already perfectly optimized, keeping it as-is is a valid choice.",
    ],
  },
  {
    category: "Troubleshooting",
    q: "The converter does not work or my image fails to convert. What should I do?",
    keywords: ["webp converter not working", "image conversion failed", "webp converter error", "image not converting"],
    a: [
      "Here are the most common causes and solutions:",
      "Unsupported file type: Make sure the file is actually an image and has a valid extension (.jpg, .png, .gif, .bmp, .avif, etc.). Some files may have incorrect extensions. The converter accepts any file your browser can render.",
      "HEIC/HEIF files (iPhone photos): These are not natively supported by Chrome or Firefox. Convert them to JPEG first using your phone's camera export settings, macOS Preview, or Windows' built-in Photos app.",
      "Corrupt image file: If the image file is corrupted or partially downloaded, the browser cannot decode it. Try opening the file in another application first to confirm it displays correctly.",
      "Very large files: For extremely large images (>100 MB), the browser may run out of memory. Try converting fewer images at once or use a desktop application like GIMP or ImageMagick for oversized files.",
      "Browser compatibility: The converter requires a modern browser with Canvas API support. Update your browser to the latest version. Avoid using private/incognito mode with strict content blocking, as some settings can restrict the Canvas API.",
    ],
  },
];

const categories = Array.from(new Set(faqs.map((f) => f.category)));

function FAQItemComponent({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  const renderAnswer = (a: string | string[]) => {
    const lines = Array.isArray(a) ? a : [a];
    return lines.map((line, i) => {
      // Bullet list line
      if (line.startsWith("•")) {
        return (
          <li key={i} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
            <span className="text-violet-500 mt-0.5 flex-shrink-0">•</span>
            <span>{line.replace(/^•\s*/, "")}</span>
          </li>
        );
      }
      // Numbered step line
      if (/^\d+\./.test(line)) {
        return (
          <li key={i} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
            <span className="text-violet-600 font-bold flex-shrink-0 min-w-[1.25rem]">{line.match(/^\d+/)?.[0]}.</span>
            <span>{line.replace(/^\d+\.\s*/, "")}</span>
          </li>
        );
      }
      // Bold intro lines (title-like paragraph openers)
      if (lines.length > 1 && i === 0 && !line.startsWith("•") && !/^\d+\./.test(line)) {
        return (
          <p key={i} className="text-slate-700 text-sm leading-relaxed font-medium">
            {line}
          </p>
        );
      }
      return (
        <p key={i} className="text-slate-500 text-sm leading-relaxed">
          {line}
        </p>
      );
    });
  };

  const hasList = Array.isArray(item.a) && item.a.some((l) => l.startsWith("•") || /^\d+\./.test(l));

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
        open ? "border-violet-200 shadow-md shadow-violet-100/50" : "border-slate-100"
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-start justify-between gap-4 px-6 py-5 text-left transition-colors ${
          open ? "bg-violet-50/60" : "bg-white hover:bg-slate-50"
        }`}
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-800 text-sm sm:text-base leading-snug">{item.q}</span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5 ${
            open ? "rotate-180 bg-violet-600 text-white" : "bg-slate-100 text-slate-400"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="px-6 pb-6 bg-white border-t border-violet-50">
          <div className={`pt-4 ${hasList ? "space-y-1" : "space-y-3"}`}>
            {hasList ? (
              <>
                {/* Render non-list lines as paragraphs, list lines as <ul> */}
                {(() => {
                  const lines = Array.isArray(item.a) ? item.a : [item.a];
                  const elements: React.ReactNode[] = [];
                  let listBuffer: string[] = [];

                  const flushList = (key: string) => {
                    if (listBuffer.length > 0) {
                      elements.push(
                        <ul key={key} className="space-y-1.5 mt-1">
                          {listBuffer.map((l, li) => (
                            <li key={li} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
                              {/^\d+\./.test(l) ? (
                                <>
                                  <span className="text-violet-600 font-bold flex-shrink-0 min-w-[1.4rem]">{l.match(/^\d+/)?.[0]}.</span>
                                  <span>{l.replace(/^\d+\.\s*/, "")}</span>
                                </>
                              ) : (
                                <>
                                  <span className="text-violet-500 flex-shrink-0 mt-0.5">▸</span>
                                  <span>{l.replace(/^•\s*/, "")}</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      );
                      listBuffer = [];
                    }
                  };

                  lines.forEach((line, i) => {
                    if (line.startsWith("•") || /^\d+\./.test(line)) {
                      listBuffer.push(line);
                    } else {
                      flushList(`list-${i}`);
                      const isFirst = elements.length === 0;
                      elements.push(
                        <p
                          key={`p-${i}`}
                          className={`text-sm leading-relaxed ${
                            isFirst ? "font-medium text-slate-700" : "text-slate-500"
                          }`}
                        >
                          {line}
                        </p>
                      );
                    }
                  });
                  flushList("list-end");
                  return elements;
                })()}
              </>
            ) : (
              renderAnswer(item.a)
            )}
          </div>

          {/* Keyword tags — visually subtle, helps with topical relevance */}
          {item.keywords && item.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-50">
              {item.keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-slate-400 text-[10px] font-medium leading-none"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All" ? faqs : faqs.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-slate-50 to-violet-50/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-violet-100 text-violet-600 text-xs font-bold uppercase tracking-widest mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            In-depth answers to everything you need to know about converting images to WebP — formats, quality, privacy, SEO, and more.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-150 ${
                activeCategory === cat
                  ? "bg-violet-600 text-white border-violet-600 shadow"
                  : "bg-white text-slate-500 border-slate-200 hover:border-violet-300 hover:text-violet-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-center text-xs text-slate-400 mb-6">
          Showing {filtered.length} of {faqs.length} questions
        </p>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filtered.map((faq) => (
            <FAQItemComponent key={faq.q} item={faq} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center rounded-2xl bg-white border border-violet-100 p-8 shadow-sm">
          <div className="text-2xl mb-3">💬</div>
          <h3 className="font-bold text-slate-800 mb-2">Still have a question?</h3>
          <p className="text-slate-500 text-sm mb-4">
            Can't find the answer you're looking for? Check out our features section or just try the converter — it speaks for itself.
          </p>
          <a
            href="#converter"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold shadow transition-colors"
          >
            Try the Converter
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        {/* Schema.org FAQ JSON-LD — structured data for Google rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: Array.isArray(f.a) ? f.a.join(" ") : f.a,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}
