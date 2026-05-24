// ── Shared types for the Escape Room Algebraico app ──

export type Method = 'sustitucion' | 'igualacion' | 'reduccion';
export type MethodQuality = 'best' | 'valid' | 'wrong';
export type Language = 'es' | 'en';
export type AppPhase = 'start' | 'playing' | 'victory';
export type RoomPhase = 'intro' | 'write_system' | 'choose_method' | 'solve' | 'success';

export interface LocalizedText {
  es: string;
  en: string;
}

export interface MethodFeedback {
  message: string | LocalizedText;
  quality: MethodQuality;
}

export interface RoomData {
  id: number;
  type: 'equation' | 'word';
  title: string | LocalizedText;
  doorNumber: string;
  narrative: string | LocalizedText;
  badge: string;         // emoji used as badge icon
  badgeLabel: string | LocalizedText;    // text label for the badge
  latex: string;         // LaTeX string for the system (cases environment)
  recommendedMethod: Method;
  solution: { x: number; y: number };
  varLabels: { x: string | LocalizedText; y: string | LocalizedText };  // human-readable variable names
  hints: string[];                       // progressive hints (3 max)
  methodFeedback: Record<Method, MethodFeedback>;
  // Word problem specific
  problemText?: string | LocalizedText;
  systemExplanation?: string | LocalizedText; // explains what x and y represent
  expectedEquations?: [string, string]; // canonical equations for student input
}
