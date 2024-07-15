import { get, writable } from 'svelte/store';

const data = writable({});

export default {
  add: (name, d) => {
    const id = new Date().getTime();

    data.update(prev => ({
      ...prev,
      [id]: {
        name,
        data: d,
        index: -1,
        y: 0,
        color: 1,
        shape: -1,
        columns: d.columns
      }
    }));

    localStorage.setItem('data', JSON.stringify(get(data)));

    return id;
  },
  set: d => {
    data.set(d);
    localStorage.setItem('data', JSON.stringify(get(data)));
  },
  subscribe: data.subscribe
};
