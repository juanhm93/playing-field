<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { TEAMS } from "../helpers/constains";
import {
  FOUR_THREE_THREE,
  FOUR_FOUR_TWO,
  FOUR_TWO_THREE_ONE,
  FIVE_FOUR_ONE,
} from "../helpers/alignments";
import { Player } from "../types/Player.types";
import ItemPlayer from "./players/ItemPlayer.vue";
import BoxCreateTeam from "./boxes/BoxCreateTeam.vue";

const ALIGNMENTS_MAP: Record<string, Array<{ position: { x: number; y: number } }>> = {
  "four-three-three": FOUR_THREE_THREE,
  "four-four-two": FOUR_FOUR_TWO,
  "four-two-three-one": FOUR_TWO_THREE_ONE,
  "five-four-one": FIVE_FOUR_ONE,
};

const enable = ref<Boolean>(false);
const futbol = ref<HTMLElement | null>(null);
const fieldWidth = ref<number>(500);
const fieldHeight = ref<number>(650);
const teamColors = ref<{ primary: string; secondary: string }>({
  primary: "#FFFFFF",
  secondary: "#0D419A",
});

// Activa transición suave solo al cambiar alineación (no al arrastrar)
const animatePosition = ref<boolean>(false);
const ALIGN_TRANSITION_MS = 400;

const team = ref<Player[]>([]);
const benchPlayers = ref<Array<{ ref: string; name: string; number: number; moved: boolean }>>([]);
const playerPosition = ref<number>(0);

// Modo sustitución: al hacer cambio, bench player seleccionado entra, field player sale
const substitutionMode = ref<boolean>(false);
const substitutionBenchPlayer = ref<{ ref: string; name: string; number: number; moved: boolean } | null>(null);

// Construye jugadores con posiciones desde la alineación del equipo
const buildPlayersFromTeam = (teamKey: string): Player[] => {
  const teamData = TEAMS[teamKey];
  if (!teamData) return [];

  const alignment = ALIGNMENTS_MAP[teamData.defaultAlignment];
  if (!alignment) return [];

  const count = Math.min(teamData.starters.length, alignment.length);
  return teamData.starters.slice(0, count).map((starter, i) => ({
    ...starter,
    position: { ...alignment[i].position },
    moved: false,
  }));
};

const updateFieldDimensions = () => {
  if (futbol.value) {
    fieldWidth.value = futbol.value.clientWidth;
    fieldHeight.value = futbol.value.clientHeight;
  }
};

const setTeam = (teamKey: string) => {
  const teamData = TEAMS[teamKey];
  if (!teamData) return;
  substitutionMode.value = false;
  substitutionBenchPlayer.value = null;
  animatePosition.value = true;
  team.value = buildPlayersFromTeam(teamKey);
  benchPlayers.value = teamData.bench.map((p) => ({ ...p, moved: false }));
  teamColors.value = { ...teamData.colors };
  setTimeout(() => {
    animatePosition.value = false;
  }, ALIGN_TRANSITION_MS);
};

onMounted(async () => {
  const defaultKey = Object.keys(TEAMS)[0];
  team.value = buildPlayersFromTeam(defaultKey);
  const teamData = TEAMS[defaultKey];
  if (teamData) {
    teamColors.value = { ...teamData.colors };
    benchPlayers.value = teamData.bench.map((p) => ({ ...p, moved: false }));
  }
  await nextTick();
  updateFieldDimensions();
  window.addEventListener("resize", updateFieldDimensions);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateFieldDimensions);
});

const mouseMove = (event: MouseEvent) => {
  if (!enable.value || !futbol.value) return;
  const offsetLeft = futbol.value.offsetLeft || 0;
  const offsetTop = futbol.value.offsetTop || 0;

  const xPx = event.clientX - offsetLeft - 14;
  const yPx = event.clientY - offsetTop - 14;

  const xRel = Math.max(0, Math.min(1, xPx / fieldWidth.value));
  const yRel = Math.max(0, Math.min(1, yPx / fieldHeight.value));

  team.value[playerPosition.value].position.x = xRel;
  team.value[playerPosition.value].position.y = yRel;
};

type Options = {
  name: string;
  number: number;
};

const createNewPlayer = ({ name, number }: Options) => {
  team.value.push({
    ref: name.split(" ").join("-"),
    name: name,
    number: number,
    position: { x: 0.5, y: 0.5 + team.value.length * 0.03 },
    moved: false,
  });
};

