const words = {
  1: ["CASA", "BOLA", "GATO", "PATO", "FOGO", "SOL", "FLOR", "MÃO", "PÉ", "NUVEM", "LUA", "RATO", "MESA", "LEÃO", "UVA", "VACA", "TREM"],
  2: ["JANELA", "AMARELO", "CARROÇA", "CAMISETA", "GIRAFA", "ESCADA", "MACACO", "PINTURA", "ABELHA", "CACHORRO", "MORANGO", "CHAVEIRO", "CADERNO", "TIGRE", "GALINHA", "DOCEIRA", "FORMIGA", "BATATA", "SORVETE", "COZINHA"],
  3: ["COMPUTADOR", "HELICÓPTERO", "BIBLIOTECA", "BRINCADEIRA", "FOTOGRAFIA", "AVENTURA", "DINOSSAURO", "MARAVILHOSO", "DESCOBERTA", "RESPONSÁVEL", "CROCODILO", "ALIMENTAÇÃO", "CONHECIMENTO", "FELICIDADE", "PARALELEPÍPEDO", "EXTRAORDINÁRIO", "NATUREZA", "COMUNICATIVO", "TRANSPORTE", "PLANETA"]
};

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export function randomWord(level) {
    const randomIndex = Math.floor(Math.random() * words[level].length)
    const word = words[level][randomIndex];
    return word
}

export function randomizesSecretWord(word) {
    const wordLength = word.length;
    const numberOfRandomizedCharacters = Math.floor(wordLength / 2);
    let newWord = [];

    for(let i = 0; i < wordLength; i++) newWord[i] = word[i]

    for(let i = 0; i < numberOfRandomizedCharacters; i++) newWord[Math.floor(Math.random() * wordLength)] = "_";

    return newWord;
}

export function randomizesResponseLetters(word, secretWord) {
    const randomizedLetters = [];

    for(let i = 0; i < word.length; i++) {
        if(secretWord[i] == "_") {
            randomizedLetters.push(word[i])
        }
        else {
            let letter;
            do {
                letter = alphabet[Math.floor(Math.random() * alphabet.length)];
            } while(randomizedLetters.includes(letter) && !word.includes(letter))
            randomizedLetters.push(letter);
        }
    }
    randomizedLetters.sort();
    return randomizedLetters;
}

export function determinesLevel(points) {
    let level = 0
    if (points >= 200) level = 3
    else if (points >= 100) level = 2
    else level = 1
    
    return level
}