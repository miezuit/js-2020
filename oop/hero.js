class BaseHero {
    name
    health
    mana
    constructor(name, health, mana) {
        this.name = name
        this.health = health
        this.mana = mana
    }
    isAlive() {
        return this.health > 0
    }
    getMana() {
        return this.mana
    }
    setMana(newMana) {
        if (newMana < 0) throw new RangeError('Invalid value for mana')
        this.mana = newMana
    }
    firePrimary() {}
    fireSecondary() {}
    receiveHit() {}
}

class Superman extends BaseHero {
    firePrimary() {
        this.mana-- 
    }
    fireSecondary() {
        this.mana -= 2
    }
    receiveHit() {
        this.health -= 0.5
    }
}

class Batman extends BaseHero {
    firePrimary() {
        this.mana--
    }
    fireSecondary() {
        this.mana -= 1.5
    }
    receiveHit() {
        if (this.mana < 50) {
            this.health -= 1
        } else {
            this.health -= 0.5
        }
    }
}

let ironMan = new BaseHero('Stark', 100, 200)
ironMan.receiveHit()
ironMan.firePrimary()

let clark = new Superman()
let bruce = new Batman()

clark.firePrimary()
bruce.receiveHit()
clark.firePrimary()
bruce.receiveHit()
bruce.fireSecondary()
clark.receiveHit()
clark.receiveHit()
// ...