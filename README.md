
# Projeto de Automação para Correção  de Provas e Simulados Aplicando Técnicas de Visão Computacional

O projeto tem como objetivo o desenvolvimento de protótipo para automatizar o processo de leitura e correção de provas e simulados aplicando técnicas de visão computacional. Foram aplicadas técnicas de Classificação, Detecção, etc.

## Equipe Visão Pro
- Lucas Nardelli de Freitas Botelho Saar
- Daniel Pereira Monteiro
- Gabriel Sávio

## Fluxo do Projeto

Segue abaixo a descrição detalhada do fluxo do projeto:
1. **Submissão de Imagem de Entrada:**
   - O processo inicia com a submissão de uma imagem, que pode ser uma prova ou gabarito.

2. **Modelo de Classificação `YOLOv8m-cls` (1º Modelo):**
   - A imagem é submetida ao primeiro modelo de classificação, `YOLOv8m-cls`.
   - Este modelo classifica entre "Prova" ou "Simulado".

3. **Caso: Prova (Classificado pelo 1º Modelo):**
   - Se a imagem for classificada como "Prova", o fluxo continua para o próximo passo.

4. **Modelo de Detecção `YOLOv8m` (2º Modelo):**
   - A imagem (prova) é submetida ao segundo modelo de detecção, `YOLOv8m`.
   - Este modelo detecta e retorna a questão marcada pelo usuário como resposta.

5. **Caso: Simulado (Classificado pelo 1º Modelo):**
   - Se a imagem for classificada como "Simulado", o fluxo se desvia para outra sequência de modelos.

6. **Modelo de Classificação `YOLOv8m-cls` para Tipos de Simulados (3º Modelo):**
   - A imagem (simulado) é submetida a um terceiro modelo de classificação, `YOLOv8m-cls`.
   - Este modelo classifica entre os 3 formatos de simulados existentes.

7. **Modelo de Detecção `YOLOv8m` para Simulados (4º Modelo):**
   - A imagem (simulado) é passada para um quarto modelo de detecção, `YOLOv8m`.
   - Este modelo retorna as questões marcadas pelo aluno no simulado.

### Resumo:
- O projeto começa com a classificação da imagem como "Prova" ou "Simulado" usando o `YOLOv8m-cls`.
- Se for uma prova, é aplicado o `YOLOv8m` para detectar a questão marcada.
- Se for um simulado, é feita uma nova classificação para determinar o tipo de simulado usando outro modelo `YOLOv8m-cls`.
- Em seguida, um segundo modelo `YOLOv8m` é utilizado para detectar as questões marcadas no simulado.

### Ilustração do Fluxo
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

## Informações de Treinamento
### Ambiente
Todos os modelos foram treinados utilizando o Google Colab. O arquivo [`requirements.txt`](envs/requirements.txt) contém a lista de todas as bibliotecas e suas versões necessárias para este projeto. Certifique-se de que essas bibliotecas estejam instaladas em seu ambiente, caso queira repetir o treinamento.

### Modelos de Classificação

#### Modelo Provas ou Simulado

##### Parâmetros do Modelo

- **Tarefa (Task):** Classificação
- **Modo (Mode):** Treinamento
- **Modelo (Model):** YOLOv8m-cls.pt `pre-trained` 
- **Dados (Data):** Diretório "/content/gdrive/MyDrive/simulados" contendo as imagens de treinamento.
- **Épocas (Epochs):** 300.
- **Paciência (Patience):** 50.
- **Tamanho do Lote (Batch):** 16.
- **Tamanho da Imagem (Imgsz):** 224 pixels.
- **Aumento de Dados(Data Augmentation):** rotation: 5 and 10 degrees.

##### Resultados do Modelo de Prova ou Simulado

