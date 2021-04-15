class SuperString extends String {
    getReverse() {
        return this.split('').reverse().join('')
    }
}

let str = new SuperString("Hello JS")

console.log(str.getReverse().toUpperCase())
console.log(str.toUpperCase())