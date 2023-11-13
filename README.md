
# Projeto de Classificação de Imagens para Detecção de Questões em Provas 




Este projeto tem como objetivo a classificação e detecção de imagens de provas em dois tipos distintos: provas gabarito e provas simuladas. A classificação é realizada usando o modelo YOLOv8m-cls, que é uma versão do YOLO (You Only Look Once) otimizada para tarefas de classificação de objetos.  <img src="https://github.com/TheDudeThatCode/TheDudeThatCode/blob/master/Assets/Rocket.gif" width="16px">

## Soluções Mobile
<a target="_blank" align="center">
  <img align="right"  height="600" width="400"  src="https://github.com/Daniel227a/desafio/blob/main/app02.jpeg">
  <img align="left"  height="600" width="400"  src="https://github.com/Daniel227a/desafio/blob/main/app01.jpeg">
</a>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">
<a target="_blank" align="center" >
  <img align="left"  height="600" width="400"  src="https://github.com/Daniel227a/desafio/blob/main/app03.jpeg">
  <img align="right" height="650" width="500" alt="GIF" src="https://www.appdev360.com/wp-content/uploads/2021/02/gif-app-development-on-android.gif">
</a>
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

## Soluções Para windows

<a target="_blank" align="center">
  <img align="center"  height="600" width="1000"  src="https://github.com/Daniel227a/desafio/blob/main/software_windows.jpeg">
</a>


  
## Fluxo do Projeto
```mermaid
flowchart TD
    A{Provas ou Simulados} --> B[Respostas Prova]
    A{Provas ou Simulados} --> C{Tipos Simulados} 
    B --> F[resultado]
    C --> D[Verde]
    C --> E[Azul]
    C --> G[Diversos]
    D -->H[Respostas Verde]
    E -->J[Respostas Azul]
    G-->K[Respostas Diversos]
    H-->F
    J-->F
    K-->F
```


1. **Pré-processamento de Imagens:** As imagens de provas são pré-processadas para o tamanho de imagem especificado (224x224 pixels).
2. **Treinamento do Modelo:** O modelo YOLOv8m-cls é treinado com as imagens de treinamento para classificar entre provas gabarito e provas simuladas.
3. **Classificação de Imagens:** Após o treinamento, o modelo é usado para classificar novas imagens como provas gabarito ou provas simuladas.


3. **subconjunto das imagens de simulado**
Caso a imagem for classificada como sendo uma do tipo simulado, ela será processada novamente agora para classificar a qual subconjunto das imagens de simulado ela pertence, visando assim atribuir a mesma um modelo otimizado para o seu tipo de prova, sendo estes o modelo para provas verdes o modelo para provas azul e o modelo para provas diversas que engloba uma variedade de provas com vários formatos diferentes. 


```mermaid
flowchart TD
   C{Tipos Simulados} 
    
    C --> D[Verde]
    C --> E[Azul]
    C --> G[Diversos]
 
```
## Configuração do modelo 

### Parâmetros do Modelo

- **Tarefa (Task):** Classificação de imagens.
- **Modo (Mode):** Treinamento.
- **Modelo (Model):** YOLOv8m-cls.yaml
- **Dados (Data):** Diretório "/content/gdrive/MyDrive/simulados" contendo as imagens de treinamento.
- **Épocas (Epochs):** 300.
- **Paciência (Patience):** 50.
- **Tamanho do Lote (Batch):** 16.
- **Tamanho da Imagem (Imgsz):** 224 pixels.

### Parâmetros do Modelo para o Tipo verde
- **Tarefa (Task):** detecção .
- **Modo (Mode):** Treinamento.
- **Modelo (Model):** yolov8m.yaml
- **Dados (Data):** Diretório "/content/gdrive/MyDrive/simulados" contendo as imagens de treinamento.
- **Épocas (Epochs):** 300.
- **Paciência (Patience):** 50.
- **Tamanho do Lote (Batch):** 16.
- **Tamanho da Imagem (Imgsz):** 640 pixels.
- 
- ### Parâmetros do Modelo para o Tipo Azul
- **Tarefa (Task):** detecção .
- **Modo (Mode):** Treinamento.
- **Modelo (Model):** yolov8m.yaml
- **Épocas (Epochs):** 300.
- **Paciência (Patience):** 50.
- **Tamanho do Lote (Batch):** 16.
- **Tamanho da Imagem (Imgsz):** 640 pixels.
  
