import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KatexRenderer from './KatexRenderer';
import { playErrorSound, playSuccessSound } from '../utils/sound';

interface Props {
  expectedEquations: [string, string];
  onSuccess: () => void;
}

function normalizeEquation(value: string): string {
  let normalized = value
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/−/g, '-')
    .replace(/,/g, '.')
    .replace(/\*+/g, '');

  normalized = normalized.replace(/(^|[+\-=])1x/g, '$1x');
  normalized = normalized.replace(/(^|[+\-=])1y/g, '$1y');

  return normalized;
}

function matchesSystem(userEqs: [string, string], expected: [string, string]): boolean {
  const a = normalizeEquation(userEqs[0]);
  const b = normalizeEquation(userEqs[1]);
  const c = normalizeEquation(expected[0]);
  const d = normalizeEquation(expected[1]);

  return (a === c && b === d) || (a === d && b === c);
}

const KEYBOARD_KEYS = ['x', 'y', '+', '-', '=', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export default function EquationInputPanel({ expectedEquations, onSuccess }: Props) {
  const [eq1, setEq1] = useState('');
  const [eq2, setEq2] = useState('');
  const [focusField, setFocusField] = useState<1 | 2>(1);
  const [feedback, setFeedback] = useState<'idle' | 'wrong' | 'correct'>('idle');

  const allFilled = useMemo(() => eq1.trim().length > 0 && eq2.trim().length > 0, [eq1, eq2]);

  function updateCurrent(value: string): void {
    if (focusField === 1) setEq1(value);
    else setEq2(value);
  }

  function getCurrent(): string {
    return focusField === 1 ? eq1 : eq2;
  }

  function pressKey(key: string): void {
    updateCurrent(getCurrent() + key);
  }

  function backspace(): void {
    updateCurrent(getCurrent().slice(0, -1));
  }

  function clearCurrent(): void {
    updateCurrent('');
  }

  function checkSystem(): void {
    if (!allFilled) {
      setFeedback('wrong');
      playErrorSound();
      setTimeout(() => setFeedback('idle'), 1200);
      return;
    }

    const ok = matchesSystem([eq1, eq2], expectedEquations);
    if (ok) {
      setFeedback('correct');
      playSuccessSound();
      setTimeout(onSuccess, 900);
      return;
    }

    setFeedback('wrong');
    playErrorSound();
    setTimeout(() => setFeedback('idle'), 1600);
  }

  return (
    <div className="space-y-4">
      <div className="bg-cyan-950/20 border border-cyan-800/40 rounded-xl p-4">
        <p className="text-cyan-300 text-xs font-mono uppercase tracking-widest mb-2">
          Construye el sistema
        </p>
        <p className="text-slate-300 text-sm font-mono">
          Escribe las dos ecuaciones del enunciado usando el teclado basico.
        </p>
      </div>

      <div className="grid gap-3">
        <div className={`rounded-xl border p-3 ${focusField === 1 ? 'border-cyan-500 bg-cyan-950/25' : 'border-slate-700 bg-slate-900/60'}`}>
          <button
            type="button"
            onClick={() => setFocusField(1)}
            className="w-full text-left"
          >
            <p className="text-xs text-slate-400 font-mono mb-1">Ecuacion 1</p>
            <p className="text-lg text-cyan-200 font-mono min-h-7">{eq1 || '_'}</p>
          </button>
        </div>

        <div className={`rounded-xl border p-3 ${focusField === 2 ? 'border-purple-500 bg-purple-950/25' : 'border-slate-700 bg-slate-900/60'}`}>
          <button
            type="button"
            onClick={() => setFocusField(2)}
            className="w-full text-left"
          >
            <p className="text-xs text-slate-400 font-mono mb-1">Ecuacion 2</p>
            <p className="text-lg text-purple-200 font-mono min-h-7">{eq2 || '_'}</p>
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-3">
        <p className="text-xs text-slate-400 font-mono mb-2">Teclado matematico basico</p>
        <div className="grid grid-cols-5 gap-2">
          {KEYBOARD_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => pressKey(key)}
              className="py-2 rounded-md border border-cyan-800/50 text-cyan-200 font-mono bg-cyan-950/20 hover:bg-cyan-900/30 transition-colors"
            >
              {key}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          <button
            type="button"
            onClick={backspace}
            className="py-2 rounded-md border border-orange-700/50 text-orange-300 font-mono bg-orange-950/20 hover:bg-orange-900/25"
          >
            Borrar
          </button>
          <button
            type="button"
            onClick={clearCurrent}
            className="py-2 rounded-md border border-red-700/50 text-red-300 font-mono bg-red-950/20 hover:bg-red-900/25"
          >
            Limpiar
          </button>
          <button
            type="button"
            onClick={() => setFocusField(focusField === 1 ? 2 : 1)}
            className="py-2 rounded-md border border-purple-700/50 text-purple-300 font-mono bg-purple-950/20 hover:bg-purple-900/25"
          >
            Cambiar campo
          </button>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={checkSystem}
        className="w-full py-3 rounded-xl font-bold text-sm tracking-widest cursor-pointer"
        style={{
          background: 'rgba(0,212,255,0.1)',
          border: '1px solid rgba(0,212,255,0.5)',
          color: 'var(--neon-cyan)',
          fontFamily: "'Orbitron', sans-serif",
        }}
      >
        VALIDAR SISTEMA
      </motion.button>

      <AnimatePresence mode="wait">
        {feedback === 'wrong' && (
          <motion.div
            key="eq-wrong"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border-neon-red bg-red-950/40 rounded-xl p-3 text-center"
          >
            <p className="neon-red text-sm font-mono">
              ❌ El sistema no coincide con el enunciado. Revisa coeficientes y signos.
            </p>
          </motion.div>
        )}

        {feedback === 'correct' && (
          <motion.div
            key="eq-correct"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-neon-green bg-green-950/50 rounded-xl p-3 text-center"
          >
            <p className="neon-green text-sm font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              ✅ Sistema planteado correctamente
            </p>
            <p className="text-green-300 text-xs font-mono mt-1">
              <KatexRenderer math={`\\begin{cases} ${normalizeEquation(eq1)} \\\\ ${normalizeEquation(eq2)} \\end{cases}`} />
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
