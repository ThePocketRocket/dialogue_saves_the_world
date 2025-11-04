import { correctWord } from "./animations.js";
import { determinesLevel, randomizesSecretWord, randomizesResponseLetters, randomWord } from "./game.js";

let gameScore;
let gameLevel;
let playerHearts;
let word;
let hint;
let secretWord;
const h3Points = document.querySelector("#points");
const h3PlayerName = document.querySelector("#player h3");
const divLetters = document.querySelector("#letters");
const divWord = document.querySelector("#word");
const divRecords = document.querySelector("#records h3");
const divHint = document.querySelector("#hint")
const spanHearts = document.querySelector("#player span");
const startModal = document.querySelector("#startModal");
const startButton = document.querySelector("#startButton");
const endModal = document.querySelector("#endModal");
const endButton = document.querySelector("#endButton");

drawModal(startModal)

// Inicia o jogo e fecha o modal
startButton.addEventListener("click", () => {
    // Inicia o jogo
    const inputUser = document.querySelector("#startModal input");
    if (inputUser.value != "") {
        sessionStorage.setItem("playerName", inputUser.value);
        closeModal(startModal);
        resetGameStatus();
        startGame();
        
    }
});

// Pass the function reference so it's called only when the button is clicked
endButton.addEventListener("click", restartGame);

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
            drawHearts();
            if (playerHearts == 0) {
                endGame();
            }
        }
    }

    // Verifica se a palavra foi descoberta
    if (word == secretWord.join("")) {
        gameScore += 10;
        drawScore();
        correctWord(divWord.firstChild);
        
        setTimeout(() => {
            gameLevel = determinesLevel(gameScore);
            let hintAndWord = randomWord(gameLevel);
            hint = hintAndWord[0]
            word = hintAndWord[1]
            secretWord = randomizesSecretWord(word);
            drawSecretWord();
            drawLetters();
            drawHint();
        }, 1000);
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
        letterButton.classList.add("letter");
        letterButton.innerHTML = letter;
        divLetters.appendChild(letterButton);
    }
}

function drawHearts() {
    spanHearts.innerHTML = "";

    for (let i = 0; i < playerHearts; i++) {
        const imgHeart = document.createElement("img");
        imgHeart.src = "assets/heart.png";
        imgHeart.classList.add("hearts");
        spanHearts.appendChild(imgHeart);
    }
}

function drawHint() {
    divHint.innerHTML = hint
}

function drawModal(modal) {
    modal.showModal();
    modal.style.display = "flex";
}

function closeModal(modal) {
    modal.close();
    modal.style.display = "none";
}

function setRecord() {
    if (localStorage.getItem("gameRecord") == null) {
        localStorage.setItem(
            "gameRecord", 
            `${sessionStorage.getItem("playerName")}: ${gameScore}`
        );
    } else {
        
        localStorage.setItem(
            "gameRecord", 
            `${localStorage.getItem("gameRecord")}\n${sessionStorage.getItem("playerName")}: ${gameScore}`
        );
    }

}

function startGame() {
    resetGameStatus();

    // Desenha vidas
    drawHearts();

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

    drawHint();
}

function endGame() {
    setRecord();
    drawRecords();
    drawModal(endModal);
}

function restartGame() {
    resetGameStatus();
    closeModal(endModal);
    startGame();
}

function resetGameStatus() {
    gameScore = 0;
    playerHearts = 3;
    gameLevel = determinesLevel(gameScore);
    let hintAndWord = randomWord(gameLevel);
    hint = hintAndWord[0]
    word = hintAndWord[1]
    secretWord = randomizesSecretWord(word);
}

function updateSecretWord(letter) {
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] == "_" && word[i] == letter) {
            secretWord[i] = letter;
            break;
        }
    }
}