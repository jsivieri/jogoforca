// Palavras por tema
const WORDS = {
    animais: [
        "CACHORRO", "GATO", "PASSARO", "ELEFANTE", "LEAO", "TIGRE", "GIRAFA", "ZEBRA", "MACACO", "COELHO",
        "VACA", "CAVALO", "OVELHA", "PORCO", "GALINHA", "PATO", "PERU", "RATO", "HAMSTER", "PEIXE"
    ],
    casa: [
        "MESA", "CADEIRA", "SOFA", "CAMA", "ARMARIO", "ESTANTE", "TELEVISAO", "GELADEIRA", "FOGAO", "MICROONDAS",
        "LAMPADA", "ABAJUR", "VASO", "QUADRO", "ESPELHO", "TAPETE", "CORTINA", "TRAVESSEIRO", "COBERTOR", "TOALHA"
    ],
    escola: [
        "PROFESSOR", "ALUNO", "LIVRO", "CADERNO", "LAPIS", "CANETA", "BORRACHA", "APONTADOR", "MOCHILA", "ESTOJO",
        "QUADRO", "GIZ", "MAPA", "GLOBO", "MESA", "CARTEIRA", "CADEIRA", "DIRETOR", "SECRETARIA", "BIBLIOTECA"
    ],
    frutas: [
        "MACA", "BANANA", "LARANJA", "UVA", "MORANGO", "MELANCIA", "ABACAXI", "MANGA", "PERA", "PESSEGO",
        "LIMAO", "ABACATE", "KIWI", "CEREJA", "AMORA", "FRAMBOESA", "MIRTILO", "GOIABA", "MAMAO", "FIGO"
    ],
    profissoes: [
        "MEDICO", "PROFESSOR", "ENGENHEIRO", "ADVOGADO", "ARQUITETO", "ENFERMEIRO", "POLICIAL", "BOMBEIRO", "JORNALISTA", "ATOR",
        "CANTOR", "ESCRITOR", "PINTOR", "MUSICO", "COZINHEIRO", "GARCOM", "VENDEDOR", "MOTORISTA", "PILOTO", "ASTRONAUTA"
    ]
};

// Elementos do DOM
const themeButtons = document.querySelectorAll('.theme-buttons button');
const wordDisplay = document.getElementById('word-display');
const keyboard = document.getElementById('keyboard');
const hangmanImage = document.getElementById('hangman-image');
const messageElement = document.getElementById('message');
const body = document.querySelector('body');

// Variáveis do jogo
let selectedTheme = '';
let selectedWord = '';
let correctLetters = [];
let wrongLetters = [];
let gameOver = false;

// Inicializa o jogo
function initGame() {
    // Cria o teclado
    createKeyboard();
    
    // Adiciona eventos aos botões de tema
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log("Botão clicado:", this.id);
            selectTheme(this.id);
        });
    });
    
    console.log('Jogo inicializado!');
}

// Cria o teclado
function createKeyboard() {
    keyboard.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.className = 'key';
        button.id = `key-${letter}`;
        button.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(button);
    }
}

// Seleciona o tema
function selectTheme(theme) {
    selectedTheme = theme;
    selectedWord = WORDS[theme][Math.floor(Math.random() * WORDS[theme].length)];
    correctLetters = [];
    wrongLetters = [];
    gameOver = false;
    
    console.log('Tema selecionado:', theme);
    console.log('Palavra selecionada:', selectedWord);
    
    // Atualiza o background
    body.style.backgroundImage = `url('../images/${theme}.png')`;
    
    // Atualiza a exibição da palavra
    updateWordDisplay();
    
    // Mostra a forca inicial
    hangmanImage.style.backgroundImage = "url('../images/forca1.png')";
    messageElement.textContent = '';
    messageElement.className = 'message';
    
    // Ativa todas as teclas
    document.querySelectorAll('.key').forEach(key => {
        key.disabled = false;
    });
}

// Atualiza a exibição da palavra
function updateWordDisplay() {
    wordDisplay.innerHTML = '';
    
    selectedWord.split('').forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.textContent = correctLetters.includes(letter) ? letter : '_';
        letterElement.className = 'letter';
        wordDisplay.appendChild(letterElement);
    });
    
    // Verifica se o jogador ganhou
    if (!wordDisplay.textContent.includes('_')) {
        gameOver = true;
        messageElement.textContent = 'Parabéns! Você ganhou!';
        messageElement.classList.add('win-message');
    }
}

// Processa o palpite do jogador
function handleGuess(letter) {
    if (gameOver) return;
    
    // Desabilita a tecla
    const keyElement = document.getElementById(`key-${letter}`);
    if (keyElement) keyElement.disabled = true;
    
    if (selectedWord.includes(letter)) {
        // Letra correta
        if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            updateWordDisplay();
        }
    } else {
        // Letra incorreta
        if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            updateHangmanImage();
        }
    }
}

// Atualiza a imagem da forca
function updateHangmanImage() {
    const errors = wrongLetters.length;
    
    if (errors <= 6) {
        hangmanImage.style.backgroundImage = `url('../images/forca${errors + 1}.png')`;
    }
    
    if (errors === 6) {
        gameOver = true;
        messageElement.textContent = 'Você perdeu!';
        messageElement.classList.add('lose-message');
        wordDisplay.textContent = selectedWord;
    }
}

// Inicia o jogo quando a página carrega
document.addEventListener('DOMContentLoaded', initGame);