<div style="display: flex; justify-content: space-between;">
  <a target="_blank" align="center">
    <img height="400" width="400" src="https://github.com/Daniel227a/desafio/blob/dev/images/results_ProvaGabarito.png" alt="Resultados da Prova">
  </a>
  <a target="_blank" align="center">
    <img height="400" width="400" src="https://github.com/Daniel227a/desafio/blob/dev/images/confusion_matrix_normalized_ProvaGabarito.png" alt="Matriz de Confusão - Modelo Verde">
  </a>
</div>

#### Modelo dos Simulados

##### Parâmetros do Modelo

- **Tarefa (Task):** Classificação
- **Modo (Mode):** Treinamento
- **Modelo (Model):** YOLOv8m-cls.pt `pre-trained`
- **Dados (Data):** Diretório "/content/gdrive/MyDrive/simulados" contendo as imagens de treinamento.
- **Épocas (Epochs):** 300.
- **Paciência (Patience):** 50.
- **Tamanho do Lote (Batch):** 16.
- **Tamanho da Imagem (Imgsz):** 224 pixels.
- **Aumento de Dados(Data Augmentation):** rotation: 5 and 10 degrees.
##### Resultados do Modelo de Prova ou Simulado

<div style="display: flex; justify-content: space-between;">
  <a target="_blank" align="center">
    <img height="400" width="400" src="https://github.com/Daniel227a/desafio/blob/dev/images/results_Simulados.png" alt="Resultados da Prova">
  </a>
  <a target="_blank" align="center">
    <img height="400" width="400" src="https://github.com/Daniel227a/desafio/blob/dev/images/confusion_matrix_normalized_Simulados.png" alt="Matriz de Confusão - Modelo Verde">
  </a>
</div>

### Modelos de Detecção

#### Parâmetros do Modelo de Provas
- **Tarefa (Task):** detecção 
- **Modo (Mode):** Treinamento
- **Modelo (Model):** yolov8m.pt `pre-trained`
- **Dados (Data):** Diretório "/content/gdrive/MyDrive/simulados" contendo as imagens de treinamento.
- **Épocas (Epochs):** 300.
- **Paciência (Patience):** 50.
- **Tamanho do Lote (Batch):** 16.
- **Tamanho da Imagem (Imgsz):** 640 pixels.

#### Resultados do Modelo de Provas
<div style="display: flex; justify-content: space-between;">
  <a target="_blank" align="center">
    <img height="270" width="410" src="https://github.com/Daniel227a/desafio/blob/dev/images/resultsProva.png" alt="Resultados da Prova">
  </a>
  <a target="_blank" align="center">
    <img height="270" width="410" src="https://github.com/Daniel227a/desafio/blob/dev/images/matrixProvas.png" alt="Matriz de Confusão - Modelo Verde">
  </a>
</div>

#### Parâmetros do Modelo para o Tipo verde
- **Tarefa (Task):** detecção 
- **Modo (Mode):** Treinamento
- **Modelo (Model):** yolov8m.pt `pre-trained`
- **Dados (Data):** Diretório "/content/gdrive/MyDrive/simulados" contendo as imagens de treinamento.
- **Épocas (Epochs):** 300.
- **Paciência (Patience):** 50.
- **Tamanho do Lote (Batch):** 16.
- **Tamanho da Imagem (Imgsz):** 640 pixels.
- **Aumento de Dados(Data Augmentation):** rotation: 5 and 10 degrees.

#### Resultados do Modelo para o Tipo verde

<div style="display: flex; justify-content: space-between;">
  <a target="_blank" align="center">
    <img height="270" width="410" src="https://github.com/Daniel227a/desafio/blob/dev/images/results_verde.png" alt="Resultados da Prova">
  </a>
  <a target="_blank" align="center">
    <img height="270" width="410" src="https://github.com/Daniel227a/desafio/blob/dev/images/confusion_matrix_verde_normalized.png" alt="Matriz de Confusão - Modelo Verde">
  </a>
</div>

