<!-- Composant de champ de saisie réutilisable pour les formulaires -->
<template>
  <div class="mb-6">
    <!-- Label du champ avec indicateur de champ requis -->
    <label :for="id" class="block mb-2 font-bold text-gray-800">
      {{ label }} <span v-if="required" class="text-red-600">*</span>
    </label>

    <!-- Champ de saisie avec gestion des événements v-model -->
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :step="step"
      :min="min"
      :required="required"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="inputClass"
      class="w-full p-3 border rounded text-base focus:outline-none focus:ring-2"
    />

    <!-- Message d'aide -->
    <p v-if="help" class="mt-1 text-sm text-gray-500">{{ help }}</p>
    <!-- Message d'erreur -->
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Définition des props du composant
const props = defineProps({
  modelValue: [String, Number], // Valeur du champ (liaison bidirectionnelle)
  id: { type: String, default: "" }, // ID du champ pour le label
  label: { type: String, default: "" }, // Texte du label
  type: { type: String, default: "text" }, // Type de champ (text, number, email, etc.)
  placeholder: { type: String, default: "" }, // Texte de placeholder
  required: { type: Boolean, default: false }, // Indique si le champ est requis
  error: { type: String, default: "" }, // Message d'erreur à afficher
  help: { type: String, default: "" }, // Message d'aide
  step: { type: [String, Number], default: undefined }, // Pas pour les champs numériques
  min: { type: [String, Number], default: undefined }, // Valeur minimale
});

// Classes CSS calculées en fonction de l'état d'erreur
const inputClass = computed(() => {
  const base = "border-gray-300";
  const errorClass = props.error
    ? "border-red-600 focus:ring-red-300" // Style d'erreur
    : "focus:ring-blue-500"; // Style normal
  return `${base} ${errorClass}`;
});
</script>
