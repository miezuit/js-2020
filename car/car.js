let dacia = {
    make: "Dacia",
    model: 1310,
    color: "verde",
    year: 1978,
    mileage: 525737,
    maxSpeed: 180,
    paint: function(color) {
        this.color = color
    }
}
let ferrari = {
    make: "Ferrari",
    model: "Dino",
    color: "rosu",
    year: 1978,
    mileage: 525737,
    maxSpeed: 180,
    paint: function(color) {
        this.color = color
    }
}
dacia.paint("galben")
console.log(dacia)
console.log(ferrari)


