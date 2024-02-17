import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Link1View from '../views/link1.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/vista1', name: 'vista1', component: Link1View },
  { path: '/vista2', name: 'vista2', component: Link1View },
  { path: '/vista3', name: 'vista3', component: Link1View },
  { path: '/vista4', name: 'vista4', component: Link1View },
  { path: '/vista5', name: 'vista5', component: Link1View },
  { path: '/vista6', name: 'vista6', component: Link1View },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
