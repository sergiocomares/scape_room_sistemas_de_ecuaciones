import { motion } from 'framer-motion';
import type { Language } from '../types';

interface Props {
  lang: Language;
  onChange: (lang: Language) => void;
}

export default function LanguageTabs({ lang, onChange }: Props) {
  return (
    <div className="fixed top-3 right-3 z-50">
      <div className="flex rounded-xl border border-cyan-700/50 bg-slate-950/80 p-1 backdrop-blur-sm">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onChange('es')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-colors ${
            lang === 'es' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/60' : 'text-slate-400 border border-transparent hover:text-slate-200'
          }`}
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          ESPAÑOL
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onChange('en')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-colors ${
            lang === 'en' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/60' : 'text-slate-400 border border-transparent hover:text-slate-200'
          }`}
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          ENGLISH
        </motion.button>
      </div>
    </div>
  );
}
