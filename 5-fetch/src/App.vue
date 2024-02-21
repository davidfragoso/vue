<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';

const Column = (props, { slots }) => {
  return {
    title: props.title,
    color: props.color,
    slots,
  };
};
</script>

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
