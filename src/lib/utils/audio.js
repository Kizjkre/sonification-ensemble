import data from '$lib/stores/data.js';
import measure from '$lib/stores/measure.js';
import selected from '$lib/stores/selected.js';
import state, { STATE } from '$lib/stores/state.js';
import { clear, predict, train } from '$lib/utils/cnn.js';
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

recorder.connect(analyser).connect(ctx.destination);

const freqs = new Uint8Array(analyser.frequencyBinCount);
export const fft = () => {
  analyser.getByteFrequencyData(freqs);
  return freqs;
};

measure.subscribe($m => {
  if (get(state) !== STATE.playing) {
    clear();
    return;
  }
  $m--;

  const d = get(data)[get(selected)];
  const index = d.columns[d.index];
  const y = d.columns[d.y];
  const color = d.columns[d.color];
  const timeline = [];
  const values = { size: 0 };

  d.data.forEach((r, i) => {
    i = index ? r[index] : i;
    !(i in timeline) && (timeline[i] = []);
    const h = JSON.stringify([r[y], r[color]]);
    timeline[i].push(h);
    h in values || (values[h] = values.size++);
  });

  const output = Array(values.size).fill(0);
  output[values[timeline[$m]]] = 1;
  const testInput = new Uint8Array(analyser.frequencyBinCount);
  testInput[values[timeline[$m]]] = 1;
  // train(fft(), output);
  train(testInput, output);
  console.log(testInput, output);
});
