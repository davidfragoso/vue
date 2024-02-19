<template>
  <div>
    <body>
      <div>
        <ul>
          <DataItem v-bind="datos" v-for="(datos, index) in selectedData" :key="index" :image="datos.image" />
        </ul>
      </div>
    </body>
  </div>
</template>

  <script setup lang="ts">
  import { ref, computed } from 'vue'; 
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
