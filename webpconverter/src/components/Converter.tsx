import { useState, useRef, useCallback } from "react";

interface ConvertedFile {
  originalName: string;
  originalSize: number;
  webpSize: number;
  webpUrl: string;
  previewUrl: string;
  savings: number;
}

export default function Converter() {
  const [quality, setQuality] = useState(85);
  const [converting, setConverting] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [results, setResults] = useState<ConvertedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const convertToWebP = useCallback(
    async (files: FileList | File[]) => {
      setConverting(true);
      const fileArray = Array.from(files);
      const converted: ConvertedFile[] = [];

      for (const file of fileArray) {
        if (!file.type.startsWith("image/")) continue;

        const objectUrl = URL.createObjectURL(file);
        const img = new Image();

        await new Promise<void>((resolve) => {
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(
              (blob) => {
                if (!blob) { resolve(); return; }
                const webpUrl = URL.createObjectURL(blob);
                const savings = Math.max(0, ((file.size - blob.size) / file.size) * 100);
                converted.push({
                  originalName: file.name.replace(/\.[^/.]+$/, "") + ".webp",
                  originalSize: file.size,
                  webpSize: blob.size,
                  webpUrl,
                  previewUrl: objectUrl,
                  savings,
                });
                resolve();
              },
              "image/webp",
              quality / 100
            );
          };
          img.onerror = () => resolve();
          img.src = objectUrl;
        });
      }

      setResults((prev) => [...converted, ...prev]);
      setConverting(false);
    },
    [quality]
  );

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      convertToWebP(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) convertToWebP(e.dataTransfer.files);
  };

  const clearAll = () => {
    results.forEach((r) => {
      URL.revokeObjectURL(r.webpUrl);
      URL.revokeObjectURL(r.previewUrl);
    });
    setResults([]);
  };

  return (
    <section id="converter" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
            Image to WebP Converter
          </h2>
          <p className="text-slate-500 text-lg">
            Drop your images below. Everything happens locally — your files never leave your device.
          </p>
        </div>

        {/* Quality Slider */}
        <div className="mb-6 bg-slate-50 rounded-2xl p-5 border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-slate-700">
              Quality:{" "}
              <span className="text-violet-600 font-bold">{quality}%</span>
            </label>
            <span className="text-xs text-slate-400">
              {quality >= 90 ? (
                <img src="./icons/box.webp" alt="Best Quality" className="w-4 h-4" />
              ) : quality >= 70 ? (
                <img src="./icons/balance.webp" alt="Balanced" className="w-4 h-4" />
              ) : (
                <img src="./icons/compressio.webp" alt="Max Compression" className="w-4 h-4" />
              )}
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            step={1}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full h-2 rounded-full accent-violet-600 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>Smaller file</span>
            <span>Better quality</span>
          </div>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 py-16 px-8 text-center
            ${dragging
              ? "border-violet-500 bg-violet-50 scale-[1.01]"
              : "border-slate-200 bg-slate-50 hover:border-violet-400 hover:bg-violet-50"
            }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFiles}
          />

          {converting ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin" />
              <p className="text-slate-500 font-medium">Converting…</p>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-800">
                  {dragging ? "Drop to convert!" : "Drag & Drop images here"}
                </p>
                <p className="text-slate-500 text-sm mt-1">
                  or <span className="text-violet-600 font-semibold underline underline-offset-2">browse files</span>
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {["JPG", "PNG", "GIF", "BMP", "AVIF", "TIFF"].map((fmt) => (
                  <span key={fmt} className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-500 text-xs font-medium shadow-sm">
                    {fmt}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">
                Converted Files ({results.length})
              </h3>
              <button
                onClick={clearAll}
                className="text-sm text-red-400 hover:text-red-600 font-medium transition-colors"
              >
                Clear All
              </button>
            </div>

            {results.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:border-violet-100 hover:bg-violet-50/30 transition-all"
              >
                {/* Preview */}
                <img
                  src={file.previewUrl}
                  alt={file.originalName}
                  className="w-14 h-14 object-cover rounded-xl border border-slate-200 shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 truncate text-sm">{file.originalName}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-500">
                    <span>Before: <b className="text-slate-700">{formatSize(file.originalSize)}</b></span>
                    <span>After: <b className="text-violet-600">{formatSize(file.webpSize)}</b></span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                      ↓ {file.savings.toFixed(1)}% saved
                    </span>
                  </div>
                </div>

                {/* Download */}
                <a
                  href={file.webpUrl}
                  download={file.originalName}
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold shadow transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
