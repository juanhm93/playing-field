<script setup lang="ts">
import { inject } from "vue";
import { showViewKey } from "../keys/navigation";

const showView = inject(showViewKey)!;

function onImgError(e: Event) {
  const el = e.target as HTMLImageElement;
  el.style.display = "none";
}
</script>

<template>
  <div
    id="home"
    class="absolute inset-0 flex items-center font-['Barlow',sans-serif] text-[#f4f4f4]"
  >
    <div
      class="absolute left-0 right-0 top-0 z-20 h-[3px] bg-gradient-to-r from-transparent via-[#00e676] to-transparent"
    />
    <div class="absolute inset-0 z-0">
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_65%_50%,#0d3d1e,transparent_70%),#050d07]"
      />
      <div
        class="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(90deg,#00e676_0,transparent_1px,transparent_80px,#00e676_81px)]"
      />
    </div>
    <div
      class="absolute left-10 top-7 z-20 font-['Bebas_Neue',sans-serif] text-[20px] tracking-[4px] text-[#00e676]"
    >
      De Futbol poco
    </div>
    <div class="absolute bottom-0 left-0 z-[2] h-full w-[52%] max-md:hidden">
      <img
        class="h-full w-full object-cover object-top brightness-[0.85] contrast-110 [mask-image:linear-gradient(to_right,rgba(0,0,0,1)_40%,rgba(0,0,0,0)_90%)] [-webkit-mask-image:linear-gradient(to_right,rgba(0,0,0,1)_40%,rgba(0,0,0,0)_90%)]"
        src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&q=80"
        alt="player"
        @error="onImgError"
      />
    </div>
    <div
      class="relative z-[3] ml-auto w-[56%] max-w-full max-md:ml-0 max-md:w-full max-md:px-8 max-md:pt-24"
    >
      <div
        class="mb-[22px] inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[3px] text-[#00e676] before:block before:h-0.5 before:w-7 before:shrink-0 before:bg-[#00e676] before:content-['']"
      >
        La plataforma para los que confunden el VAR con un bar
      </div>
      <h1
        class="mb-[22px] font-['Bebas_Neue',sans-serif] text-[clamp(68px,8.5vw,116px)] leading-[0.92] tracking-[2px] text-[#f4f4f4]"
      >
        BE PART<br />OF <span class="block text-[#00e676]">THE DESMADRE</span>
      </h1>
      <p class="mb-10 max-w-[400px] text-[14px] leading-[1.75] text-[#7a8a7e]">
        Aquí no analizamos el 4-4-2, aquí celebramos que le pegaste al balón y
        no al aire. Si crees que el "fuera de lugar" es una crisis existencial,
        estás en el lugar correcto.
      </p>
      <div v-show="false" class="flex gap-[14px]">
        <button
          type="button"
          class="cursor-pointer border-none bg-[#00e676] px-[38px] py-[15px] font-['Barlow',sans-serif] text-[13px] font-bold uppercase tracking-[2px] text-[#050d07] transition-all duration-300 [clip-path:polygon(0_0,calc(100%-11px)_0,100%_100%,11px_100%)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,230,118,0.3)]"
          @click="showView('login')"
        >
          LOGIN
        </button>
        <button
          type="button"
          class="cursor-pointer border-2 border-white/25 bg-transparent px-[38px] py-[15px] font-['Barlow',sans-serif] text-[13px] font-bold uppercase tracking-[2px] text-[#f4f4f4] transition-all duration-300 [clip-path:polygon(0_0,calc(100%-11px)_0,100%_100%,11px_100%)] hover:-translate-y-0.5 hover:border-[#00e676] hover:text-[#00e676]"
          @click="showView('register')"
        >
          CREATE ACCOUNT
        </button>
      </div>
      <div class="mt-6 flex gap-[14px]">
        <button
          type="button"
          class="cursor-pointer border-none bg-[#00e676] px-[38px] py-[15px] font-['Barlow',sans-serif] text-[13px] font-bold uppercase tracking-[2px] text-[#050d07] transition-all duration-300 [clip-path:polygon(0_0,calc(100%-11px)_0,100%_100%,11px_100%)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,230,118,0.3)]"
          @click="showView('field')"
        >
          Empezar
        </button>
      </div>
      <div
        class="mt-[50px] flex gap-9 border-t border-white/10 pt-7 max-sm:flex-wrap"
      >
        <div>
          <div
            class="font-['Bebas_Neue',sans-serif] text-[34px] leading-none text-[#00e676]"
          >
            1+
          </div>
          <div class="text-[10px] uppercase tracking-[2px] text-[#7a8a7e]">
            Usuarios activos
          </div>
        </div>
        <div>
          <div
            class="font-['Bebas_Neue',sans-serif] text-[34px] leading-none text-[#00e676]"
          >
            2
          </div>
          <div class="text-[10px] uppercase tracking-[2px] text-[#7a8a7e]">
            Ligas cubiertas
          </div>
        </div>
        <div>
          <div
            class="font-['Bebas_Neue',sans-serif] text-[34px] leading-none text-[#00e676]"
          >
            24/7
          </div>
          <div class="text-[10px] uppercase tracking-[2px] text-[#7a8a7e]">
            En vivo
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
