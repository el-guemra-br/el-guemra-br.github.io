/* =============================================
   FAQ / Q&A SECTION
   Accordion-style collapsible questions
   ============================================= */
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How many players can play?',
    answer:
      'Black Mafia supports 5 to 20 players. The game is best enjoyed with 6–12 players for optimal balance between Mafia and Civilians. The more players, the more thrilling the deception!',
  },
  {
    question: 'Do players need internet to play?',
    answer:
      'No internet connection is required! In Single Device (Pass & Play) mode, you only need one phone. In Local Multi-Device mode, players connect via local Wi-Fi (LAN) — no internet needed.',
  },
  {
    question: 'Can we play on one device?',
    answer:
      'Yes! The Single Device (Pass & Play) mode allows all players to share a single phone. The narrator manages the game phases, and each player receives their role card privately by passing the device.',
  },
  {
    question: 'Is Black Mafia free?',
    answer:
      'Yes, Black Mafia is completely free to download and play. All 6 collections and core game features are included at no cost. Future premium collections may be added over time.',
  },
  {
    question: 'Is it available on iOS (iPhone)?',
    answer:
      'Currently, Black Mafia is only available for Android devices as an APK download. An iOS version is planned for a future update. Stay tuned to our social media for announcements.',
  },
  {
    question: 'What roles are included in the game?',
    answer:
      'Each thematic collection features unique roles including: Mafia Boss, Mafia Member, Silencer, Sniper, Mayor, Medic, Good Boy/Citizen, and Vanilla Citizen — all reimagined within the collection\'s universe.',
  },
  {
    question: 'Is there a narrator mode?',
    answer:
      'Yes! The game features a dedicated narrator (moderator) mode that guides players through Night and Day phases automatically, with ambient sounds and visual cues to enhance immersion.',
  },
];

interface AccordionItemProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  inView: boolean;
}

function AccordionItem({ item, index, isOpen, onToggle, inView }: AccordionItemProps) {
  return (
    <div
      className="border border-red-900/20 rounded-lg overflow-hidden hover:border-red-800/40 transition-all duration-300"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms, border-color 0.3s ease`,
      }}
    >
      {/* Question / Trigger */}
      <button
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 bg-black/30 hover:bg-red-950/20 transition-colors duration-300"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="font-cinzel text-red-600 text-xs font-bold opacity-70">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-rajdhani text-white text-base sm:text-lg font-semibold tracking-wide">
            {item.question}
          </span>
        </div>
        <ChevronDown
          size={18}
          className={`text-red-500 flex-shrink-0 transition-transform duration-400 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Answer */}
      <div
        className="overflow-hidden transition-all duration-400"
        style={{
          maxHeight: isOpen ? '300px' : '0',
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.4s ease, opacity 0.3s ease',
        }}
      >
        <div className="px-6 py-4 bg-black/20 border-t border-red-900/20">
          <p className="font-rajdhani text-gray-300 text-sm sm:text-base leading-relaxed pl-8">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { ref, inView } = useInView(0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative py-24 px-4 overflow-hidden">
      {/* BG gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(220,38,38,0.04) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-3xl mx-auto">
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
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-red-950/50 border border-red-800/40 flex items-center justify-center">
              <HelpCircle size={24} className="text-red-500" />
            </div>
          </div>
          <p className="font-rajdhani text-red-600 text-sm tracking-[0.4em] uppercase mb-3">
            Questions & Answers
          </p>
          <h2 className="font-cinzel text-4xl sm:text-5xl font-black text-white section-title tracking-wide">
            FAQ
          </h2>
          <p className="mt-8 font-rajdhani text-gray-300 text-lg leading-relaxed">
            Everything you need to know before the game begins.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-3">
          {faqs.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
              inView={inView}
            />
          ))}
        </div>

        {/* Contact prompt */}
        <div
          className="mt-12 text-center"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.7s ease 700ms',
          }}
        >
          <p className="font-rajdhani text-white-400 text-sm">
            Still have questions?{' '}
            <a
              href="https://el-guemra-br.dev/#contact"
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              Contact us →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
