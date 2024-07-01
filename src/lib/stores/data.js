import { writable } from 'svelte/store';

const data = writable({});

export default {
  add: (name, d) => {
    const id = new Date().getTime();

    // TODO: temp
    d.y = 0;
    d.color = 1;
    d.shape = -1;
    data.update(prev => ({ ...prev, [id]: { name, data: d } }))

    return id;
  },
  set: data.set,
  subscribe: data.subscribe
};
