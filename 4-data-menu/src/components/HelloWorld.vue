<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped>
.greetings {
  text-align: center;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  margin-top: 0;
  font-size: 32px;
}

h3 {
  color: var(--color-text);
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 1024px) {
  h1,
  h3 {
    text-align: center;
  }
}
</style>
