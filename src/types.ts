// ── Shared types for the Escape Room Algebraico app ──

export type Method = 'sustitucion' | 'igualacion' | 'reduccion';
export type MethodQuality = 'best' | 'valid' | 'wrong';
export type AppPhase = 'start' | 'playing' | 'victory';
export type RoomPhase = 'intro' | 'write_system' | 'choose_method' | 'solve' | 'success';

export interface MethodFeedback {
  message: string;
  quality: MethodQuality;
}

export interface RoomData {
  id: number;
  type: 'equation' | 'word';
  title: string;
  doorNumber: string;
  narrative: string;
  badge: string;         // emoji used as badge icon
  badgeLabel: string;    // text label for the badge
  latex: string;         // LaTeX string for the system (cases environment)
  recommendedMethod: Method;
  solution: { x: number; y: number };
  varLabels: { x: string; y: string };  // human-readable variable names
  hints: string[];                       // progressive hints (3 max)
  methodFeedback: Record<Method, MethodFeedback>;
  // Word problem specific
  problemText?: string;
  systemExplanation?: string; // explains what x and y represent
  expectedEquations?: [string, string]; // canonical equations for student input
}
