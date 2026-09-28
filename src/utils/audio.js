// Procedural Web Audio API Ambient Soundscape Generator for ÉTHER Phoenix Noir
// Luxury warm drone + crackling ember fire + interactive crystal chime

class SoundScape {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.droneGain = null;
    this.emberGain = null;
    this.nodes = [];
    this.isMuted = false;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
      this.droneGain.connect(this.masterGain);

      this.emberGain = this.ctx.createGain();
      this.emberGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
      this.emberGain.connect(this.masterGain);

      this.setupAtmosphereDrone();
      this.setupEmberCrackles();
    } catch (e) {
      console.warn("Web Audio not supported or blocked", e);
    }
  }

  setupAtmosphereDrone() {
    if (!this.ctx) return;

    // Rich luxury chords: F2 (87.3Hz), C3 (130.8Hz), A3 (220.0Hz), E4 (329.6Hz)
    const baseFreqs = [87.31, 130.81, 174.61, 220.0, 329.63];

    baseFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Gentle slow pitch drift (LFO)
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.08 + idx * 0.03, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.5, this.ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450 + idx * 120, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08 / (idx + 1), this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.droneGain);

      osc.start();
      this.nodes.push(osc, lfo);
    });
  }

  setupEmberCrackles() {
    if (!this.ctx) return;

    // Buffer of soft crackling noise
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Sporadic ember pops
      if (Math.random() < 0.003) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(Math.random(), 4);
      } else {
        data[i] = (Math.random() * 2 - 1) * 0.015;
      }
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(this.emberGain);
    noise.start();
    this.nodes.push(noise);
  }

  toggle() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.droneGain.gain.setTargetAtTime(0.0, this.ctx.currentTime, 0.8);
      this.emberGain.gain.setTargetAtTime(0.0, this.ctx.currentTime, 0.8);
      this.isPlaying = false;
    } else {
      this.droneGain.gain.setTargetAtTime(0.6, this.ctx.currentTime, 1.2);
      this.emberGain.gain.setTargetAtTime(0.25, this.ctx.currentTime, 1.2);
      this.isPlaying = true;
    }
    return this.isPlaying;
  }

  playChime(noteFreq = 880) {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.8);
    } catch (e) {
      // ignore
    }
  }
}

export const audioSystem = new SoundScape();
