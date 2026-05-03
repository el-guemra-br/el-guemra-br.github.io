/* =============================================
   DEVELOPER SECTION
   About el-guemra-br with skills & links
   ============================================= */
import { ExternalLink, Code, Gamepad2, Palette, Cpu } from 'lucide-react';

/* SVG icon components for social brands */
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
import { useInView } from '../hooks/useInView';

const skills = [
  { icon: <Gamepad2 size={16} />, label: 'Game Design', color: 'text-red-400' },
  { icon: <Code size={16} />, label: 'Flutter', color: 'text-blue-400' },
  { icon: <Cpu size={16} />, label: 'Unity', color: 'text-green-400' },
  { icon: <Palette size={16} />, label: 'UI/UX Design', color: 'text-purple-400' },
  { icon: <Code size={16} />, label: 'Dart', color: 'text-cyan-400' },
  { icon: <Cpu size={16} />, label: 'C#', color: 'text-yellow-400' },
  { icon: <Palette size={16} />, label: 'AI Art Direction', color: 'text-pink-400' },
  { icon: <Gamepad2 size={16} />, label: 'Android Dev', color: 'text-orange-400' },
];

export default function Developer() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="developer" className="relative py-24 px-4 overflow-hidden bg-black/40">
      {/* Decorative glow */}
      <div
        className="absolute top-1/2 right-0 w-[500px] h-[500px] pointer-events-none -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
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
            Behind the Game
          </p>
          <h2 className="font-cinzel text-4xl sm:text-5xl font-black text-white section-title tracking-wide">
            The Developer
          </h2>
        </div>

        {/* Developer Card */}
        <div
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.7s ease 200ms, transform 0.7s ease 200ms',
          }}
        >
          {/* Avatar / Identity */}
          <div className="lg:col-span-2 flex flex-col items-center text-center">
            {/* Avatar placeholder */}
            <div className="relative mb-6">
              <div
                className="w-36 h-36 rounded-2xl bg-gradient-to-br from-red-900/60 to-black border-2 border-red-700/50 flex items-center justify-center"
                style={{ boxShadow: '0 0 30px rgba(220,38,38,0.3), 0 0 60px rgba(220,38,38,0.15)' }}
              >
                <span className="font-cinzel text-5xl font-black text-red-500">G</span>
              </div>
              {/* Status dot */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-black border-2 border-red-900/50 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-500" style={{ boxShadow: '0 0 8px #22c55e' }} />
              </div>
            </div>

            <h3 className="font-cinzel text-2xl font-black text-white mb-1 tracking-widest">
              el-guemra-br
            </h3>
            <p className="font-rajdhani text-red-500 text-sm tracking-[0.3em] uppercase mb-6">
              Moroccan Game Developer
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/el_guemra_br"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-full bg-gradient-to-br from-pink-900/40 to-purple-900/40 border border-pink-800/30 flex items-center justify-center text-pink-400 hover:border-pink-600 hover:text-pink-300 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://github.com/el-guemra-br"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-full bg-black/50 border border-gray-700/50 flex items-center justify-center text-gray-400 hover:border-gray-500 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://el-guemra-br.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-full bg-red-950/40 border border-red-800/30 flex items-center justify-center text-red-400 hover:border-red-600 hover:text-red-300 transition-all duration-300 hover:scale-110"
                aria-label="Portfolio"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Bio + Skills */}
          <div className="lg:col-span-3">
            <div className="glass rounded-xl p-8 border border-red-900/20">
              {/* Quote decoration */}
              <div className="text-red-800/50 text-6xl font-serif leading-none mb-2 -mt-2">"</div>

              <p className="font-rajdhani text-gray-200 text-base sm:text-lg leading-relaxed mb-6">
                I'm <span className="text-white font-semibold">el-guemra-br</span>, an moroccan developer
                passionate about creating immersive digital experiences. Black Mafia was born from a
                love for party games and cinematic storytelling — taking the classic Mafia game and
                transforming it into something truly unique.
              </p>
              <p className="font-rajdhani text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
                From designing the role card art to building the game logic and UI, every detail of
                Black Mafia was crafted with care to deliver the best possible experience for players
                and their friends.
              </p>

              {/* Tech Stack */}
              <div>
                <h4 className="font-cinzel text-xs font-bold text-gray-500 tracking-[0.4em] uppercase mb-4">
                  Tech Stack & Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <div
                      key={skill.label}
                      className="flex items-center gap-2 glass-light border border-white/5 rounded-full px-4 py-1.5 group hover:border-red-900/40 transition-colors"
                    >
                      <span className={skill.color}>{skill.icon}</span>
                      <span className="font-rajdhani text-sm text-gray-200 font-medium">
                        {skill.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio button */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://el-guemra-br.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-rajdhani font-semibold tracking-widest text-sm uppercase px-6 py-3 rounded-lg transition-all"
                >
                  <ExternalLink size={16} />
                  View Portfolio
                </a>
                <a
                  href="https://instagram.com/el_guemra_br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-900/30 to-purple-900/30 hover:from-pink-900/50 hover:to-purple-900/50 border border-pink-800/30 hover:border-pink-700/50 text-pink-300 font-rajdhani font-semibold tracking-widest text-sm uppercase px-6 py-3 rounded-lg transition-all"
                >
                  <InstagramIcon size={16} />
                  Follow on Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
