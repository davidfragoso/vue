<script setup lang="ts">
import Login from './views/Login.vue';
import Register from './views/Register.vue';
</script>

<template>
  <div class="app-container">
    <div class="column login-column">
      <Login />
    </div>

    <div class="column register-column">
      <Register />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
}

.column {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-column {
  background-color: #f2f2f2;
}

.register-column {
  background-color: #c1bcbc;
}
</style>
