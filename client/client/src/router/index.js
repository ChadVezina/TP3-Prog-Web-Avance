import { createRouter, createWebHistory } from "vue-router";
import Accueil from "../pages/Accueil.vue";
import Forfaits from "../pages/Forfaits.vue";
import APropos from "../pages/APropos.vue";
import AjouterForfait from "../pages/AjouterForfait.vue";
import EditerForfait from "../pages/EditerForfait.vue";

const routes = [
  {
    path: "/",
    name: "Accueil",
    component: Accueil,
  },
  {
    path: "/forfaits",
    name: "Forfaits",
    component: Forfaits,
  },
  {
    path: "/forfaits/ajouter",
    name: "AjouterForfait",
    component: AjouterForfait,
  },
  {
    path: "/forfaits/:id",
    name: "EditerForfait",
    component: EditerForfait,
  },
  {
    path: "/a-propos",
    name: "APropos",
    component: APropos,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
