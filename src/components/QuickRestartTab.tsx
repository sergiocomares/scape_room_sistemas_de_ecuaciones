import { motion } from 'framer-motion';
import type { Language } from '../types';

interface Props {
  lang: Language;
  onRestart: () => void;
}

export default function QuickRestartTab({ lang, onRestart }: Props) {
  const isEs = lang === 'es';

  return (
    <div className="fixed top-3 left-3 z-50">
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onRestart}
        className="px-3 py-1.5 rounded-xl border border-cyan-700/50 bg-slate-950/80 text-cyan-300 text-xs font-bold tracking-wider hover:text-cyan-200 transition-colors"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        {isEs ? '↺ INICIO' : '↺ START'}
      </motion.button>
    </div>
  );
}
