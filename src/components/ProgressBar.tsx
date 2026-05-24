// ── ProgressBar — shows current progress through all rooms ──
import { motion } from 'framer-motion';
import type { Language } from '../types';

interface Props {
  total: number;
  completed: number;
  badges: string[];
  elapsedTime: number; // seconds
  lang: Language;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function ProgressBar({ total, completed, badges, elapsedTime, lang }: Props) {
  const isEs = lang === 'es';
  const pct = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="w-full px-4 py-3 card-dark border-b border-cyan-900/40">
      <div className="max-w-3xl mx-auto flex flex-col gap-2">

        {/* Top row: title + timer + progress text */}
        <div className="flex items-center justify-between text-xs">
          <span
            className="neon-cyan font-bold tracking-widest text-sm hidden sm:inline"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            ESCAPE ROOM ALGEBRAICO
          </span>
          <span className="neon-orange font-mono text-sm tracking-widest">
            ⏱ {formatTime(elapsedTime)}
          </span>
          <span className="text-slate-400 font-mono">
            {completed}/{total} {isEs ? 'salas' : 'rooms'}
          </span>
        </div>

        {/* Progress bar track */}
        <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden border border-cyan-900/30">
          <motion.div
            className="h-full rounded-full progress-fill"
            style={{
              background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-green))',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>

        {/* Badges row */}
        {badges.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {badges.map((badge, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="text-lg"
                title={isEs ? `Insignia ${i + 1}` : `Badge ${i + 1}`}
              >
                {badge}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
