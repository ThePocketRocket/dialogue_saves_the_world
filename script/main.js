import { determinesLevel, randomizesSecretWord, randomizesResponseLetters, randomWord } from "./game.js";

let gameScore = 0;
let gameLevel = 0;
let playerHearts = 5
let word = "";
let secretWord = "";
const divLetters = document.querySelector("#letters");
const h3Points = document.querySelector("#points")
const divWord = document.querySelector("#word");
const divRecords = document.querySelector("#records h3");
const h3PlayerName = document.querySelector("#player h3");
const startModal = document.querySelector("#startModal");
const startButton = document.querySelector("#startButton");

gameLevel = determinesLevel(gameScore);
word = randomWord(gameLevel);
secretWord = randomizesSecretWord(word);

// Inicia o jogo e fecha o modal
startButton.addEventListener("click", () => {
    startGame();

    // Desenha recordes
    drawRecords();

    // Desenha nome
    drawPlayerName();
    
    // Desenha pontuação
    drawScore();
    
    // Desenha a palavra com caracteres ocultos
    drawSecretWord(secretWord);
    
    // Desenha as possibilidades de letras
    drawLetters();
});





// Desenha corações
const spanHearts = document.querySelector("#player span");
for (let i = 0; i < playerHearts; i++) {
    const imgHeart = document.createElement("img");
    imgHeart.src = "assets/heart.png"
    imgHeart.classList.add("hearts")
    spanHearts.appendChild(imgHeart);
}

// Identifica click e acumula pontuação ou tira vida
divLetters.addEventListener("click", (e) => {
    const eventLetter = e.target.innerText;
    // Se palavra contiver a letra clicada, secretWord é atualizada. Se não, vida é retirada.
    if (e.target.tagName == "BUTTON") {
        // Após o click, o elemento para de ser clicável
        e.target.disabled = true;
        e.target.style.pointerEvents = "none";
        e.target.style.backgroundColor = "rgb(25, 25, 25)";

        if (word.includes(eventLetter)) { // ADICIONAR: confirmação para saber se a letra já foi clicada
            updateSecretWord(eventLetter);
            drawSecretWord(secretWord);
        } else {
            playerHearts--;
            spanHearts.removeChild(spanHearts.lastChild);
            if (playerHearts == 0) {
                endGame();
            }
        }
    }

    // Verifica se a palavra foi descoberta
    if (word == secretWord.join("")) {
        gameScore += 10;
        drawScore();
        setTimeout(() => {
            gameLevel = determinesLevel(gameScore);
            word = randomWord(gameLevel);
            secretWord = randomizesSecretWord(word);
            drawSecretWord();
            drawLetters()
        }, 1000)
    }
})


function drawScore() {
    h3Points.innerText = gameScore;
}

function drawRecords() {
    if (localStorage.getItem("gameRecord") != null) {
        const records = localStorage.getItem("gameRecord");
        divRecords.innerText = records;
    } else {
        divRecords.innerText = "Sem recordes";
    }
}

function drawPlayerName() {
    const playerName = sessionStorage.getItem("playerName");
    h3PlayerName.innerText = playerName;
}

function drawSecretWord() {
    const pWord = document.createElement("p");
    divWord.innerHTML = "";
    for (let letter of secretWord) pWord.innerText += `${letter} `; // Formata a exibição da palavra
    divWord.appendChild(pWord);
    divWord.style.display = "flex";
}

function drawLetters() {
    const randomizedLetters = randomizesResponseLetters(word, secretWord);
    divLetters.innerHTML = "";
    for (let letter of randomizedLetters) {
        const letterButton = document.createElement("button");
        letterButton.classList.add("letter")
        letterButton.innerHTML = letter;
        divLetters.appendChild(letterButton);
    }
}

function updateSecretWord(letter) {
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] == "_" && word[i] == letter) {
            secretWord[i] = letter;
            break;
        }
    }
}

function setRecord() {
    if (localStorage.getItem("gameRecord") == null) {
        localStorage.setItem("gameRecord", gameScore);
    } else {
        localStorage.setItem(
            "gameRecord", 
            `${localStorage.getItem("gameRecord")}\n${gameScore}`
        );
    }

}

function startGame() {
    const inputUser = document.querySelector("#startModal input");
    if (inputUser.value != "") {
        sessionStorage.setItem("playerName", inputUser.value)
        startModal.close(); // Não está funcionando
        startModal.style.display = "none";
    } else {
        startGame();
    }
}

function endGame() {
    setRecord();
    drawRecords();
}