import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Link1View from '../views/link1.vue';
import jovenImage from '../images/fotos/joven.jpg';
import masonImage from '../images/fotos/mason.png';
import mujer1Image from '../images/fotos/mujer1.jpg';
import mujer2Image from '../images/fotos/mujer2.jpg';
import kiraImage from '../images/fotos/kira.png';
import yoImage from '../images/fotos/yo.jpg';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/vista1', name: 'vista1', component: Link1View, props: { image: yoImage } },
  { path: '/vista2', name: 'vista2', component: Link1View, props: { image: jovenImage } },
  { path: '/vista3', name: 'vista3', component: Link1View, props: { image: masonImage } },
  { path: '/vista4', name: 'vista4', component: Link1View, props: { image: mujer1Image } },
  { path: '/vista5', name: 'vista5', component: Link1View, props: { image: mujer2Image } },
  { path: '/vista6', name: 'vista6', component: Link1View, props: { image: kiraImage } },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
