// ==========================================
// FATIMA #25 - PIXEL BASKETBALL CINEMATIC ENGINE
// ==========================================

// ==========================================
// GLOBAL CINEMATIC SPEED CONFIGURATION
// ==========================================
// CINEMATIC_SPEED controls the pacing of cinematic events, animations, holds, and choreography:
// - Values below 1.0 make cinematic actions slower and more deliberate (e.g. 0.75 or 0.5).
// - 1.0 is normal standard speed.
// - Values above 1.0 make them faster.
// This scales timeline progression, animation cadence, dialogue holds, and actor movement in sync.
const CINEMATIC_SPEED = 0.75;

// ==========================================
// SOUND MANAGER (WEB AUDIO SYNTHESIS)
// ==========================================
class SoundManager {
    constructor() {
        this.ctx = null;
        this.muted = false;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    ensureContext() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playDribble() {
        this.ensureContext();
        if (!this.ctx || this.muted) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(190, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.07);

            gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.07);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.07);
        } catch (e) {}
    }

    playSwish() {
        this.ensureContext();
        if (!this.ctx || this.muted) return;
        try {
            const bufferSize = Math.floor(this.ctx.sampleRate * 0.22);
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1100, this.ctx.currentTime);
            filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.45, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.22);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);
            noise.start();
        } catch (e) {}
    }

    playDunkImpact() {
        this.ensureContext();
        if (!this.ctx || this.muted) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(150, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(25, this.ctx.currentTime + 0.45);

            gain.gain.setValueAtTime(1.0, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.45);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.45);

            const rimOsc = this.ctx.createOscillator();
            const rimGain = this.ctx.createGain();
            rimOsc.type = 'square';
            rimOsc.frequency.setValueAtTime(420, this.ctx.currentTime);
            rimOsc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.25);

            rimGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
            rimGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

            rimOsc.connect(rimGain);
            rimGain.connect(this.ctx.destination);
            rimOsc.start();
            rimOsc.stop(this.ctx.currentTime + 0.25);
        } catch (e) {}
    }

    playSlap() {
        this.ensureContext();
        if (!this.ctx || this.muted) return;
        try {
            const bufferSize = Math.floor(this.ctx.sampleRate * 0.12);
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
            }

            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(800, this.ctx.currentTime);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.85, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);
            noise.start();
        } catch (e) {}
    }

    playBonk() {
        this.ensureContext();
        if (!this.ctx || this.muted) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(320, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(90, this.ctx.currentTime + 0.18);

            gain.gain.setValueAtTime(0.75, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.18);
        } catch (e) {}
    }

    playShoeSqueak() {
        this.ensureContext();
        if (!this.ctx || this.muted) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(2200, this.ctx.currentTime + 0.08);

            gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
        } catch (e) {}
    }

    playCrowdCheer() {
        this.ensureContext();

        if (!this.ctx || this.muted) return;

        try {
            const ctx = this.ctx;

            if (ctx.state === 'suspended') {
                ctx.resume().catch(e =>
                    console.error("Audio resume error:", e)
                );
            }

            const now = ctx.currentTime;
            const duration = 3.5;

            // MASTER VOLUME: louder attack, sustained roar, gradual fade
            const master = ctx.createGain();
            master.gain.setValueAtTime(0.001, now);
            master.gain.exponentialRampToValueAtTime(0.9, now + 0.35);
            master.gain.setValueAtTime(0.9, now + 1.0);
            master.gain.setValueAtTime(0.75, now + 2.3);
            master.gain.exponentialRampToValueAtTime(0.001, now + duration);
            master.connect(ctx.destination);

            // CROWD ROAR: longer, fuller filtered noise
            const bufferSize = Math.floor(ctx.sampleRate * duration);
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                const t = i / ctx.sampleRate;

                // Gradual swell and fade
                const envelope = Math.pow(
                    Math.sin(Math.PI * t / duration),
                    0.45
                );

                // Slowly fluctuating crowd intensity
                const variation =
                    0.8 +
                    0.12 * Math.sin(2 * Math.PI * 1.8 * t) +
                    0.08 * Math.sin(2 * Math.PI * 3.1 * t);

                data[i] = (Math.random() * 2 - 1) * envelope * variation;
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const bandpass = ctx.createBiquadFilter();
            bandpass.type = 'bandpass';
            bandpass.frequency.setValueAtTime(1400, now);
            bandpass.Q.setValueAtTime(0.35, now);

            const noiseGain = ctx.createGain();
            noiseGain.gain.setValueAtTime(0.9, now);

            noise.connect(bandpass);
            bandpass.connect(noiseGain);
            noiseGain.connect(master);
            noise.start(now);

            // CROWD VOICES: overlapping, slightly varied vocal-like tones
            const frequencies = [180, 240, 320, 420, 550, 680];

            frequencies.forEach((frequency, index) => {
                const osc = ctx.createOscillator();
                const voiceGain = ctx.createGain();
                const voiceFilter = ctx.createBiquadFilter();

                const startOffset = Math.random() * 0.25;
                const voiceDuration = duration - startOffset;

                osc.type = 'sawtooth';

                const baseFrequency =
                    frequency * (0.9 + Math.random() * 0.2);

                osc.frequency.setValueAtTime(
                    baseFrequency,
                    now + startOffset
                );

                osc.frequency.linearRampToValueAtTime(
                    baseFrequency * (1.08 + Math.random() * 0.12),
                    now + startOffset + voiceDuration * 0.6
                );

                voiceFilter.type = 'lowpass';
                voiceFilter.frequency.setValueAtTime(
                    1000 + index * 250,
                    now
                );

                const volume = 0.035 + Math.random() * 0.025;

                voiceGain.gain.setValueAtTime(0.001, now);
                voiceGain.gain.setValueAtTime(0.001, now + startOffset);

                voiceGain.gain.exponentialRampToValueAtTime(
                    volume,
                    now + startOffset + 0.3
                );

                voiceGain.gain.setValueAtTime(
                    volume,
                    now + duration - 0.5
                );

                voiceGain.gain.exponentialRampToValueAtTime(
                    0.001,
                    now + duration
                );

                osc.connect(voiceFilter);
                voiceFilter.connect(voiceGain);
                voiceGain.connect(master);

                osc.start(now + startOffset);
                osc.stop(now + duration + 0.05);
            });

            // WHISTLES: bright, high-pitched cheering whistles
            const whistleConfigs = [
                { start: 0.35, duration: 1.2, freq: 2200, endFreq: 2700, volume: 0.13 },
                { start: 0.8, duration: 1.6, freq: 2900, endFreq: 2500, volume: 0.10 },
                { start: 1.4, duration: 1.3, freq: 2500, endFreq: 3100, volume: 0.12 },
                { start: 2.0, duration: 1.0, freq: 3200, endFreq: 2800, volume: 0.09 }
            ];

            whistleConfigs.forEach(config => {
                const whistle = ctx.createOscillator();
                const whistleGain = ctx.createGain();

                // Smooth, pure tone for a whistle-like sound
                whistle.type = 'sine';

                const start = now + config.start;
                const end = start + config.duration;

                whistle.frequency.setValueAtTime(config.freq, start);
                whistle.frequency.exponentialRampToValueAtTime(
                    config.endFreq,
                    end
                );

                whistleGain.gain.setValueAtTime(0.001, start);
                whistleGain.gain.exponentialRampToValueAtTime(
                    config.volume,
                    start + 0.12
                );
                whistleGain.gain.setValueAtTime(
                    config.volume,
                    end - 0.12
                );
                whistleGain.gain.exponentialRampToValueAtTime(
                    0.001,
                    end
                );

                whistle.connect(whistleGain);
                whistleGain.connect(master);

                whistle.start(start);
                whistle.stop(end + 0.02);
            });

        } catch (e) {
            console.error("playCrowdCheer error:", e);
        }
    }    
    playMinecraftDeath() {
        this.ensureContext();

        if (!this.ctx || this.muted) return;

        try {
            const ctx = this.ctx;

            if (ctx.state === 'suspended') {
                ctx.resume().catch(e =>
                    console.error("Audio resume error:", e)
                );
            }

            const now = ctx.currentTime;
            const duration = 0.65;

            // Master volume envelope
            const master = ctx.createGain();
            master.gain.setValueAtTime(0.001, now);
            master.gain.exponentialRampToValueAtTime(0.7, now + 0.015);
            master.gain.exponentialRampToValueAtTime(0.001, now + duration);
            master.connect(ctx.destination);

            // Main low-pitched death sound
            const osc = ctx.createOscillator();
            const oscGain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(280, now);
            osc.frequency.exponentialRampToValueAtTime(65, now + 0.3);

            oscGain.gain.setValueAtTime(0.8, now);
            oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

            osc.connect(oscGain);
            oscGain.connect(master);

            osc.start(now);
            osc.stop(now + 0.4);

            // Short, gritty noise burst for extra impact
            const bufferSize = Math.floor(ctx.sampleRate * 0.16);
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                const fade = 1 - i / bufferSize;
                data[i] = (Math.random() * 2 - 1) * fade;
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(750, now);

            const noiseGain = ctx.createGain();
            noiseGain.gain.setValueAtTime(0.16, now);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

            noise.connect(filter);
            filter.connect(noiseGain);
            noiseGain.connect(master);

            noise.start(now);

        } catch (e) {
            console.error("playMinecraftDeath error:", e);
        }
    }
    playBasketCheer() {
        this.ensureContext();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        if (!this.ctx) return;
        if (this.muted) return;
        try {
            console.log("playBasketCheer MAX volume triggered! AudioContext state:", this.ctx.state, "time:", this.ctx.currentTime);
            // Celebratory crowd roar + ascending trumpet fanfare chord (max volume)
            this.playCrowdCheer();
            this.playCrowdCheer();
            this.playCrowdCheer();
            const notes = [329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);

                gain.gain.setValueAtTime(1.0, this.ctx.currentTime + idx * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.1 + 0.6);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(this.ctx.currentTime + idx * 0.1);
                osc.stop(this.ctx.currentTime + idx * 0.1 + 0.6);
            });
        } catch (e) {
            console.error("playBasketCheer error:", e);
        }
    }

    playDeathSound() {
        if (!this.ctx || this.muted) return;
        try {
            this.playMinecraftDeath();
        } catch (e) {}
    }

    playFanfare() {
        this.ensureContext();
        if (!this.ctx || this.muted) return;
        try {
            const notes = [261.63, 329.63, 392.00, 523.25];
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.14);

                gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.14);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.14 + 0.3);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(this.ctx.currentTime + idx * 0.14);
                osc.stop(this.ctx.currentTime + idx * 0.14 + 0.3);
            });
        } catch (e) {}
    }
}

