import save from '$lib/util/save.svelte.js';

export const MODE = Object.freeze({
  BLOCK: 'Block',
  LINE: 'Line'
});

const mode = $state({ value: MODE.BLOCK });

save('mode', mode);

export default mode;
