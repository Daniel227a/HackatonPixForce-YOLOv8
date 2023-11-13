
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
  <img align="rightv" height="600" width="500" alt="GIF" src="https://www.appdev360.com/wp-content/uploads/2021/02/gif-app-development-on-android.gif">
</a>

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

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">
<a target="_blank" align="center">
  <img align="right" top="500" height="300" width="600" alt="GIF" src="https://media.giphy.com/media/SWoSkN6DxTszqIKEqv/giphy.gif">
</a>
- Cool Stats on Laptop
<img src="https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/0b335028-1d3d-4ee5-b5b3-a373d499be7e" width="400">
- YouTube Logo Animation
<img src="https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/63338029-e963-463a-88cb-c8f39c73e8d9" width="400">
<br><br>
<br><br>
<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://www.linux.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" alt="linux" width="40" height="40"/> </a> <a href="https://nativescript.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/detain/svg-logos/780f25886640cef088af994181646db2f6b1a3f8/svg/nativescript.svg" alt="nativescript" width="40" height="40"/> </a> <a href="https://opencv.org/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/opencv/opencv-icon.svg" alt="opencv" width="40" height="40"/> </a> <a href="https://www.python.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/> </a> <a href="https://www.tensorflow.org" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg" alt="tensorflow" width="40" height="40"/> </a> </p>

 <b>grow</b> <img src="https://github.com/TheDudeThatCode/TheDudeThatCode/blob/master/Assets/Rocket.gif" width="18px">and 
<b>excel</b> <img src="https://github.com/TheDudeThatCode/TheDudeThatCode/blob/master/Assets/Medal.gif" width="20px">&nbsp.



#### 🤓 Check out my latest videos

<!-- YT LIST START -->
[<img src="https://raw.githubusercontent.com/jacques-blom/jacques-blom/cfa04ee011f40f5650cf30132dff9978e810ed93/assets/0.png" align="left" width="200" />](https://www.youtube.com/watch?v=z6qmP6JJvz8)
        **[Make your GitHub profile DYNAMIC using a Netlify (Lambda) Function](https://www.youtube.com/watch?v=z6qmP6JJvz8)**
        <br /> *13 Jul 2020*
<img align="center" width="100%" height="0" />
[<img src="https://raw.githubusercontent.com/jacques-blom/jacques-blom/63ebbf8867a7eb4fac1e47e3e2843fb184354e9c/assets/1.png" align="left" width="200" />](https://www.youtube.com/watch?v=9JVE8OGRSlA)
        **[Let&#39;s build a high performance app using Recoil and React ](https://www.youtube.com/watch?v=9JVE8OGRSlA)**
        <br /> *07 Jul 2020*
<img align="center" width="100%" height="0" />
[<img src="https://raw.githubusercontent.com/jacques-blom/jacques-blom/636be47ba320f1313d9e8dc28b4b1426a84a7650/assets/2.png" align="left" width="200" />](https://www.youtube.com/watch?v=KBE7Ezn7h0A)
        **[Intro to Recoil - A great new Redux alternative? ](https://www.youtube.com/watch?v=KBE7Ezn7h0A)**
        <br /> *28 Jun 2020*
<img align="center" width="100%" height="0" />
<!-- YT LIST END -->
<details open>
<summary>Install</summary>

Pip install the ultralytics package including all [requirements](https://github.com/ultralytics/ultralytics/blob/main/requirements.txt) in a [**Python>=3.8**](https://www.python.org/) environment with [**PyTorch>=1.8**](https://pytorch.org/get-started/locally/).

[![PyPI version](https://badge.fury.io/py/ultralytics.svg)](https://badge.fury.io/py/ultralytics) [![Downloads](https://static.pepy.tech/badge/ultralytics)](https://pepy.tech/project/ultralytics)

```bash
pip install ultralytics
```

For alternative installation methods including [Conda](https://anaconda.org/conda-forge/ultralytics), [Docker](https://hub.docker.com/r/ultralytics/ultralytics), and Git, please refer to the [Quickstart Guide](https://docs.ultralytics.com/quickstart).

</details>
## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

# PROTÓTIPO DE SOLUÇÃO PARA CORREÇÃO AUTOMÁTICA DE PROVAS E SIMULADOS
Este projeto foi desenvolvido para o hackaton, produzido pela pixforce e meninas++, com o intuito de implementar um modelo capaz de ler gabaritos de provas e realizar a correção automática dos mesmos, auxiliando e agilizando este processo.

## Lógica de funcionamento do projeto
Inicialmente é implementado o algoritmo de detecção de objetos YOLOv8, com o intuito de receber uma imagem de gabarito e extrair o local de respoastas da folha. Em seguida partimos para identificar as bordas da saída do YOLOv8, tendo como objetivo organizar e identificar as repostas marcadas e por fim gerar um relátorio do desempenho do aluno na rpova em questão.

## Funcionalidades implementadas
- **Leitura das folhas de resposta**
- **Comparação e pontuação**

## 🚀Instalação
```
# Install the ultralytics package from PyPI
!pip install ultralytics
```

🚀
Para instalar o <nome_do_projeto>, siga estas etapas:

Linux e macOS:
```
<comando_de_instalação>
```
### Requirements

## Modo de uso
Adicione as imagens das provas na pasta nomeada como input, execute o notebook nomeado *main.ipynb* e o relatório estará disponivel no diretório output

## Bibliotecas utilizadas

## FAQ

## print do projeto

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
