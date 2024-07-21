import data from '$lib/stores/data.js';
import selected from '$lib/stores/selected.js';
import state, { STATE } from '$lib/stores/state.js';
import { get } from 'svelte/store';

export default async () => {
  const { ctx, mtof } = await import('$lib/utils/audio.js');
  const d = get(data)[get(selected)];
  const index = d.columns[d.index];
  const color = d.columns[d.color];
  const y = d.columns[d.y];
  new Set(d.data.map(d => d[y]))
    .forEach((v, _, arr) => {
      const o = new OscillatorNode(ctx)
      const g = new GainNode(ctx);

      g.gain.value = 1 / arr.size;

      o.connect(g).connect(ctx.destination);

      const colors = d.data.map(d => d[color]).toSorted();
      d.data.forEach((d, i) => {
        const time = ctx.currentTime + (+d[index] || i);
        v === d[y] && o.frequency.setValueAtTime(mtof(60 + colors.indexOf(d[color])), time);
        g.gain.setValueAtTime((v === d[y]) / arr.size, time);
      });

      o.start(ctx.currentTime);
    });

  ctx.resume();
  state.set(STATE.playing);
};
