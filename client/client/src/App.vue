<!-- Composant racine de l'application -->
<script setup>
// Importation du composant de pied de page
import FooterSection from "./components/FooterSection.vue";
</script>

<template>
  <!-- Conteneur principal de l'application avec flexbox pour le footer collant -->
  <div id="app" class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Barre de navigation principale -->
    <nav class="bg-gray-800 py-4 shadow relative z-50">
      <div class="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <!-- Logo/Titre de l'application -->
        <router-link
          to="/"
          class="text-white text-xl font-bold transition-colors hover:text-blue-500"
        >
          Agence de Voyage
        </router-link>
        <!-- Menu de navigation -->
        <ul class="flex list-none gap-8">
          <li>
            <!-- Lien vers la page d'accueil -->
            <router-link
              to="/"
              class="text-white no-underline px-4 py-2 rounded transition-colors hover:text-blue-500 hover:bg-blue-500/10"
              active-class="text-blue-500 bg-blue-500/10"
            >
              Accueil
            </router-link>
          </li>
          <li>
            <!-- Lien vers la page des forfaits -->
            <router-link
              to="/forfaits"
              class="text-white no-underline px-4 py-2 rounded transition-colors hover:text-blue-500 hover:bg-blue-500/10"
              active-class="text-blue-500 bg-blue-500/10"
            >
              Forfaits
            </router-link>
          </li>
          <li>
            <!-- Lien vers la page À propos -->
            <router-link
              to="/a-propos"
              class="text-white no-underline px-4 py-2 rounded transition-colors hover:text-blue-500 hover:bg-blue-500/10"
              active-class="text-blue-500 bg-blue-500/10"
            >
              À Propos
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <!-- Zone de contenu principale où les pages sont affichées -->
    <main class="max-w-6xl mx-auto px-4 flex-1">
      <router-view />
    </main>
    <!-- Pied de page -->
    <FooterSection />
  </div>
</template>
