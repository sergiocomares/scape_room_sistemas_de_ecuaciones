// ── DoorAnimation — door unlocking success animation ──
import { motion } from 'framer-motion';

interface Props {
  badge: string;
  badgeLabel: string;
  roomTitle: string;
  onNext: () => void;
  isLast: boolean;
}

export default function DoorAnimation({ badge, badgeLabel, roomTitle, onNext, isLast }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-6 py-4 text-center"
    >
      {/* Door frame */}
      <div className="relative w-40 h-52 flex items-center justify-center">
        {/* Door frame border */}
        <div
          className="absolute inset-0 rounded-t-3xl border-2"
          style={{
            borderColor: 'rgba(0,255,136,0.7)',
            boxShadow: '0 0 20px rgba(0,255,136,0.4), inset 0 0 20px rgba(0,255,136,0.05)',
          }}
        />

        {/* Door panel — animates open */}
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: -75 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            perspective: '600px',
          }}
          className="absolute inset-0 rounded-t-3xl"
          // Back face
        >
          <div
            className="w-full h-full rounded-t-3xl flex flex-col items-center justify-center gap-3"
            style={{
              background: 'linear-gradient(160deg, rgba(0,50,30,0.9), rgba(0,30,15,0.95))',
              border: '1px solid rgba(0,255,136,0.3)',
            }}
          >
            {/* Door handle */}
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: 'var(--neon-green)', boxShadow: '0 0 8px var(--neon-green)' }}
            />
            {/* Door lines */}
            <div className="space-y-2 w-16">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-px w-full"
                  style={{ background: 'rgba(0,255,136,0.2)' }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Behind door — light beam */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute inset-0 rounded-t-3xl flex items-center justify-center"
          style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,136,0.15), transparent 70%)' }}
        >
          <span className="text-5xl z-10">➡️</span>
        </motion.div>
      </div>

      {/* Badge earned */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 300, damping: 15 }}
        className="flex flex-col items-center gap-1"
      >
        <span className="text-5xl">{badge}</span>
        <span className="neon-green text-sm font-bold tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          {badgeLabel}
        </span>
        <span className="text-green-400 text-xs font-mono">¡Insignia conseguida!</span>
      </motion.div>

      {/* Success text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="space-y-1"
      >
        <p
          className="neon-green text-xl font-black tracking-widest"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          🔓 PUERTA DESBLOQUEADA
        </p>
        <p className="text-slate-400 text-sm font-mono">{roomTitle} completada</p>
      </motion.div>

      {/* Next button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onNext}
        className="px-10 py-4 rounded-xl font-bold text-base tracking-widest cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, rgba(0,255,136,0.15), rgba(0,255,136,0.05))',
          border: '1px solid var(--neon-green)',
          color: 'var(--neon-green)',
          fontFamily: "'Orbitron', sans-serif",
          boxShadow: '0 0 20px rgba(0,255,136,0.2)',
        }}
      >
        {isLast ? '🏆 VER RESULTADOS FINALES' : '▶ SIGUIENTE SALA'}
      </motion.button>
    </motion.div>
  );
}
