import green from '../images/green.png';
import salad from '../images/salad.png';
import jennyJack from '../images/jenny-jack.png';
import grow from '../images/grow.png';
import potager from '../images/potager.png';

const gerarNumeroAleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const modelos = {
    titulo: "Modelos",
    lista: [
        {
            nome: "Doenças foliares no milho",
            imagem: green,
            descricao: 'Este é um modelo de classificação de imagem',
            estrelas: gerarNumeroAleatorio(1, 5),
            downloaded: false,
            url: 'https://github.com/lucasnardelli/testeDownload/raw/main/final.ptl',
        },
        {
            nome: "Salad",
            imagem: salad,
            descricao: 'Este é um modelo de classificação de imagem',
            estrelas: gerarNumeroAleatorio(1, 5),
            downloaded: false,
            url: 'https://github.com/lucasnardelli/testeDownload/raw/main/final.ptl',
        },
        {
            nome: "Jenny Jack Farm",
            imagem: jennyJack,
            descricao: 'Este é um modelo de classificação de imagem',
            estrelas: gerarNumeroAleatorio(1, 5),
            downloaded: true,
            url: 'https://github.com/lucasnardelli/testeDownload/raw/main/final.ptl',
        },
        {
            nome: "Grow",
            imagem: grow,
            descricao: 'Este é um modelo de classificação de imagem',
            estrelas: gerarNumeroAleatorio(1, 5),
            downloaded: false,
            url: 'https://github.com/lucasnardelli/testeDownload/raw/main/final.ptl',
        },
        {
            nome: "Potager",
            imagem: potager,
            descricao: 'Este é um modelo de classificação de imagem',
            estrelas: gerarNumeroAleatorio(1, 5),
            downloaded: false,
            url: 'https://github.com/lucasnardelli/testeDownload/raw/main/final.ptl',
        }
    ]
}

export default modelos;