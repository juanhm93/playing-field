<script setup lang="ts">
import { ref, watch } from "vue";
import type { Team } from "../../types/Team.types";

const ALIGNMENTS = [
  { key: "four-four-two", label: "4-4-2" },
  { key: "four-three-three", label: "4-3-3" },
  { key: "four-two-three-one", label: "4-2-3-1" },
  { key: "five-four-one", label: "5-4-1" },
] as const;

type Options = {
  name: string;
  number: number;
};

type BenchPlayer = {
  ref: string;
  name: string;
  number: number;
  moved?: boolean;
};

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

const name = ref<string>("");
const shirtNumber = ref<number>(0);
const selectedTeamKey = ref<string>("");
const activeAlignment = ref<string>("four-three-three");

watch(
  () => props.teams,
  (teams) => {
    if (teams && Object.keys(teams).length > 0 && !selectedTeamKey.value) {
      selectedTeamKey.value = Object.keys(teams)[0];
    }
  },
  { immediate: true },
);

watch(
  () =>
    (props.teams[selectedTeamKey.value] as Team | undefined)?.defaultAlignment,
  (defaultAlign) => {
    if (defaultAlign) activeAlignment.value = defaultAlign;
  },
  { immediate: true },
);

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

function alignmentChipClass(key: string) {
  const on = activeAlignment.value === key;
  return [
    "cursor-pointer rounded-lg border px-3.5 py-2.5 text-center text-[13px] font-semibold tracking-wide transition-all duration-300 ease-out",
    on
      ? "border-[#00e676] bg-[#00e676]/15 text-[#00e676] shadow-[0_0_20px_rgba(0,230,118,0.12)]"
      : "border-white/12 bg-white/[0.04] text-[#b8c4bc] hover:border-[#00e676]/45 hover:bg-[#00e676]/8 hover:text-[#00e676]",
  ];
}
</script>

<template>
  <div
    class="field-component__added flex max-w-[min(100%,380px)] flex-col gap-6 py-2 text-start font-['Barlow',sans-serif] text-[#f4f4f4]"
  >
    <header class="space-y-3">
      <div
        class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[3px] text-[#00e676] before:block before:h-0.5 before:w-7 before:shrink-0 before:bg-[#00e676] before:content-['']"
      >
        Tu plantilla
      </div>
      <h1
        class="font-['Bebas_Neue',sans-serif] text-[clamp(32px,5vw,42px)] leading-[0.95] tracking-[2px] text-[#f4f4f4]"
      >
        Arma tu <span class="text-[#00e676]">equipo</span>
      </h1>
    </header>

    <section class="space-y-2">
      <label
        class="block text-[11px] font-semibold uppercase tracking-[2.5px] text-[#7a8a7e]"
        for="team"
      >
        Equipo
      </label>
      <div class="group relative">
        <select
          id="team"
          class="w-full cursor-pointer appearance-none rounded-xl border border-white/15 bg-[#0d2e16]/85 py-3 pl-4 pr-11 text-[14px] text-[#f4f4f4] shadow-inner shadow-black/20 transition-all duration-300 ease-out hover:border-[#00e676]/35 focus:border-[#00e676]/60 focus:outline-none focus:ring-2 focus:ring-[#00e676]/35"
          :value="selectedTeamKey"
          @change="onTeamChange"
        >
          <option
            v-for="(teamData, key) in teams"
            :key="key"
            class="bg-[#0a1510] py-2 text-[#f4f4f4]"
            :value="key"
          >
            {{ teamData.name }}
          </option>
        </select>
        <span
          class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7a8a7e] transition-colors duration-300 group-hover:text-[#00e676]"
          aria-hidden="true"
        >
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>
    </section>

    <section v-if="selectedTeamKey" class="space-y-2">
      <h2
        class="text-[11px] font-semibold uppercase tracking-[2.5px] text-[#7a8a7e]"
      >
        Banca
      </h2>
      <div
        class="overflow-hidden rounded-xl border border-white/10 bg-[#0a1510]/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
      >
        <div
          v-for="(player, index) in benchPlayers ?? []"
          :key="player.ref"
          class="flex items-center justify-between gap-3 px-3 py-2.5 transition-colors duration-200"
          :class="[
            index % 2 === 1 ? 'bg-white/[0.04]' : 'bg-white/[0.07]',
            substitutionBenchPlayer?.ref === player.ref
              ? 'relative overflow-hidden ring-1 ring-inset ring-[#00e676]/50'
              : '',
          ]"
        >
          <span
            v-if="substitutionBenchPlayer?.ref === player.ref"
            class="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            <span
              class="bench-sweep-shine absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />
          </span>
          <span class="relative text-[13px] font-medium text-[#e8ebe9]">
            {{ player.name }}
            <span class="text-[#7a8a7e]">({{ player.number }})</span>
          </span>
          <button
            type="button"
            class="relative flex shrink-0 items-center justify-center rounded-lg p-2 text-[#00e676] transition-all duration-200 hover:bg-[#00e676]/15 hover:text-[#5efca8] active:scale-95"
            title="Cambio"
            @click="onBenchSubClick(player)"
          >
            <svg
              class="h-[18px] w-[18px]"
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
    </section>

    <div v-if="false" class="input__box max-w-[350px]">
      <div class="mb-4 flex flex-col">
        <label class="mb-1 font-bold" for="name">Nombre</label>
        <input
          class="rounded-md border border-[#ccc] p-2.5"
          type="text"
          name="name"
          id="name"
          v-model="name"
        />
      </div>
      <div class="mb-4 flex flex-col">
        <label class="mb-1 font-bold" for="shirt">Numero de camiseta</label>
        <input
          class="rounded-md border border-[#ccc] p-2.5"
          type="text"
          name="shirt"
          id="shirt"
          v-model.number="shirtNumber"
        />
      </div>
      <div>
        <button
          type="button"
          class="mr-2.5 rounded bg-[darkcyan] px-3 py-2 text-white"
          @click="handleCreate"
        >
          Agregar Jugador
        </button>
      </div>
    </div>

    <section class="space-y-3 border-t border-white/10 pt-5">
      <h2
        class="font-['Bebas_Neue',sans-serif] text-[22px] tracking-[1.5px] text-[#f4f4f4]"
      >
        Alineaciones <span class="text-[#00e676]">posibles</span>
      </h2>
      <p class="text-[12px] leading-relaxed text-[#7a8a7e]">
        Elige una formación; el campo se actualizará al instante.
      </p>
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-2">
        <button
          v-for="align in ALIGNMENTS"
          :key="align.key"
          type="button"
          :class="alignmentChipClass(align.key)"
          @click="onAlignClick(align.key)"
        >
          {{ align.label }}
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bench-sweep-shine {
  animation: bench-sweep-shine 1.5s ease-in-out infinite;
}

@keyframes bench-sweep-shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(350%);
  }
}
</style>
