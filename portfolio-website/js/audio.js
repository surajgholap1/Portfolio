// Web Audio API Procedural Sound Synthesizer
// Provides subtle, modern audio feedback with zero external sound files

class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('portfolio_sfx_enabled') === 'true';
    this.initContext = this.initContext.bind(this);
  }

  initContext() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.initContext();
    this.enabled = !this.enabled;
    localStorage.setItem('portfolio_sfx_enabled', this.enabled);
    if (this.enabled) {
      this.playSuccess();
    }
    return this.enabled;
  }

  playTone(freq, type = 'sine', duration = 0.05, gainValue = 0.05) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio context policy safe ignore
    }
  }

  playHover() {
    this.playTone(520, 'sine', 0.04, 0.015);
  }

  playClick() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  playToggle() {
    if (!this.enabled || !this.ctx) return;
    this.playTone(320, 'sine', 0.04, 0.03);
    setTimeout(() => this.playTone(640, 'sine', 0.06, 0.04), 45);
  }

  playSuccess() {
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 chord
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.18, 0.04);
      }, idx * 70);
    });
  }
}

window.soundFX = new SoundFX();
