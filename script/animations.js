export function correctWord(element) {
    element.classList.add("correctWord")
    setTimeout(() => {
        element.classList.remove("correctWord")
    }, 1000)
}

export function meteorFalling() {
    
}