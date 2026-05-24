// ── RoomCard — main wrapper for each room phase ──
import { motion, AnimatePresence } from 'framer-motion';
import type { RoomData, Method, RoomPhase } from '../types';
import SystemDisplay from './SystemDisplay';
import MethodSelector from './MethodSelector';
import FeedbackPanel from './FeedbackPanel';
import SolvePanel from './SolvePanel';
import HintBox from './HintBox';
import DoorAnimation from './DoorAnimation';
import EquationInputPanel from './EquationInputPanel';

interface Props {
  room: RoomData;
  phase: RoomPhase;
  selectedMethod: Method | null;
  isLastRoom: boolean;
  onChooseMethod: (m: Method) => void;
  onContinueToSolve: () => void;
  onSystemWritten: () => void;
  onSolveSuccess: () => void;
  onNextRoom: () => void;
}

const PHASE_TITLES: Record<RoomPhase, string> = {
  intro: 'ANALIZAR SISTEMA / ANALYZE SYSTEM',
  write_system: 'PLANTEAR SISTEMA / BUILD THE SYSTEM',
  choose_method: 'ELEGIR METODO / CHOOSE METHOD',
  solve: 'RESOLVER SISTEMA / SOLVE SYSTEM',
  success: 'SALA COMPLETADA / ROOM CLEARED',
};

const DUA_STEPS: Record<RoomPhase, string[]> = {
  intro: [
    '1) Lee el reto y subraya datos clave / Read and highlight key data',
    '2) Identifica variables x e y / Identify variables x and y',
    '3) Decide el siguiente paso / Decide your next step',
  ],
  write_system: [
    '1) Traduce el texto a ecuaciones / Translate text into equations',
    '2) Comprueba signos y coeficientes / Check signs and coefficients',
    '3) Valida tu sistema / Validate your system',
  ],
  choose_method: [
    '1) Observa la forma del sistema / Observe system structure',
    '2) Compara los tres metodos / Compare the three methods',
    '3) Elige y justifica mentalmente / Choose and justify mentally',
  ],
  solve: [
    '1) Resuelve paso a paso / Solve step by step',
    '2) Revisa el resultado en ambas ecuaciones / Check both equations',
    '3) Escribe x e y con cuidado / Enter x and y carefully',
  ],
  success: [
    '1) Revisa lo aprendido / Review what you learned',
    '2) Conserva la estrategia util / Keep the useful strategy',
    '3) Pasa al siguiente reto / Move to the next challenge',
  ],
};

