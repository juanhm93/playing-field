<script setup lang="ts">
import { inject } from "vue";
import { showViewKey } from "../keys/navigation";

const showView = inject(showViewKey)!;
</script>

<template>
  <div
    id="register"
    class="absolute inset-0 flex items-center justify-center font-['Barlow',sans-serif] text-[#f4f4f4]"
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
      COMPANY NAME
    </div>
    <button
      type="button"
      class="absolute right-10 top-7 z-20 flex cursor-pointer items-center gap-1.5 border-none bg-transparent font-['Barlow',sans-serif] text-[12px] font-semibold uppercase tracking-[2px] text-[#7a8a7e] transition-colors hover:text-[#00e676]"
      @click="showView('home')"
    >
      ← Inicio
    </button>

    <div
      class="relative z-[3] flex w-full max-w-[980px] items-center gap-0 px-10 max-md:flex-col max-md:py-24"
    >
      <div class="flex flex-1 flex-col pr-[60px] max-md:mb-10 max-md:pr-0">
        <h2
          class="mb-[18px] font-['Bebas_Neue',sans-serif] text-[clamp(52px,6vw,84px)] leading-[0.9] text-[#f4f4f4]"
        >
          ÚNETE AL<br /><span class="text-[#00e676]">EQUIPO</span>
        </h2>
        <p
          class="mb-8 max-w-[320px] text-[14px] leading-[1.7] text-[#7a8a7e]"
        >
          Crea tu cuenta gratis y accede a estadísticas en tiempo real,
          pronósticos y comunidades de fútbol.
        </p>
        <p class="text-[13px] text-[#7a8a7e]">
          ¿Ya tienes cuenta?
          <button
            type="button"
            class="cursor-pointer border-none bg-transparent font-semibold text-[#00e676] underline-offset-2 hover:underline"
            @click="showView('login')"
          >
            Inicia sesión
          </button>
        </p>
      </div>

      <div
        class="w-[380px] min-w-[280px] shrink-0 border border-[rgba(0,230,118,0.15)] bg-[rgba(13,46,22,0.6)] px-8 py-9 backdrop-blur-[20px] max-md:w-full max-md:min-w-0"
      >
        <div
          class="mb-1.5 font-['Bebas_Neue',sans-serif] text-[28px] tracking-[3px] text-[#00e676]"
        >
          CREAR CUENTA
        </div>
        <div
          class="mb-7 text-[12px] tracking-[1px] text-[#7a8a7e]"
        >
          Es gratis y solo toma un minuto
        </div>

        <div class="mb-[18px] flex gap-3">
          <div class="min-w-0 flex-1">
            <label
              class="mb-[7px] block text-[11px] font-semibold uppercase tracking-[2px] text-[#7a8a7e]"
              >Nombre</label
            >
            <input
              type="text"
              placeholder="Juan"
              class="w-full border border-white/10 bg-white/5 px-3.5 py-3 font-['Barlow',sans-serif] text-[14px] text-[#f4f4f4] outline-none transition-[border-color] duration-200 placeholder:text-white/25 focus:border-[rgba(0,230,118,0.5)]"
            />
          </div>
          <div class="min-w-0 flex-1">
            <label
              class="mb-[7px] block text-[11px] font-semibold uppercase tracking-[2px] text-[#7a8a7e]"
              >Apellido</label
            >
            <input
              type="text"
              placeholder="Pérez"
              class="w-full border border-white/10 bg-white/5 px-3.5 py-3 font-['Barlow',sans-serif] text-[14px] text-[#f4f4f4] outline-none transition-[border-color] duration-200 placeholder:text-white/25 focus:border-[rgba(0,230,118,0.5)]"
            />
          </div>
        </div>
        <div class="mb-[18px]">
          <label
            class="mb-[7px] block text-[11px] font-semibold uppercase tracking-[2px] text-[#7a8a7e]"
            >Correo electrónico</label
          >
          <input
            type="email"
            placeholder="tucorreo@ejemplo.com"
            class="w-full border border-white/10 bg-white/5 px-3.5 py-3 font-['Barlow',sans-serif] text-[14px] text-[#f4f4f4] outline-none transition-[border-color] duration-200 placeholder:text-white/25 focus:border-[rgba(0,230,118,0.5)]"
          />
        </div>
        <div class="mb-[18px]">
          <label
            class="mb-[7px] block text-[11px] font-semibold uppercase tracking-[2px] text-[#7a8a7e]"
            >Contraseña</label
          >
          <input
            type="password"
            placeholder="Mínimo 8 caracteres"
            class="w-full border border-white/10 bg-white/5 px-3.5 py-3 font-['Barlow',sans-serif] text-[14px] text-[#f4f4f4] outline-none transition-[border-color] duration-200 placeholder:text-white/25 focus:border-[rgba(0,230,118,0.5)]"
          />
        </div>
        <div class="mb-[18px]">
          <label
            class="mb-[7px] block text-[11px] font-semibold uppercase tracking-[2px] text-[#7a8a7e]"
            >Confirmar contraseña</label
          >
          <input
            type="password"
            placeholder="Repite tu contraseña"
            class="w-full border border-white/10 bg-white/5 px-3.5 py-3 font-['Barlow',sans-serif] text-[14px] text-[#f4f4f4] outline-none transition-[border-color] duration-200 placeholder:text-white/25 focus:border-[rgba(0,230,118,0.5)]"
          />
        </div>
        <button
          type="button"
          class="mt-2 w-full cursor-pointer border-none bg-[#00e676] py-[15px] font-['Barlow',sans-serif] text-[13px] font-bold uppercase tracking-[2.5px] text-[#050d07] transition-all duration-300 [clip-path:polygon(0_0,calc(100%-10px)_0,100%_100%,10px_100%)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,230,118,0.3)]"
        >
          Entrar al juego
        </button>
        <p
          class="mt-[18px] text-center text-[10px] leading-[1.6] text-[#7a8a7e]"
        >
          Al registrarte aceptas nuestros
          <button
            type="button"
            class="cursor-pointer border-none bg-transparent text-[#00e676]"
          >
            Términos de servicio
          </button>
          y la
          <button
            type="button"
            class="cursor-pointer border-none bg-transparent text-[#00e676]"
          >
            Política de privacidad
          </button>
        </p>

        <div
          class="my-5 flex items-center gap-3 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10"
        >
          <span
            class="text-[11px] tracking-[1px] text-[#7a8a7e]"
            >o regístrate con</span
          >
        </div>
        <div class="flex gap-2.5">
          <button
            type="button"
            class="flex flex-1 cursor-pointer items-center justify-center gap-1.5 border border-white/10 bg-transparent px-2 py-[11px] font-['Barlow',sans-serif] text-[12px] tracking-[1px] text-[#f4f4f4] transition-all duration-200 hover:border-[rgba(0,230,118,0.4)] hover:text-[#00e676]"
          >
            <svg
              class="h-3.5 w-3.5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
          <button
            type="button"
            class="flex flex-1 cursor-pointer items-center justify-center gap-1.5 border border-white/10 bg-transparent px-2 py-[11px] font-['Barlow',sans-serif] text-[12px] tracking-[1px] text-[#f4f4f4] transition-all duration-200 hover:border-[rgba(0,230,118,0.4)] hover:text-[#00e676]"
          >
            <svg
              class="h-3.5 w-3.5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            Facebook
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
