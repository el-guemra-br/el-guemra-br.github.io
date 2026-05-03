/* =============================================
   DOWNLOAD SECTION
   APK download with version info and
   installation instructions
   ============================================= */
import { Download, Smartphone, HardDrive, AlertTriangle, CheckCircle, Package } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const installSteps = [
  { step: 1, text: 'Download the APK file using the button below.' },
  { step: 2, text: 'Open your device Settings → Security & Privacy.' },
  { step: 3, text: 'Enable "Install from Unknown Sources" for your browser or file manager.' },
  { step: 4, text: 'Locate the downloaded APK file and tap to install.' },
  { step: 5, text: 'Launch Black Mafia and start playing!' },
];

export default function DownloadSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="download" className="relative py-24 px-4 overflow-hidden bg-black/50">
      {/* Red glow from bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom, rgba(220,38,38,0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div
          ref={ref}
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="font-rajdhani text-red-600 text-sm tracking-[0.4em] uppercase mb-3">
            Get the Game
          </p>
          <h2 className="font-cinzel text-4xl sm:text-5xl font-black text-white section-title tracking-wide">
            Download
          </h2>
        </div>

        {/* Main Download Card */}
        <div
          className="glass rounded-2xl border border-red-900/30 overflow-hidden mb-10"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease 200ms, transform 0.7s ease 200ms',
          }}
        >
          {/* Top banner */}
          <div className="bg-gradient-to-r from-red-950/60 via-red-900/40 to-red-950/60 border-b border-red-900/30 px-8 py-5 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-red-800/40 border border-red-700/50 flex items-center justify-center">
                <Package size={28} className="text-red-400" />
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-black text-white">Black Mafia</h3>
                <p className="font-rajdhani text-white-300 text-sm tracking-wide">Digital Party Game</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-rajdhani text-xs tracking-widest text-green-400 bg-green-900/30 border border-green-800/40 px-3 py-1 rounded-full uppercase">
                ✓ Free to Play
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-red-900/20">
            <div className="px-8 py-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-950/50 flex items-center justify-center text-red-500">
                <HardDrive size={18} />
              </div>
              <div>
                <p className="font-rajdhani text-xs text-white-400 tracking-widest uppercase">Version</p>
                <p className="font-cinzel text-white font-bold text-lg">v1.0.0</p>
              </div>
            </div>
            <div className="px-8 py-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-950/50 flex items-center justify-center text-red-500">
                <Package size={18} />
              </div>
              <div>
                <p className="font-rajdhani text-xs text-white-400 tracking-widest uppercase">File Size</p>
                <p className="font-cinzel text-white font-bold text-lg">~85 MB</p>
              </div>
            </div>
            <div className="px-8 py-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-950/50 flex items-center justify-center text-red-500">
                <Smartphone size={18} />
              </div>
              <div>
                <p className="font-rajdhani text-xs text-white-400 tracking-widest uppercase">Requires</p>
                <p className="font-cinzel text-white font-bold text-lg">Android 7+</p>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="px-8 py-8 flex flex-col items-center gap-4">
            <a
              href="/apk/black_mafia.apk"
              download
              className="btn-primary group flex items-center gap-4 bg-red-700 hover:bg-red-600 text-white font-cinzel font-black tracking-widest text-lg uppercase px-12 py-5 rounded-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
            >
              <Download
                size={24}
                className="download-icon group-hover:translate-y-1 transition-transform"
              />
              Download APK
            </a>
            <p className="font-rajdhani text-white-400 text-sm">
              Free forever • No account needed • Works offline
            </p>
            <p className="font-rajdhani text-yellow-100 text-1xl">
              Use this code to unlock all collections: <span className="font-bold text-red-400 text-2xl group-hover:translate-y-1 transition-transform">el-guemra-br</span>
            </p>
          </div>
        </div>

        {/* Warning + Installation Steps */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease 400ms, transform 0.7s ease 400ms',
          }}
        >
          {/* Warning */}
          <div className="glass rounded-xl border border-yellow-900/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={20} className="text-yellow-500" />
              <h4 className="font-cinzel text-base font-bold text-yellow-400 tracking-wide">
                Before Installing
              </h4>
            </div>
            <p className="font-rajdhani text-white-300 text-sm leading-relaxed">
              Black Mafia is an{' '}
              <span className="text-yellow-400">Android APK</span> file, not available on the Google
              Play Store. You need to enable{' '}
              <span className="text-white font-semibold">"Install from Unknown Sources"</span>{' '}
              in your Android settings before installing.
            </p>
            <div className="mt-4 p-3 bg-yellow-950/30 border border-yellow-900/30 rounded-lg">
              <p className="font-rajdhani text-xs text-yellow-600 tracking-wide">
                ⚠️ Currently Android only. iOS version is not available.
              </p>
            </div>
          </div>

          {/* Installation Steps */}
          <div className="glass rounded-xl border border-red-900/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle size={20} className="text-red-500" />
              <h4 className="font-cinzel text-base font-bold text-white tracking-wide">
                Installation Guide
              </h4>
            </div>
            <ol className="space-y-3">
              {installSteps.map(({ step, text }) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-900/50 border border-red-700/50 flex items-center justify-center font-cinzel text-xs font-bold text-red-400">
                    {step}
                  </span>
                  <span className="font-rajdhani text-white-300 text-sm leading-relaxed">{text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
