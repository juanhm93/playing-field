<script setup lang="ts">
import { ref, watch } from "vue";
import type { Team } from "../../types/Team.types";

const ALIGNMENTS = [
  { key: "four-four-two", label: "4-4-2" },
  { key: "four-three-three", label: "4-3-3" },
  { key: "four-two-three-one", label: "4-2-3-1" },
  { key: "five-four-one", label: "5-4-1" },
] as const;

const name = ref<string>("");
const shirtNumber = ref<number>(0);
const selectedTeamKey = ref<string>("");
const activeAlignment = ref<string>("four-three-three");

// Sincronizar con el primer equipo disponible al cargar
watch(
  () => props.teams,
  (teams) => {
    if (teams && Object.keys(teams).length > 0 && !selectedTeamKey.value) {
      selectedTeamKey.value = Object.keys(teams)[0];
    }
  },
  { immediate: true },
);

// Marcar la alineación activa: default del equipo al cambiar, o la que el usuario seleccione
watch(
  () =>
    (props.teams[selectedTeamKey.value] as Team | undefined)?.defaultAlignment,
  (defaultAlign) => {
    if (defaultAlign) activeAlignment.value = defaultAlign;
  },
  { immediate: true },
);

type Options = {
  name: string;
  number: number;
};

type BenchPlayer = { ref: string; name: string; number: number; moved?: boolean };

const props = defineProps<{
  teams: Record<string, Team>;
  benchPlayers: BenchPlayer[];
  substitutionMode: boolean;
  substitutionBenchPlayer: BenchPlayer | null;
  createNewPlayer: (data: Options) => void;
  setNewAlign: (align: string) => void;
  setTeam: (teamKey: string) => void;
  onBenchSubClick: (player: BenchPlayer) => void;
  cancelSubstitution: () => void;
}>();

const onTeamChange = (event: Event) => {
  const key = (event.target as HTMLSelectElement).value;
  selectedTeamKey.value = key;
  props.setTeam(key);
};

const onAlignClick = (alignKey: string) => {
  activeAlignment.value = alignKey;
  props.setNewAlign(alignKey);
};

const handleCreate = () => {
  props.createNewPlayer({
    name: name.value,
    number: shirtNumber.value,
  });
  name.value = "";
  shirtNumber.value = 0;
};
</script>

<template>
  <div class="field-component__added">
    <h1 class="title">Arma tu equipo</h1>
    <div class="input-container team-select">
      <label class="input-title" for="team">Equipo</label>
      <select
        id="team"
        class="input-field select-field"
        :value="selectedTeamKey"
        @change="onTeamChange"
      >
        <option v-for="(teamData, key) in teams" :key="key" :value="key">
          {{ teamData.name }}
        </option>
      </select>
    </div>

    <div v-if="selectedTeamKey" class="list-bench">
      <div
        v-for="(player, index) in (benchPlayers ?? [])"
        :key="player.ref"
        class="list-bench__item"
        :class="{
          'list-bench__item--alt': index % 2 === 1,
          'list-bench__item--sub-active': substitutionBenchPlayer?.ref === player.ref,
        }"
      >
        <span class="list-bench__player"
          >{{ player.name }} ({{ player.number }})</span
        >
        <button
          type="button"
          class="list-bench__btn"
          title="Cambio"
          @click="onBenchSubClick(player)"
        >
          <svg
            class="list-bench__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M7 16V4M7 4L3 8M7 4L11 8" />
            <path d="M17 8V20M17 20L21 16M17 20L13 16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- <div class="actions-players__sidebar">
        <button @click="handleCreate">Cambio</button>
        <button @click="handleCreate">
          Editar Jugador
        </button>
        <button 
            class="button-danger" 
            @click="handleCreate"
          >
          Eliminar Jugador
        </button>
      </div> -->
    <div v-if="false" class="input__box">
      <div class="input-container">
        <label class="input-title" for="name"> Nombre </label>
        <input
          class="input-field"
          type="text"
          name="name"
          id="name"
          v-model="name"
        />
      </div>
      <div class="input-container">
        <label class="input-title" for="shirt"> Numero de camiseta </label>
        <input
          class="input-field"
          type="text"
          name="shirt"
          id="shirt"
          v-model.number="shirtNumber"
        />
      </div>
      <div class="button-add">
        <button @click="handleCreate">Agregar Jugador</button>
      </div>
    </div>
    <!-- <div class="field-component__data">
        {{ enable }}
        {{ team[playerPosition].position }}
      </div> -->
    <div class="field_component__alignment">
      <h3>Alineaciones Posibles</h3>
      <div class="alignments-list">
        <div
          v-for="align in ALIGNMENTS"
          :key="align.key"
          :class="{
            'alignments-list__item--active': activeAlignment === align.key,
          }"
          @click="onAlignClick(align.key)"
        >
          {{ align.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.field-component__added {
  padding: 10px 0;
  text-align: start;
}

.field-component__added button {
  margin-right: 10px;
  color: white;
  background-color: darkcyan;
}

.field-component__added .button-danger {
  background-color: red;
}

.button-add {
  margin-right: 10px;
}

.input__box {
  max-width: 350px;
}

/* Estilo base para el contenedor del input */
.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  /* Espacio entre inputs */
}

/* Estilo base para el título */
.input-title {
  font-weight: bold;
  /* Texto en negrita */
}

/* Estilo base para el input */
.input-field {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Chevron como background: ::after no funciona en select nativo */
.select-field {
  cursor: pointer;
  background-color: white;
  min-width: 180px;
  padding-right: 36px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
}

/* Lista de banca - estilo clásico */
.list-bench {
  /* padding: 10px; */
  /* border: 1px solid #ddd; */
  border-radius: 5px;
  background: #f8f8f8;
  margin-bottom: 15px;
}

.list-bench__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  /* border-radius: 4px; */
}

.list-bench__item {
  background: rgba(0, 139, 139, 0.42);
}

.list-bench__item--alt {
  background: rgba(0, 139, 139, 0.16);
}

.list-bench__item--sub-active {
  position: relative;
  overflow: hidden;
}

.list-bench__item--sub-active::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: sweep-left-to-right 1.5s ease-in-out infinite;
  pointer-events: none;
}

@keyframes sweep-left-to-right {
  0% {
    left: -100%;
  }
  100% {
    left: 150%;
  }
}

.list-bench__player {
  font-weight: 500;
}

.list-bench__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border: none;
  background: transparent;
  color: darkcyan;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
}

.list-bench__btn:hover {
  background: rgba(0, 139, 139, 0.2);
}

.list-bench__icon {
  width: 18px;
  height: 18px;
}

/* Alineaciones: active = mismo estilo que hover */
.alignments-list div {
  cursor: pointer;
}

.alignments-list__item--active {
  color: #646cff;
}
</style>
