class BaseHero {
    health
    mana
    constructor(health, mana) {
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
        if (newMana < 0) throw 'Invalid value for mana' 
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