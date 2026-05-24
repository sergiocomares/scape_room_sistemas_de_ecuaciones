// ── StartScreen — animated landing page ──
import { motion } from 'framer-motion';

interface Props {
  onStart: () => void;
  musicNeedsUnlock?: boolean;
  onEnableMusic?: () => void;
}

export default function StartScreen({ onStart, musicNeedsUnlock = false, onEnableMusic }: Props) {
  return (
    <div className="relative min-h-screen grid-bg flex flex-col items-center justify-center px-4 overflow-hidden">

      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,212,255,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Floating code particles */}
      {['2x+y=5', 'x-y=1', 'y=3x', '5x-y=11'].map((txt, i) => (
        <motion.span
          key={i}
          className="absolute text-xs select-none pointer-events-none"
          style={{
            color: 'rgba(0,212,255,0.18)',
            fontFamily: "'Share Tech Mono', monospace",
            left: `${10 + i * 22}%`,
            top: `${15 + i * 18}%`,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
        >
          {txt}
        </motion.span>
      ))}

      {/* Main content card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="card-dark border-neon-cyan rounded-2xl p-8 sm:p-12 max-w-2xl w-full text-center relative"
      >
        {/* Lock icon */}
        <motion.div
          animate={{ rotateY: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-6xl mb-4 block"
        >
          🔐
        </motion.div>

        {/* Title with glitch effect */}
        <div className="relative mb-2 select-none">
          <h1
            className="text-4xl sm:text-5xl font-black tracking-wider neon-cyan glitch-title"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            ESCAPE ROOM
          </h1>
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-widest mt-1 neon-purple"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            ALGEBRAICO
          </h2>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-cyan-300 text-sm tracking-widest uppercase mb-8 opacity-70"
        >
          Sistemas de Ecuaciones / Systems of Equations · 2.º ESO
        </motion.p>

        {/* Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-900/80 border border-cyan-900/50 rounded-xl p-5 mb-8 text-left"
        >
          <p className="text-cyan-100 text-sm sm:text-base leading-relaxed">
            <span className="neon-red font-bold">⚠ ALERTA DE SISTEMA:</span>{' '}
            Una inteligencia artificial ha bloqueado el instituto. / An AI has locked down the school.{' '}
            <span className="neon-cyan">Solo resolviendo sistemas de ecuaciones</span>{' '} / Only by solving systems of equations{' '}
            podras desbloquear las puertas. / you will unlock the doors.
          </p>
          <p className="text-slate-400 text-sm mt-3">
            7 salas · 3 metodos · 1 mision · Nivel 2 ESO. Estas preparado/a? / 7 rooms · 3 methods · 1 mission · Grade 8 level. Are you ready?
          </p>
          <p className="text-slate-500 text-xs mt-3">
            Recurso creado por Sergio Jodral, profesor de matematicas usando tecnologia IA.
          </p>
          <p className="text-cyan-300 text-xs mt-2 font-semibold">
            Si quieres escuchar la cancion completa, completa el scape room. / Complete the escape room to hear the full song.
          </p>

          <div className="mt-4 border border-slate-700/60 rounded-lg p-3 bg-slate-950/50">
            <p className="text-cyan-300 text-xs font-mono uppercase tracking-widest mb-2">
              DUA - Objetivos de aprendizaje / Learning goals
            </p>
            <p className="text-slate-300 text-xs leading-relaxed">
              1) Representar un problema con ecuaciones / Represent a problem with equations.
            </p>
            <p className="text-slate-300 text-xs leading-relaxed">
              2) Elegir el metodo mas eficiente / Choose the most efficient method.
            </p>
            <p className="text-slate-300 text-xs leading-relaxed">
              3) Comprobar la solucion en contexto / Check the solution in context.
            </p>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Apoyos DUA: pistas progresivas, pasos guiados y teclado matematico. / UDL supports: progressive hints, guided steps, and math keypad.
            </p>
          </div>
        </motion.div>

        {/* Method legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center gap-3 mb-8 flex-wrap"
        >
          {[
            { label: 'Sustitucion / Substitution', color: 'text-cyan-400 border-cyan-700' },
            { label: 'Igualacion / Equalization', color: 'text-purple-400 border-purple-700' },
            { label: 'Reduccion / Elimination', color: 'text-green-400 border-green-700' },
          ].map((m) => (
            <span
              key={m.label}
              className={`text-xs px-3 py-1 rounded-full border ${m.color} bg-slate-950/60`}
            >
              {m.label}
            </span>
          ))}
        </motion.div>

        {/* Start button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="btn-neon neon-pulse w-full sm:w-auto px-10 py-4 rounded-xl text-lg font-bold tracking-widest cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))',
            border: '1px solid var(--neon-cyan)',
            color: 'var(--neon-cyan)',
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          ▶ COMENZAR MISION / START MISSION
        </motion.button>

        {musicNeedsUnlock && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onEnableMusic}
            className="mt-3 w-full sm:w-auto px-6 py-2 rounded-xl text-xs font-bold tracking-wider cursor-pointer"
            style={{
              background: 'rgba(0,255,136,0.08)',
              border: '1px solid rgba(0,255,136,0.45)',
              color: 'var(--neon-green)',
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            🎵 ACTIVAR MUSICA / ENABLE MUSIC
          </motion.button>
        )}
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 text-slate-600 text-xs tracking-wider"
      >
        Matematicas · 2.º ESO · Sistemas de Ecuaciones / Systems of Equations
      </motion.p>
    </div>
  );
}
