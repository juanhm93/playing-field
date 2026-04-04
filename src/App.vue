<script setup lang="ts">
import { ref, provide } from "vue";
import FieldComponent from "./components/FieldComponent.vue";
import HomePage from "./pages/HomePage.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import { showViewKey, type AppView } from "./keys/navigation";

const activeView = ref<AppView>("home");

function showView(view: AppView) {
  activeView.value = view;
}

provide(showViewKey, showView);

function tabClass(view: "home" | "login" | "register") {
  const on = activeView.value === view;
  return [
    "rounded-full px-4 py-1.5 font-['Barlow',sans-serif] text-[11px] font-semibold uppercase tracking-[2px] transition-colors",
    on ? "bg-[#00e676] text-[#050d07]" : "text-[#7a8a7e] hover:text-[#00e676]",
  ];
}
</script>

<template>
  <div
    class="relative h-screen w-screen overflow-hidden bg-[#050d07] font-['Barlow',sans-serif] text-[#f4f4f4]"
  >
    <nav
      v-show="false"
      class="absolute left-1/2 top-7 z-[25] flex -translate-x-1/2 gap-1 rounded-full border border-white/10 bg-[#0d2e16]/70 px-1 py-1 backdrop-blur-md"
      aria-label="Vistas principales"
    >
      <button type="button" :class="tabClass('home')" @click="showView('home')">
        Inicio
      </button>
      <button
        type="button"
        :class="tabClass('login')"
        @click="showView('login')"
      >
        Iniciar sesión
      </button>
      <button
        type="button"
        :class="tabClass('register')"
        @click="showView('register')"
      >
        Registro
      </button>
    </nav>

    <HomePage v-show="activeView === 'home'" />
    <Login v-show="activeView === 'login'" />
    <Register v-show="activeView === 'register'" />

    <div
      v-if="activeView === 'field'"
      id="field"
      class="absolute inset-0 z-10 flex flex-col overflow-auto"
    >
      <button
        type="button"
        class="absolute right-10 top-7 z-30 flex cursor-pointer items-center gap-1.5 font-['Barlow',sans-serif] text-[12px] font-semibold uppercase tracking-[2px] text-[#7a8a7e] transition-colors hover:text-[#00e676]"
        @click="showView('home')"
      >
        ← Inicio
      </button>
      <div
        class="relative flex min-h-0 flex-1 items-center justify-center overflow-auto p-4"
      >
        <div
          class="pointer-events-none absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(90deg,#00e676_0,transparent_1px,transparent_80px,#00e676_81px)]"
          aria-hidden="true"
        />
        <div class="relative z-10 flex items-center justify-center">
          <FieldComponent />
        </div>
      </div>
    </div>
  </div>
</template>
