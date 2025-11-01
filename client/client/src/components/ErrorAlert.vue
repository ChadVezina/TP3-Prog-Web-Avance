<!-- Composant d'alerte d'erreur -->
<template>
  <!-- Affiche le message d'erreur si présent -->
  <div v-if="message" class="mb-6 p-4 bg-red-100 text-red-800 rounded">
    {{ message }}
  </div>
</template>

<script setup>
// Définition des props du composant
defineProps({
  message: { type: String, default: "" }, // Message d'erreur à afficher
});
</script>
