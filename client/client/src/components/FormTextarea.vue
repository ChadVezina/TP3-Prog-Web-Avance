<!-- Composant de zone de texte multiligne réutilisable pour les formulaires -->
<template>
  <div class="mb-6">
    <!-- Label du champ avec indicateur de champ requis -->
    <label :for="id" class="block mb-2 font-bold text-gray-800">
      {{ label }} <span v-if="required" class="text-red-600">*</span>
    </label>

    <!-- Zone de texte multiligne avec gestion des événements v-model -->
    <textarea
      :id="id"
      :placeholder="placeholder"
      :rows="rows"
      :required="required"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="textareaClass"
      class="w-full p-3 border rounded text-base resize-y focus:outline-none focus:ring-2"
    ></textarea>

    <!-- Message d'erreur -->
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Définition des props du composant
const props = defineProps({
  modelValue: { type: String, default: "" }, // Valeur du champ (liaison bidirectionnelle)
  id: { type: String, default: "" }, // ID du champ pour le label
  label: { type: String, default: "" }, // Texte du label
  placeholder: { type: String, default: "" }, // Texte de placeholder
  rows: { type: [String, Number], default: 4 }, // Nombre de lignes visibles
  required: { type: Boolean, default: false }, // Indique si le champ est requis
  error: { type: String, default: "" }, // Message d'erreur à afficher
});

// Classes CSS calculées en fonction de l'état d'erreur
const textareaClass = computed(() => {
  const base = "border-gray-300";
  const errorClass = props.error
    ? "border-red-600 focus:ring-red-300" // Style d'erreur
    : "focus:ring-blue-500"; // Style normal
  return `${base} ${errorClass}`;
});
</script>
