/**
 * Web Audio API Sacred Gamelan & Card Haptics Synthesizer
 * Pure client-side synthesis — Zero network payload, zero external audio assets.
 * Emulates the meditative, resonant harmonic tones of Javanese bronze gamelan
 * (Slendro & Pelog harmonics) and tactile physical card shuffle clicks.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch {
    return null;
  }
}

const STORAGE_KEY = 'nuswara_audio_muted';

export function isSoundMuted(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setSoundMuted(muted: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, muted ? 'true' : 'false');
  } catch {}
}

/**
 * Play a resonant Javanese bronze bell / gamelan kethuk chime
 * Uses harmonic overtone series (Fundamental + 1.5x + 2.0x) with exponential decay
 */
export function playGamelanBell(baseFreq = 528): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.18, now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
    masterGain.connect(ctx.destination);

    // Harmonic partials mimicking bronze gong / kethuk resonance
    const partials = [
      { ratio: 1.0, gain: 0.6 },
      { ratio: 1.51, gain: 0.25 },
      { ratio: 2.02, gain: 0.15 },
      { ratio: 2.76, gain: 0.08 },
    ];

    partials.forEach(({ ratio, gain: partGain }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * ratio, now);
      // Slight detune for metallic bronze shimmer
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);

      gainNode.gain.setValueAtTime(partGain, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + (1.2 / ratio));

      osc.connect(gainNode);
      gainNode.connect(masterGain);

      osc.start(now);
      osc.stop(now + 1.9);
    });
  } catch {
    // Graceful fallback if audio is blocked
  }
}

/**
 * Play card dealing / shuffle rustle effect
 * Fast filtered noise flutter imitating physical cards fanning & sliding
 */
export function playCardShuffleSound(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // 3 subtle quick card snaps in rhythm
    [0, 0.08, 0.16].forEach((offset) => {
      const snapTime = now + offset;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120 + Math.random() * 80, snapTime);
      osc.frequency.exponentialRampToValueAtTime(40, snapTime + 0.04);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, snapTime);

      gain.gain.setValueAtTime(0.07, snapTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, snapTime + 0.045);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(snapTime);
      osc.stop(snapTime + 0.05);
    });
  } catch {}
}

/**
 * Play card draw lift sound (soaring harmonic glide)
 */
export function playCardDrawSound(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(396, now);
    osc.frequency.exponentialRampToValueAtTime(792, now + 0.45);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.65);
  } catch {}
}

/**
 * Play card reveal fanfare chord (Sacred Javanese Pelog-inspired harmony)
 */
export function playCardRevealSound(): void {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // Pelog Pentatonic chord: Pelog 1 (Bem), 2 (Gulu), 3 (Dhadha), 5 (Lima), 6 (Nem)
    // Frequencies approximate: 440Hz, 528Hz, 660Hz, 880Hz
    const chord = [440, 528, 660, 880];

    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const startTime = now + idx * 0.06;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 1.5);
    });
  } catch {}
}
