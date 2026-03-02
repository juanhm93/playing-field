<script setup lang="ts">
import { computed } from "vue";
import { Player } from "../../types/Player.types";

const props = defineProps<{
  play: Player;
  fieldWidth: number;
  fieldHeight: number;
  animatePosition: boolean;
  teamColors: { primary: string; secondary: string };
  substitutionMode: boolean;
  selectedPlayer: (player: Player) => void;
}>();

// Convierte coords relativas (0-1) a píxeles para posicionamiento responsive
const positionPx = computed(() => {
  const x = props.play.position.x * props.fieldWidth - 14;
  const y = props.play.position.y * props.fieldHeight - 14;
  return { x, y };
});
</script>

<template>
  <div
    :ref="play.ref"
    class="player"
    :class="{
      active: play.moved,
      'player--animate': animatePosition,
      'player--substitution-target': substitutionMode,
    }"
    :style="{
      transform: `translate(${positionPx.x}px, ${positionPx.y}px)`,
      backgroundColor: teamColors.primary,
      borderColor: teamColors.secondary,
      '--player-accent': teamColors.secondary,
    }"
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
  border: 4px solid;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: move;
}

/* Transición suave solo al cambiar alineación (setNewAlign), no al arrastrar */
.player--animate {
  transition: transform 0.4s ease-out;
}
.player span {
  font-weight: bold;
  color: var(--player-accent, darkcyan);
}
.player p {
  min-width: 94px;
  margin-left: -30px;
  margin-top: 5px;
  color: white;
}
/* Modo arrastrar: jugador seleccionado para mover */
.player.active {
  opacity: 0.6;
  border-style: dotted;
  border-color: red;
}

/* Modo sustitución: líneas punteadas rotando (pseudo-elemento porque border no anima) */
.player--substitution-target {
  border-color: transparent;
  cursor: pointer;
}

.player--substitution-target::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 4px dashed var(--player-accent, darkcyan);
  border-radius: 50%;
  animation: rotate-dashes 3s linear infinite;
  pointer-events: none;
}

@keyframes rotate-dashes {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
