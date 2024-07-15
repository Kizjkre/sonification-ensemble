import { writable } from 'svelte/store';

const { subscribe, set, update } = writable(-1);

export default {
  subscribe,
  set: id => {
    localStorage.setItem('selected', id);
    return set(id);
  },
  update
};
