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
    <span class="player__number">{{ play.number }}</span>
    <p class="player__name">{{ play.name }}</p>
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
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

/* Transición suave solo al cambiar alineación (setNewAlign), no al arrastrar */
.player--animate {
  transition: transform 0.4s ease-out;
}

.player__number {
  font-weight: 700;
  font-size: 11px;
  line-height: 1;
  color: var(--player-accent, #050d07);
  text-align: center;
}

.player__name {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  margin-top: 5px;
  min-width: 72px;
  max-width: 118px;
  padding: 0 2px;
  text-align: center;
  font-size: 10px;
  line-height: 1.2;
  font-weight: 600;
  color: #f4f4f4;
  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.9),
    0 0 12px rgba(5, 13, 7, 0.75);
  pointer-events: none;
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
