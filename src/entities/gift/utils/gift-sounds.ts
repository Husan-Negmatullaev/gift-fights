// Web Audio API sound effects
let audioContext: AudioContext | null = null;

const initAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
  }
  return audioContext;
};

const createOscillator = (
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
) => {
  const ctx = initAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
  oscillator.type = type;

  gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
};

export const playSpinSound = () => {
  try {
    // Create a spinning sound effect with rising pitch
    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      400,
      ctx.currentTime + 0.5,
    );

    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
  } catch (error) {
    console.log("Audio not supported");
  }
};

export const playWinSound = (rarity: string) => {
  try {
    if (rarity === "legendary") {
      // Epic fanfare for legendary wins
      createOscillator(523, 0.2); // C5
      setTimeout(() => createOscillator(659, 0.2), 100); // E5
      setTimeout(() => createOscillator(784, 0.4), 200); // G5
    } else if (rarity === "epic") {
      // Triumphant sound for epic wins
      createOscillator(440, 0.15); // A4
      setTimeout(() => createOscillator(554, 0.3), 75); // C#5
    } else if (rarity === "rare") {
      // Pleasant chime for rare wins
      createOscillator(523, 0.2); // C5
      setTimeout(() => createOscillator(659, 0.2), 100); // E5
    } else {
      // Simple ding for common wins
      createOscillator(800, 0.15);
    }
  } catch (error) {
    console.log("Audio not supported");
  }
};

// Add haptic feedback for mobile devices
export const playHapticFeedback = (
  intensity: "light" | "medium" | "heavy" = "medium",
) => {
  if ("vibrate" in navigator) {
    const patterns = {
      light: 50,
      medium: 100,
      heavy: 200,
    };
    navigator.vibrate(patterns[intensity]);
  }
};
