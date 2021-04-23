class GenericGasStation {
    // clasa GenricGasStation este numita clasa abstracta
    // metoda fillTank este numita metoda abstracta
    // reprezinta un contract pe care il vor respecta toate clasele ce o extind
    // de aceea se numteste polimorfica
    fillTank(car) {}
}

class ShellGasStation extends GenericGasStation {
    fillTank(car) {
        car.tank = car.maxTank
    }
}

class FakeGasStation extends GenericGasStation {
    fillTank(car) {
        car.tank = car.maxTank - 10
    }
}

class Car {
    tank = 0
    maxTank
    constructor(maxTank) {
        this.maxTank = maxTank
    }
    fillTankTo(station) {
        station.fillTank(this)
    }
}

let station1 = new ShellGasStation()
let station2 = new FakeGasStation()
let ferarri = new Car(100)
ferarri.fillTankTo(station1)