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
  intro: 'ANALIZAR SISTEMA',
  write_system: 'PLANTEAR SISTEMA',
  choose_method: 'ELEGIR MÉTODO',
  solve: 'RESOLVER SISTEMA',
  success: 'SALA COMPLETADA',
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
              PUERTA {room.doorNumber}
            </span>
            {room.type === 'word' && (
              <span className="text-xs px-2 py-0.5 rounded border text-purple-400 border-purple-700 bg-purple-950/40">
                PROBLEMA VERBAL
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
            FASE
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
                    🧩 En esta puerta debes escribir tu propio sistema antes de elegir metodo.
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
                {room.type === 'word' ? 'ANALIZAR → PLANTEAR SISTEMA' : 'ANALIZAR → ELEGIR MÉTODO'}
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
                    { sustitucion: 'Sustitución', igualacion: 'Igualación', reduccion: 'Reducción' }[selectedMethod]
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