### Parâmetros do Modelo para o Tipo Diversos
- **Tarefa (Task):** detecção .
- **Modo (Mode):** Treinamento.
- **Modelo (Model):** yolov8m.yaml
- **Épocas (Epochs):** 150.
- **Paciência (Patience):** 50.
- **Tamanho do Lote (Batch):** 16.
- **Tamanho da Imagem (Imgsz):** 640 pixels.


## Resultados do treinamento 

## Resultados do treinamento Modelo verde
<a target="_blank" align="center">
  <img align="center"  height="600" width="900"  src="https://github.com/Daniel227a/desafio/blob/main/results_verde.png">
</a>


## matriz de confusão normalizada  Modelo verde
<a target="_blank" align="center">
  <img align="center"  height="600" width="900"  src="https://github.com/Daniel227a/desafio/blob/main/confusion_matrix_verde_normalized.png">
</a>


## Resultados do treinamento Modelo azul
<a target="_blank" align="center">
  <img align="center"  height="600" width="900"  src="https://github.com/Daniel227a/desafio/blob/main/results_blue_.png">
</a>


## matriz de confusão normalizada Modelo azul
<a target="_blank" align="center">
  <img align="center"  height="600" width="900"  src="https://github.com/Daniel227a/desafio/blob/main/confusion_blue_matrix_normalized.png">
</a>

## Resultados do treinamento Modelo diversos
<a target="_blank" align="center">
  <img align="center"  height="600" width="900"  src="https://github.com/Daniel227a/desafio/blob/main/results_diversos.png">
</a>

## matriz de confusão normalizada Modelo diversos
<a target="_blank" align="center">
  <img align="center"  height="600" width="900"  src="https://github.com/Daniel227a/desafio/blob/main/confusion_matrix_diversos_normalized.png">
</a>



# :man_technologist: Resultados

<a target="_blank" align="center">
  <img align="center"  height="800" width="1040"  src="https://github.com/Daniel227a/desafio/blob/main/azul_resultado.png">
<a target="_blank" align="center">
  <img align="center"  height="800" width="1065"  src="https://github.com/Daniel227a/desafio/blob/main/verde_resultado.png">
</a>
	

## Como Executar o Projeto
<a target="_blank" align="center">
  <img align="right" top="500" height="400" width="300" alt="GIF" src="https://media.giphy.com/media/SWoSkN6DxTszqIKEqv/giphy.gif">
</a>

1. Clone este repositório:

```shell
git clone https://github.com/Daniel227a/desafio.git
```
2. Baixe os medelos treinados e insira no diretorio modelos
   
```shell
https://drive.google.com/drive/folders/150vCXrseNIn_qCshArFYYRjI4ODhuXoW?usp=sharing
```
3. Execute o jupyter
```shell
jupyter-notebook
```
4. Abra o arquivo
```shell
Hackaton.ipynb
```
- YouTube Logo Animation
<img src="https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/63338029-e963-463a-88cb-c8f39c73e8d9" width="400">


#### 🤓 Check out my latest videos

<!-- YT LIST START -->
[<img src="https://raw.githubusercontent.com/jacques-blom/jacques-blom/cfa04ee011f40f5650cf30132dff9978e810ed93/assets/0.png" align="left" width="200" />](https://www.youtube.com/watch?v=z6qmP6JJvz8)
        **[Make your GitHub profile DYNAMIC using a Netlify (Lambda) Function](https://www.youtube.com/watch?v=z6qmP6JJvz8)**
        <br /> *13 Jul 2020*


## 🤝 Colaboradores
<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/49257791?v=4" width="100px;" alt="Daniel Pereira "/><br>
        <sub>
          <b>Daniel Pereira</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/56940804?v=4" width="100px;" alt="Lucas Nardelli"/><br>
        <sub>
          <b>Lucas Nardelli</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/51803858?v=4" width="100px;" alt="Gabriel Mota "/><br>
        <sub>
          <b>Gabriel Mota</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
