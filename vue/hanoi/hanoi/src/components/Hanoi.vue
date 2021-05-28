<template>
  <div class="game">
      <div 
        v-for="tower in game.towers"
        :key="tower.id"
        class="tower"
        @dragover.prevent
        @drop="drop(tower.id, $event)"
        :style="{
            height: game.numberOfDisks + 'em'
        }"
      >
        <div
            v-for="disk in tower.disks"
            :key="disk.size"
            class="disk"
            draggable="true"
            @dragstart="drag(tower.id, $event)"
            :style="{
                backgroundColor: disk.color.getCssColor(),
                width: 1 + disk.size * (1 - (game.numberOfDisks - 1) * 0.02) + 'em'
            }"
        ></div>
      </div>
  </div>
</template>

<script>

import {Game, Move} from '../classes/classes.js'
export default {
    data() {
        return {
            game: new Game(20)
        }
    },
    methods: {
        drag(towerId, event) {
            event.dataTransfer.setData('from', towerId)
        },
        drop(towerId, event) {
            let fromTowerId = event.dataTransfer.getData('from')
            let move = new Move(fromTowerId, towerId)
            this.game.make(move)
        }
    },
}
</script>

<style>
.game {
    height: 80vh;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    position: relative;
}
.tower {
    width: 30%;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    height: 50%;
    position: relative;
}
.tower::before {
    content: '';
    background-color: rgb(146, 52, 28);
    height: 110%;
    width: 0.5em;
    position: absolute;
    z-index: -1;
    border-radius: 0.2em;
}
.disk {
    height: 1em;
    border-radius: 0.3em;
}
</style>