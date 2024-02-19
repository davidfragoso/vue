<template>
  <main>
    <header>
      <HelloWorld msg="Menú"/>
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
        <HelloWorld :msg="pageTitle" />
      </div>
    </header>
    <div>
      <ul>
        <template v-if="route.name === 'home'">
          <h1>Navega entre las diferentes vistas.</h1>
        </template>
        <template v-else>
          <DataItem v-bind="datos" v-for="(datos, index) in selectedData" :key="index" :image="datos.image" />
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import { RouterLink, useRoute } from 'vue-router';
import DataItem from '@/components/datos/DataItem.vue';
import card1 from '@/data/card1';
import card2 from '@/data/card2';
import card3 from '@/data/card3';
import card4 from '@/data/card4';
import card5 from '@/data/card5';
import card6 from '@/data/card6';

const route = useRoute();
const pageTitles = {
  vista1: 'Link 1',
  vista2: 'Link 2',
  vista3: 'Link 3',
  vista4: 'Link 4',
  vista5: 'Link 5',
  vista6: 'Link 6',
};

const pageTitle = computed(() => pageTitles[route.name]);

const selectedData = ref(getDataForRoute(route.name));

function getDataForRoute(routeName) {
  const baseUrl = import.meta.env.BASE_URL;

  switch (routeName) {
    case 'vista1':
      return card1.map(item => ({ ...item, image: `${baseUrl}src/images/fotos/yo.jpg` }));
    case 'vista2':
      return card2.map(item => ({ ...item, image: `${baseUrl}src/images/fotos/joven.jpg` }));
    case 'vista3':
      return card3.map(item => ({ ...item, image: `${baseUrl}src/images/fotos/mason.png` }));
    case 'vista4':
      return card4.map(item => ({ ...item, image: `${baseUrl}src/images/fotos/mujer1.jpg` }));
    case 'vista5':
      return card5.map(item => ({ ...item, image: `${baseUrl}src/images/fotos/mujer2.jpg` }));
    case 'vista6':
      return card6.map(item => ({ ...item, image: `${baseUrl}src/images/fotos/kira.png` }));
    default:
      return [];
  }
}

onMounted(() => {
  watch(() => route.name, (newRoute) => {
    selectedData.value = getDataForRoute(newRoute);
  });
});
</script>

<style scoped>
.greetings {
  text-align: center;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  margin-top: 0;
  font-size: 32px;
  color: rgba(211, 209, 209, 0.872);
}

</style>

