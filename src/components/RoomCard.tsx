// ── RoomCard — main wrapper for each room phase ──
import { motion, AnimatePresence } from 'framer-motion';
import type { RoomData, Method, RoomPhase, Language } from '../types';
import SystemDisplay from './SystemDisplay';
import MethodSelector from './MethodSelector';
import FeedbackPanel from './FeedbackPanel';
import SolvePanel from './SolvePanel';
import HintBox from './HintBox';
import DoorAnimation from './DoorAnimation';
import EquationInputPanel from './EquationInputPanel';
import { t } from '../utils/i18n';

interface Props {
  room: RoomData;
  lang: Language;
  phase: RoomPhase;
  selectedMethod: Method | null;
  isLastRoom: boolean;
  onChooseMethod: (m: Method) => void;
  onContinueToSolve: () => void;
  onSystemWritten: () => void;
  onSolveSuccess: () => void;
  onNextRoom: () => void;
}

const PHASE_TITLES: Record<Language, Record<RoomPhase, string>> = {
  es: {
    intro: 'ANALIZAR SISTEMA',
    write_system: 'PLANTEAR SISTEMA',
    choose_method: 'ELEGIR MÉTODO',
    solve: 'RESOLVER SISTEMA',
    success: 'SALA COMPLETADA',
  },
  en: {
    intro: 'ANALYZE SYSTEM',
    write_system: 'BUILD THE SYSTEM',
    choose_method: 'CHOOSE METHOD',
    solve: 'SOLVE SYSTEM',
    success: 'ROOM CLEARED',
  },
};

const DUA_STEPS: Record<Language, Record<RoomPhase, string[]>> = {
  es: {
    intro: [
      '1) Lee el reto y subraya datos clave',
      '2) Identifica variables x e y',
      '3) Decide el siguiente paso',
    ],
    write_system: [
      '1) Traduce el texto a ecuaciones',
      '2) Comprueba signos y coeficientes',
      '3) Valida tu sistema',
    ],
    choose_method: [
      '1) Observa la forma del sistema',
      '2) Compara los tres métodos',
      '3) Elige y justifica mentalmente',
    ],
    solve: [
      '1) Resuelve paso a paso',
      '2) Revisa el resultado en ambas ecuaciones',
      '3) Escribe x e y con cuidado',
    ],
    success: [
      '1) Revisa lo aprendido',
      '2) Conserva la estrategia útil',
      '3) Pasa al siguiente reto',
    ],
  },
  en: {
    intro: [
      '1) Read and highlight key data',
      '2) Identify variables x and y',
      '3) Decide your next step',
    ],
    write_system: [
      '1) Translate text into equations',
      '2) Check signs and coefficients',
      '3) Validate your system',
    ],
    choose_method: [
      '1) Observe system structure',
      '2) Compare the three methods',
      '3) Choose and justify mentally',
    ],
    solve: [
      '1) Solve step by step',
      '2) Check the result in both equations',
      '3) Enter x and y carefully',
    ],
    success: [
      '1) Review what you learned',
      '2) Keep the useful strategy',
      '3) Move to the next challenge',
    ],
  },
};

