import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '../pages/Accueil.vue';
import Forfaits from '../pages/Forfaits.vue';
import APropos from '../pages/APropos.vue';

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/forfaits',
    name: 'Forfaits',
    component: Forfaits
  },
  {
    path: '/a-propos',
    name: 'APropos',
    component: APropos
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
