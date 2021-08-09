<template>
    <header>
        <ul>
            <li><router-link to="/posts/view">View posts</router-link></li>
            <li><router-link to="/posts/add">Add new post</router-link></li>
            <li><a @click="logout" href="#">Logout {{userName}}</a></li>
        </ul>
    </header>
</template>

<script>

import store from '../store/store.js'

export default {
    methods: {
        logout() {
            store.commit('clearLoginData')
            this.$router.push('/login')
        }
    },
    computed: {
        userName() {
            return store.state.name
        }
        
    }
}
</script>

<style scoped>
ul {
    width: 100vw;
    display: flex;
    justify-content: center;
    list-style-type: none;
    margin-bottom: 3em;
}
li {
    cursor: pointer;
    margin: 1em 2em;
}
.router-link-active {
    font-weight: bold;
}
</style>