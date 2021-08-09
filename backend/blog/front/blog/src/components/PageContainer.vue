<template>
    <div class="main">
        <MainMenu></MainMenu>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>

import store from '../store/store'
import MainMenu from './MainMenu'

export default {
    components: {
        MainMenu
    },
    mounted() {
        if (!store.state.token) {
            this.$router.push('/login')
        }
    },
}
</script>

<style scoped>
div.content {
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
 }
</style>