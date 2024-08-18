import * as tf from '@tensorflow/tfjs';

const create = classes => {
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

  model.add(tf.layers.flatten());

  model.add(tf.layers.dense({
    units: classes,
    kernelInitializer: 'varianceScaling',
    activation: 'softmax'
  }));

  const optimizer = tf.train.adam();
  model.compile({
    optimizer,
    loss: 'meanSquaredError',
    metrics: ['accuracy']
  });

  return model;
};

let model = null;

export const train = (fft, value) => {
  model ??= create(value.length);
  return model.fit(
    tf.tensor2d([fft], [1, fft.length]).expandDims(2),
    tf.tensor2d([value], [1, value.length]),
    {
      epochs: 20,
      callbacks: {
        onEpochEnd: (epoch, log) => console.log(`Epoch ${epoch + 1}: loss = ${log.loss}, accuracy = ${log.acc}`)
      }
    }
  );
};

export const predict = fft => model.predict(tf.tensor([fft], [1, fft.length]).expandDims(2)).dataSync();

export const clear = () => model = null;
