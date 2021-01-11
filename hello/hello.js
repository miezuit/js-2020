var time = 3000
time = time + 1000
var message = "Bine ai venit!"
var isLate = false

if (isLate) {
    alert("Go home")
}

if (isLate) {
    alert("Go home")
} else {
    alert("Continue")
}

setTimeout(welcome, time)

function welcome() {
    alert(message)
    alert("Welcome!")
}
