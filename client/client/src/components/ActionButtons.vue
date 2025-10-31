<template>
  <div class="flex gap-4">
    <button
      type="submit"
      :disabled="loading"
      class="flex-1 px-6 py-3 bg-green-600 text-white rounded text-base font-semibold transition-colors hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {{ loading ? submittingLabel : submitLabel }}
    </button>

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
defineProps({
  loading: { type: Boolean, default: false },
  submitLabel: { type: String, default: 'Ajouter le forfait' },
  submittingLabel: { type: String, default: 'Ajout en cours...' },
  cancelLabel: { type: String, default: 'Annuler' },
});
</script>
