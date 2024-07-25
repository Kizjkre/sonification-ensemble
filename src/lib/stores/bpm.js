import { writable } from 'svelte/store';

const { subscribe, set, update } = writable(60);

export default {
  subscribe,
  set: id => {
    localStorage.setItem('bpm', id);
    return set(id);
  },
  update
};
