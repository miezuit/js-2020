Vue.component('button', {
    data: function () {
      return {
        count: 0
      }
    },
    template: `<button v-on:click="count++">You clicked me {{ count }} times.</button>`
})

new Vue({
    el: '#app',
    store: store,
    components: {rod, game},
    template: `
        <game></game>
    `,
    methods: {

    }
})