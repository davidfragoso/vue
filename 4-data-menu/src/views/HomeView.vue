<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <header>
      <div class="wrapper">
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
  