import samples from '$lib/state/samples.svelte.js';

const root = await navigator.storage.getDirectory();
const dir = await root.getDirectoryHandle('samples', { create: true });

export const add = async (name, data) => {
  const char = name.split('.').slice(0, -1).join('.');
  char in samples && (samples[char] = name);
  const file = await dir.getFileHandle(name, { create: true });
  return file.createWritable().then(writer => {
    writer.write(data);
    writer.close();
  });
};

export const read = async name => {
  const file = await dir.getFileHandle(name);
  return file.getFile();
};

export const remove = async name => {
  const char = name.split('.').slice(0, -1).join('.');
  char in samples && (samples[char] = null);
  const file = await dir.getFileHandle(name);
  return file.remove();
};

export const clear = async () => await (await navigator.storage.getDirectory()).remove({ recursive: true });