export default function RoomCard({
  room,
  phase,
  selectedMethod,
  isLastRoom,
  onChooseMethod,
  onContinueToSolve,
  onSystemWritten,
  onSolveSuccess,
  onNextRoom,
}: Props) {
  const feedback = selectedMethod ? room.methodFeedback[selectedMethod] : null;

  return (
    <motion.div
      key={room.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="card-dark border-neon-cyan rounded-2xl overflow-hidden max-w-2xl w-full mx-auto"
    >
      {/* Room header */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{
          background: 'linear-gradient(90deg, rgba(0,212,255,0.08), rgba(139,92,246,0.08))',
          borderBottom: '1px solid rgba(0,212,255,0.2)',
        }}
      >
        <div>
          <div className="flex items-center gap-2">
            {/* Door number badge */}
            <span
              className="text-xs font-black px-2 py-0.5 rounded border neon-cyan border-cyan-600"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              PUERTA / DOOR {room.doorNumber}
            </span>
            {room.type === 'word' && (
              <span className="text-xs px-2 py-0.5 rounded border text-purple-400 border-purple-700 bg-purple-950/40">
                PROBLEMA VERBAL / WORD PROBLEM
              </span>
            )}
          </div>
          <h2
            className="text-white font-bold text-base mt-1"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {room.title}
          </h2>
        </div>

        {/* Phase indicator */}
        <div className="text-right">
          <span className="text-xs text-cyan-500 font-mono tracking-wider block">
            FASE / PHASE
          </span>
          <span
            className="text-xs font-bold neon-cyan tracking-widest"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {PHASE_TITLES[phase]}
          </span>
        </div>
      </div>

      {/* Room body */}
      <div className="p-6 space-y-5">
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4 space-y-3">
          <p className="text-cyan-300 text-xs font-mono uppercase tracking-widest">
            DUA - Objetivo / Goal
          </p>
          <p className="text-slate-300 text-sm font-mono leading-relaxed">
            Comprender el sistema, elegir una estrategia eficiente y justificar la solucion. / Understand the system, choose an efficient strategy, and justify the solution.
          </p>
          <div>
            <p className="text-slate-400 text-xs font-mono mb-2">Pasos guiados / Guided steps</p>
            <ul className="space-y-1">
              {DUA_STEPS[phase].map((step) => (
                <li key={step} className="text-slate-300 text-xs font-mono">{step}</li>
              ))}
            </ul>
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* ── INTRO PHASE ── */}
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {/* Narrative */}
              <div className="bg-slate-900/70 border border-slate-700/50 rounded-xl px-5 py-4">
                <p className="text-slate-300 text-sm font-mono leading-relaxed">
                  📡 {room.narrative}
                </p>
              </div>

              {/* Word problem text (only for word problems) */}
              {room.type === 'word' && room.problemText && (
                <div className="bg-purple-950/30 border border-purple-700/40 rounded-xl px-5 py-4">
                  <p className="text-purple-300 text-xs uppercase tracking-widest font-mono mb-2">Enunciado</p>
                  <p className="text-slate-200 text-sm font-mono leading-relaxed whitespace-pre-line">
                    {room.problemText}
                  </p>
                </div>
              )}

              {/* System explanation for word problems */}
              {room.type === 'word' && room.systemExplanation && (
                <div className="bg-cyan-950/20 border border-cyan-800/30 rounded-xl px-4 py-3">
                  <p className="text-cyan-300 text-xs font-mono leading-relaxed">
                    💬 {room.systemExplanation}
                  </p>
                </div>
              )}

              {/* System display (hide for word problems until student writes it) */}
              {room.type === 'equation' && (
                <SystemDisplay
                  latex={room.latex}
                  title="SISTEMA DE ECUACIONES"
                />
              )}

              {room.type === 'word' && (
                <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4">
                  <p className="text-slate-300 text-sm font-mono leading-relaxed">
                    🧩 En esta puerta debes escribir tu propio sistema antes de elegir metodo. / In this room, write your own system before choosing a method.
                  </p>
                </div>
              )}

              {/* Continue button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onContinueToSolve}
                className="w-full py-3 rounded-xl font-bold text-sm tracking-widest cursor-pointer"
                style={{
                  background: 'rgba(0,212,255,0.1)',
                  border: '1px solid rgba(0,212,255,0.5)',
                  color: 'var(--neon-cyan)',
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                {room.type === 'word' ? 'ANALIZAR -> PLANTEAR SISTEMA / ANALYZE -> BUILD SYSTEM' : 'ANALIZAR -> ELEGIR METODO / ANALYZE -> CHOOSE METHOD'}
              </motion.button>
            </motion.div>
          )}

          {/* ── WRITE SYSTEM PHASE ── */}
          {phase === 'write_system' && room.type === 'word' && room.expectedEquations && (
            <motion.div
              key="write-system"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {room.problemText && (
                <div className="bg-purple-950/30 border border-purple-700/40 rounded-xl px-5 py-4">
                  <p className="text-purple-300 text-xs uppercase tracking-widest font-mono mb-2">Enunciado</p>
                  <p className="text-slate-200 text-sm font-mono leading-relaxed whitespace-pre-line">
                    {room.problemText}
                  </p>
                </div>
              )}

              {room.systemExplanation && (
                <div className="bg-cyan-950/20 border border-cyan-800/30 rounded-xl px-4 py-3">
                  <p className="text-cyan-300 text-xs font-mono leading-relaxed">💬 {room.systemExplanation}</p>
                </div>
              )}

              <EquationInputPanel
                expectedEquations={room.expectedEquations}
                onSuccess={onSystemWritten}
              />

              <HintBox hints={room.hints} />
            </motion.div>
          )}

          {/* ── CHOOSE METHOD PHASE ── */}
          {phase === 'choose_method' && (
            <motion.div
              key="method"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {/* System display (compact) */}
              <SystemDisplay latex={room.latex} title="SISTEMA" />

              {/* Method selector or feedback */}
              {!selectedMethod ? (
                <MethodSelector onSelect={onChooseMethod} />
              ) : (
                feedback && (
                  <FeedbackPanel
                    chosenMethod={selectedMethod}
                    message={feedback.message}
                    quality={feedback.quality}
                    onContinue={onContinueToSolve}
                  />
                )
              )}

              {/* Hint box */}
              {!selectedMethod && <HintBox hints={room.hints} />}
            </motion.div>
          )}

          {/* ── SOLVE PHASE ── */}
          {phase === 'solve' && (
            <motion.div
              key="solve"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {/* System display (compact) */}
              <SystemDisplay latex={room.latex} title="SISTEMA A RESOLVER" />

              {/* Method reminder */}
              {selectedMethod && (
                <div className="text-center">
                  <span className="text-xs text-slate-500 font-mono">Método elegido: </span>
                  <span className="text-xs font-bold text-cyan-400 font-mono capitalize">{
                    { sustitucion: 'Sustitucion / Substitution', igualacion: 'Igualacion / Equalization', reduccion: 'Reduccion / Elimination' }[selectedMethod]
                  }</span>
                </div>
              )}

              {/* Solve panel */}
              <SolvePanel
                solution={room.solution}
                varLabels={room.varLabels}
                onSuccess={onSolveSuccess}
              />

              {/* Hints */}
              <HintBox hints={room.hints} />
            </motion.div>
          )}

          {/* ── SUCCESS PHASE ── */}
          {phase === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DoorAnimation
                badge={room.badge}
                badgeLabel={room.badgeLabel}
                roomTitle={room.title}
                onNext={onNextRoom}
                isLast={isLastRoom}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}