const soundManager = new SoundManager();

// ==========================================
// ARTICULATED 2-SEGMENT LIMB KINEMATICS SOLVER
// ==========================================
function solveLimbIK(startX, startY, endX, endY, len1, len2, bendDirection = 1) {
    const dx = endX - startX;
    const dy = endY - startY;
    let dist = Math.hypot(dx, dy);
    const maxLen = len1 + len2 - 0.1;
    if (dist > maxLen) dist = maxLen;
    const minLen = Math.abs(len1 - len2) + 0.1;
    if (dist < minLen) dist = minLen;

    const angle = Math.atan2(dy, dx);
    const cosAngle = (len1 * len1 + dist * dist - len2 * len2) / (2 * len1 * dist);
    const clampedCos = Math.max(-1, Math.min(1, cosAngle));
    const jointAngleOffset = Math.acos(clampedCos);

    const midAngle = angle - bendDirection * jointAngleOffset;
    const midX = startX + Math.cos(midAngle) * len1;
    const midY = startY + Math.sin(midAngle) * len1;

    return {
        start: { x: startX, y: startY },
        mid: { x: midX, y: midY },
        end: { x: endX, y: endY }
    };
}

// ==========================================
// PARTICLE SYSTEM
// ==========================================
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.bloodStains = [];
    }

    emit(x, y, color, count = 15, speed = 4, life = 0.8) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = (Math.random() * 0.8 + 0.2) * speed;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd - 1,
                color: color,
                size: Math.floor(Math.random() * 4) + 2,
                life: life,
                maxLife: life,
                gravity: 150
            });
        }
    }

    emitDust(x, y, count = 4) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 8,
                y: y,
                vx: (Math.random() - 0.5) * 1.5,
                vy: -Math.random() * 1.2 - 0.4,
                color: '#d97706',
                size: Math.floor(Math.random() * 3) + 2,
                life: 0.35,
                maxLife: 0.35,
                gravity: 40
            });
        }
    }

    emitDizzyStars(x, y) {
        for (let i = 0; i < 4; i++) {
            const angle = (Math.PI * 2 / 4) * i;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * 1.8,
                vy: Math.sin(angle) * 1.2 - 0.5,
                color: '#facc15',
                size: 3,
                life: 1.2,
                maxLife: 1.2,
                gravity: 20,
                isStar: true
            });
        }
    }

    emitBlood(x, y) {
        soundManager.playDeathSound();
        const bloodColors = ['#990000', '#cc0000', '#ff1a1a', '#660000', '#b30000'];
        for (let i = 0; i < 35; i++) {
            const angle = (Math.random() * Math.PI) - (Math.PI / 2) + (Math.random() - 0.5) * 1.2;
            const spd = Math.random() * 8 + 3;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd - 5,
                color: bloodColors[Math.floor(Math.random() * bloodColors.length)],
                size: Math.floor(Math.random() * 5) + 3,
                life: 3.0,
                maxLife: 3.0,
                gravity: 500,
                isBlood: true
            });
        }
        this.bloodStains.push({
            x: x,
            y: 476,
            radiusX: 18 + Math.random() * 10,
            radiusY: 6 + Math.random() * 4,
            color: '#7f1d1d'
        });
    }

    update(dt) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx * dt * 60;
            p.y += p.vy * dt * 60;
            p.vy += p.gravity * dt;
            if (p.isBlood && p.y > 476) {
                p.y = 476;
                p.vy = 0;
                p.vx = 0;
            }
            p.life -= dt;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    render(ctx) {
        for (const stain of this.bloodStains) {
            ctx.fillStyle = stain.color;
            ctx.beginPath();
            ctx.ellipse(stain.x, stain.y, stain.radiusX, stain.radiusY, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        for (const p of this.particles) {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.isBlood ? Math.min(1.0, p.life / 0.5) : Math.max(0, p.life / p.maxLife);
            if (p.isStar) {
                ctx.fillRect(Math.floor(p.x - p.size / 2), Math.floor(p.y - p.size / 2), p.size, p.size);
            } else {
                ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
            }
        }
        ctx.globalAlpha = 1.0;
    }

    clear() {
        this.particles = [];
        this.bloodStains = [];
    }
}

// ==========================================
// BASKETBALL SYSTEM
// ==========================================
class Basketball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.radius = 9;
        this.owner = null;
        this.mode = 'free'; // 'dribble', 'held', 'slam', 'shot', 'pickup', 'rebound_to_fatima', 'free'
        this.targetX = 0;
        this.targetY = 0;
        this.startX = 0;
        this.startY = 0;
        this.progress = 0;
        this.duration = 1;
        this.rotation = 0;
        this.groundY = 476;
        this.dribblePhase = 0;
        this.squishX = 1;
        this.squishY = 1;
        this.trailTimer = 0;
        this.dribbleSoundTriggered = false;
    }

    shootTo(tx, ty, duration = 0.8) {
        this.owner = null;
        this.mode = 'shot';
        this.startX = this.x;
        this.startY = this.y;
        this.targetX = tx;
        this.targetY = ty;
        this.progress = 0;
        this.duration = duration;
        soundManager.playSwish();
    }

    reboundToFatima(fatima, duration = 0.45) {
        this.owner = null;
        this.mode = 'rebound_to_fatima';
        this.startX = this.x;
        this.startY = this.y;
        this.targetOwner = fatima;
        this.progress = 0;
        this.duration = duration;
    }

    attachToHand(x, y) {
        this.x = x;
        this.y = y;
        this.mode = 'held';
    }

    update(dt, particles, hoopRight = null) {
        this.squishX += (1 - this.squishX) * 0.2;
        this.squishY += (1 - this.squishY) * 0.2;

        if (this.owner) {
            if (this.mode === 'held') {
                const handX = this.owner.facing === 'right' ? this.owner.x + 14 : this.owner.x - 14;
                const handY = this.owner.y - 36;
                this.x = handX;
                this.y = handY;
                return;
            }

            if (this.mode === 'slam') {
                const handX = this.owner.facing === 'right' ? this.owner.x + 18 : this.owner.x - 18;
                const handY = this.owner.y - 74;
                this.x = handX;
                this.y = handY;
                return;
            }

            const dribbleSpeed = this.owner.state === 'run' || this.owner.state === 'drive' ? 8.5 : 5.0;
            this.dribblePhase = ((this.owner.animTimer + this.owner.animPhase) * dribbleSpeed) % (Math.PI * 2);

            const cosVal = Math.cos(this.dribblePhase);
            const bounceNorm = Math.max(0, cosVal);
            const waistY = this.owner.y - 28;
            const floorY = this.groundY;

            this.x = this.owner.x + (this.owner.facing === 'right' ? 22 : -22);
            this.y = waistY + (floorY - waistY) * bounceNorm;

            if (bounceNorm > 0.94) {
                if (!this.dribbleSoundTriggered) {
                    soundManager.playDribble();
                    this.dribbleSoundTriggered = true;
                    this.squishX = 1.25;
                    this.squishY = 0.75;
                    if (particles) particles.emitDust(this.x, this.groundY + 4, 3);
                }
            } else {
                this.dribbleSoundTriggered = false;
            }

            this.rotation += (this.owner.facing === 'right' ? 12 : -12) * dt * CINEMATIC_SPEED;

        } else if (this.mode === 'rebound_to_fatima') {
            this.progress += (dt * CINEMATIC_SPEED) / this.duration;
            const targetX = this.targetOwner.facing === 'right' ? this.targetOwner.x + 16 : this.targetOwner.x - 16;
            const targetY = this.targetOwner.y - 34;
            if (this.progress >= 1) {
                this.progress = 1;
                this.x = targetX;
                this.y = targetY;
                this.owner = this.targetOwner;
                this.mode = 'held';
            } else {
                const t = this.progress;
                this.x = this.startX + (targetX - this.startX) * t;
                this.y = this.startY + (targetY - this.startY) * t - Math.sin(t * Math.PI) * 45;
                this.rotation -= 16 * dt * CINEMATIC_SPEED;
            }

        } else if (this.mode === 'shot') {
            this.progress += (dt * CINEMATIC_SPEED) / this.duration;
            if (this.progress >= 1) {
                this.progress = 1;
                this.mode = 'free';
                this.x = this.targetX;
                this.y = this.targetY;
                this.vx = 40;
                this.vy = 120;
                if (hoopRight) hoopRight.triggerNetSwish();
                soundManager.playSwish();
            } else {
                const t = this.progress;
                this.x = this.startX + (this.targetX - this.startX) * t;
                const baseLineY = this.startY + (this.targetY - this.startY) * t;
                const arcHeight = -230 * Math.sin(t * Math.PI);
                this.y = baseLineY + arcHeight;
                this.rotation += 18 * dt * CINEMATIC_SPEED;

                this.trailTimer += dt;
                if (this.trailTimer > 0.03 && particles) {
                    particles.emit(this.x, this.y, '#f97316', 2, 1, 0.4);
                    this.trailTimer = 0;
                }
            }

        } else {
            this.vy += 650 * dt;
            this.x += this.vx * dt;
            this.y += this.vy * dt;
            if (this.y > this.groundY) {
                this.y = this.groundY;
                this.vy = -this.vy * 0.45;
                this.vx *= 0.75;
                if (Math.abs(this.vy) > 40) {
                    soundManager.playDribble();
                }
            }
        }
    }

    render(ctx) {
        ctx.save();
        ctx.translate(Math.floor(this.x), Math.floor(this.y));
        ctx.rotate(this.rotation);
        ctx.scale(this.squishX, this.squishY);

        ctx.fillStyle = '#ea580c';
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = '#7c2d12';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-this.radius, 0);
        ctx.lineTo(this.radius, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.65, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();

        ctx.restore();
    }
}

