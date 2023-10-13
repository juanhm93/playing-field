<script setup lang="ts">
// onMounted reactive
import { ref, onMounted } from "vue";
import { REAL_MADRID } from "../helpers/constains";

type Player = {
  ref: string;
  name: string;
  number: number;
  position: { x: number; y: number };
  moved: boolean;
};
const enable = ref<Boolean>(false);
const futbol = ref<HTMLElement | null>(null);
const name = ref<string>("");
// const player = reactive({
//   ref: "juan-manuel",
//   name: "Juan manuel",
//   position: { x: 0, y: 0 },
//   moved: false,
// });
// const player = ref<Player | undefined>(undefined);
const team = ref<Player[]>([
  {
    ref: "juan-manuel",
    name: "Juan manuel",
    number: 10,
    position: { x: 0, y: 0 },
    moved: false,
  },
]);
// const position = reactive({ x: 0, y: 0 });
const playerPosition = ref<number>(0);
const offsetLeft = ref<number | undefined>(0);
const offsetTop = ref<number | undefined>(0);

onMounted(() => (team.value = REAL_MADRID));

const mouseMove = (event: any) => {
  if (!enable.value) return;
  const { clientX, clientY } = event;

  offsetLeft.value = futbol.value?.offsetLeft || 0;
  offsetTop.value = futbol.value?.offsetTop || 0;

  team.value[playerPosition.value].position.x = clientX - offsetLeft.value - 20;
  team.value[playerPosition.value].position.y = clientY - offsetTop.value - 20;
};

// const mouseEnter = (event: any) => {
//   console.log("mouseneter");

//   // futbol.value.addEventListener("mousemove", mouseMove, false);
// };

const createNewPlayer = () => {
  team.value.push({
    ref: name.value.split(" ").join("-"),
    name: name.value,
    number: 25,
    position: { x: 0, y: team.value.length * 25 },
    moved: false,
  });

  name.value = "";
};

const selectedPlayer = (itemPlayer: Player) => {
  const { moved } = itemPlayer;
  if (!moved) enable.value = true;
  else enable.value = false;

  playerPosition.value = team.value.findIndex(
    (el: Player) => el.ref === itemPlayer.ref
  );

  // player.value = { ...itemPlayer, moved: !moved };
  team.value[playerPosition.value].moved = !moved;
};
</script>

<template>
  <div class="field-component__container">
    <div class="field-component__added">
      <h1 class="title">Arma tu equipo</h1>
      <input type="text" name="name" id="" v-model="name" />
      <button @click="createNewPlayer">Agregar Jugador</button>
      <div class="field-component__data">
        {{ enable }}
        {{ team[playerPosition].position }}
      </div>
    </div>
    <div ref="futbol" class="field-component__area" @mousemove="mouseMove">
      <!-- @mouseenter="mouseEnter" -->
      <div class="field__area area-top">
        <div class="field__small-area"></div>
      </div>
      <div class="field__half-moon half-moon-top"></div>
      <div class="field__moon"></div>
      <div class="field__half-moon half-moon-bottom"></div>
      <div class="field__area area-bottom">
        <div class="field__small-area"></div>
      </div>

      <div
        v-for="play in team"
        :key="play.name"
        :ref="play.ref"
        class="player"
        :class="{ active: play.moved }"
        :style="`transform: translate(${play.position.x}px, ${play.position.y}px)`"
        @click="selectedPlayer(play)"
      >
        <span>{{ play.number }}</span>
        <p>{{ play.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.field-component__container {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(200px, auto);
}

.field-component__area {
  position: relative;
  width: 500px;
  height: 90vh;
  background-color: green;
  border: 15px solid darkcyan;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.player {
  width: 25px;
  height: 25px;
  /* background-color: aqua; */
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: move;
}
.player span {
  font-weight: bold;
}
.player p {
  min-width: 94px;
  margin-left: -30px;
  margin-top: 0;
  color: white;
}
.player.active {
  background-color: brown;
}

.field-component__added {
  padding: 10px 0;
}
.field-component__added button {
  margin: 0 10px;
  color: white;
  background-color: darkcyan;
}
/* field__area */
.field__area {
  border: 2px solid var(--line-color);
  text-align: center;
  width: 250px;
  height: 130px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.field__area.area-bottom {
  align-items: end;
}
.field__small-area {
  border: 2px solid var(--line-color);
  width: 125px;
  height: 70px;
}
.field__area.area-top .field__small-area {
  border-top-color: transparent;
}
.field__area.area-bottom .field__small-area {
  border-bottom-color: transparent;
}
/* end field__area */
/* half moon  */
.field__half-moon {
  width: var(--moon-width);
  height: 50px;
  border: 2px solid var(--line-color);
}
.field__half-moon.half-moon-top {
  margin: -2px auto auto auto;
  -moz-border-radius: 0 0 var(--moon-width) var(--moon-width);
  -webkit-border-radius: 0 0 var(--moon-width) var(--moon-width);
  border-radius: 0 0 var(--moon-width) var(--moon-width);
}
.field__half-moon.half-moon-bottom {
  -moz-border-radius: var(--moon-width) var(--moon-width) 0 0;
  -webkit-border-radius: var(--moon-width) var(--moon-width) 0 0;
  border-radius: var(--moon-width) var(--moon-width) 0 0;
  margin: auto auto -2px auto;
}
/* end half moon  */
/* moon  */
.field__moon {
  margin: 15px 0;
  /* border: 2px solid var(--line-color); */
  position: relative;
  height: var(--moon-width);
}

.field__moon::before {
  content: "";
  position: absolute;
  min-width: 100%;
  color: red;
  border: 1px solid var(--line-color);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.field__moon::after {
  content: "";
  position: absolute;
  min-width: var(--moon-width);
  height: var(--moon-width);
  color: red;
  border: 2px solid var(--line-color);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* end moon  */
</style>
