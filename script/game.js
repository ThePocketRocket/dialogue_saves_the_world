const words = {
  1: [
    ["🏠", "CASA"],  ["⚽", "BOLA"],   ["🐱", "GATO"], ["🦆", "PATO"], ["🔥", "FOGO"],  ["🗝️", "CHAVE"],
    ["🌞", "SOL"],   ["🌸", "FLOR"],   ["🤚", "MÃO"],  ["🦶", "PÉ"],   ["☁️", "NUVEM"], ["🍬", "DOCE"],
    ["🌙", "LUA"],   ["🐭", "RATO"],   ["🦁", "LEÃO"], ["🍇", "UVA"],  ["🐮", "VACA"],  ["🚂", "TREM"],
    ["⛵", "BARCO"], ["🥄", "COLHER"], ["🥝", "KIWI"], ["🍎", "MAÇÃ"], ["🥥", "COCO"]
  ],
  2: [
    ["🪟", "JANELA"],   ["🟨", "AMARELO"],  ["🐎", "CAVALO"],   ["👕", "CAMISETA"], ["🦒", "GIRAFA"],
    ["🪜", "ESCADA"],   ["🐒", "MACACO"],   ["🐝", "ABELHA"],   ["🐶", "CACHORRO"], ["🍓", "MORANGO"],
    ["📒", "CADERNO"],  ["🐯", "TIGRE"],    ["🐔", "GALINHA"],  ["🐜", "FORMIGA"],  ["🥔", "BATATA"],
    ["🍦", "SORVETE"],  ["💺", "ASSENTO",]  ["🍌", "BANANA"],   ["🍉", "MELANCIA"]
  ],
  3: [
    ["💻", "COMPUTADOR"], ["🚁", "HELICÓPTERO"], ["🧭", "BÚSSOLA"],   ["🦖", "DINOSSAURO"], ["🍔", "HAMBÚRGER"],
    ["✨", "ESTRELAS"],   ["🔬", "MICROSCÓPIO"], ["🐊", "CROCODILO"], ["🧠", "CÉREBRO"], ["🥞", "PANQUECA"],
    ["😄", "FELICIDADE"], ["🧱", "TIJOLOS"],     ["⛰️", "NATUREZA"],  ["🌍", "PLANETA"], ["🍊", "LARANJA"]
  ]
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