import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        name: null,
        email: null,
        token: null
    },
    mutations: {
        saveLoginData: (state, token) => {
            state.token = token
            localStorage.setItem('name', state.name)
            localStorage.setItem('token', state.token)
        },
        clearLoginData: (state) => {
            state.name = null
            state.token = null
            state.email = null
            localStorage.removeItem('name')
            localStorage.removeItem('token')
        },
        initializeStore: (state) => {
            if (localStorage.getItem('name')) {
                state.name = localStorage.getItem('name')
            }
            if (localStorage.getItem('token')) {
                state.token = localStorage.getItem('token')
            }
        }
    },
})