#### Parâmetros do Modelo para o Tipo Azul
- **Tarefa (Task):** detecção 
- **Modo (Mode):** Treinamento
- **Modelo (Model):** yolov8m.pt `pre-trained`
- **Épocas (Epochs):** 300.
- **Paciência (Patience):** 50.
- **Tamanho do Lote (Batch):** 16.
- **Tamanho da Imagem (Imgsz):** 640 pixels.
- **Aumento de Dados(Data Augmentation):** rotation: 5 and 10 degrees.
  
#### Resultados do Modelo para o Tipo Azul

<div style="display: flex; justify-content: space-between;">
  <a target="_blank" align="center">
    <img height="270" width="410" src="https://github.com/Daniel227a/desafio/blob/dev/images/results_blue_.png" alt="Resultados da Prova">
  </a>
  <a target="_blank" align="center">
    <img height="270" width="410" src="https://github.com/Daniel227a/desafio/blob/dev/images/confusion_blue_matrix_normalized.png" alt="Matriz de Confusão - Modelo Verde">
  </a>
</div>

#### Parâmetros do Modelo para o Tipo Diversos
- **Tarefa (Task):** detecção 
- **Modo (Mode):** Treinamento
- **Modelo (Model):** yolov8m.pt `pre-trained`
- **Épocas (Epochs):** 150.
- **Paciência (Patience):** 50.
- **Tamanho do Lote (Batch):** 16.
- **Tamanho da Imagem (Imgsz):** 640 pixels.
- **Aumento de Dados(Data Augmentation):** rotation: 5 and 10 degrees.

#### Resultados do Modelo para o Tipo Diversos

<div style="display: flex; justify-content: space-between;">
  <a target="_blank" align="center">
    <img height="270" width="410" src="https://github.com/Daniel227a/desafio/blob/dev/images/results_diversos.png" alt="Resultados da Prova">
  </a>
  <a target="_blank" align="center">
    <img height="270" width="410" src="https://github.com/Daniel227a/desafio/blob/dev/images/confusion_matrix_diversos_normalized.png" alt="Matriz de Confusão - Modelo Verde">
  </a>
</div>


## :man_technologist: Soluções e Resultados
### Mobile
Para a criação da solução móvel, optamos pelo framework React Native, visando proporcionar uma experiência intuitiva por meio de uma interface amigável.

<p align="center">
  <img height="800" width="400" src="https://github.com/Daniel227a/desafio/blob/main/images/app01.jpeg" alt="App 01">
  <img height="800" width="400" src="https://github.com/Daniel227a/desafio/blob/main/images/app02.jpeg" alt="App 02">
</p>

<p align="center">
  <img height="800" width="400" src="https://github.com/Daniel227a/desafio/blob/main/images/app03.jpeg" alt="App 03">
  <img height="800" width="400" src="https://www.appdev360.com/wp-content/uploads/2021/02/gif-app-development-on-android.gif" alt="App GIF">
</p>



### Desktop
Para a solução desktop foi desenvolvida uma interface utilzando python com a biblioteca `tkinter`, para demosntrar o funcionamento da solução.

<a target="_blank" align="center">
  <img align="center"  height="600" width="1000"  src="https://github.com/Daniel227a/desafio/blob/main/images/software_windows.jpeg">
</a>

<div style="display: flex; justify-content: space-between;">
  <a target="_blank" align="center">
    <img height="300" width="400" src="https://github.com/Daniel227a/desafio/blob/main/images/azul_resultado.png" alt="Resultado Azul">
  </a>
  <a target="_blank" align="center">
    <img height="300" width="400" src="https://github.com/Daniel227a/desafio/blob/main/images/verde_resultado.png" alt="Resultado Verde">
  </a>
</div>

	
## Como Executar o Projeto Localmente

1. **Clone este repositório:**

   ```shell
   git clone https://github.com/Daniel227a/desafio.git
   ```

