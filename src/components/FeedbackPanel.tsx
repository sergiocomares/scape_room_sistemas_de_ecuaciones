// ── FeedbackPanel — shows animated feedback on method choice ──
import { motion } from 'framer-motion';
import type { Method, MethodQuality } from '../types';

const METHOD_LABELS: Record<Method, string> = {
  sustitucion: 'Sustitución',
  igualacion: 'Igualación',
  reduccion: 'Reducción',
};

const QUALITY_STYLES: Record<MethodQuality, { borderClass: string; bgClass: string; label: string }> = {
  best: {
    borderClass: 'border-neon-green',
    bgClass: 'bg-green-950/60',
    label: 'MÉTODO ÓPTIMO',
  },
  valid: {
    borderClass: 'border-neon-orange',
    bgClass: 'bg-yellow-950/60',
    label: 'VÁLIDO PERO NO ÓPTIMO',
  },
  wrong: {
    borderClass: 'border-neon-red',
    bgClass: 'bg-red-950/60',
    label: 'NO RECOMENDADO',
  },
};

interface Props {
  chosenMethod: Method;
  message: string;
  quality: MethodQuality;
  onContinue: () => void;
}

export default function FeedbackPanel({ chosenMethod, message, quality, onContinue }: Props) {
  const style = QUALITY_STYLES[quality];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`${style.borderClass} ${style.bgClass} rounded-xl p-5 space-y-4`}
    >
      {/* Method chosen label */}
      <div className="flex items-center gap-3">
        <span className="text-slate-400 text-xs font-mono uppercase tracking-widest">
          Método elegido:
        </span>
        <span
          className={`text-sm font-bold tracking-wider px-3 py-1 rounded-full border text-xs
            ${quality === 'best' ? 'text-green-400 border-green-700 bg-green-950/50' :
              quality === 'valid' ? 'text-yellow-400 border-yellow-700 bg-yellow-950/50' :
              'text-red-400 border-red-700 bg-red-950/50'}`}
        >
          {METHOD_LABELS[chosenMethod]}
        </span>
        <span
          className={`text-xs font-bold tracking-widest ml-auto
            ${quality === 'best' ? 'neon-green' : quality === 'valid' ? 'neon-orange' : 'neon-red'}`}
        >
          {style.label}
        </span>
      </div>

      {/* Feedback message */}
      <p className="text-sm text-slate-200 font-mono leading-relaxed">{message}</p>

      {/* Continue button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={onContinue}
        className="w-full py-3 rounded-xl font-bold text-sm tracking-wider cursor-pointer transition-all duration-200"
        style={{
          background: 'rgba(0,212,255,0.1)',
          border: '1px solid rgba(0,212,255,0.5)',
          color: 'var(--neon-cyan)',
          fontFamily: "'Orbitron', sans-serif",
        }}
      >
        CONTINUAR → RESOLVER EL SISTEMA
      </motion.button>
    </motion.div>
  );
}
