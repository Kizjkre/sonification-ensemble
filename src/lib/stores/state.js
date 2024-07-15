import { writable } from 'svelte/store';

export const STATE = Object.freeze({
  playing: true,
  stopped: false
});

export default writable(STATE.stopped);
