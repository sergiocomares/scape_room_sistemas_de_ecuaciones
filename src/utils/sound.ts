let audioCtx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
  }
  return audioCtx;
}

function playTone(freq: number, durationMs: number, type: OscillatorType, gainValue: number, startAt = 0): void {
  const ctx = getContext();
  if (!ctx) return;

  const startTime = ctx.currentTime + startAt;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(gainValue, startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + durationMs / 1000);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + durationMs / 1000 + 0.02);
}

export function playSuccessSound(): void {
  playTone(523.25, 130, 'triangle', 0.09, 0);
  playTone(659.25, 150, 'triangle', 0.09, 0.13);
}

export function playErrorSound(): void {
  playTone(180, 170, 'sawtooth', 0.06, 0);
  playTone(140, 190, 'sawtooth', 0.06, 0.08);
}

// Plays a custom song file during the victory screen.
// Put your file at: public/audio/final-song.mp3
export function startVictorySongFromFile(fileUrl = '/audio/final-song.mp3'): () => void {
  if (typeof window === 'undefined') return () => {};

  const audio = new Audio(fileUrl);
  audio.loop = true;
  audio.volume = 0.55;

  // Browsers may block autoplay before user interaction; ignore that safely.
  audio.play().catch(() => {});

  return () => {
    audio.pause();
    audio.currentTime = 0;
  };
}
