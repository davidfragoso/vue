<template>
  <div class="card-container">
    <div class="card">
      <div class="fotoContainer">
        <div v-if="visual == true" class="cortina">
          <img :src="props.image" class="foto" alt="Foto" />
        </div>
        <button @click="toggleVisibility" class="btnFoto">{{ visual ? 'Hide' : 'Show' }}</button>
      </div>
      <div class="card-content">
        <span>
          <h1>{{ props.name }} {{ props.lastname }}</h1>
          <h2>Card: {{ props.id }}</h2>
        </span>
        <span>
          <h3>Edad: {{ props.age }}</h3>
          <h3>Genero: {{ props.gender }}</h3>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InterInfo } from '@/interfaces/InterInfo'
import { ref } from 'vue';

const props = defineProps<InterInfo & { image: string }>();
const visual = ref(true);

const toggleVisibility = () => {
  visual.value = !visual.value;
};
</script>



<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&display=swap');

h1 {
  font-weight: 500;
  color: #e74c3c; /* Rojo */
}

h2 {
  font-weight: 400;
  color: #2ecc71; /* Verde */
}

h3 {
  font-weight: 300;
  color: #3498db; /* Azul */
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  display: flex;
  width: 50rem; /* Ajusta el ancho según sea necesario */
  height: 22rem;
  font-family: 'Quicksand', sans-serif;
  color: #f39c12; /* Amarillo */
  background-color: #3d2c50; /* Gris azulado */
  border-radius: 22px;
  padding: 2rem;
  margin: 10px;
  position: relative;
}

.card-content {
  width: 60%; /* Ajusta el ancho de la primera columna según sea necesario */
}

.fotoContainer {
  width: 40%; /* Ajusta el ancho de la segunda columna según sea necesario */
  height: 100%; /* Añade un alto explícito al contenedor de la imagen */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-right: 2px solid #657484; /* Línea vertical divisoria entre columnas */

}

.foto {
  width: 11rem;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.5), 0 17px 50px 0 rgba(0, 0, 0, 0.4);
  border: 2px solid transparent; /* Inicialmente, el borde es transparente */
  border-radius: 50%;
  transition: border 0.5s ease-in-out; /* Efecto de transición en el borde */
}

.fotoContainer:hover .foto {
  border: 3px solid #3fcfa1; /* Al pasar el ratón, el borde se hace visible */
}

.btnFoto {
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  color: #fff; /* Blanco */
  background-color: #e74c3c; /* Rojo */
  border: 2px solid #fff; /* Blanco */
  width: 11rem;
  height: 2.5rem;
  border-radius: 4px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  position: absolute;
  bottom: 0; /* Para que el botón quede en la parte inferior */
  left: 50%; /* Centra el botón horizontalmente */
  transform: translateX(-50%); /* Centra el botón horizontalmente */
  opacity: 1; /* Inicialmente, el botón es completamente visible */
  transition: opacity 0.5s ease-in-out; /* Efecto de transición en la opacidad */
}

.btnFoto:hover {
  opacity: 0.7; /* Al pasar el ratón, la opacidad disminuye */
}

.cortina {
  --border: 1px solid #e74c3c; /* Rojo */
}

.cortina img {
  animation: breath 3s infinite alternate; /* Animación de tipo breath */
}

@keyframes breath {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
}
</style>