// ==========================================
// BASKETBALL HOOP & REACTIVE RIM/NET
// ==========================================
class Hoop {
    constructor(x, y, side = 'right') {
        this.x = x;
        this.y = y;
        this.side = side;
        this.rimFlex = 0;
        this.netSwishTimer = 0;
    }

    triggerDunkImpact() {
        this.rimFlex = 16;
        this.netSwishTimer = 1.0;
        soundManager.playDunkImpact();
    }

    triggerNetSwish() {
        this.netSwishTimer = 0.8;
    }

    update(dt) {
        this.rimFlex += (0 - this.rimFlex) * Math.min(1.0, dt * 14);
        if (this.netSwishTimer > 0) {
            this.netSwishTimer = Math.max(0, this.netSwishTimer - dt);
        }
    }

    render(ctx) {
        const x = this.x;
        const y = this.y;
        const side = this.side;

        ctx.fillStyle = '#334155';
        ctx.fillRect(side === 'left' ? x - 30 : x + 20, 150, 10, 420);

        ctx.fillStyle = '#f8fafc';
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 3;
        const bbX = side === 'left' ? x - 12 : x;
        ctx.fillRect(bbX, y - 70, 12, 120);
        ctx.strokeRect(bbX, y - 70, 12, 120);

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.strokeRect(side === 'left' ? bbX + 2 : bbX + 2, y - 25, 8, 30);

        const flexOffset = this.rimFlex;
        const rimX = side === 'left' ? x + 45 : x - 45;

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(rimX, y + flexOffset);
        ctx.stroke();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        const swishSway = this.netSwishTimer > 0 ? Math.sin(performance.now() / 60) * 10 * this.netSwishTimer : 0;
        const netBottomY = y + 55 + flexOffset * 0.5;

        ctx.beginPath();
        ctx.moveTo(x + (side === 'left' ? 4 : -4), y + flexOffset * 0.3);
        ctx.lineTo((x + rimX) / 2 + swishSway - 6, netBottomY);
        ctx.moveTo(rimX, y + flexOffset);
        ctx.lineTo((x + rimX) / 2 + swishSway + 6, netBottomY);
        ctx.moveTo(x + (side === 'left' ? 12 : -12), y + 20 + flexOffset * 0.4);
        ctx.lineTo(rimX - (side === 'left' ? 12 : -12) + swishSway, y + 35 + flexOffset * 0.4);
        ctx.stroke();
    }
}

// ==========================================
// ARTICULATED ENTITY SYSTEM
// ==========================================
class Entity {
    constructor(x, y, type, team, number = 24, hairStyle = 'ponytail', skinTone = '#fde68a') {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.type = type;
        this.team = team;
        this.number = number;
        this.hairStyle = hairStyle;
        this.skinTone = skinTone;
        this.facing = 'right';

        this.state = 'run';
        this.stateTimer = 0;
        this.animTimer = 0;

        const seed = Math.abs(Math.sin((this.number * 31 + (this.team === 'blue' ? 100 : 200)) * 43.123));
        this.animPhase = seed * Math.PI * 2;
        this.strideCadence = 0.94 + (seed * 0.16);
        this.breathPhase = ((this.number * 17) % 10) * 0.6;
        this.weightShiftTimer = ((this.number * 29) % 5);
        this.weightShiftSide = 1;

        this.active = true;
        this.defeated = false;
        this.bonkedTimer = 0;
        this.slappedTimer = 0;
        this.jumping = false;
        this.jumpProgress = 0;
        this.jumpDuration = 1.0;
        this.groundY = y;
    }

    startJump(duration = 1.0) {
        this.jumping = true;
        this.jumpProgress = 0;
        this.jumpDuration = duration;
    }

