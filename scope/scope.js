// a este variabila globala
var a = 10;

// dubleaza un numar dat ca parametru
function multiply2(a) {
    // a este variabila locala
    a = a * 2
    console.log(a)
}

function multiply3(b) {
    // a este variabila globala
    a = a * 3
    console.log(a)
}

function multiply4(x) {
    // a este locala
    // (let creaza o variabila locala)
    var a = 50
    a = a * 4
    console.log(a)
}

function defineVars() {
    // defineste doua variabile locale
    var c = 123
    let d = 321
}

// o bucla care se executa o singura data
do {
    // e este o variabila locala
    // pentru ca este definita in bucla
    let e = 10
    // f este o variabila globala
    // cand este definita cu var in bucla
    var f = 33
} while(false)

console.log(f)

// o sa ne dea eroare:
// console.log(e)

if (true) {
    // g este locala
    let g = 77
    // h este globala
    var h = 99
}
// console.log(g)
console.log(h)

// aplica functia pentru valoarea 1
multiply2(1)
multiply3(1)
multiply4(1)
// apeleaza functia defineVars
defineVars()

// cele doua varible nu sunt vizibile aici
// si daca rulam codul o sa ne dea o eroare:
// console.log(c)
// console.log(d)

console.log(a)