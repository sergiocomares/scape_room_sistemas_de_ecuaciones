// ── MethodSelector — 3 method choice buttons with descriptions ──
import { motion } from 'framer-motion';
import type { Method } from '../types';

interface MethodOption {
  id: Method;
  label: string;
  icon: string;
  description: string;
  color: string;
  borderClass: string;
  hoverBg: string;
}

const OPTIONS: MethodOption[] = [
  {
    id: 'sustitucion',
    label: 'Sustitución',
    icon: '🔄',
    description: 'Despejo una variable y la sustituyo en la otra ecuación.',
    color: 'text-cyan-400',
    borderClass: 'border-cyan-700/60 hover:border-cyan-400',
    hoverBg: 'rgba(0,212,255,0.08)',
  },
  {
    id: 'igualacion',
    label: 'Igualación',
    icon: '⚖️',
    description: 'Despejo la misma variable en ambas ecuaciones y las igualo.',
    color: 'text-purple-400',
    borderClass: 'border-purple-700/60 hover:border-purple-400',
    hoverBg: 'rgba(139,92,246,0.08)',
  },
  {
    id: 'reduccion',
    label: 'Reducción',
    icon: '➕',
    description: 'Sumo o resto las ecuaciones para eliminar una variable.',
    color: 'text-green-400',
    borderClass: 'border-green-700/60 hover:border-green-400',
    hoverBg: 'rgba(0,255,136,0.08)',
  },
];

interface Props {
  onSelect: (method: Method) => void;
  disabled?: boolean;
}

export default function MethodSelector({ onSelect, disabled = false }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-slate-300 text-sm font-mono text-center mb-2">
        ¿Qué método consideras más adecuado para este sistema?
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
                {opt.label}
              </p>
              <p className="text-slate-400 text-xs mt-0.5 font-mono">{opt.description}</p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