    update(dt, timeStopped = false, targetX = null) {
        if (!this.active) return;
        if (this.defeated) return;

        if (timeStopped && this.type !== 'fatima') {
            return;
        }

        const effectiveDt = dt * CINEMATIC_SPEED;
        this.animTimer += effectiveDt * this.strideCadence;
        this.stateTimer += effectiveDt;

        if (this.bonkedTimer > 0) this.bonkedTimer -= effectiveDt;
        if (this.slappedTimer > 0) this.slappedTimer -= effectiveDt;

        if (this.jumping) {
            this.jumpProgress += effectiveDt / this.jumpDuration;
            if (this.jumpProgress >= 1) {
                this.jumpProgress = 1;
                this.jumping = false;
            }
        }

        if (this.state === 'walk_to_speaker') {
            const destX = (targetX !== null ? targetX : 1680) - 44;
            if (this.x < destX) {
                this.x = Math.min(destX, this.x + this.vx * effectiveDt);
                this.facing = 'right';
            } else {
                this.vx = 0;
                this.state = 'idle';
            }
        } else if (this.state === 'run' || this.state === 'drive' || this.state === 'walk' ||
                   this.state === 'crossover' || this.state === 'dunk_gather' || this.state === 'dunk_leap') {
            this.x += this.vx * effectiveDt;
        } else if (this.state === 'defend') {
            if (targetX !== null) {
                const dir = Math.sign(targetX - this.x);
                const desyncOffset = Math.sin((this.animTimer + this.animPhase) * 6);
                this.x += (dir * 55 + desyncOffset * 35) * effectiveDt;
            } else {
                this.x += Math.sin((this.animTimer + this.animPhase) * 4) * 20 * effectiveDt;
            }
        }

        if (this.state === 'idle') {
            this.weightShiftTimer += effectiveDt;
            if (this.weightShiftTimer > 3.0) {
                this.weightShiftSide = -this.weightShiftSide;
                this.weightShiftTimer = 0;
            }
        }
    }

    render(ctx, ball = null) {
        if (!this.active) return;

        ctx.save();

        let jumpY = 0;
        if (this.state === 'jump' || this.state === 'shoot_release') {
            jumpY = Math.sin(this.jumpProgress * Math.PI) * 65;
        } else if (this.state === 'dunk_leap' || this.state === 'dunk') {
            jumpY = Math.sin(this.jumpProgress * Math.PI) * 115;
        }

        ctx.translate(Math.floor(this.x), Math.floor(this.y - jumpY));

        if (this.defeated) {
            ctx.rotate(Math.PI / 2);
            this.renderDefeated(ctx);
            ctx.restore();
            return;
        }

        if (this.facing === 'left') {
            ctx.scale(-1, 1);
        }

        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.beginPath();
        const shadowScale = Math.max(0.4, 1.0 - jumpY / 130);
        ctx.ellipse(0, 2, 16 * shadowScale, 6 * shadowScale, 0, 0, Math.PI * 2);
        ctx.fill();

        this.renderArticulatedBody(ctx, ball);

        ctx.restore();
    }

    renderArticulatedBody(ctx, ball = null) {
        const phase = this.animTimer + this.animPhase;
        const breathBob = Math.sin(this.animTimer * 2.5 + this.breathPhase) * 1.0;

        let torsoLean = 0;
        let torsoBob = 0;
        let hipY = -28;
        let foot1X = 0, foot1Y = -2;
        let foot2X = 0, foot2Y = -2;
        let arm1Target = { x: 0, y: 0 };
        let arm2Target = { x: 0, y: 0 };
        let headTurnAway = false;
        let isDancing = false;

        if (this.state === 'walk' || this.state === 'walk_to_speaker') {
            const strideFreq = 6.0;
            const cycle = phase * strideFreq;
            torsoBob = -Math.abs(Math.sin(cycle)) * 1.8;
            torsoLean = 0.04;

            const cycle1 = cycle;
            foot1X = Math.sin(cycle1) * 9;
            foot1Y = Math.cos(cycle1) < 0 ? -Math.abs(Math.sin(cycle1)) * 5 : 0;

            const cycle2 = cycle + Math.PI;
            foot2X = Math.sin(cycle2) * 9;
            foot2Y = Math.cos(cycle2) < 0 ? -Math.abs(Math.sin(cycle2)) * 5 : 0;

            arm1Target = { x: -Math.sin(cycle1) * 8 - 4, y: -20 + Math.cos(cycle1) * 4 };
            arm2Target = { x: Math.sin(cycle1) * 8 + 6, y: -20 - Math.cos(cycle1) * 4 };

            if (ball && ball.owner === this && ball.mode === 'held') {
                arm2Target = { x: 14, y: -30 };
            }

        } else if (this.state === 'run' || this.state === 'drive') {
            const strideFreq = 10.5;
            const cycle = phase * strideFreq;
            torsoBob = -Math.abs(Math.sin(cycle)) * 3.2;
            torsoLean = 0.16;

            const cycle1 = cycle;
            foot1X = Math.sin(cycle1) * 16;
            foot1Y = Math.cos(cycle1) < 0 ? -Math.abs(Math.sin(cycle1)) * 9 : 0;

            const cycle2 = cycle + Math.PI;
            foot2X = Math.sin(cycle2) * 16;
            foot2Y = Math.cos(cycle2) < 0 ? -Math.abs(Math.sin(cycle2)) * 9 : 0;

            arm1Target = { x: -Math.sin(cycle1) * 14 - 6, y: -26 + Math.cos(cycle1) * 8 };
            arm2Target = { x: Math.sin(cycle1) * 14 + 10, y: -26 - Math.cos(cycle1) * 8 };

            if (ball && ball.owner === this && ball.mode === 'dribble') {
                const relBallX = this.facing === 'right' ? (ball.x - this.x) : (this.x - ball.x);
                const relBallY = ball.y - this.y;
                arm2Target = { x: relBallX - 4, y: relBallY - ball.radius - 2 };
            }

        } else if (this.state === 'crossover') {
            hipY = -22;
            torsoLean = 0.28;
            torsoBob = -2.5;
            foot1X = 14; foot1Y = 0;
            foot2X = -12; foot2Y = -3;
            arm1Target = { x: 14, y: -26 };
            arm2Target = { x: -8, y: -28 };

        } else if (this.state === 'defend') {
            hipY = -22;
            torsoLean = 0.08;
            torsoBob = Math.sin(phase * 8) * 1.5;

            const shuffle = Math.sin(phase * 7) * 4;
            foot1X = -12 + shuffle;
            foot1Y = 0;
            foot2X = 12 + shuffle;
            foot2Y = 0;

            arm1Target = { x: -18, y: -38 + Math.sin(phase * 9) * 4 };
            arm2Target = { x: 18, y: -38 - Math.sin(phase * 9) * 4 };

        } else if (this.state === 'idle') {
            hipY = -28 + breathBob;
            torsoBob = breathBob;
            foot1X = -5 + this.weightShiftSide * 1.5;
            foot1Y = 0;
            foot2X = 5 - this.weightShiftSide * 1.5;
            foot2Y = 0;

            arm1Target = { x: -8, y: -22 + breathBob * 0.5 };
            arm2Target = { x: 8, y: -22 + breathBob * 0.5 };

            if (ball && ball.owner === this && ball.mode === 'held') {
                arm2Target = { x: 14, y: -32 };
            }

        } else if (this.state === 'dunk_gather') {
            hipY = -18;
            torsoLean = 0.22;
            foot1X = -6; foot1Y = 0;
            foot2X = 10; foot2Y = 0;
            arm1Target = { x: 12, y: -28 };
            arm2Target = { x: 16, y: -28 };

        } else if (this.state === 'dunk_leap' || this.state === 'dunk') {
            hipY = -32;
            torsoLean = 0.12;
            foot1X = -14; foot1Y = -14;
            foot2X = -8; foot2Y = -8;
            arm1Target = { x: 14, y: -68 };
            arm2Target = { x: 18, y: -68 };

        } else if (this.state === 'shoot_prepare') {
            hipY = -24;
            torsoLean = 0.04;
            foot1X = -5; foot1Y = 0;
            foot2X = 5; foot2Y = 0;
            arm1Target = { x: 6, y: -36 };
            arm2Target = { x: 10, y: -36 };

        } else if (this.state === 'shoot_release') {
            hipY = -30;
            foot1X = -4; foot1Y = -6;
            foot2X = 4; foot2Y = -6;
            arm1Target = { x: 8, y: -66 };
            arm2Target = { x: 14, y: -60 };

        } else if (this.state === 'no_look_shot') {
            hipY = -28;
            foot1X = -5; foot1Y = 0;
            foot2X = 5; foot2Y = 0;
            headTurnAway = true;
            arm1Target = { x: -8, y: -24 };
            arm2Target = { x: 16, y: -65 };

        } else if (this.state === 'slap_windup') {
            hipY = -28;
            torsoLean = -0.12;
            foot1X = -8; foot1Y = 0;
            foot2X = 8; foot2Y = 0;
            arm1Target = { x: -16, y: -36 };
            arm2Target = { x: -12, y: -44 };

        } else if (this.state === 'slap_strike') {
            hipY = -28;
            torsoLean = 0.22;
            foot1X = 10; foot1Y = 0;
            foot2X = -8; foot2Y = 0;
            arm1Target = { x: -8, y: -24 };
            arm2Target = { x: 26, y: -44 };

        } else if (this.state === 'slap_recovery') {
            hipY = -28;
            torsoLean = 0.08;
            foot1X = -4; foot1Y = 0;
            foot2X = 6; foot2Y = 0;
            arm1Target = { x: -6, y: -24 };
            arm2Target = { x: 12, y: -34 };

        } else if (this.state === 'speak') {
            hipY = -28;
            foot1X = -6; foot1Y = 0;
            foot2X = 6; foot2Y = 0;
            arm1Target = { x: -10, y: -26 };
            arm2Target = { x: 12, y: -34 };

        } else if (this.state === 'stagger') {
            hipY = -24;
            torsoLean = -0.32;
            torsoBob = Math.sin(phase * 12) * 2;
            foot1X = -14; foot1Y = 0;
            foot2X = 6; foot2Y = -4;
            arm1Target = { x: -16, y: -48 };
            arm2Target = { x: 12, y: -48 };

        } else if (this.state === 'slapped') {
            hipY = -24;
            torsoLean = -0.42;
            foot1X = -14; foot1Y = 0;
            foot2X = 4; foot2Y = 0;
            arm1Target = { x: -18, y: -42 };
            arm2Target = { x: 14, y: -42 };

        } else if (this.state === 'fall') {
            hipY = -12;
            torsoLean = -0.65;
            foot1X = -16; foot1Y = 0;
            foot2X = 8; foot2Y = 0;
            arm1Target = { x: -14, y: -20 };
            arm2Target = { x: 10, y: -20 };

        } else if (this.state === 'dance') {
            isDancing = true;
            const beatStep = Math.floor(phase * 3.5) % 2;
            torsoBob = (Math.floor(phase * 7) % 2) * -3;

            if (beatStep === 0) {
                arm1Target = { x: -18, y: -46 };
                arm2Target = { x: 6, y: -72 };
                foot1X = 14; foot1Y = -8;
                foot2X = -4; foot2Y = 0;
            } else {
                arm1Target = { x: -6, y: -72 };
                arm2Target = { x: 18, y: -46 };
                foot1X = -4; foot1Y = 0;
                foot2X = 14; foot2Y = -8;
            }
        }

        ctx.save();
        ctx.rotate(torsoLean);

        this.renderLeg(ctx, -3, hipY + torsoBob, foot1X, foot1Y, true);
        const torsoY = hipY - 14 + torsoBob;
        this.renderTorso(ctx, torsoY);
        this.renderLeg(ctx, 3, hipY + torsoBob, foot2X, foot2Y, false);
        this.renderArms(ctx, torsoY, arm1Target, arm2Target, isDancing);
        this.renderHead(ctx, torsoY - 24, headTurnAway);

        ctx.restore();
    }

