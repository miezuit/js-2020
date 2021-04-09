let app = new Vue({
    el: '#app',
    data: {
        counter: 0
    },
    methods: {
        increment() {
            this.counter++
        }
    },
    computed: {
        time() {
            let time = new Date()
            return time.toTimeString()
        },
        message() {
            let hour = new Date().getHours()
            if (hour < 12 && hour > 1) {
                return "Buna dimineata!"
            } else if (hour >= 12 && hour < 18) {
                return "Buna ziua!"
            } else if (hour >= 18 && hour <= 23) {
                return "Buna seara!"
            } else {
                return "Somn usor!"
            }
        }
    }
})




// Vanilla JS:

// let time = new Date().toTimeString()
// document.querySelector("#now").innerText = time

// let message = "Test"
// document.querySelector("p::firstChild()").innerText = message

// let counter = 0
// document.querySelector('.clicks').addEventListener('click', function() {
//     counter++
//     document.querySelector('.clicks').value = counter
// })
