// Importation des fonctions de création du routeur Vue
import { createRouter, createWebHistory } from "vue-router";

// Importation des composants de page
import Accueil from "../pages/Accueil.vue";
import Forfaits from "../pages/Forfaits.vue";
import APropos from "../pages/APropos.vue";
import AjouterForfait from "../pages/AjouterForfait.vue";
import EditerForfait from "../pages/EditerForfait.vue";

// Définition des routes de l'application
const routes = [
  {
    path: "/", // Route de la page d'accueil
    name: "Accueil",
    component: Accueil,
  },
  {
    path: "/forfaits", // Route de la liste des forfaits
    name: "Forfaits",
    component: Forfaits,
  },
  {
    path: "/forfaits/ajouter", // Route pour ajouter un nouveau forfait
    name: "AjouterForfait",
    component: AjouterForfait,
  },
  {
    path: "/forfaits/:id", // Route dynamique pour éditer un forfait (avec paramètre id)
    name: "EditerForfait",
    component: EditerForfait,
  },
  {
    path: "/a-propos", // Route de la page À propos
    name: "APropos",
    component: APropos,
  },
];

// Création de l'instance du routeur avec l'historique HTML5
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Exportation du routeur pour l'utilisation dans main.js
export default router;
