// ── FeedbackPanel — shows animated feedback on method choice ──
import { motion } from 'framer-motion';
import type { Method, MethodQuality, Language } from '../types';
import { t } from '../utils/i18n';

const METHOD_LABELS: Record<Method, Record<Language, string>> = {
  sustitucion: { es: 'Sustitución', en: 'Substitution' },
  igualacion: { es: 'Igualación', en: 'Equalization' },
  reduccion: { es: 'Reducción', en: 'Elimination' },
};

const QUALITY_STYLES: Record<MethodQuality, { borderClass: string; bgClass: string; label: Record<Language, string> }> = {
  best: {
    borderClass: 'border-neon-green',
    bgClass: 'bg-green-950/60',
    label: { es: 'MÉTODO ÓPTIMO', en: 'BEST CHOICE' },
  },
  valid: {
    borderClass: 'border-neon-orange',
    bgClass: 'bg-yellow-950/60',
    label: { es: 'VÁLIDO PERO NO ÓPTIMO', en: 'VALID, NOT BEST' },
  },
  wrong: {
    borderClass: 'border-neon-red',
    bgClass: 'bg-red-950/60',
    label: { es: 'NO RECOMENDADO', en: 'NOT RECOMMENDED' },
  },
};

interface Props {
  chosenMethod: Method;
  message: string;
  quality: MethodQuality;
  lang: Language;
  onContinue: () => void;
}

export default function FeedbackPanel({ chosenMethod, message, quality, lang, onContinue }: Props) {
  const isEs = lang === 'es';
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
          {isEs ? 'Método elegido:' : 'Selected method:'}
        </span>
        <span
          className={`text-sm font-bold tracking-wider px-3 py-1 rounded-full border text-xs
            ${quality === 'best' ? 'text-green-400 border-green-700 bg-green-950/50' :
              quality === 'valid' ? 'text-yellow-400 border-yellow-700 bg-yellow-950/50' :
              'text-red-400 border-red-700 bg-red-950/50'}`}
        >
          {METHOD_LABELS[chosenMethod][lang]}
        </span>
        <span
          className={`text-xs font-bold tracking-widest ml-auto
            ${quality === 'best' ? 'neon-green' : quality === 'valid' ? 'neon-orange' : 'neon-red'}`}
        >
          {style.label[lang]}
        </span>
      </div>

      {/* Feedback message */}
      <p className="text-sm text-slate-200 font-mono leading-relaxed">{t(message, lang)}</p>

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
        {isEs ? 'CONTINUAR -&gt; RESOLVER' : 'CONTINUE -&gt; SOLVE'}
      </motion.button>
    </motion.div>
  );
}
