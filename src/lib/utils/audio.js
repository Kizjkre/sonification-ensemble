export const ctx = new AudioContext();

const analyser = new AnalyserNode(ctx);

const stream = await navigator.mediaDevices.getUserMedia({
  audio: {
    echoCancellation: false,
    autoGainControl: false,
    noiseSuppression: false
  }
});

export const recorder = new MediaStreamAudioSourceNode(ctx, { mediaStream: stream });

recorder.connect(analyser);

const data = new Uint8Array(analyser.frequencyBinCount);
export const fft = () => {
  analyser.getByteFrequencyData(data);
  return data;
};

export const mtof = m => 440 * 2 ** ((m - 69) / 12);
