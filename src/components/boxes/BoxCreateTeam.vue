<script setup lang="ts">

    import { ref } from 'vue'

    const name = ref<string>("")
    const shirtNumber = ref<number>(0)

    type Options = {
        name: string;
        number: number;
    };
  const props =  defineProps<{
        createNewPlayer: (data: Options) => void
    }>()

    const handleCreate = () => {
        props.createNewPlayer({
            name: name.value,
            number: shirtNumber.value
        })
        name.value = ''
        shirtNumber.value = 0
    }
</script>

<template>
     <div class="field-component__added">
      <h1 class="title">Arma tu equipo</h1>
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
      <div class="input__box">
          <div class="input-container">
              <label class="input-title" for="name"> 
                Nombre 
              </label>
            <input  class="input-field" type="text" name="name" id="name" v-model="name" />
          </div>
          <div class="input-container">
              <label class="input-title" for="shirt">
                Numero de camiseta
              </label>
              <input  class="input-field" type="text" name="shirt" id="shirt" v-model.number="shirtNumber" />
          </div>
          <div class="button-add">
              <button @click="handleCreate">Agregar Jugador</button>
          </div>
      </div>
      <!-- <div class="field-component__data">
        {{ enable }}
        {{ team[playerPosition].position }}
      </div> -->
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
  margin-bottom: 15px; /* Espacio entre inputs */
}

/* Estilo base para el título */
.input-title {
  font-weight: bold; /* Texto en negrita */
}

/* Estilo base para el input */
.input-field {
  padding: 10px; /* Padding de 10px */
  border: 1px solid #ccc; /* Borde */
  border-radius: 5px; /* Bordes redondeados */
}

</style>