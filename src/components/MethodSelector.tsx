// ── MethodSelector — 3 method choice buttons with descriptions ──
import { motion } from 'framer-motion';
import type { Method, Language } from '../types';

interface MethodOption {
  id: Method;
  label: Record<Language, string>;
  icon: string;
  description: Record<Language, string>;
  color: string;
  borderClass: string;
  hoverBg: string;
}

const OPTIONS: MethodOption[] = [
  {
    id: 'sustitucion',
    label: { es: 'Sustitución', en: 'Substitution' },
    icon: '🔄',
    description: {
      es: 'Despejo una variable y la sustituyo en la otra ecuación.',
      en: 'Isolate one variable and substitute it into the other equation.',
    },
    color: 'text-cyan-400',
    borderClass: 'border-cyan-700/60 hover:border-cyan-400',
    hoverBg: 'rgba(0,212,255,0.08)',
  },
  {
    id: 'igualacion',
    label: { es: 'Igualación', en: 'Equalization' },
    icon: '⚖️',
    description: {
      es: 'Despejo la misma variable en ambas ecuaciones y las igualo.',
      en: 'Isolate the same variable in both equations and set them equal.',
    },
    color: 'text-purple-400',
    borderClass: 'border-purple-700/60 hover:border-purple-400',
    hoverBg: 'rgba(139,92,246,0.08)',
  },
  {
    id: 'reduccion',
    label: { es: 'Reducción', en: 'Elimination' },
    icon: '➕',
    description: {
      es: 'Sumo o resto las ecuaciones para eliminar una variable.',
      en: 'Add or subtract equations to eliminate one variable.',
    },
    color: 'text-green-400',
    borderClass: 'border-green-700/60 hover:border-green-400',
    hoverBg: 'rgba(0,255,136,0.08)',
  },
];

interface Props {
  onSelect: (method: Method) => void;
  lang: Language;
  disabled?: boolean;
}

export default function MethodSelector({ onSelect, lang, disabled = false }: Props) {
  const isEs = lang === 'es';
  return (
    <div className="space-y-3">
      <p className="text-slate-300 text-sm font-mono text-center mb-2">
        {isEs ? '¿Qué método consideras más adecuado para este sistema?' : 'Which method is most suitable for this system?'}
      </p>
      {OPTIONS.map((opt, i) => (
        <motion.button
          key={opt.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.35 }}
          whileHover={!disabled ? { scale: 1.02 } : {}}
          whileTap={!disabled ? { scale: 0.97 } : {}}
          onClick={() => !disabled && onSelect(opt.id)}
          disabled={disabled}
          className={`w-full text-left px-4 py-4 rounded-xl border transition-all duration-200 cursor-pointer ${opt.borderClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{ background: 'rgba(8,15,40,0.9)' }}
          onMouseEnter={(e) => {
            if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = opt.hoverBg;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(8,15,40,0.9)';
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{opt.icon}</span>
            <div>
              <p className={`font-bold text-base ${opt.color}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
                {opt.label[lang]}
              </p>
              <p className="text-slate-400 text-xs mt-0.5 font-mono">{opt.description[lang]}</p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
