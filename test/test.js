class Horse {
    name;

    constructor(name) {
        this.name = name
    }

    sayHi() {
        console.log('Hi')
    }

    sayMyName() {
        console.log(this.name)
    }
}

let lessie = new Horse()
lessie.sayHi()
lessie.sayMyName()