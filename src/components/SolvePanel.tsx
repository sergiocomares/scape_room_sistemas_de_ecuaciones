// ── SolvePanel — input fields to enter the solution x and y ──
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KatexRenderer from './KatexRenderer';
import { playErrorSound, playSuccessSound } from '../utils/sound';

interface Props {
  solution: { x: number; y: number };
  varLabels: { x: string; y: string };
  onSuccess: () => void;
}

export default function SolvePanel({ solution, varLabels, onSuccess }: Props) {
  const [xVal, setXVal] = useState('');
  const [yVal, setYVal] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong' | 'revealed'>('idle');
  const [shakeX, setShakeX] = useState(false);
  const [shakeY, setShakeY] = useState(false);

  const MAX_ATTEMPTS = 3;

  function check() {
    const xNum = parseFloat(xVal.trim().replace(',', '.'));
    const yNum = parseFloat(yVal.trim().replace(',', '.'));

    if (isNaN(xNum) || isNaN(yNum)) {
      playErrorSound();
      triggerShake(true, true);
      return;
    }

    const xOk = xNum === solution.x;
    const yOk = yNum === solution.y;

    if (xOk && yOk) {
      playSuccessSound();
      setFeedback('correct');
      setTimeout(onSuccess, 1400);
    } else {
      playErrorSound();
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      triggerShake(!xOk, !yOk);

      if (newAttempts >= MAX_ATTEMPTS) {
        setFeedback('revealed');
      } else {
        setFeedback('wrong');
        setTimeout(() => setFeedback('idle'), 1800);
      }
    }
  }

  function triggerShake(sx: boolean, sy: boolean) {
    if (sx) { setShakeX(true); setTimeout(() => setShakeX(false), 500); }
    if (sy) { setShakeY(true); setTimeout(() => setShakeY(false), 500); }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter') check();
  }

  const attemptsLeft = MAX_ATTEMPTS - attempts;

  return (
    <div className="space-y-5">
      <div className="text-center">
        <p className="text-slate-300 text-sm font-mono mb-1">
          Introduce la solución del sistema:
        </p>
        {attemptsLeft > 0 && feedback !== 'revealed' && (
          <p className="text-slate-500 text-xs font-mono">
            {attempts > 0 ? `Intento ${attempts + 1} de ${MAX_ATTEMPTS}` : `Tienes ${MAX_ATTEMPTS} intentos`}
          </p>
        )}
      </div>

      {/* Input fields */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {/* x input */}
        <motion.div
          animate={shakeX ? { x: [0, -6, 6, -6, 6, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex-1 max-w-xs"
        >
          <label className="block text-cyan-400 text-xs font-mono mb-2 tracking-wider">
            x = {varLabels.x !== 'x' ? <span className="text-slate-400">({varLabels.x})</span> : ''}
          </label>
          <input
            type="text"
            inputMode="numeric"
            className="input-neon text-center text-xl font-bold"
            placeholder="?"
            value={xVal}
            onChange={(e) => setXVal(e.target.value)}
            onKeyDown={handleKey}
            disabled={feedback === 'correct' || feedback === 'revealed'}
          />
        </motion.div>

        {/* y input */}
        <motion.div
          animate={shakeY ? { x: [0, -6, 6, -6, 6, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex-1 max-w-xs"
        >
          <label className="block text-purple-400 text-xs font-mono mb-2 tracking-wider">
            y = {varLabels.y !== 'y' ? <span className="text-slate-400">({varLabels.y})</span> : ''}
          </label>
          <input
            type="text"
            inputMode="numeric"
            className="input-neon text-center text-xl font-bold"
            placeholder="?"
            value={yVal}
            onChange={(e) => setYVal(e.target.value)}
            onKeyDown={handleKey}
            disabled={feedback === 'correct' || feedback === 'revealed'}
          />
        </motion.div>
      </div>

      {/* Check button */}
      {feedback !== 'correct' && feedback !== 'revealed' && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={check}
          className="w-full py-3 rounded-xl font-bold text-sm tracking-wider cursor-pointer"
          style={{
            background: 'rgba(139,92,246,0.12)',
            border: '1px solid rgba(139,92,246,0.5)',
            color: 'var(--neon-purple)',
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          ⚡ COMPROBAR SOLUCIÓN
        </motion.button>
      )}

      {/* Feedback messages */}
      <AnimatePresence mode="wait">
        {feedback === 'correct' && (
          <motion.div
            key="correct"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-neon-green bg-green-950/50 rounded-xl p-4 text-center"
          >
            <p className="neon-green text-lg font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              ✅ ¡CORRECTO!
            </p>
            <p className="text-green-300 text-sm font-mono mt-1">
              <KatexRenderer math={`x = ${solution.x},\\quad y = ${solution.y}`} />
            </p>
            <p className="text-slate-400 text-xs mt-2 font-mono">Desbloquando puerta…</p>
          </motion.div>
        )}

        {feedback === 'wrong' && (
          <motion.div
            key="wrong"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border-neon-red bg-red-950/40 rounded-xl p-3 text-center"
          >
            <p className="neon-red text-sm font-mono">
              ❌ No es correcto. Revisa tus cálculos. Quedan {attemptsLeft} intento{attemptsLeft !== 1 ? 's' : ''}.
            </p>
          </motion.div>
        )}

        {feedback === 'revealed' && (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-neon-orange bg-yellow-950/40 rounded-xl p-4 text-center space-y-2"
          >
            <p className="neon-orange text-sm font-bold font-mono">
              ⚠️ Se han agotado los intentos. Aquí está la solución:
            </p>
            <div className="text-lg">
              <KatexRenderer math={`x = ${solution.x},\\quad y = ${solution.y}`} />
            </div>
            <p className="text-slate-400 text-xs font-mono">
              Comprueba el proceso con las pistas y continúa.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onSuccess}
              className="mt-2 px-6 py-2 rounded-xl font-bold text-sm tracking-wider cursor-pointer"
              style={{
                background: 'rgba(255,170,0,0.1)',
                border: '1px solid rgba(255,170,0,0.5)',
                color: 'var(--neon-orange)',
                fontFamily: "'Orbitron', sans-serif",
              }}
            >
              CONTINUAR →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
