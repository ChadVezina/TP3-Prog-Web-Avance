<script setup>
import FooterSection from "./components/FooterSection.vue";
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50 flex flex-col">
    <nav class="bg-gray-800 py-4 shadow relative z-50">
      <div class="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <router-link
          to="/"
          class="text-white text-xl font-bold transition-colors hover:text-blue-500"
        >
          Agence de Voyage
        </router-link>
        <ul class="flex list-none gap-8">
          <li>
            <router-link
              to="/"
              class="text-white no-underline px-4 py-2 rounded transition-colors hover:text-blue-500 hover:bg-blue-500/10"
              active-class="text-blue-500 bg-blue-500/10"
            >
              Accueil
            </router-link>
          </li>
          <li>
            <router-link
              to="/forfaits"
              class="text-white no-underline px-4 py-2 rounded transition-colors hover:text-blue-500 hover:bg-blue-500/10"
              active-class="text-blue-500 bg-blue-500/10"
            >
              Forfaits
            </router-link>
          </li>
          <li>
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
    <main class="max-w-6xl mx-auto px-4 flex-1">
      <router-view />
    </main>
    <FooterSection />
  </div>
</template>
