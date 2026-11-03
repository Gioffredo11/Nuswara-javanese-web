/**
 * Web Audio API synthesizer for tactile mechanical wood/lontar keystroke clicks
 * Zero external MP3 or network dependencies.
 */
let audioCtx: AudioContext | null = null;

export function playLontarClickSound() {
  if (typeof window === 'undefined') return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Fast acoustic pop resembling dry wood / lontar leaf tap
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    // Wood resonance filter (bandpass around 1200Hz)
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(3.5, now);

    // Short pitch drop
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);

    // Fast snappy envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch {
    // AudioContext blocked or not supported - fails gracefully
  }
}

/**
 * Text-to-speech pronunciation for Javanese phonetic phrases using Web Speech API
 */
export function speakJavanesePhonetics(phrase: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.rate = 0.85;
    utterance.pitch = 1.0;

    // Find Indonesian or Javanese voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.toLowerCase().startsWith('jv') || v.lang.toLowerCase().startsWith('id')
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    } else {
      utterance.lang = 'id-ID';
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.debug('SpeechSynthesis notice:', err);
  }
}

