// ── SystemDisplay — renders a LaTeX equation system in a styled panel ──
import { motion } from 'framer-motion';
import KatexRenderer from './KatexRenderer';

interface Props {
  latex: string;
  title?: string;
}

export default function SystemDisplay({ latex, title }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border-neon-purple card-dark rounded-xl p-6 text-center relative overflow-hidden"
    >
      {/* Decorative corner brackets */}
      <span className="absolute top-2 left-3 text-purple-500/40 text-xs font-mono select-none">┌─</span>
      <span className="absolute top-2 right-3 text-purple-500/40 text-xs font-mono select-none">─┐</span>
      <span className="absolute bottom-2 left-3 text-purple-500/40 text-xs font-mono select-none">└─</span>
      <span className="absolute bottom-2 right-3 text-purple-500/40 text-xs font-mono select-none">─┘</span>

      {title && (
        <p className="text-purple-400 text-xs tracking-widest uppercase mb-3 font-mono">
          {title}
        </p>
      )}

      <div className="flex justify-center items-center py-2">
        <KatexRenderer math={latex} block />
      </div>
    </motion.div>
  );
}
