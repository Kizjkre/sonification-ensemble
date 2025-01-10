import save from '$lib/util/save.svelte.js';

const bpm = $state({ value: 60 });

save('bpm', bpm);

export default bpm;
