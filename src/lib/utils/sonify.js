import bpm from '$lib/stores/bpm.js';
import data from '$lib/stores/data.js';
import matrix from '$lib/stores/matrix.js';
import measure from '$lib/stores/measure.js';
import selected from '$lib/stores/selected.js';
import state, { STATE } from '$lib/stores/state.js';
import { buffers } from '$lib/utils/pad.js';
import { get } from 'svelte/store';

let sources;
let gain;

export default async () => {
  state.set(STATE.playing);
  const m = get(matrix);
  const b = get(bpm);
  const d = get(data)[get(selected)];

  const index = d.columns[d.index];
  const y = d.columns[d.y];
  const color = d.columns[d.color];
  // const shape = d.columns[d.shape];

  const timeline = [];

  d.data.forEach((r, i) => {
    i = index ? r[index] : i;
    !(i in timeline) && (timeline[i] = []);
    timeline[i].push(m[r[y]][r[color]]);
  });

  const { ctx , recorder } = await import('$lib/utils/audio.js');
  const { list } = await import('$lib/utils/samples.js');

  gain = new GainNode(ctx, { gain: 0.1 });

  // noinspection ES6MissingAwait
  sources = timeline.map((slice, i) => slice.map(async sample => {
    try {
      if (!(sample in buffers)) {
        const files = await list();
        const file = files.find(f => f.name.split('.').slice(0, -1).join('.') === sample);
        const buffer = await (await file.getFile()).arrayBuffer();
        buffers[sample] = await ctx.decodeAudioData(buffer);
      }
      const source = new AudioBufferSourceNode(ctx, { buffer: buffers[sample] });
      source.connect(ctx.destination);
      source.connect(gain).connect(recorder);
      source.start(ctx.currentTime + i * 60 / b);
      return source;
    } catch {}
  }));

};

export const reset = async () => {
  const { ctx, recorder } = await import('$lib/utils/audio.js');
  const { getWav } = await import('$lib/utils/audio.js');
  const { default: download } = await import('$lib/utils/download.js');
  state.set(STATE.stopped);
  measure.set(0);
  sources?.forEach(s => s.forEach(async node => {
    (await node)?.disconnect(ctx.destination);
    (await node)?.disconnect(gain);
  }));
  gain?.disconnect(recorder);
  download(`ensonification-${Date.now()}.wav`, getWav(), 'audio/wav');
};
