/* =============================================
   ABOUT THE GAME SECTION
   Modern card-style UI with icons explaining
   the game mechanics
   ============================================= */
import { Smartphone, Users, Shuffle, Zap, Shield, Star } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  inView: boolean;
}

function FeatureCard({ icon, title, description, delay, inView }: FeatureCardProps) {
  return (
    <div
      className="glass rounded-lg p-6 border border-red-900/20 hover:border-red-600/40 transition-all duration-500 group hover:bg-red-950/10"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, border-color 0.3s ease`,
      }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-red-950/50 border border-red-800/40 rounded-lg flex items-center justify-center text-red-500 group-hover:bg-red-900/40 group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
        <div>
          <h3 className="font-cinzel text-base font-bold text-white mb-2 tracking-wide">
            {title}
          </h3>
          <p className="font-rajdhani text-gray-300 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: <Shuffle size={22} />,
    title: 'Random Card Distribution',
    description:
      'Every round is unpredictable. Roles are assigned randomly and secretly — no one knows who is Mafia until the truth is revealed.',
  },
  {
    icon: <Users size={22} />,
    title: 'Mafia vs Civilians',
    description:
      'Two factions, one city. The Mafia eliminates civilians by night while civilians try to expose them by day through voting and deduction.',
  },
  {
    icon: <Smartphone size={22} />,
    title: 'Single Device – Pass & Play',
    description:
      'No extra devices needed. One phone handles everything. Players pass it around secretly to view their role cards.',
  },
  {
    icon: <Zap size={22} />,
    title: 'Local Multi-Device Mode',
    description:
      'Every player gets their own device. Connect locally without internet for a more immersive and private experience.',
  },
  {
    icon: <Star size={22} />,
    title: '6 Unique Theme Collections',
    description:
      'Choose from Anime, Old Egyptian, Wild West, Victorian Gothic, Pirates, or Samurai Era — each with unique characters and art.',
  },
  {
    icon: <Shield size={22} />,
    title: 'Built for Party Nights',
    description:
      'Designed specifically for groups of friends. Easy to learn, impossible to put down. The perfect social deduction experience.',
  },
];

export default function About() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
          ref={ref}
        >
          <p className="font-rajdhani text-red-600 text-sm tracking-[0.4em] uppercase mb-3">
            The Game
          </p>
          <h2 className="font-cinzel text-4xl sm:text-5xl font-black text-white section-title tracking-wide">
            About Black Mafia
          </h2>
          <p className="mt-8 max-w-2xl mx-auto font-rajdhani text-gray-300 text-lg leading-relaxed">
            A cinematic digital adaptation of the classic Mafia party game. Bluff, deduce, and eliminate
            your way to victory across stunning thematic worlds. Can you survive the night?
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={i * 100}
              inView={inView}
            />
          ))}
        </div>

        {/* Mode comparison */}
        <div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.7s ease 600ms, transform 0.7s ease 600ms',
          }}
        >
          {/* Single Device Mode */}
          <div className="relative glass rounded-xl p-8 border border-red-900/30 overflow-hidden group hover:border-red-600/40 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-900/50 border border-red-700/50 flex items-center justify-center">
                  <Smartphone size={18} className="text-red-400" />
                </div>
                <h3 className="font-cinzel text-xl font-bold text-white">Single Device</h3>
              </div>
              <p className="font-rajdhani text-gray-300 text-base leading-relaxed">
                <span className="text-red-400 font-semibold">Pass & Play</span> — One phone for the whole group.
                The narrator manages rounds, and each player passes the device to secretly view their role.
                Perfect for anywhere, anytime.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="font-rajdhani text-sm text-green-400">No extra devices needed</span>
              </div>
            </div>
          </div>

          {/* Multi Device Mode */}
          <div className="relative glass rounded-xl p-8 border border-red-900/30 overflow-hidden group hover:border-red-600/40 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-900/50 border border-red-700/50 flex items-center justify-center">
                  <Zap size={18} className="text-red-400" />
                </div>
                <h3 className="font-cinzel text-xl font-bold text-white">Multi-Device Local</h3>
              </div>
              <p className="font-rajdhani text-gray-300 text-base leading-relaxed">
                <span className="text-red-400 font-semibold">Local Multiplayer</span> — Each player
                connects their own device on the same local network. Complete privacy, full immersion.
                No internet required.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="font-rajdhani text-sm text-blue-400">Wi-Fi LAN only – no internet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
