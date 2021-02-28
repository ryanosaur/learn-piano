const WAVEFORM = {
  SINE: "sine",
  SQUARE: "square",
  SAWTOOTH: "sawtooth",
  TRIANGLE: "triangle",
};

function AudioHandler() {
  this.context = null;
  this.oscillator = null;
  this.isStarted = false;
  this.getOrCreateContext = function () {
    if (!this.context) {
      this.context = new AudioContext();
      this.oscillator = this.context.createOscillator();
      this.oscillator.connect(this.context.destination);
    }
  };
  this.playSound = function (frequency, _intensity) {
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
  };
  this.stopSound = function () {
    this.getOrCreateContext();
    this.context.suspend();
  };
  this.midiToFrequency = function (keyValue) {
    return Math.pow(2, (keyValue - 69) / 12) * 440;
  };
  this.setWaveform = function (waveform = WAVEFORM.SINE) {
    this.getOrCreateContext();
    this.oscillator.type = waveform;
  };
}

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
const NOTES = Object.keys(KEY_MAP);

const SCALE_MAP = {
  major: [2, 2, 1, 2, 2, 2, 1],
  minor: [2, 1, 2, 2, 1, 2, 2],
  chormatic: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  pentatonic: [3, 2, 3, 2],
};

const SCALES = Object.keys(SCALE_MAP);

const generateScaleForNote = (note = "C1", scale = "major") =>
  SCALE_MAP[scale].reduce(
    (acc, step) => ({
      current: acc.current + step,
      values: [...acc.values, acc.current + step],
    }),
    { current: KEY_MAP[note], values: [KEY_MAP[note]] }
  ).values;

export { KEY_MAP, SCALES, NOTES, WAVEFORM, AudioHandler, generateScaleForNote };
