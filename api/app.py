from flask import Flask, request, jsonify

app = Flask(__name__)

import os
from ultralytics import YOLO
import numpy as np
import matplotlib.pyplot as plt

# Carrega um modelo utilizando YOLO
def loadModel(path):
  return YOLO(path)

# Realiza a predição de uma imagem
def predict(image, model):
  return model(image, conf=0.4)

# Exibe a imagem após a predição
def plotImage(results):
  img_inferred= results[0].plot()
  plt.figure(figsize=(10, 10))
  plt.imshow(img_inferred)
  plt.xticks([]), plt.yticks([])
  plt.show()

# Define qual tipo de simulado está sendo usado e retorna o modelo correspondente
def simulados(image, model):
  modelo = loadModel(model)
  results = predict(image, modelo)
  names_dict = results[0].names
  probs = results[0].probs.data.tolist()
  tipo = names_dict[np.argmax(probs)]
  print(tipo)
  if(tipo == 'blue'):
    return YOLO('/content/gdrive/MyDrive/Hackaton/modelos/modeloAzulLast.pt')
  elif (tipo == 'green'):
    return YOLO('/content/gdrive/MyDrive/Hackaton/modelos/modeloVerdeLast.pt')
  else:
    return YOLO('/content/gdrive/MyDrive/Hackaton/modelos/diversos.pt')

# Analisa as detecções e retorna um dicionário ordenado pela questão e sua respectiva resposta
def resposta(image, modelo):
  results = predict(image, modelo)
  plotImage(results)
  names_dict = results[0].names

  for r in results:
    classes = r.boxes.cls.tolist()
    boxes = r.boxes.xywh.tolist()
  classe = []
  for item in classes:
    classe.append(names_dict[int(item)])
  for i in range(0, len(boxes)):
    boxes[i].append(classe[i])

# Ordena os boxes primeiro pelo eixo X e em seguida pelo eixo Y
  lista = []
  while len(boxes) > 0:
    x_min = min(item[0] for item in boxes)
    ordenado_x = []
    for item in boxes:
      if(item[0] > x_min - 50 and item[0] < x_min + 50):
        ordenado_x.append(item)
    ordem = sorted(ordenado_x, key=lambda x: x[1])
    boxes = [x for x in boxes if x not in ordenado_x]
    lista.append(ordem)

  respostas = {}
  i = 0
  for sublista in lista:
    for item in sublista:
      i += 1
      respostas[i] = item[4]
  return respostas

# Realiza a comparação entre as respostas e o gabarito e retorna a quantidade de respostas certas
def resultado(gabarito, respostas):

  acertos = 0
  if len(gabarito) > len(respostas):
    for key, value in respostas.items():
      if gabarito[key] == value:
        acertos += 1
  else:
    for key, value in gabarito.items():
      if respostas[key] == value:
        acertos += 1

  return 'Você acertou: ' + str(acertos) + '/' + str(len(gabarito))

# Diferencia se a imagem é uma prova ou um simulado
def provaSimulado(image, model, gabarito):
  modelo = loadModel(model)
  results = predict(image, modelo)
  names_dict = results[0].names
  probs = results[0].probs.data.tolist()
  tipo = names_dict[np.argmax(probs)]
  if(tipo == 'prova'):
    modelo = YOLO('/content/gdrive/MyDrive/Hackaton/modelos/prova.pt')
    results = predict(image, modelo)
    names_dict = results[0].names
    for r in results:
      classes = r.boxes.cls.tolist()

    classe = []
    for item in classes:
      classe.append(names_dict[int(item)])

    acertos = 0
    if len(gabarito) > len(classe):
      for i in range(0, len(classe)):
        if gabarito[i] == classe[i]:
          acertos += 1
    else:
      for i in range(0, len(classe)):
        if gabarito[i] == classe[i]:
          acertos += 1

    return 'Você acertou: ' + str(acertos) + '/' + str(len(gabarito))

  else:
    modelo = '/content/gdrive/MyDrive/Hackaton/modelos/diferenciaSimuladosLast.pt'
    model = simulados(image, modelo)
    respostas = resposta(image, model)
    print(respostas)
    return resultado(gabarito, respostas)

# Define o gabarito
def geraGabarito(image, model):
  modelo = loadModel(model)
  results = predict(image, modelo)
  names_dict = results[0].names
  probs = results[0].probs.data.tolist()
  tipo = names_dict[np.argmax(probs)]
  if(tipo == 'prova'):
    modelo = YOLO('/content/gdrive/MyDrive/Hackaton/modelos/prova.pt')
    results = predict(image, modelo)
    names_dict = results[0].names
    for r in results:
      classes = r.boxes.cls.tolist()

    classe = []
    for item in classes:
      classe.append(names_dict[int(item)])
    return classe
  else:
    modelo = '/content/gdrive/MyDrive/Hackaton/modelos/diferenciaSimuladosLast.pt'
    model = simulados(image, modelo)
    return resposta(image, model)

async def inicio(pathModel, pathImageClassificar, pathImageGabarito):
    # Define o caminho do modelo inicial
    pathModel = '/content/gdrive/MyDrive/Hackaton/modelos/provaGabarito.pt'

    # Altere para o caminho da imagem que quer classificar
    pathImageClassificar = '/content/gdrive/MyDrive/Hackaton/054_jpg.rf.ca25d6bd90c6782d079e224d6ea138bf.jpg'

    # Altere para o caminho da imagem de gabarito
    pathImageGabarito = '/content/gdrive/MyDrive/Hackaton/054_jpg.rf.ca25d6bd90c6782d079e224d6ea138bf.jpg'

    gabarito = geraGabarito(pathImageGabarito, pathModel)

    return provaSimulado(pathImageClassificar, pathModel, gabarito)


@app.route('/predict', methods=['POST'])
async def predict():
    # Obtém o texto enviado na requisição
    data = request.get_json()
    pathImage = data['text']
    pathModel = './diferenciaSimuladosLast.pt'
    # Processa o texto (aqui, simplesmente adiciona "Processado: " ao início)
    result = await inicio(pathModel, pathImage, pathImage)
    # Retorna o resultado como JSON
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)