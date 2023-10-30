# PROTÓTIPO DE SOLUÇÃO PARA CORREÇÃO AUTOMÁTICA DE PROVAS E SIMULADOS
Este projeto foi desenvolvido para o hackaton, produzido pela pixforce e meninas++, com o intuito de implementar um modelo capaz de ler gabaritos de provas e realizar a correção automática dos mesmos, auxiliando e agilizando este processo.

## Lógica de funcionamento do projeto
Inicialmente é implementado o algoritmo de detecção de objetos YOLOv8, com o intuito de receber uma imagem de gabarito e extrair o local de respoastas da folha. Em seguida partimos para identificar as bordas da saída do YOLOv8, tendo como objetivo organizar e identificar as repostas marcadas e por fim gerar um relátorio do desempenho do aluno na rpova em questão.

## Funcionalidades implementadas
- **Leitura das folhas de resposta**
- **Comparação e pontuação**

## Modo de uso
Adicione as imagens das provas na pasta nomeada como input, execute o notebook nomeado *main.ipynb* e o relatório estará disponivel no diretório output
