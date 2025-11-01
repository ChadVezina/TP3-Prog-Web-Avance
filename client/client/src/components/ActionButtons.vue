<!-- Composant pour les boutons d'action (Soumettre et Annuler) -->
<template>
  <div class="flex gap-4">
    <!-- Bouton de soumission -->
    <button
      type="submit"
      :disabled="loading"
      class="flex-1 px-6 py-3 bg-green-600 text-white rounded text-base font-semibold transition-colors hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {{ loading ? submittingLabel : submitLabel }}
    </button>

    <!-- Bouton d'annulation -->
    <button
      type="button"
      @click="$emit('cancel')"
      :disabled="loading"
      class="flex-1 px-6 py-3 bg-gray-500 text-white rounded text-base font-semibold transition-colors hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {{ cancelLabel }}
    </button>
  </div>
</template>

<script setup>
// Définition des props du composant
defineProps({
  loading: { type: Boolean, default: false }, // Indique si un chargement est en cours
  submitLabel: { type: String, default: "Ajouter le forfait" }, // Texte du bouton de soumission
  submittingLabel: { type: String, default: "Ajout en cours..." }, // Texte affiché pendant le chargement
  cancelLabel: { type: String, default: "Annuler" }, // Texte du bouton d'annulation
});
</script>
