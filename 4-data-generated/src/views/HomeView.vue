<script setup lang="ts">
import { RouterLink } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
</script>

<template>
  <main>
    <header>
      <div class="wrapper">
        <HelloWorld msg="Menú"/>
        <nav>
          <RouterLink to="/">Inicio</RouterLink>
          <RouterLink to="/vista1">1</RouterLink>
          <RouterLink to="/vista2">2</RouterLink>
          <RouterLink to="/vista3">3</RouterLink>
          <RouterLink to="/vista4">4</RouterLink>
          <RouterLink to="/vista5">5</RouterLink>
          <RouterLink to="/vista6">6</RouterLink>
        </nav>
        
      </div>
    </header>
  </main>
</template>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f2f2f2; /* Fondo principal */
}

header {
  text-align: center;
  line-height: 1.5;
  background-color: #4285f4; /* Color moderno */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 0 0 100% 100%;
  transition: background-color 0.3s;
}

header:hover {
  background-color: #800080; /* Color violeta al pasar el cursor */
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;
}

nav a {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-left: 1px solid #4285f4; /* Color moderno */
  text-align: center;
  color: #fff; /* Texto blanco */
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px; /* Espaciado entre letras */
  background-color: #4285f4; /* Color moderno por defecto */
  border-radius: 4px;
  margin: 2px; /* Espaciado entre enlaces */
  transition: background-color 0.3s, transform 0.2s ease-in-out; /* Agrega transición para suavizar el cambio */

  /* Estilos específicos para cada enlace */
  &:nth-child(odd) {
    transform: translateY(5px); /* Desplazamiento hacia abajo para enlaces impares */
  }

  &:nth-child(even) {
    transform: translateY(-5px); /* Desplazamiento hacia arriba para enlaces pares */
  }

  &:hover,
  &.router-link-exact-active {
    background-color: #004080; /* Color al pasar el cursor o activo */
    transform: translateY(-5px);
  }
}

header:hover nav a.router-link-exact-active {
  background-color: #800080; /* Color violeta al pasar el cursor sobre el encabezado */
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .logo {
    margin: 0 0 2rem;
  }

  header .wrapper {
    text-align: center;
  }

  nav {
    justify-content: center;
    margin-left: 0;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
  