// ── HintBox — progressive hint revelation system ──
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  hints: string[];
}

export default function HintBox({ hints }: Props) {
  const [revealed, setRevealed] = useState(0);

  const canReveal = revealed < hints.length;

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase font-mono">
          💡 Pistas / Hints
        </span>
        <span className="text-slate-500 text-xs font-mono">
          {revealed}/{hints.length}
        </span>
      </div>

      {/* Revealed hints */}
      <div className="space-y-2">
        <AnimatePresence>
          {hints.slice(0, revealed).map((hint, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="bg-yellow-950/40 border border-yellow-700/40 rounded-lg px-4 py-3 text-sm text-yellow-200 font-mono"
            >
              <span className="text-yellow-500 font-bold mr-2">{i + 1}.</span>
              {hint}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Reveal button */}
      {canReveal && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setRevealed((r) => r + 1)}
          className="w-full mt-1 px-4 py-2 rounded-lg text-xs font-bold tracking-wider cursor-pointer transition-all duration-200"
          style={{
            background: 'rgba(234,179,8,0.08)',
            border: '1px solid rgba(234,179,8,0.35)',
            color: '#facc15',
          }}
        >
          {revealed === 0 ? '🔍 Ver primera pista / Show first hint' : `🔍 Pista ${revealed + 1} de ${hints.length} / Hint ${revealed + 1} of ${hints.length}`}
        </motion.button>
      )}

      {revealed === hints.length && (
        <p className="text-center text-yellow-600 text-xs font-mono mt-1">
          Has visto todas las pistas disponibles. / You have viewed all available hints.
        </p>
      )}
    </div>
  );
}
