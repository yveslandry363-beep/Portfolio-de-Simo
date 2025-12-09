
// Procedural Audio Engine
// Generates UI sounds without external assets

let audioCtx: AudioContext | null = null;
let droneOscillators: any[] = [];
let droneGain: GainNode | null = null;
let analyser: AnalyserNode | null = null;
let isMuted = true;

const initAudio = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64; // Small fftSize for visualizer bars
        analyser.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
};

export const getAnalyser = () => {
    if (!audioCtx) initAudio();
    return analyser;
};

export const toggleAmbientSound = (shouldPlay: boolean) => {
    initAudio();
    if (!audioCtx) return;

    if (shouldPlay) {
        isMuted = false;
        startDrone();
    } else {
        isMuted = true;
        stopDrone();
    }
};

const startDrone = () => {
    if (!audioCtx || !analyser || droneOscillators.length > 0) return;

    droneGain = audioCtx.createGain();
    droneGain.connect(analyser);
    droneGain.gain.setValueAtTime(0, audioCtx.currentTime);
    droneGain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 2); // Fade in

    // Create a deep space drone chord
    const freqs = [55, 110, 112, 165]; // Low A, A, A# (dissonance), E
    
    freqs.forEach(f => {
        if(!audioCtx) return;
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, audioCtx.currentTime);
        
        // Slight detune LFO for movement
        const lfo = audioCtx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.1 + Math.random() * 0.2;
        const lfoGain = audioCtx.createGain();
        lfoGain.gain.value = 2; // +/- 2Hz
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        osc.connect(droneGain!);
        osc.start();
        droneOscillators.push({ osc, lfo });
    });
};

const stopDrone = () => {
    if (!audioCtx || !droneGain) return;
    
    // Fade out
    droneGain.gain.cancelScheduledValues(audioCtx.currentTime);
    droneGain.gain.setValueAtTime(droneGain.gain.value, audioCtx.currentTime);
    droneGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);

    setTimeout(() => {
        droneOscillators.forEach(o => {
            o.osc.stop();
            o.lfo.stop();
        });
        droneOscillators = [];
    }, 1000);
};

export const playHoverSound = () => {
    if (!audioCtx || isMuted) return;
    
    if(audioCtx.state === 'suspended') initAudio();
    if (!audioCtx || !analyser) {
        initAudio();
        if (!audioCtx || !analyser) return;
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(analyser);

    // High frequency blip
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime); // Very quiet
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05);
};

export const playClickSound = () => {
    if (!audioCtx) initAudio();
    if (!audioCtx || !analyser) return;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(analyser);

    // Lower thud
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(200, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
};