    renderLeg(ctx, hipOffsetX, hipY, footX, footY, isBackLeg) {
        const len1 = 11;
        const len2 = 11;
        const ik = solveLimbIK(hipOffsetX, hipY, footX, footY - 3, len1, len2, 1);

        ctx.fillStyle = isBackLeg ? this.getShadedColor(this.skinTone, -25) : this.skinTone;
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(ik.start.x, ik.start.y);
        ctx.lineTo(ik.mid.x, ik.mid.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(ik.mid.x, ik.mid.y);
        ctx.lineTo(ik.end.x, ik.end.y);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(Math.floor(ik.end.x - 2), Math.floor(ik.end.y - 4), 4, 3);

        const shoeColor = this.team === 'blue' ? (this.type === 'fatima' ? '#1e3a8a' : '#1d4ed8') : '#7f1d1d';
        const shoeX = Math.floor(ik.end.x - 3);
        const shoeY = Math.floor(ik.end.y - 1);

        ctx.fillStyle = shoeColor;
        ctx.fillRect(shoeX, shoeY, 9, 4);

        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(shoeX, shoeY + 3, 9, 2);

        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(shoeX + 7, shoeY + 1, 2, 3);
    }

    renderTorso(ctx, torsoY) {
        ctx.fillStyle = this.team === 'blue' ? '#1d4ed8' : '#991b1b';
        ctx.fillRect(-10, torsoY + 14, 20, 12);

        const jerseyColor = this.team === 'blue' ? '#2563eb' : '#dc2626';
        ctx.fillStyle = jerseyColor;
        if (this.type === 'fatima') {
            ctx.shadowColor = '#60a5fa';
            ctx.shadowBlur = 4;
        }
        ctx.fillRect(-11, torsoY - 10, 22, 24);
        ctx.shadowBlur = 0;

        ctx.fillStyle = this.team === 'blue' ? '#ffffff' : '#fef08a';
        ctx.font = '7px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText(this.number.toString(), 0, torsoY + 4);
    }

    renderArms(ctx, torsoY, arm1Target, arm2Target, isDancing = false) {
        const shoulderY = torsoY - 6;
        this.renderSingleArm(ctx, -9, shoulderY, arm1Target.x, arm1Target.y, true, isDancing);
        this.renderSingleArm(ctx, 9, shoulderY, arm2Target.x, arm2Target.y, false, isDancing);
    }

    renderSingleArm(ctx, shoulderX, shoulderY, handX, handY, isBack, isDancing = false) {
        const len1 = 10;
        const len2 = 10;
        const ik = solveLimbIK(shoulderX, shoulderY, handX, handY, len1, len2, isBack ? -1 : 1);

        ctx.fillStyle = isBack ? this.getShadedColor(this.skinTone, -20) : this.skinTone;
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(ik.start.x, ik.start.y);
        ctx.lineTo(ik.mid.x, ik.mid.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(ik.mid.x, ik.mid.y);
        ctx.lineTo(ik.end.x, ik.end.y);
        ctx.stroke();

        ctx.fillStyle = ctx.strokeStyle;
        ctx.beginPath();
        ctx.arc(ik.end.x, ik.end.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        if (isDancing && ik.end.y < -65) {
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillRect(Math.floor(ik.end.x), Math.floor(ik.end.y - 7), 2, 7);
            ctx.fillRect(Math.floor(ik.end.x - 5), Math.floor(ik.end.y - 2), 5, 2);
        }
    }

    renderHead(ctx, headY, turnAway = false) {
        ctx.fillStyle = this.skinTone;
        ctx.fillRect(-7, headY, 14, 15);

        ctx.fillStyle = '#0f172a';
        if (turnAway) {
            ctx.fillRect(-5, headY + 5, 3, 3);
        } else {
            ctx.fillRect(2, headY + 5, 3, 3);
        }

        if (this.type === 'fatima') {
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(-8, headY - 3, 16, 7);
            const tailPhase = Math.sin(this.animTimer * 8 + this.animPhase) * 4;
            ctx.fillRect(-14, headY + 2 + tailPhase, 7, 5);
            ctx.fillRect(-19, headY + 6 + tailPhase, 6, 5);
            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(-8, headY + 1, 16, 3);
        } else {
            ctx.fillStyle = this.getHairColor();
            if (this.hairStyle === 'afro') {
                ctx.beginPath();
                ctx.arc(0, headY + 2, 11, 0, Math.PI * 2);
                ctx.fill();
            } else if (this.hairStyle === 'braids') {
                ctx.fillRect(-8, headY - 3, 16, 7);
                ctx.fillRect(-11, headY + 2, 4, 13);
                ctx.fillRect(-5, headY + 2, 4, 11);
            } else {
                ctx.fillRect(-8, headY - 2, 16, 6);
            }
        }
    }

    renderDefeated(ctx) {
        ctx.fillStyle = '#7f1d1d';
        ctx.fillRect(-9, -4, 7, 5);
        ctx.fillRect(2, -4, 7, 5);

        ctx.fillStyle = '#991b1b';
        ctx.fillRect(-10, -34, 20, 15);

        ctx.fillStyle = '#dc2626';
        ctx.fillRect(-11, -56, 22, 24);

        ctx.fillStyle = this.skinTone;
        ctx.fillRect(-7, -70, 14, 15);
    }

    getHairColor() {
        if (this.hairStyle === 'blonde') return '#facc15';
        if (this.hairStyle === 'red') return '#b91c1c';
        if (this.hairStyle === 'brown') return '#78350f';
        return '#111827';
    }

    getShadedColor(hex, percent) {
        let num = parseInt(hex.replace('#', ''), 16);
        let amt = Math.round(2.55 * percent);
        let R = Math.max(0, Math.min(255, (num >> 16) + amt));
        let G = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amt));
        let B = Math.max(0, Math.min(255, (num & 0xff) + amt));
        return '#' + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
    }
}

// ==========================================
// CROWD & DIALOGUE SYSTEM
// ==========================================
class CrowdSystem {
    constructor() {
        this.spectators = [];
        this.bubbles = [];
        this.initSpectators();
    }

