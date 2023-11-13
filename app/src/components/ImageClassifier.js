import {torch, torchvision, media } from 'react-native-pytorch-core';
import perf from '@react-native-firebase/perf';
import * as ImageNetClasses from './ImageNetClasses.json';

const T = torchvision.transforms;
const MODEL_URL = 'https://github.com/lucasnardelli/testeDownload/raw/main/final.ptl';
let model = null;

export default async function classifyImage(image, download) {
  
  // Inicia um trace de desempenho para medir o uso de CPU
  // const trace = await perf().startTrace('cpu');
  const width = image.getWidth();
  const height = image.getHeight();
  const blob = media.toBlob(image);

  let tensor = torch.fromBlob(blob, [height, width, 3]);
  tensor = tensor.permute([2, 0, 1]);
  tensor = tensor.div(255);

  const resize = T.resize(224);
  tensor = resize(tensor);

  const normalize = T.normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225));
  tensor = normalize(tensor);

  tensor = tensor.unsqueeze(0);

  model = download

  // const filePath = await MobileModel.download(MODEL_URL);
  // model = await torch.jit._loadForMobile(filePath);


  const output = await model.forward(tensor);
  const maxIdx = output.argmax().item();
  
  // await trace.stop();

  return ImageNetClasses[maxIdx]
}