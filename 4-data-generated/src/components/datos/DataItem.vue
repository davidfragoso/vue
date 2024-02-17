<template>
    <div class="card">
      <span>
        <h1>{{ props.name }} {{ props.lastname }}</h1>
        <h2>Registro: {{ props.id }}</h2>
        <br />
      </span>
      <span>
        <h3>Edad: {{ props.age }}</h3>
        <h3>Genero: {{ props.gender }}</h3>
      </span>
      <br /><br /><br /><br />
      <div class="fotoContainer">
        <div v-if="visual == true" class="cortina">
          <img class="foto" src="../../images/fotos/pfp-glasses.jpg" />
        </div>
        <button @click="visual=!visual" class="btnFoto">Mostrar / Ocultar</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { InterInfo } from '@/interfaces/InterInfo'
  import { ref } from 'vue';
  
  const props = defineProps<InterInfo>();
  var visual = ref(true);
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
  
  .card {
    width: 25rem;
    height: 18rem;
    font-family: 'Quicksand', sans-serif;
    color: #f39c12; /* Amarillo */
    background-color: #2c3e50; /* Gris azulado */
    border-radius: 22px;
    padding: 2rem;
    margin: 10px;
  }
  
  .fotoContainer {
    width: fit-content;
    position: relative;
    left: 30rem;
    bottom: 20rem;
  }
  
  .foto {
    width: 11rem;
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.5), 0 17px 50px 0 rgba(0, 0, 0, 0.4);
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
  }
  
  .cortina {
    --border: 1px solid #e74c3c; /* Rojo */
  }
  </style>
  