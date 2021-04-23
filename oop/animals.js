class Animal {
    makeSound() {}
}

class Dog extends Animal {
    makeSound() {
        console.log("Ham")
    }
}

class Cat extends Animal {
    makeSound() {
        console.log("Meow")
    }
}

class Fish extends Animal {
    makeSound() {
        // nu scoate niciun sunet
    }
}

class Child {
    playWith(animal) {
        animal.makeSound()
    }
}

let animals = [
    new Dog(),
    new Cat(),
    new Fish()
]
let heidi = new Child()

animals.forEach(animal => heidi.playWith(animal))

// alternativ cu for of:
for (const animal of animals) {
    heidi.playWith(animal)
}