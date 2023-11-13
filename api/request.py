import requests
import datetime

url = "http://127.0.0.1:5000/predict"


caminho_da_imagem = './IMG_Train10-2_jpg.rf.d23d3ebc32e7f9ef5a25e167b4231357.jpg'

input_text = 'Exemplo de texto para processar.'

# Criando o payload em formato JSON
payload = {'text': caminho_da_imagem}

# Enviando a solicitação POST para a API
response = requests.post(url, json=payload)

result = response.json()['result']
print(result)