// ── VictoryScreen — final congratulations screen ──
import { motion } from 'framer-motion';
import type { RoomData, Language } from '../types';
import { t } from '../utils/i18n';

interface Props {
  badges: string[];
  elapsedTime: number;
  rooms: RoomData[];
  lang: Language;
  onRestart: () => void;
  musicNeedsUnlock?: boolean;
  onEnableMusic?: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function VictoryScreen({ badges, elapsedTime, rooms, lang, onRestart, musicNeedsUnlock = false, onEnableMusic }: Props) {
  const isEs = lang === 'es';

  return (
    <div className="min-h-screen grid-bg flex flex-col items-center justify-center px-4 py-12">

      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,255,136,0.06) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="card-dark border-neon-green rounded-2xl p-8 sm:p-12 max-w-2xl w-full text-center space-y-8 relative"
      >
        {/* Trophy */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-7xl"
        >
          🏆
        </motion.div>

        {/* Title */}
        <div>
          <h1
            className="text-3xl sm:text-4xl font-black neon-green tracking-wider"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {isEs ? 'MISIÓN COMPLETADA' : 'MISSION COMPLETE'}
          </h1>
          <p className="text-green-400 mt-2 font-mono text-sm">
            {isEs ? 'Has desbloqueado todas las puertas del instituto' : 'You unlocked all school doors'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/80 border border-cyan-800/40 rounded-xl p-4">
            <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-1">{isEs ? 'Tiempo' : 'Time'}</p>
            <p className="neon-cyan text-2xl font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              {formatTime(elapsedTime)}
            </p>
          </div>
          <div className="bg-slate-900/80 border border-green-800/40 rounded-xl p-4">
            <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-1">{isEs ? 'Salas' : 'Rooms'}</p>
            <p className="neon-green text-2xl font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              {badges.length}/{rooms.length}
            </p>
          </div>
        </div>

        {/* Badges collection */}
        <div>
          <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-4">
            {isEs ? 'Insignias conseguidas' : 'Badges earned'}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {rooms.map((room, i) => (
              <motion.div
                key={room.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
                className="flex flex-col items-center gap-1 bg-slate-900/60 border border-slate-700/40 rounded-xl p-3 min-w-[80px]"
              >
                <span className="text-3xl">{room.badge}</span>
                <span className="text-xs text-slate-400 font-mono text-center leading-tight">
                  {t(room.badgeLabel, lang)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary of methods */}
        <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5 text-left space-y-2">
          <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-3 text-center">
            {isEs ? 'Resumen de métodos óptimos' : 'Best method summary'}
          </p>
          {rooms.map((room) => (
            <div key={room.id} className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">{t(room.title, lang).split('—')[1]?.trim()}</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                room.recommendedMethod === 'sustitucion' ? 'text-cyan-400 bg-cyan-950/50' :
                room.recommendedMethod === 'igualacion' ? 'text-purple-400 bg-purple-950/50' :
                'text-green-400 bg-green-950/50'
              }`}>
                {isEs
                  ? { sustitucion: 'Sustitución', igualacion: 'Igualación', reduccion: 'Reducción' }[room.recommendedMethod]
                  : { sustitucion: 'Substitution', igualacion: 'Equalization', reduccion: 'Elimination' }[room.recommendedMethod]}
              </span>
            </div>
          ))}
        </div>

        {/* Motivational message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-purple-950/30 border border-purple-700/40 rounded-xl p-4"
        >
          <p className="text-purple-300 text-sm font-mono leading-relaxed">
            {isEs
              ? <><span>🌟 Has demostrado que sabes </span><span className="text-purple-400 font-bold">observar, analizar y elegir</span><span> el método más adecuado para cada sistema.</span></>
              : '🌟 You showed strategic mathematical thinking by choosing the best method for each system.'}
          </p>
          <p className="text-purple-400 text-xs font-mono mt-3 leading-relaxed">
            {isEs
              ? '🎵 Canción final personalizada: coloca tu audio en public/audio/final-song.mp3'
              : '🎵 Custom final song: place your audio in public/audio/final-song.mp3'}
          </p>
          <p className="text-slate-400 text-xs font-mono mt-2 leading-relaxed">
            {isEs
              ? 'DUA - Reflexiona: ¿Qué estrategia te ayudó más hoy?'
              : 'UDL - Reflect: Which strategy helped you most today?'}
          </p>
          {musicNeedsUnlock && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onEnableMusic}
              className="mt-3 px-5 py-2 rounded-xl text-xs font-bold tracking-wider cursor-pointer"
              style={{
                background: 'rgba(0,255,136,0.08)',
                border: '1px solid rgba(0,255,136,0.45)',
                color: 'var(--neon-green)',
                fontFamily: "'Orbitron', sans-serif",
              }}
            >
              {isEs ? '🎵 ACTIVAR MÚSICA' : '🎵 ENABLE MUSIC'}
            </motion.button>
          )}
        </motion.div>

        {/* Restart button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          className="w-full py-4 rounded-xl font-bold text-base tracking-widest cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,136,0.12), rgba(0,255,136,0.04))',
            border: '1px solid var(--neon-green)',
            color: 'var(--neon-green)',
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          {isEs ? '🔄 JUGAR DE NUEVO' : '🔄 PLAY AGAIN'}
        </motion.button>
      </motion.div>
    </div>
  );
}