const setNewAlign = (align: string) => {
  const alignment = ALIGNMENTS_MAP[align];
  if (!alignment) return;

  animatePosition.value = true;

  const positionsCount = Math.min(alignment.length, team.value.length);
  for (let i = 0; i < positionsCount; i++) {
    team.value[i].position.x = alignment[i].position.x;
    team.value[i].position.y = alignment[i].position.y;
  }

  setTimeout(() => {
    animatePosition.value = false;
  }, ALIGN_TRANSITION_MS);
};

const onBenchSubClick = (benchPlayer: { ref: string; name: string; number: number; moved?: boolean }) => {
  if (substitutionBenchPlayer.value?.ref === benchPlayer.ref) {
    substitutionMode.value = false;
    substitutionBenchPlayer.value = null;
    return;
  }
  substitutionMode.value = true;
  substitutionBenchPlayer.value = { ...benchPlayer, moved: false };
};

const cancelSubstitution = () => {
  substitutionMode.value = false;
  substitutionBenchPlayer.value = null;
};

const selectedPlayer = (itemPlayer: Player) => {
  // Modo sustitución: intercambiar field player con bench player seleccionado
  if (substitutionMode.value && substitutionBenchPlayer.value) {
    const fieldIndex = team.value.findIndex((el) => el.ref === itemPlayer.ref);
    if (fieldIndex === -1) return;

    const outgoingPlayer = team.value[fieldIndex];
    const incomingBench = substitutionBenchPlayer.value;

    // Entra el suplente en la misma posición
    team.value[fieldIndex] = {
      ...incomingBench,
      position: { ...outgoingPlayer.position },
      moved: false,
    };

    // Sale el titular a la banca
    const benchIndex = benchPlayers.value.findIndex((b) => b.ref === incomingBench.ref);
    if (benchIndex !== -1) {
      benchPlayers.value[benchIndex] = {
        ref: outgoingPlayer.ref,
        name: outgoingPlayer.name,
        number: outgoingPlayer.number,
        moved: false,
      };
    }

    animatePosition.value = true;
    setTimeout(() => (animatePosition.value = false), ALIGN_TRANSITION_MS);
    substitutionMode.value = false;
    substitutionBenchPlayer.value = null;
    enable.value = false;
    return;
  }

  // Modo mover: toggle drag
  const { moved } = itemPlayer;
  if (!moved) enable.value = true;
  else enable.value = false;

  playerPosition.value = team.value.findIndex((el: Player) => el.ref === itemPlayer.ref);
  team.value[playerPosition.value].moved = !moved;
};
</script>

<template>
  <div class="field-component__container">
    <box-create-team
      :teams="TEAMS"
      :bench-players="benchPlayers"
      :substitution-mode="substitutionMode"
      :substitution-bench-player="substitutionBenchPlayer"
      :create-new-player="createNewPlayer"
      :set-new-align="setNewAlign"
      :set-team="setTeam"
      :on-bench-sub-click="onBenchSubClick"
      :cancel-substitution="cancelSubstitution"
    />
    <!-- <div class="field-component__added">
      <h1 class="title">Arma tu equipo</h1>
      <input type="text" name="name" id="" v-model="name" />
      <button @click="createNewPlayer">Agregar Jugador</button>
      <div class="field-component__data">
        {{ enable }}
        {{ team[playerPosition].position }}
      </div>
    </div> -->
    <div ref="futbol" class="field-component__area" @mousemove="mouseMove">
      <!-- @mouseenter="mouseEnter" -->
      <!-- lineas del campo -->
      <div class="field__area area-top">
        <div class="field__small-area"></div>
      </div>
      <div class="field__half-moon half-moon-top"></div>
      <div class="field__moon"></div>
      <div class="field__half-moon half-moon-bottom"></div>
      <div class="field__area area-bottom">
        <div class="field__small-area"></div>
      </div>
      <!-- lineas del campo -->
      <item-player
        v-for="play in team"
        :key="play.ref"
        :play="play"
        :field-width="fieldWidth"
        :field-height="fieldHeight"
        :animate-position="animatePosition"
        :team-colors="teamColors"
        :substitution-mode="substitutionMode"
        :selected-player="selectedPlayer"
      />
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
  background: repeating-linear-gradient(
    #007723,
    #007723 75px,
    #179740 75px,
    #179740 150px
  );
  border: 20px solid darkcyan;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
