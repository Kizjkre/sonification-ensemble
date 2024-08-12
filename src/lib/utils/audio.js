import bpm from '$lib/stores/bpm.js';
import state, { STATE } from '$lib/stores/state.js';
import { train } from '$lib/utils/cnn.js';
import { get } from 'svelte/store';

export const ctx = new AudioContext();

const analyser = new AnalyserNode(ctx, { fftSize: 512 });

const stream = await navigator.mediaDevices.getUserMedia({
  audio: {
    echoCancellation: false,
    autoGainControl: false,
    noiseSuppression: false
  }
});

export const recorder = new MediaStreamAudioSourceNode(ctx, { mediaStream: stream });

recorder.connect(analyser);

const data = new Uint8Array(analyser.frequencyBinCount);
export const fft = () => {
  analyser.getByteFrequencyData(data);
  return data;
};

export const mtof = m => 440 * 2 ** ((m - 69) / 12);

let t = -1;
// const start = time => {
//   t === -1 && (t = time);
//   time - t > 1000 * 60 / get(bpm) / 8 && (t = time) && train(fft(), Array(61).fill(0));
//   get(state) === STATE.playing && requestAnimationFrame(start);
// };
// state.subscribe($s => {
//   ctx.state !== 'running' && ctx.resume();
//   $s === STATE.playing && requestAnimationFrame(start);
// });
