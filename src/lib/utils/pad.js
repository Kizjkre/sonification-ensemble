let audio;
let list;

export const buffers = {};

export default async e => {
  !audio && (audio = await import('$lib/utils/audio.js'));
  !list && ({ list } = await import('$lib/utils/samples.js'));
  const files = await list();
  const file = files.find(f => f.name.split('.').slice(0, -1).join('.') === e.key);
  if (file) {
    if (!(e.key in buffers)) {
      const buffer = await (await file.getFile()).arrayBuffer();
      buffers[e.key] = await audio.ctx.decodeAudioData(buffer);
    }
    const source = new AudioBufferSourceNode(audio.ctx, { buffer: buffers[e.key] });
    source.connect(audio.ctx.destination);
    source.start();
  }
};
