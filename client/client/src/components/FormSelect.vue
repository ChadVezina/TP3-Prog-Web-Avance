<!-- Composant de liste déroulante réutilisable pour les formulaires -->
<template>
  <div class="mb-8">
    <!-- Label du champ de sélection -->
    <label :for="id" class="block mb-2 font-bold text-gray-800">
      {{ label }}
    </label>

    <!-- Liste déroulante avec gestion des événements v-model -->
    <select
      :id="id"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :class="selectClass"
      class="w-full p-3 border rounded text-base focus:outline-none focus:ring-2"
    >
      <!-- Option par défaut (vide) -->
      <option value="">-- {{ placeholder }} --</option>
      <!-- Options générées dynamiquement -->
      <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
    </select>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Définition des props du composant
const props = defineProps({
  modelValue: { type: String, default: "" }, // Valeur sélectionnée (liaison bidirectionnelle)
  id: { type: String, default: "" }, // ID du champ pour le label
  label: { type: String, default: "" }, // Texte du label
  options: { type: Array, default: () => [] }, // Liste des options disponibles
  placeholder: { type: String, default: "Sélectionnez une option" }, // Texte de l'option par défaut
});

// Classes CSS calculées pour le champ de sélection
const selectClass = computed(() => {
  return props.modelValue
    ? "border-gray-300 focus:ring-blue-500"
    : "border-gray-300 focus:ring-blue-500";
});
</script>
