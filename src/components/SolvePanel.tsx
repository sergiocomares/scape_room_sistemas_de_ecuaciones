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
  const [activeField, setActiveField] = useState<'x' | 'y'>('x');
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

  function appendToActive(char: string): void {
    if (activeField === 'x') {
      setXVal((prev) => prev + char);
      return;
    }
    setYVal((prev) => prev + char);
  }

  function backspaceActive(): void {
    if (activeField === 'x') {
      setXVal((prev) => prev.slice(0, -1));
      return;
    }
    setYVal((prev) => prev.slice(0, -1));
  }

  function clearActive(): void {
    if (activeField === 'x') {
      setXVal('');
      return;
    }
    setYVal('');
  }

  const attemptsLeft = MAX_ATTEMPTS - attempts;

  return (
    <div className="space-y-5">
      <div className="text-center">
        <p className="text-slate-300 text-sm font-mono mb-1">
          Introduce la solucion del sistema / Enter the system solution:
        </p>
        {attemptsLeft > 0 && feedback !== 'revealed' && (
          <p className="text-slate-500 text-xs font-mono">
            {attempts > 0 ? `Intento ${attempts + 1} de ${MAX_ATTEMPTS} / Attempt ${attempts + 1} of ${MAX_ATTEMPTS}` : `Tienes ${MAX_ATTEMPTS} intentos / You have ${MAX_ATTEMPTS} attempts`}
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
            className={`input-neon text-center text-xl font-bold ${activeField === 'x' ? 'ring-2 ring-cyan-500/70' : ''}`}
            placeholder="?"
            value={xVal}
            onChange={(e) => setXVal(e.target.value)}
            onFocus={() => setActiveField('x')}
            onClick={() => setActiveField('x')}
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
            className={`input-neon text-center text-xl font-bold ${activeField === 'y' ? 'ring-2 ring-purple-500/70' : ''}`}
            placeholder="?"
            value={yVal}
            onChange={(e) => setYVal(e.target.value)}
            onFocus={() => setActiveField('y')}
            onClick={() => setActiveField('y')}
            onKeyDown={handleKey}
            disabled={feedback === 'correct' || feedback === 'revealed'}
          />
        </motion.div>
      </div>

      {/* Small numeric keypad */}
      {feedback !== 'correct' && feedback !== 'revealed' && (
        <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-3">
          <p className="text-xs text-slate-400 font-mono mb-2">
            Teclado numerico / Numeric keypad (campo activo / active field: {activeField === 'x' ? 'x' : 'y'})
          </p>

          <div className="grid grid-cols-3 gap-2">
            {['7', '8', '9', '4', '5', '6', '1', '2', '3'].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => appendToActive(key)}
                className="py-2 rounded-md border border-cyan-800/50 text-cyan-200 font-mono bg-cyan-950/20 hover:bg-cyan-900/30"
              >
                {key}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <button
              type="button"
              onClick={() => appendToActive('-')}
              className="py-2 rounded-md border border-purple-800/50 text-purple-200 font-mono bg-purple-950/20 hover:bg-purple-900/30"
            >
              -
            </button>
            <button
              type="button"
              onClick={() => appendToActive('0')}
              className="py-2 rounded-md border border-cyan-800/50 text-cyan-200 font-mono bg-cyan-950/20 hover:bg-cyan-900/30"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => appendToActive('.')}
              className="py-2 rounded-md border border-purple-800/50 text-purple-200 font-mono bg-purple-950/20 hover:bg-purple-900/30"
            >
              .
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <button
              type="button"
              onClick={backspaceActive}
              className="py-2 rounded-md border border-orange-700/50 text-orange-300 font-mono bg-orange-950/20 hover:bg-orange-900/25"
            >
              Borrar / Delete
            </button>
            <button
              type="button"
              onClick={clearActive}
              className="py-2 rounded-md border border-red-700/50 text-red-300 font-mono bg-red-950/20 hover:bg-red-900/25"
            >
              Limpiar / Clear
            </button>
            <button
              type="button"
              onClick={() => setActiveField(activeField === 'x' ? 'y' : 'x')}
              className="py-2 rounded-md border border-slate-700 text-slate-200 font-mono bg-slate-800/60 hover:bg-slate-700/60"
            >
              Cambiar / Switch
            </button>
          </div>
        </div>
      )}

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
          ⚡ COMPROBAR SOLUCION / CHECK SOLUTION
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
              ✅ CORRECTO / CORRECT
            </p>
            <p className="text-green-300 text-sm font-mono mt-1">
              <KatexRenderer math={`x = ${solution.x},\\quad y = ${solution.y}`} />
            </p>
            <p className="text-slate-400 text-xs mt-2 font-mono">Desbloqueando puerta... / Unlocking door...</p>
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
              ❌ No es correcto. Revisa tus calculos. / Not correct. Check your calculations. Quedan {attemptsLeft} intento{attemptsLeft !== 1 ? 's' : ''}.
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
              ⚠️ Se han agotado los intentos. Aqui esta la solucion: / Attempts finished. Here is the solution:
            </p>
            <div className="text-lg">
              <KatexRenderer math={`x = ${solution.x},\\quad y = ${solution.y}`} />
            </div>
            <p className="text-slate-400 text-xs font-mono">
              Comprueba el proceso con las pistas y continua. / Check the process with hints and continue.
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
              CONTINUAR / CONTINUE ->
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
