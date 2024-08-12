import { get, writable } from 'svelte/store';

const matrix = writable([[]]);

export default {
  set: d => {
    matrix.set(d);
    localStorage.setItem('matrix', JSON.stringify(get(matrix)));
  },
  subscribe: matrix.subscribe
};
