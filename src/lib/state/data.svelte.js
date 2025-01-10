import file from '$lib/state/file.svelte.js';
import save from '$lib/util/save.svelte.js';

export const data = $state({});

export const add = (name, d) => {
  const id = Date.now();
  data[id] = {
    name,
    data: d,
    columns: d.columns,
    x: -1,
    y: 0,
    color: 1,
    shape: -1
  };
  return id;
};

export const remove = id => {
  delete data[id];
  file.id = null;
};

save('data', data);
