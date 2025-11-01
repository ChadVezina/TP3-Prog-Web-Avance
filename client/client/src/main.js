// Point d'entrée principal de l'application Vue
import { createApp } from "vue";
import "./style.css"; // Importation des styles globaux
import App from "./App.vue"; // Composant racine de l'application
import router from "./router"; // Configuration du routeur Vue Router

// Création de l'instance de l'application Vue
const app = createApp(App);

// Ajout du plugin de routage
app.use(router);

// Montage de l'application sur l'élément DOM avec l'id "app"
app.mount("#app");
