import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk

from ultralytics import YOLO
from PIL import Image
import cv2
import torch
import numpy as np


class ImageClassifierApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Image Classifier App")

        # Model paths
        self.modelClassificationPG = 'Modelos\\ProvaOuSimulado\\templteOrTest.pt'
        self.modelClassificationG = 'Modelos\\Modelo Simulados\\testClassifier.pt'
        self.modelProvas = 'Modelos\\Provas\\model-m.pt'
        self.modelGabarito1 = 'Modelos\\Simulado1\\simulado1-n.pt'
        self.modelGabarito2 = 'Modelos\\Simulado2\\simulado2-n.pt'
        self.modelGabarito3 = 'Modelos\\Simulado3\\simulado4-n.pt'
        self.modelGabarito4 = 'Modelos\\Simulado4\\simulado4-n.pt'

        self.createWidgets()

    def createWidgets(self):
        # Botão para carregar uma imagem
        self.loadButton = tk.Button(self.root, text="Carregar Imagem", font=('Helvetica', 12), fg='white', bg='#4CAF50', padx=10, pady=5, command=self.loadImage)
        self.loadButton.pack(pady=10)

        # Rótulo para exibir a imagem carregada
        self.imageLabel = tk.Label(self.root, font=('Helvetica', 14), pady=10)
        self.imageLabel.pack()

        # Botão para classificar a imagem
        self.classifyButton = tk.Button(self.root, text="Classificar", font=('Helvetica', 12), fg='white', bg='#4CAF50', padx=10, pady=5, command=self.classifyImage)
        self.classifyButton.pack(pady=10)

        # Rótulo para exibir o resultado da classificação
        self.resultLabel = tk.Label(self.root, text="", font=('Helvetica', 16, 'bold'), fg='#4CAF50')
        self.resultLabel.pack()

    def loadImage(self):
        filePath = filedialog.askopenfilename()
        if filePath:
            image = Image.open(filePath)
            image.thumbnail((300, 300))  # Redimensiona a imagem para exibição
            photo = ImageTk.PhotoImage(image)

            self.imageLabel.config(image=photo)
            self.imageLabel.image = photo

            self.resultLabel.config(text="")  # Limpa o rótulo de resultado ao carregar uma nova imagem

            self.loadedImagePath = filePath

    def classifyImage(self):
        if hasattr(self, 'loadedImagePath'):
            # Use the YOLO model for classification
            modelPG = YOLO(self.modelClassificationPG)
            imageTest = self.loadedImagePath

            # Classify in prova or gabarito
            imagem = Image.open(imageTest)
            results = modelPG.predict(source=imagem, augment=False)

            # Pegar o resultado
            maxValue, maxIndex = torch.max(results[0].probs, dim=0)
            print("Maior valor:", maxValue.item())
            print("Maior index:", maxIndex.item())
            className = modelPG.names[maxIndex.item()]

            answer = None  # Variable to store the answer

            if className == 'provas':
                print("É uma PROVA")
                # Aplicar modelo de provas na imagem
                modelProvas = YOLO(self.modelProvas)
                results = modelProvas.predict(source=imagem, save=True, save_crop=True)
                classNames = modelProvas.names
                question = results[0][0].boxes.cls.item()
                answer = classNames[question]
                print(f'A resposta marcada pelo aluno foi: {answer}.')
            else:
                print("É um GABARITO")
                modelG = YOLO(self.modelClassificationG)
                results = modelG.predict(source=imagem, save=True, save_crop=True, augment=False)

                # Pegar o resultado
                maxValue, maxIndex = torch.max(results[0].probs, dim=0)
                print("Maior valor:", maxValue.item())
                print("Maior index:", maxIndex.item())
                className = modelG.names[maxIndex.item()]

                if className == 'simulado1':
                    modelGabarito = YOLO(self.modelGabarito1)
                    results = modelGabarito.predict(source=imagem, save=True, save_crop=True, augment=False)
                    answer = 'simulado1'
                    print(answer)
                elif className == 'simulado2':
                    modelGabarito = YOLO(self.modelGabarito2)
                    results = modelGabarito.predict(source=imagem, save=True, save_crop=True, augment=False)
                    answer = 'simulado2'
                    print(answer)
                elif className == 'simulado3':
                    modelGabarito = YOLO(self.modelGabarito3)
                    results = modelGabarito.predict(source=imagem, save=True, save_crop=True, augment=False)
                    answer = 'simulado3'
                    print(answer)
                elif className == 'simulado4':
                    modelGabarito = YOLO(self.modelGabarito4)
                    results = modelGabarito.predict(source=imagem, save=True, save_crop=True, augment=False)
                    answer = 'simulado4'
                    print(answer)

            # Update the result label in the GUI
            if answer is not None:
                self.resultLabel.config(text=f"Resultado: {answer}")
            else:
                self.resultLabel.config(text="Classificação concluída. Consulte o console para detalhes.")
        else:
            self.resultLabel.config(text="Carregue uma imagem antes de classificar.")

if __name__ == "__main__":
    root = tk.Tk()
    app = ImageClassifierApp(root)
    root.mainloop()
