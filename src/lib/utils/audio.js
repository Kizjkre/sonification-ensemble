import data from '$lib/stores/data.js';
import measure from '$lib/stores/measure.js';
import selected from '$lib/stores/selected.js';
import state, { STATE } from '$lib/stores/state.js';
import { audioBufferToWav } from '$lib/utils/buftowav.js';
import { clear, train } from '$lib/utils/cnn.js';
import { get } from 'svelte/store';
import processor from '$lib/utils/recorder.js?worker&url';

export const ctx = new AudioContext();

const analyser = new AnalyserNode(ctx, { fftSize: 512 });

const stream = await navigator.mediaDevices.getUserMedia({
  audio: {
    echoCancellation: false,
    autoGainControl: false,
    noiseSuppression: false
  }
});

const microphone = new MediaStreamAudioSourceNode(ctx, { mediaStream: stream });

await ctx.audioWorklet.addModule(processor);
export const recorder = new AudioWorkletNode(ctx, 'recorder');
const samples = [];
recorder.port.onmessage = ({ data: { channel, data } }) => {
  samples[channel] ??= [];
  samples[channel].push(...data);
};

export const getWav = () => {
  const buf = new AudioBuffer({
    length: samples[0].length,
    sampleRate: ctx.sampleRate,
    numberOfChannels: samples.length
  });

  samples.forEach((channel, i) => buf.copyToChannel(new Float32Array(channel), i));

  return audioBufferToWav(buf, true);
};

const gain = new GainNode(ctx, { gain: 2 });

microphone.connect(analyser);
gain.connect(recorder);

const freqs = new Uint8Array(analyser.frequencyBinCount);
export const fft = () => {
  analyser.getByteFrequencyData(freqs);
  return freqs;
};

let connected = false;
measure.subscribe(async $m => {
  if (get(state) !== STATE.playing) {
    clear();
    connected = false;
    try {
      microphone.disconnect(gain);
    } catch {}
    return;
  }
  if (!connected) {
    microphone.connect(gain);
    connected = true;
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
  await train(fft(), output);
});
