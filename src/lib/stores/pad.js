import { writable } from 'svelte/store';

const pad = writable([]);

export default {
  subscribe: pad.subscribe,
  add: key => pad.update(pad => [...pad, key]),
  remove: key => pad.update(pad => pad.filter(k => k !== key)),
  set: pad.set,
  update: pad.update
}
