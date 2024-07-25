import * as tf from '@tensorflow/tfjs';

const model = tf.sequential();

model.add(tf.layers.conv1d({
  inputShape: [256, 1],
  kernelSize: 5,
  filters: 8,
  activation: 'relu',
  kernelInitializer: 'varianceScaling'
}));

model.add(tf.layers.maxPooling1d({
  poolSize: 2,
  strides: 2
}));

model.add(tf.layers.conv1d({
  kernelSize: 5,
  filters: 16,
  strides: 1,
  activation: 'relu',
  kernelInitializer: 'varianceScaling'
}));

model.add(tf.layers.maxPooling1d({
  poolSize: 2,
  strides: 2
}));

model.add(tf.layers.dense({
  units: 1,
  kernelInitializer: 'varianceScaling',
  activation: 'softmax'
}));

const optimizer = tf.train.adam();
model.compile({
  optimizer,
  loss: 'meanSquaredError',
  metrics: ['accuracy']
});

export const train = (fft, value) => model.fit(
  tf.tensor3d(fft, [1, fft.length, 1]),
  tf.tensor3d(value, [1, 61, 1]),
  {
    epochs: 5,
    callbacks: {
      onEpochEnd: (epoch, log) => console.log(`Epoch ${epoch + 1}: loss = ${log.loss}, accuracy = ${log.acc}`)
    }
  }
);

export const predict = fft => model.predict(tf.tensor([fft])).dataSync()[0];
