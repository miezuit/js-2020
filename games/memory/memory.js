class Card {
    image
    hasFaceUp = false

    constructor(image) {
        this.image = image
    }
    turnFaceUp() {
        this.hasFaceUp = true
    }
    turnFaceDown() {
        this.hasFaceUp = false
    }
}

class Game {
    cards = []

    constructor(cards) {
        this.cards = cards
    }

    shuffle() {
        this.cards.sort(
            () => Math.random() - 0.5
        )
    }

    isOver() {
        return this.cards.every(
            (card) => card.hasFaceUp
        )
    }
}

class Dealer {
    game
    activeCards = []

    constructor(game) {
        this.game = game
        game.shuffle()

    }

    turnCard(card) {
        // daca sunt deja doua active
        // sau jocul s-a terminat
        // sau cartea este deja pe fata
        // nu mai intoarce nimic
        if(this.activeCards.length == 2 
            || this.game.isOver()
            || card.hasFaceUp
        ) {
            return
        }
        card.turnFaceUp()
        // tin minte cartea pe care am deschis-o
        this.activeCards.push(card)
        // daca sunt doua carti active
        if (this.activeCards.length == 2) {
            // daca au aceeasi imagine
            if (this.activeCards[0].image == this.activeCards[1].image) {
                this.activeCards = []
                return
            }
            // daca nu au aceeasi imagine, le ascund dupa 1s
            setTimeout(this.hideCards, 1000)
        }
    }

    // definim ca arrow function
    // ca sa putem folosi functia direct in setTimeout
    // (functiile arrow sunt bind-uite la this)
    hideCards = () => {
        this.activeCards.forEach(
            (card) => card.turnFaceDown()
        )
        this.activeCards = []
    }
}

new Vue({
    el: '#app',
    data() {
        return {
            dealer: new Dealer(
                new Game(
                    [
                        new Card('bear.png'),
                        new Card('corgi.png'),
                        new Card('crab.png'),
                        new Card('fish.png'),
                        new Card('panda.png'),
                        new Card('parrot.png'),
                        new Card('pig.png'),
                        new Card('rabbit.png'),
                        new Card('rhinoceros.png'),
                        new Card('shark.png'),
                        new Card('snail.png'),
                        new Card('turtle.png'),
                        new Card('bear.png'),
                        new Card('corgi.png'),
                        new Card('crab.png'),
                        new Card('fish.png'),
                        new Card('panda.png'),
                        new Card('parrot.png'),
                        new Card('pig.png'),
                        new Card('rabbit.png'),
                        new Card('rhinoceros.png'),
                        new Card('shark.png'),
                        new Card('snail.png'),
                        new Card('turtle.png'),
                    ]
                )
            )
        }
    },
    template: `
    <div class='game'>
        <div 
            v-for="card in dealer.game.cards"
            :class="{card, faceUp: card.hasFaceUp}"
            @click="click(card)"
        >
        <img :src="'img/icons8-' + card.image">
        </div>
    </div>
    `,
    methods: {
        click(card) {
            this.dealer.turnCard(card)
        }
    },
})