    initSpectators() {
        for (let x = 20; x < 2980; x += 22) {
            for (let row = 0; row < 5; row++) {
                this.spectators.push({
                    x: x + (Math.random() - 0.5) * 8,
                    y: 15 + row * 24,
                    color: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#f97316', '#06b6d4'][Math.floor(Math.random() * 8)],
                    offset: Math.random() * 10,
                    cheerSpeed: 4 + Math.random() * 4
                });
            }
        }
    }

    addBubble(x, y, text, duration = 3.0, entity = null) {
        this.bubbles.push({
            x: x,
            y: y,
            text: text,
            timer: duration,
            maxTimer: duration,
            entity: entity
        });
    }

    update(dt, timeStopped = false) {
        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            const b = this.bubbles[i];
            if (b.entity && b.entity.active) {
                b.x = b.entity.x;
                b.y = b.entity.y - 88;
            }
            b.timer -= dt * CINEMATIC_SPEED;
            if (b.timer <= 0) {
                this.bubbles.splice(i, 1);
            }
        }
    }

    render(ctx, timeStopped = false) {
        const time = timeStopped ? 0 : performance.now() / 150;
        for (const s of this.spectators) {
            const bounce = timeStopped ? 0 : Math.sin(time * s.cheerSpeed + s.offset) * 3.5;
            ctx.fillStyle = s.color;
            ctx.fillRect(Math.floor(s.x), Math.floor(s.y + bounce), 12, 16);
            ctx.fillStyle = '#fde68a';
            ctx.fillRect(Math.floor(s.x + 2), Math.floor(s.y - 7 + bounce), 8, 8);
        }

        for (const b of this.bubbles) {
            ctx.save();
            ctx.font = '12px "Press Start 2P"';
            const metrics = ctx.measureText(b.text);
            const boxW = metrics.width + 28;
            const boxH = 34;

            ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 3;

            const boxX = b.x - boxW / 2;
            const boxY = b.y - boxH;

            ctx.fillRect(boxX, boxY, boxW, boxH);
            ctx.strokeRect(boxX, boxY, boxW, boxH);

            ctx.beginPath();
            ctx.moveTo(b.x - 7, b.y);
            ctx.lineTo(b.x + 7, b.y);
            ctx.lineTo(b.x, b.y + 10);
            ctx.closePath();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#0f172a';
            ctx.textAlign = 'center';
            ctx.fillText(b.text, b.x, b.y - 12);
            ctx.restore();
        }
    }
}

// ==========================================
// DETERMINISTIC TIMELINE CONTROLLER
// ==========================================
class Timeline {
    constructor() {
        this.events = [];
        this.time = 0;
        this.running = false;
    }

    add(time, callback) {
        this.events.push({ time, callback, executed: false });
    }

    start() {
        this.time = 0;
        this.running = true;
        for (const ev of this.events) {
            ev.executed = false;
        }
    }

    stop() {
        this.running = false;
    }

    update(dt) {
        if (!this.running) return;
        this.time += dt * CINEMATIC_SPEED;

        for (const ev of this.events) {
            if (!ev.executed && this.time >= ev.time) {
                ev.executed = true;
                ev.callback();
            }
        }
    }

    clear() {
        this.events = [];
        this.running = false;
        this.time = 0;
    }
}

// ==========================================
// CORE GAME ENGINE
// ==========================================
class GameEngine {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = 1200;
        this.height = 600;

        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.scale(dpr, dpr);

        // Camera removed entirely: we translate canvas directly based on Fatima's predicted sprite position
        this.viewX = 0;
        this.viewY = 0;

        this.particles = new ParticleSystem();
        this.crowd = new CrowdSystem();
        this.ball = new Basketball(200, 400);

        this.hoopLeft = new Hoop(100, 320, 'left');
        this.hoopRight = new Hoop(2900, 320, 'right');

        this.fatima = new Entity(200, 465, 'fatima', 'blue', 25, 'ponytail', '#fde68a');
        this.teammates = [
            new Entity(140, 435, 'teammate', 'blue', 11, 'afro', '#d97706'),
            new Entity(90, 495, 'teammate', 'blue', 7, 'braids', '#92400e'),
            new Entity(50, 420, 'teammate', 'blue', 32, 'curly', '#b45309'),
            new Entity(10, 510, 'teammate', 'blue', 15, 'short', '#fde68a')
        ];
        this.opponents = [];

        this.currentSequence = 1;
        this.sequenceState = 'opening';
        this.timeStopped = false;
        this.hitStopTimer = 0;

        this.timeline = new Timeline();
        this.lastTime = performance.now();
        this.running = false;