export default function RoomCard({
  room,
  lang,
  phase,
  selectedMethod,
  isLastRoom,
  onChooseMethod,
  onContinueToSolve,
  onSystemWritten,
  onSolveSuccess,
  onNextRoom,
}: Props) {
  const isEs = lang === 'es';
  const feedback = selectedMethod ? room.methodFeedback[selectedMethod] : null;
  const roomTitle = t(room.title, lang);
  const roomNarrative = t(room.narrative, lang);
  const roomProblemText = t(room.problemText, lang);
  const roomSystemExplanation = t(room.systemExplanation, lang);
  const roomBadgeLabel = t(room.badgeLabel, lang);

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
              {isEs ? 'PUERTA' : 'DOOR'} {room.doorNumber}
            </span>
            {room.type === 'word' && (
              <span className="text-xs px-2 py-0.5 rounded border text-purple-400 border-purple-700 bg-purple-950/40">
                {isEs ? 'PROBLEMA VERBAL' : 'WORD PROBLEM'}
              </span>
            )}
          </div>
          <h2
            className="text-white font-bold text-base mt-1"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {roomTitle}
          </h2>
        </div>

        {/* Phase indicator */}
        <div className="text-right">
          <span className="text-xs text-cyan-500 font-mono tracking-wider block">
            {isEs ? 'FASE' : 'PHASE'}
          </span>
          <span
            className="text-xs font-bold neon-cyan tracking-widest"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {PHASE_TITLES[lang][phase]}
          </span>
        </div>
      </div>

      {/* Room body */}
      <div className="p-6 space-y-5">
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4 space-y-3">
          <p className="text-cyan-300 text-xs font-mono uppercase tracking-widest">
            {isEs ? 'DUA - Objetivo' : 'UDL - Goal'}
          </p>
          <p className="text-slate-300 text-sm font-mono leading-relaxed">
            {isEs
              ? 'Comprender el sistema, elegir una estrategia eficiente y justificar la solución.'
              : 'Understand the system, choose an efficient strategy, and justify the solution.'}
          </p>
          <div>
            <p className="text-slate-400 text-xs font-mono mb-2">{isEs ? 'Pasos guiados' : 'Guided steps'}</p>
            <ul className="space-y-1">
              {DUA_STEPS[lang][phase].map((step) => (
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
                  📡 {roomNarrative}
                </p>
              </div>

              {/* Word problem text (only for word problems) */}
              {room.type === 'word' && roomProblemText && (
                <div className="bg-purple-950/30 border border-purple-700/40 rounded-xl px-5 py-4">
                  <p className="text-purple-300 text-xs uppercase tracking-widest font-mono mb-2">
                    {isEs ? 'Enunciado' : 'Statement'}
                  </p>
                  <p className="text-slate-200 text-sm font-mono leading-relaxed whitespace-pre-line">
                    {roomProblemText}
                  </p>
                </div>
              )}

              {/* System explanation for word problems */}
              {room.type === 'word' && roomSystemExplanation && (
                <div className="bg-cyan-950/20 border border-cyan-800/30 rounded-xl px-4 py-3">
                  <p className="text-cyan-300 text-xs font-mono leading-relaxed">
                    💬 {roomSystemExplanation}
                  </p>
                </div>
              )}

              {/* System display (hide for word problems until student writes it) */}
              {room.type === 'equation' && (
                <SystemDisplay
                  latex={room.latex}
                  title={isEs ? 'SISTEMA DE ECUACIONES' : 'SYSTEM OF EQUATIONS'}
                />
              )}

              {room.type === 'word' && (
                <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4">
                  <p className="text-slate-300 text-sm font-mono leading-relaxed">
                    {isEs
                      ? '🧩 En esta puerta debes escribir tu propio sistema antes de elegir método.'
                      : '🧩 In this room, write your own system before choosing a method.'}
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
                {room.type === 'word'
                  ? (isEs ? 'ANALIZAR -> PLANTEAR SISTEMA' : 'ANALYZE -> BUILD SYSTEM')
                  : (isEs ? 'ANALIZAR -> ELEGIR MÉTODO' : 'ANALYZE -> CHOOSE METHOD')}
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
              {roomProblemText && (
                <div className="bg-purple-950/30 border border-purple-700/40 rounded-xl px-5 py-4">
                  <p className="text-purple-300 text-xs uppercase tracking-widest font-mono mb-2">{isEs ? 'Enunciado' : 'Statement'}</p>
                  <p className="text-slate-200 text-sm font-mono leading-relaxed whitespace-pre-line">
                    {roomProblemText}
                  </p>
                </div>
              )}

              {roomSystemExplanation && (
                <div className="bg-cyan-950/20 border border-cyan-800/30 rounded-xl px-4 py-3">
                  <p className="text-cyan-300 text-xs font-mono leading-relaxed">💬 {roomSystemExplanation}</p>
                </div>
              )}

              <EquationInputPanel
                expectedEquations={room.expectedEquations}
                lang={lang}
                onSuccess={onSystemWritten}
              />

              <HintBox hints={room.hints} lang={lang} />
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
              <SystemDisplay latex={room.latex} title={isEs ? 'SISTEMA' : 'SYSTEM'} />

              {/* Method selector or feedback */}
              {!selectedMethod ? (
                <MethodSelector onSelect={onChooseMethod} lang={lang} />
              ) : (
                feedback && (
                  <FeedbackPanel
                    chosenMethod={selectedMethod}
                    message={feedback.message}
                    quality={feedback.quality}
                    lang={lang}
                    onContinue={onContinueToSolve}
                  />
                )
              )}

              {/* Hint box */}
              {!selectedMethod && <HintBox hints={room.hints} lang={lang} />}
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
              <SystemDisplay latex={room.latex} title={isEs ? 'SISTEMA A RESOLVER' : 'SYSTEM TO SOLVE'} />

              {/* Method reminder */}
              {selectedMethod && (
                <div className="text-center">
                  <span className="text-xs text-slate-500 font-mono">{isEs ? 'Método elegido: ' : 'Selected method: '}</span>
                  <span className="text-xs font-bold text-cyan-400 font-mono capitalize">{
                    isEs
                      ? { sustitucion: 'Sustitución', igualacion: 'Igualación', reduccion: 'Reducción' }[selectedMethod]
                      : { sustitucion: 'Substitution', igualacion: 'Equalization', reduccion: 'Elimination' }[selectedMethod]
                  }</span>
                </div>
              )}

              {/* Solve panel */}
              <SolvePanel
                solution={room.solution}
                varLabels={room.varLabels}
                lang={lang}
                onSuccess={onSolveSuccess}
              />

              {/* Hints */}
              <HintBox hints={room.hints} lang={lang} />
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
                badgeLabel={roomBadgeLabel}
                roomTitle={roomTitle}
                lang={lang}
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
