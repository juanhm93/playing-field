 
<script setup lang="ts">

    import { defineProps } from 'vue';
    import { Player } from '../../types/Player.types';
    defineProps<{
        play: Player
        selectedPlayer: Function
    }>()
    

</script>

 <template>
     <div
        :ref="play.ref"
        class="player"
        :class="{ active: play.moved }"
        :style="`transform: translate(${play.position.x}px, ${play.position.y}px)`"
        @click="selectedPlayer(play)"
      >
        <span>{{ play.number }}</span>
        <p>{{ play.name }}</p>
      </div>
 </template>

 <style scoped>
.player {
  width: 28px;
  height: 28px;
  /* background-color: aqua; */
  background-color: white;
  border: 4px solid darkcyan;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: move;
  /* padding-top: 5px; */
}
.player span {
  font-weight: bold;
}
.player p {
  min-width: 94px;
  margin-left: -30px;
  margin-top: 5px;
  color: white;
}
.player.active {
  /* background-color: brown; */
  opacity: .5;
  border: 4px solid red;
}

</style>