        this.initUI();
    }

    initUI() {
        document.getElementById('tip-off-btn').addEventListener('click', () => {
            soundManager.init();
            soundManager.playFanfare();
            document.getElementById('opening-screen').classList.add('hidden');
            document.getElementById('hud').classList.remove('hidden');
            this.startExperience();
        });

        document.getElementById('replay-btn').addEventListener('click', () => {
            soundManager.init();
            soundManager.playFanfare();
            document.getElementById('victory-screen').classList.add('hidden');
            document.getElementById('opening-screen').classList.remove('hidden');
            document.getElementById('hud').classList.add('hidden');
            this.resetExperience();
        });

        window.addEventListener('resize', () => this.resize());
        this.resize();
    }

    resize() {
        const container = document.getElementById('game-container');
        const w = container.clientWidth;
        const h = container.clientHeight;
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
    }

    startExperience() {
        this.resetExperience();
        this.running = true;
        this.sequenceState = 'playing';
        this.setupSequence(1);
    }

    resetExperience() {
        this.running = false;
        this.timeStopped = false;
        this.hitStopTimer = 0;
        this.currentSequence = 1;
        this.sequenceState = 'opening';
        this.timeline.clear();
        this.particles.clear();

        this.fatima.x = 200;
        this.fatima.y = 465;
        this.fatima.vx = 0;
        this.fatima.facing = 'right';
        this.fatima.state = 'idle';
        this.fatima.jumpProgress = 0;
        this.fatima.jumping = false;
        this.fatima.active = true;
        this.fatima.defeated = false;

        this.viewX = this.fatima.x - this.width / 2;
        this.viewY = 0;

        this.ball.owner = this.fatima;
        this.ball.mode = 'dribble';
        document.getElementById('sequence-label').innerText = 'SEQUENCE 1: DUNK';
    }

    triggerHitStop(duration = 0.08) {
        this.hitStopTimer = duration;
    }

    setupSequence(seq) {
        this.currentSequence = seq;
        this.timeStopped = false;
        this.hitStopTimer = 0;
        this.timeline.clear();
        this.particles.clear();

        if (seq === 1) {
            document.getElementById('sequence-label').innerText = 'SEQUENCE 1: DUNK';

            this.fatima.x = 200;
            this.fatima.y = 465;
            this.fatima.vx = 320; // Faster approach to get right up to the rim
            this.fatima.facing = 'right';
            this.fatima.state = 'drive';
            this.fatima.jumpProgress = 0;
            this.fatima.jumping = false;
            this.ball.owner = this.fatima;
            this.ball.mode = 'dribble';

            const teammateSpeeds = [250, 235, 220, 205];
            const teammateLanes = [435, 495, 420, 510];
            for (let i = 0; i < this.teammates.length; i++) {
                this.teammates[i].x = 60 + i * 45;
                this.teammates[i].y = teammateLanes[i];
                this.teammates[i].vx = teammateSpeeds[i];
                this.teammates[i].facing = 'right';
                this.teammates[i].state = 'run';
                this.teammates[i].defeated = false;
                this.teammates[i].active = true;
            }

            // Rim protector standing DIRECTLY under the opposing basket (x = 2880)
            this.opponents = [
                new Entity(1100, 465, 'opponent', 'red', 99, 'buzz', '#fde68a'),
                new Entity(1650, 435, 'opponent', 'red', 12, 'short', '#b45309'),
                new Entity(2300, 485, 'opponent', 'red', 8, 'afro', '#78350f'),
                new Entity(2880, 465, 'opponent', 'red', 2, 'rim_protector', '#92400e') // Posterized victim
            ];
            for (const o of this.opponents) {
                o.facing = 'left';
                o.state = o === this.opponents[3] ? 'idle' : 'defend';
                o.defeated = false;
                o.active = true;
            }

            this.timeline.add(0.8, () => {
                this.crowd.addBubble(700, 100, "LET'S GO FATIMA!");
            });

            this.timeline.add(2.5, () => {
                this.fatima.state = 'crossover';
                this.opponents[0].state = 'stagger';
                this.particles.emit(this.opponents[0].x, this.opponents[0].y - 20, '#ef4444', 12, 3, 0.6);
            });
            this.timeline.add(2.9, () => {
                this.opponents[0].state = 'fall';
                this.opponents[0].defeated = true;
                this.particles.emitBlood(this.opponents[0].x, this.opponents[0].y);
                this.fatima.state = 'drive';
            });

            this.timeline.add(4.8, () => {
                this.opponents[2].state = 'stagger';
                this.particles.emit(this.opponents[2].x, this.opponents[2].y - 20, '#ef4444', 12, 3, 0.6);
            });
            this.timeline.add(5.2, () => {
                this.opponents[2].state = 'fall';
                this.opponents[2].defeated = true;
                this.particles.emitBlood(this.opponents[2].x, this.opponents[2].y);
            });

            // Gather right in front of the rim (x = 2860), right on top of the defender (x = 2880)
            this.timeline.add(6.6, () => {
                this.fatima.vx = 190;
                this.fatima.state = 'dunk_gather';
                this.ball.mode = 'held';
            });

            this.timeline.add(7.0, () => {
                this.fatima.vx = 120;
                this.fatima.startJump(0.9);
                this.fatima.state = 'dunk_leap';
                this.ball.mode = 'slam';
                this.particles.emitDust(this.fatima.x, 465, 8);
            });

            // THE CLOSE-RANGE POSTERIZATION SLAM!
            this.timeline.add(7.8, () => {
                this.fatima.vx = 0;
                this.fatima.state = 'dunk';

                this.ball.owner = null;
                this.ball.x = 2890;
                this.ball.y = 330;
                this.ball.vx = 15;
                this.ball.vy = 280;
                this.ball.mode = 'free';

                this.hoopRight.triggerDunkImpact();
                this.triggerHitStop(0.12);
                soundManager.playSlap();
                soundManager.playBasketCheer();

                this.particles.emit(2890, 320, '#f97316', 60, 12, 1.4);
                this.particles.emit(2890, 320, '#facc15', 40, 10, 1.2);

                // Posterized defender gets crushed directly underneath and dies into blood puddle
                this.opponents[3].state = 'fall';
                this.opponents[3].defeated = true;
                this.particles.emitBlood(this.opponents[3].x, this.opponents[3].y);
            });

            this.timeline.add(8.6, () => {
                this.fatima.jumpProgress = 0;
                this.fatima.jumping = false;
                this.fatima.state = 'dance';
                for (let i = 0; i < this.teammates.length; i++) {
                    this.teammates[i].vx = 0;
                    this.teammates[i].state = 'dance';
                }
            });

            this.timeline.add(13.0, () => {
                this.setupSequence(2);
            });

        } else if (seq === 2) {
            document.getElementById('sequence-label').innerText = 'SEQUENCE 2: HALF COURT ("MARRY ME" SLAP GAG)';

            this.fatima.x = 1100;
            this.fatima.y = 465;
            this.fatima.vx = 110;
            this.fatima.facing = 'right';
            this.fatima.state = 'run';
            this.fatima.jumpProgress = 0;
            this.fatima.jumping = false;
            this.ball.owner = this.fatima;
            this.ball.mode = 'dribble';

            const teammateLanes = [435, 495, 420, 510];
            for (let i = 0; i < this.teammates.length; i++) {
                this.teammates[i].x = 940 + i * 40;
                this.teammates[i].y = teammateLanes[i];
                this.teammates[i].vx = 95;
                this.teammates[i].facing = 'right';
                this.teammates[i].state = 'run';
                this.teammates[i].defeated = false;
            }

            this.opponents = [
                new Entity(1480, 465, 'opponent', 'red', 10, 'buzz', '#fde68a'),
                new Entity(1550, 435, 'opponent', 'red', 22, 'short', '#b45309'),
                new Entity(1610, 495, 'opponent', 'red', 33, 'afro', '#78350f'),
                new Entity(1680, 465, 'opponent', 'red', 45, 'curly', '#fde68a'),
                new Entity(1760, 440, 'opponent', 'red', 2, 'ponytail', '#92400e')
            ];
            for (const o of this.opponents) {
                o.facing = 'left';
                o.state = 'defend';
                o.defeated = false;
            }

            this.timeline.add(1.8, () => {
                this.crowd.addBubble(1680, 390, "MARRY MEEEEEE!", 1.2, this.opponents[3]);
            });

            this.timeline.add(3.0, () => {
                this.timeStopped = true;
                this.fatima.vx = 0;
                this.fatima.state = 'idle';
                this.ball.mode = 'held';
            });

            this.timeline.add(4.4, () => {
                this.fatima.facing = 'right';
                this.fatima.state = 'idle';
            });

            this.timeline.add(5.4, () => {
                this.fatima.state = 'walk_to_speaker';
                this.fatima.vx = 65;
            });

            this.timeline.add(8.5, () => {
                this.fatima.vx = 0;
                this.fatima.state = 'slap_windup';
            });

            this.timeline.add(8.85, () => {
                this.fatima.state = 'slap_strike';
                this.opponents[3].state = 'slapped';
                soundManager.playSlap();
                this.particles.emit(1680, 440, '#facc15', 20, 5, 0.5);
            });

            this.timeline.add(9.15, () => {
                this.fatima.state = 'slap_recovery';
                this.opponents[3].state = 'fall';
                this.opponents[3].defeated = true;
                this.particles.emitBlood(this.opponents[3].x, this.opponents[3].y);
            });

            this.timeline.add(9.8, () => {
                this.fatima.state = 'idle';
                this.ball.x = this.fatima.x + 16;
                this.ball.y = this.fatima.y - 15;
                this.ball.owner = this.fatima;
                this.ball.mode = 'dribble';
            });

            this.timeline.add(10.8, () => {
                this.fatima.state = 'speak';
                this.crowd.addBubble(this.fatima.x, this.fatima.y - 88, "I'm married, ya waste of oxygen.", 3.8, this.fatima);
            });

            this.timeline.add(15.0, () => {
                this.fatima.state = 'no_look_shot';
                this.ball.shootTo(2900, 320, 1.4);
            });

            this.timeline.add(16.4, () => {
                this.timeStopped = false;
                this.fatima.state = 'dance';
                soundManager.playBasketCheer();
                for (const opp of this.opponents) {
                    if (opp && opp.active && !opp.defeated) {
                        opp.state = 'fall';
                        opp.defeated = true;
                        this.particles.emitBlood(opp.x, opp.y);
                    }
                }
                for (let i = 0; i < this.teammates.length; i++) {
                    this.teammates[i].vx = 0;
                    this.teammates[i].state = 'dance';
                }
            });

            this.timeline.add(21.5, () => {
                this.setupSequence(3);
            });

        } else if (seq === 3) {
            // ==========================================
            // SEQUENCE 3: FULL COURT TURNAROUND STEP-BACK FINALE
            // ==========================================
            document.getElementById('sequence-label').innerText = 'SEQUENCE 3: FULL COURT STEP-BACK FINALE';

            this.fatima.x = 200;
            this.fatima.y = 465;
            this.fatima.vx = 240;
            this.fatima.facing = 'right';
            this.fatima.state = 'drive';
            this.fatima.jumpProgress = 0;
            this.fatima.jumping = false;
            this.ball.owner = this.fatima;
            this.ball.mode = 'dribble';

            const teammateLanes = [435, 495, 420, 510];
            for (let i = 0; i < this.teammates.length; i++) {
                this.teammates[i].x = 80 + i * 50;
                this.teammates[i].y = teammateLanes[i];
                this.teammates[i].vx = 200;
                this.teammates[i].state = 'run';
                this.teammates[i].defeated = false;
            }

            this.opponents = [
                new Entity(950, 465, 'opponent', 'red', 99, 'buzz', '#fde68a'),
                new Entity(1050, 435, 'opponent', 'red', 12, 'short', '#b45309'),
                new Entity(1150, 495, 'opponent', 'red', 8, 'afro', '#78350f'),
                new Entity(1250, 450, 'opponent', 'red', 23, 'curly', '#fde68a'),
                new Entity(1350, 470, 'opponent', 'red', 44, 'short', '#92400e')
            ];
            for (const o of this.opponents) {
                o.facing = 'left';
                o.state = 'defend';
                o.defeated = false;
            }

            this.timeline.add(0.8, () => {
                this.crowd.addBubble(500, 100, "FATIMA! FATIMA!");
            });

            // 1. Fatima drives forward toward frontcourt (x = 2200)
            this.timeline.add(2.2, () => {
                this.fatima.x = 2200;
                this.fatima.vx = 0;
            });

            // 2. She turns around and sprints ALL THE WAY BACK near her own basket (x = 300)
            this.timeline.add(2.6, () => {
                this.fatima.facing = 'left';
                this.fatima.state = 'run';
                this.fatima.vx = -350; // Sprints back toward home basket
            });

            this.timeline.add(3.8, () => {
                this.fatima.x = 300;
                this.fatima.vx = 0;
                this.fatima.facing = 'right'; // Looks front toward opposing basket
                this.fatima.state = 'shoot_prepare';
            });

            // 3. Step back, jump, and shoot all the way across the full court to hoop at x = 2900
            this.timeline.add(4.5, () => {
                this.fatima.x -= 25; // Step back
                this.fatima.startJump(1.8);
                this.fatima.state = 'shoot_release';
                this.ball.shootTo(2900, 320, 1.8); // Shoots full court
            });

            // 4. Ball swishes into opposing basket, camera tracks ball, opponents collapse, Fatima dances
            this.timeline.add(6.4, () => {
                this.fatima.jumpProgress = 0;
                this.fatima.jumping = false;
                this.fatima.state = 'dance';
                soundManager.playBasketCheer();

                for (const opp of this.opponents) {
                    if (opp && !opp.defeated) {
                        opp.state = 'fall';
                        opp.defeated = true;
                        this.particles.emitBlood(opp.x, opp.y);
                    }
                }
                for (let i = 0; i < this.teammates.length; i++) {
                    this.teammates[i].vx = 0;
                    this.teammates[i].state = 'dance';
                }
                this.particles.emit(2900, 320, '#f97316', 70, 12, 1.8);
            });

            this.timeline.add(11.0, () => {
                this.running = false;
                document.getElementById('hud').classList.add('hidden');
                document.getElementById('victory-screen').classList.remove('hidden');
            });
        }

        this.timeline.start();
    }

    update(dt) {
        if (!this.running) return;

        if (this.hitStopTimer > 0) {
            this.hitStopTimer -= dt;
            return;
        }

        this.timeline.update(dt);
        this.particles.update(dt);
        this.crowd.update(dt, this.timeStopped);
        this.hoopLeft.update(dt);
        this.hoopRight.update(dt);

        this.fatima.update(dt, this.timeStopped, this.ball.x);

        if (this.timeStopped) {
            for (const t of this.teammates) t.update(dt, true, this.ball.x);
            for (const o of this.opponents) o.update(dt, true, this.ball.x);
            this.ball.update(dt, this.particles, this.hoopRight);
        } else {
            for (const t of this.teammates) t.update(dt, false, this.ball.x);
            for (const o of this.opponents) o.update(dt, false, this.ball.x);
            this.ball.update(dt, this.particles, this.hoopRight);
        }

        // Direct math prediction: viewX smoothly tracks Fatima's predicted sprite position
        const targetViewX = this.fatima.x - this.width / 2 + (this.fatima.vx || 0) * 0.35;
        this.viewX += (targetViewX - this.viewX) * 0.1;
        this.viewX = Math.max(0, Math.min(3000 - this.width, this.viewX));
    }

    render() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        ctx.save();
        // Direct world translation centered on Fatima's predicted sprite position
        ctx.translate(Math.floor(-this.viewX), 0);

        this.renderCourt(ctx);
        this.crowd.render(ctx, this.timeStopped);

        this.hoopLeft.render(ctx);
        this.hoopRight.render(ctx);

        const allEntities = [this.fatima, ...this.teammates, ...this.opponents];
        allEntities.sort((a, b) => a.y - b.y);

        for (const e of allEntities) {
            e.render(ctx, this.ball);
        }

        this.ball.render(ctx);
        this.particles.render(ctx);

        if (this.running) {
            this.renderYouMarker(ctx);
        }

        ctx.restore();

        // Cinematic Widescreen Letterbox Bars & Gym Spotlight Sweeps in screen-space
        ctx.save();
        if (this.timeStopped || this.currentSequence === 2) {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, this.width, 35);
            ctx.fillRect(0, this.height - 35, this.width, 35);
        }

        // Gymnasium Spotlight Sweep
        const sweepX = (performance.now() / 30) % (this.width + 400) - 200;
        const grad = ctx.createRadialGradient(sweepX, 100, 20, sweepX, 100, 350);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore();
    }

    renderCourt(ctx) {
        ctx.fillStyle = '#b45309';
        ctx.fillRect(0, 150, 3000, 450);

        ctx.fillStyle = '#92400e';
        for (let x = 0; x < 3000; x += 120) {
            ctx.fillRect(x, 150, 4, 450);
        }

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 6;
        ctx.strokeRect(100, 180, 2800, 390);

        ctx.beginPath();
        ctx.moveTo(1500, 180);
        ctx.lineTo(1500, 570);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(1500, 375, 90, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(30, 58, 138, 0.4)';
        ctx.fillRect(100, 275, 240, 200);
        ctx.fillRect(2660, 275, 240, 200);

        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(100, 275, 240, 200);
        ctx.strokeRect(2660, 275, 240, 200);

        ctx.beginPath();
        ctx.arc(100, 375, 250, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(2900, 375, 250, Math.PI / 2, (3 * Math.PI) / 2);
        ctx.stroke();
    }

    renderYouMarker(ctx) {
        let jumpY = 0;
        if (this.fatima.state === 'jump' || this.fatima.state === 'shoot_release') {
            jumpY = Math.sin(this.fatima.jumpProgress * Math.PI) * 65;
        } else if (this.fatima.state === 'dunk_leap' || this.fatima.state === 'dunk') {
            jumpY = Math.sin(this.fatima.jumpProgress * Math.PI) * 115;
        }

        const worldX = this.fatima.x;
        const worldY = this.fatima.y - jumpY - 84;

        ctx.save();
        ctx.font = '10px "Press Start 2P"';
        ctx.fillStyle = '#facc15';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 4;
        ctx.fillText('YOU', worldX, worldY);

        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.moveTo(worldX - 6, worldY + 4);
        ctx.lineTo(worldX + 6, worldY + 4);
        ctx.lineTo(worldX, worldY + 15);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    loop(timestamp) {
        const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
        this.lastTime = timestamp;

        this.update(dt);
        this.render();

        requestAnimationFrame((ts) => this.loop(ts));
    }

    start() {
        this.lastTime = performance.now();
        requestAnimationFrame((ts) => this.loop(ts));
    }
}

window.addEventListener('load', () => {
    const game = new GameEngine();
    game.start();
});
