export default function SEOContent() {
  return (
    <section
      id="about-webp"
      aria-label="About WebP image format and conversion"
      className="py-20 bg-white border-t border-slate-100"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-violet-100 text-violet-600 text-xs font-bold uppercase tracking-widest mb-4">
            The Complete Guide
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Everything About WebP: The Modern Web Image Format
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Learn what WebP is, why it matters for web performance and SEO, and how to get
            the best results when converting your images.
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Article Column */}
          <div className="lg:col-span-2 space-y-10">

            {/* Block 1 */}
            <article>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 text-xs font-bold">1</span>
                What Is WebP and Why Was It Created?
              </h3>
              <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
                <p>
                  <strong className="text-slate-800">WebP</strong> is a modern image format developed by Google and first
                  released in 2010. It was designed specifically for the web to replace older formats like
                  JPEG and PNG with a single, more efficient format that supports both lossy and lossless
                  compression, transparency (alpha channel), and animation — all in one.
                </p>
                <p>
                  The name "WebP" is pronounced "weppy." The format is based on the VP8 video codec's intra-frame
                  coding, adapted for still images. Google introduced it after acquiring On2 Technologies in 2010,
                  and has continued to improve it with features like ICC color profiles, XMP metadata, and
                  Exif support.
                </p>
                <p>
                  The fundamental problem WebP solves is the fragmentation of web image formats: JPEG is excellent
                  for photos but does not support transparency; PNG supports transparency but produces large files
                  for photographs; GIF supports animation but with severely limited color depth and enormous file
                  sizes. WebP handles all three use cases better than any single predecessor.
                </p>
              </div>
            </article>

            {/* Block 2 */}
            <article>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 text-xs font-bold">2</span>
                WebP vs. JPEG: Which Is Better?
              </h3>
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-800">JPEG</strong> (Joint Photographic Experts Group) has been the
                  dominant photo format on the web since the 1990s. It is excellent at compressing photographic
                  content but has several notable weaknesses: no transparency support, visible compression artifacts
                  (blockiness) at lower quality levels, and relatively large file sizes compared to modern formats.
                </p>
                <p>
                  <strong className="text-slate-800">WebP lossy</strong> consistently produces files that are
                  25–34% smaller than JPEG at the same perceptual quality. This is because WebP uses a more
                  advanced prediction algorithm (based on VP8 key-frame encoding) that better exploits spatial
                  redundancy in images. At quality 80, a WebP image is nearly indistinguishable from the original
                  JPEG but substantially smaller.
                </p>
                <p>
                  For web use in 2024 and beyond, WebP is the clear winner for photographs. The only remaining
                  case for JPEG is when you need compatibility with software or systems that don't support WebP
                  (legacy CMS platforms, some email clients, older photo editing apps).
                </p>
              </div>
            </article>

            {/* Block 3 */}
            <article>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 text-xs font-bold">3</span>
                WebP vs. PNG: Transparency & Lossless Compression
              </h3>
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-800">PNG</strong> (Portable Network Graphics) has been the go-to
                  format for images requiring transparency, crisp edges, and lossless reproduction — UI elements,
                  logos, screenshots, and illustrations. However, PNG files are significantly larger than their
                  WebP equivalents.
                </p>
                <p>
                  <strong className="text-slate-800">WebP lossless</strong> produces files that are approximately
                  26% smaller than PNG on average, while maintaining pixel-perfect reproduction. This makes
                  lossless WebP ideal for logos, icons, text-heavy graphics, and any image where quality must
                  be preserved exactly.
                </p>
                <p>
                  <strong className="text-slate-800">WebP lossy with transparency</strong> is even more powerful:
                  it can produce files 60–80% smaller than a transparent PNG, making it perfect for product
                  images with white-removed backgrounds, UI overlays, and illustrations on e-commerce sites.
                </p>
                <p>
                  Our converter preserves all transparency data when converting PNG to WebP. If your source PNG
                  has a transparent background, the downloaded WebP will too — automatically.
                </p>
              </div>
            </article>

            {/* Block 4 */}
            <article>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 text-xs font-bold">4</span>
                How WebP Improves Your Website's SEO & Core Web Vitals
              </h3>
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>
                  Since 2021, <strong className="text-slate-800">Core Web Vitals</strong> are official Google
                  ranking signals. The three metrics are Largest Contentful Paint (LCP), Cumulative Layout Shift
                  (CLS), and Interaction to Next Paint (INP). Image optimization directly impacts LCP, which
                  measures how quickly the largest visible element on a page loads.
                </p>
                <p>
                  A typical unoptimized JPEG hero image might be 500 KB–1.5 MB. The equivalent WebP at quality 80
                  is often 150–400 KB. On a mobile connection (average 10 Mbps), that difference means the hero
                  image loads 0.3–0.9 seconds faster — a significant improvement that can push your LCP into
                  the "Good" range (under 2.5 seconds).
                </p>
                <p>
                  <strong className="text-slate-800">Google PageSpeed Insights</strong> and
                  <strong className="text-slate-800"> Lighthouse</strong> both flag JPEG and PNG images as
                  improvement opportunities and specifically recommend serving images in next-gen formats like
                  WebP. Implementing WebP can raise your PageSpeed score by 10–30 points, depending on how
                  image-heavy your site is.
                </p>
                <p>
                  Beyond direct ranking signals, faster pages reduce bounce rates and increase session duration
                  — behavioral signals that Google also considers when ranking pages. WebP is one of the
                  highest-ROI optimizations you can make.
                </p>
              </div>
            </article>

            {/* Block 5 */}
            <article>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 text-xs font-bold">5</span>
                How to Use WebP on Your Website (WordPress, Shopify & More)
              </h3>
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>
                  Once you've converted your images to WebP using this tool, deploying them depends on your
                  platform:
                </p>
                <p>
                  <strong className="text-slate-800">Plain HTML:</strong> Use the{" "}
                  <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-violet-700">&lt;picture&gt;</code>{" "}
                  element to serve WebP with a JPEG fallback:
                </p>
                <pre className="bg-slate-900 text-green-400 text-xs rounded-xl p-4 overflow-x-auto leading-relaxed">
{`<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" />
</picture>`}
                </pre>
                <p>
                  <strong className="text-slate-800">WordPress:</strong> Plugins like ShortPixel, Smush, or
                  WebP Express automatically convert and serve WebP images to supported browsers. Alternatively,
                  Cloudflare's Image Resizing feature can serve WebP automatically from your existing images.
                </p>
                <p>
                  <strong className="text-slate-800">Shopify:</strong> Shopify's CDN automatically serves WebP to
                  supported browsers when you use the built-in{" "}
                  <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-violet-700">image_tag</code>{" "}
                  Liquid filter. No manual conversion is needed for theme images, but product images you upload
                  should ideally already be in WebP.
                </p>
                <p>
                  <strong className="text-slate-800">React / Next.js:</strong> Next.js has built-in image
                  optimization via the{" "}
                  <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-violet-700">&lt;Image&gt;</code>{" "}
                  component, which automatically converts and serves WebP. For plain React, use the
                  <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-violet-700"> &lt;picture&gt;</code>{" "}
                  pattern above.
                </p>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">

            {/* Quick Stats Card */}
            <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 p-6 text-white">
              <h4 className="font-extrabold text-base mb-4">WebP by the Numbers</h4>
              <ul className="space-y-3">
                {[
                  { stat: "34%", desc: "smaller than JPEG (lossy)" },
                  { stat: "26%", desc: "smaller than PNG (lossless)" },
                  { stat: "64%", desc: "smaller than GIF (animation)" },
                  { stat: "97%+", desc: "global browser support" },
                  { stat: "2010", desc: "released by Google" },
                  { stat: "#1", desc: "recommended by Google PageSpeed" },
                ].map((item) => (
                  <li key={item.desc} className="flex items-center justify-between gap-2">
                    <span className="text-violet-200 text-xs leading-tight">{item.desc}</span>
                    <span className="font-extrabold text-white text-sm whitespace-nowrap">{item.stat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Supported Formats Card */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <h4 className="font-extrabold text-slate-800 text-base mb-4">Supported Input Formats</h4>
              <div className="space-y-2">
                {[
                  { fmt: "JPEG / JPG", desc: "Photos, social media images" },
                  { fmt: "PNG", desc: "Logos, UI, transparent images" },
                  { fmt: "GIF", desc: "Animations, simple graphics" },
                  { fmt: "BMP", desc: "Uncompressed bitmaps" },
                  { fmt: "AVIF", desc: "Next-gen format (Chrome, Firefox)" },
                  { fmt: "TIFF", desc: "Print & professional photography" },
                  { fmt: "SVG", desc: "Scalable vector graphics" },
                  { fmt: "ICO", desc: "Windows icons" },
                ].map((f) => (
                  <div key={f.fmt} className="flex items-start gap-2">
                    <span className="mt-0.5 w-4 h-4 rounded flex-shrink-0 bg-violet-100 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div>
                      <span className="text-xs font-bold text-slate-700">{f.fmt}</span>
                      <span className="text-xs text-slate-400"> — {f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Guide Card */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-base mb-4">Quality Setting Guide</h4>
              <div className="space-y-3">
                {[
                  { range: "85–95%", use: "Portraits, product photos, artwork", color: "bg-emerald-400" },
                  { range: "75–84%", use: "Blog images, hero banners, general web", color: "bg-blue-400" },
                  { range: "60–74%", use: "Thumbnails, social media previews", color: "bg-yellow-400" },
                  { range: "30–59%", use: "Background textures, decorative elements", color: "bg-orange-400" },
                  { range: "10–29%", use: "LQIP placeholders, extreme compression", color: "bg-red-400" },
                ].map((q) => (
                  <div key={q.range}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-700">{q.range}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100 mb-1">
                      <div className={`h-full rounded-full ${q.color}`} style={{ width: q.range.split("–")[1] }} />
                    </div>
                    <span className="text-xs text-slate-400 leading-tight">{q.use}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-violet-50 border border-violet-100 p-6 text-center">
              <div className="text-3xl mb-3" style={{ alignItems: "center" }}><img src="./icons/rocket-chat.webp" alt="Ready to optimize?" className="w-8 h-8" /></div>
              <h4 className="font-extrabold text-slate-800 text-base mb-2">Ready to optimize?</h4>
              <p className="text-slate-500 text-xs mb-4">
                Convert your first image in under 5 seconds — no sign-up needed.
              </p>
              <a
                href="#converter"
                className="block w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold shadow transition-colors text-center"
              >
                Start Converting Free
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
