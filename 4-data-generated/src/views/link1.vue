<template>
  <div>
    <header>
      <nav>
        <RouterLink to="/">Inicio</RouterLink>
      </nav>
      <h1>{{ pageTitle }}</h1>
    </header>
    <body>
      <div>
        <ul>
          <DataItem v-bind="datos" v-for="(datos, index) in selectedData" :key="index" />
        </ul>
      </div>
    </body>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';  // Asegúrate de importar 'ref' y 'computed'
import { RouterLink, useRoute } from 'vue-router';
import DataItem from '@/components/datos/DataItem.vue';
import DataInfo01 from '@/data/DataInfo01';
import DataInfo02 from '@/data/DataInfo02';
import DataInfo03 from '@/data/DataInfo03';
import DataInfo04 from '@/data/DataInfo04';
import DataInfo05 from '@/data/DataInfo05';
import DataInfo06 from '@/data/DataInfo06';

const route = useRoute();
const pageTitles = {
  vista1: 'Link 1',
  vista2: 'Link 2',
  vista3: 'Link 3',
  vista4: 'Link 4',
  vista5: 'Link 5',
  vista6: 'Link 6',
};

const selectedData = ref(getDataForRoute(route.name));

function getDataForRoute(routeName) {
  switch (routeName) {
    case 'vista1':
      return DataInfo01;
    case 'vista2':
      return DataInfo02;
    case 'vista3':
      return DataInfo03;
    case 'vista4':
      return DataInfo04;
    case 'vista5':
      return DataInfo05;
    case 'vista6':
      return DataInfo06;
    default:
      return [];
  }
}

const pageTitle = computed(() => pageTitles[route.name]);
</script>




<style scoped>
body {
  --border: 1px solid var(--color-border);
  padding: 1rem;
  font-size: 140%;
}

header {
  width: 100%;
  --border: 1px solid var(--color-border);
  padding-bottom: 10px;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  --border: 1px solid var(--color-border);
  text-align: left;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  padding: 1rem 1rem 1rem 1rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border: 1px solid var(--color-border);
}
</style>
