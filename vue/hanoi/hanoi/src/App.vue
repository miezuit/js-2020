<template>
  <hanoi></hanoi>
</template>

<script>
import Hanoi from './components/Hanoi.vue'

export default {
  name: 'App',
  components: {
    Hanoi
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
