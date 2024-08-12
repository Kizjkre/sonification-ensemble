import pad from '$lib/stores/pad.js';

const root = await navigator.storage.getDirectory();
const samples = await root.getDirectoryHandle('samples', { create: true });

export const add = async (name, data) => {
  pad.add(name.split('.').slice(0, -1).join('.'));
  const file = await samples.getFileHandle(name, { create: true });
  return file.createWritable().then(writer => {
    writer.write(data);
    writer.close();
  });
};

export const list = () => Array.fromAsync(samples.values());

export const read = async name => {
  const file = await samples.getFileHandle(name);
  return file.getFile();
};

export const remove = async name => {
  pad.remove(name.split('.').slice(0, -1).join('.'));
  const file = await samples.getFileHandle(name);
  return file.remove();
};
