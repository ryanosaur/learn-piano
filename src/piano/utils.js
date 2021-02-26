const AudioHandler = {
  context: null,
  oscillator: null,
  isStarted: false,
  getOrCreateContext() {
    if (!this.context) {
      this.context = new AudioContext();
      this.oscillator = this.context.createOscillator();
      this.oscillator.connect(this.context.destination);
    }
  },
  playSound(frequency, type) {
    this.getOrCreateContext();
    this.oscillator.frequency.setTargetAtTime(
      frequency,
      this.context.currentTime,
      0
    );
    if (!this.isStarted) {
      this.oscillator.start(0);
      this.isStarted = true;
    } else {
      this.context.resume();
    }
  },
  stopSound() {
    this.getOrCreateContext();
    this.context.suspend();
  },
  midiToFrequency(keyValue) {
    return Math.pow(2, (keyValue - 69) / 12) * 440;
  },
};

const KEY_MAP = {
  C1: 48,
  CS1: 49,
  D1: 50,
  DS1: 51,
  E1: 52,
  F1: 53,
  FS1: 54,
  G1: 55,
  GS1: 56,
  A1: 57,
  AS1: 58,
  B1: 59,
  C2: 60,
  CS2: 61,
  D2: 62,
  DS2: 63,
  E2: 64,
  F2: 65,
  FS2: 66,
  G2: 67,
  GS2: 68,
  A2: 69,
  AS2: 70,
  B2: 71,
  C3: 72,
};

export { KEY_MAP, AudioHandler };