2. **Baixe os modelos treinados e insira no diretório "modelos":**

   - [Google Drive - Modelos Treinados](https://drive.google.com/drive/folders/150vCXrseNIn_qCshArFYYRjI4ODhuXoW?usp=sharing)

3. **Instale o Anaconda:**

   Se você ainda não tem o Anaconda instalado, você pode baixá-lo [aqui](https://www.anaconda.com/products/distribution) e seguir as instruções de instalação apropriadas para o seu sistema operacional.

4. **Crie um Ambiente Conda:**

   No terminal ou Anaconda Prompt, navegue até o diretório do projeto e execute:

   ```shell
   conda env create -f environment.yml
   ```

   Isso criará um ambiente conda chamado "hackaton-env" com as dependências necessárias.

5. **Ative o Ambiente Conda:**

   ```shell
   conda activate hackaton-env
   ```
6. **Execute o Jupyter Notebook:**

   ```shell
   jupyter-notebook
   ```

7. **Abra o Arquivo "Hackaton.ipynb":**

   Dentro do Jupyter Notebook, abra o arquivo "Hackaton.ipynb" para visualizar e executar o projeto.
   
   **Observação:** Certifique-se de que o ambiente conda "hackaton-env" está ativado enquanto você executa o Jupyter Notebook.
   
   Isso deve permitir que você execute o projeto em seu ambiente local. Certifique-se de ter todas as dependências instaladas e os modelos treinados disponíveis no diretório apropriado.


## Demostração da Solução


#### 🤓 Youtube Videos

<!-- YT LIST START -->
[<img src="https://raw.githubusercontent.com/jacques-blom/jacques-blom/cfa04ee011f40f5650cf30132dff9978e810ed93/assets/0.png" align="left" width="200" />](https://www.youtube.com/watch?v=Y9e7IOETqfY&ab_channel=LucasSaar)
        **[Apresentação do Projeto](https://www.youtube.com/watch?v=Y9e7IOETqfY&ab_channel=LucasSaar)**
        <br /> *14 Nov 2023*

 <br> <br/>
 
[<img src="https://raw.githubusercontent.com/jacques-blom/jacques-blom/cfa04ee011f40f5650cf30132dff9978e810ed93/assets/0.png" align="left" width="200" />](https://www.youtube.com/watch?v=z2mVkziLjvI&ab_channel=LucasSaar)
        **[Solução Google Colab](https://www.youtube.com/watch?v=z2mVkziLjvI&ab_channel=LucasSaar)**
        <br /> *14 Nov 2023*

 <br> <br/>
 
[<img src="https://raw.githubusercontent.com/jacques-blom/jacques-blom/cfa04ee011f40f5650cf30132dff9978e810ed93/assets/0.png" align="left" width="200" />](https://www.youtube.com/shorts/cMPvLL2T7ws)
        **[Solução Aplicativo Mobile](https://www.youtube.com/shorts/cMPvLL2T7ws)**
        <br /> *14 Nov 2023*

<br> <br/>
 
[<img src="https://raw.githubusercontent.com/jacques-blom/jacques-blom/cfa04ee011f40f5650cf30132dff9978e810ed93/assets/0.png" align="left" width="200" />](https://www.youtube.com/watch?v=lnIQJr3Ktjw&ab_channel=LucasSaar)
        **[Solução Desktop](https://www.youtube.com/watch?v=lnIQJr3Ktjw&ab_channel=LucasSaar)**
        <br /> *14 Nov 2023*

<br> <br/>

## 🤝 Colaboradores
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Daniel227a" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/49257791?v=4" width="100px;" alt="Daniel Pereira"/><br>
        <sub>
          <b>Daniel Pereira</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/lucasnardelli" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/56940804?v=4" width="100px;" alt="Lucas Nardelli"/><br>
        <sub>
          <b>Lucas Nardelli</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/gslmota" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/51803858?v=4" width="100px;" alt="Gabriel Mota"/><br>
        <sub>
          <b>Gabriel Mota</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

