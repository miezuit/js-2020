let startButton = document.querySelector("input[type='button']")

startButton.addEventListener("click", startGame)

function startGame() {
    // ascunde butonul
    startButton.classList.add("hidden")
}

// genereaza un numar aleatoriu intre 0 si max (inclusiv)
function randomNumber(max) {
    return Math.floor(Math.random() * (max + 1))
}

// genereaza o litera aleatorie mare intre A si Z
function randomLetter() {
    // generam un cod ascii aleatoriu intre 65 si 90
    let randomCode = 65 + randomNumber(25)
    // convertim codul ascii in caracterul asociat lui
    return String.fromCharCode(randomCode)
}