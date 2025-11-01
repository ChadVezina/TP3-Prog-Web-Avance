<!-- Composant de carte d'information avec bordure latérale colorée et icône -->
<template>
  <article
    class="info-card bg-white rounded-lg shadow-md p-6 border-l-4 transition-all duration-300 hover:shadow-lg"
    :class="[borderColorClass, cardClass]"
    role="article"
  >
    <div class="flex items-start gap-4">
      <!-- Icône optionnelle -->
      <div
        v-if="showIcon"
        class="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
        :class="iconBgClass"
        :aria-hidden="true"
      >
        <span class="text-2xl" role="img" :aria-label="iconAriaLabel">
          {{ icon }}
        </span>
      </div>

      <!-- Contenu de la carte -->
      <div class="flex-1 min-w-0">
        <!-- Titre de la carte (si fourni) -->
        <h3 v-if="title" class="text-lg font-semibold text-gray-800 mb-2">
          {{ title }}
        </h3>

        <!-- Slot pour contenu personnalisé -->
        <div class="space-y-2">
          <slot></slot>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from "vue";

// Définition des props du composant
const props = defineProps({
  title: {
    type: String,
    default: "", // Titre de la carte (optionnel)
  },
  icon: {
    type: String,
    default: "ℹ️", // Icône par défaut
  },
  iconAriaLabel: {
    type: String,
    default: "Information", // Label d'accessibilité
  },
  showIcon: {
    type: Boolean,
    default: true, // Afficher l'icône
  },
  variant: {
    type: String,
    default: "blue", // Couleur du thème
    validator: (value) =>
      ["blue", "green", "purple", "orange", "gray"].includes(value),
  },
  elevated: {
    type: Boolean,
    default: false, // Ombre plus prononcée
  },
});

// Classe CSS pour la couleur de la bordure latérale
const borderColorClass = computed(() => {
  const colors = {
    blue: "border-blue-500",
    green: "border-green-500",
    purple: "border-purple-500",
    orange: "border-orange-500",
    gray: "border-gray-400",
  };
  return colors[props.variant];
});

// Classe CSS pour le fond et la couleur de l'icône
const iconBgClass = computed(() => {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    gray: "bg-gray-100 text-gray-600",
  };
  return colors[props.variant];
});

// Classe CSS pour l'élévation de la carte
const cardClass = computed(() => {
  return props.elevated ? "shadow-lg" : "";
});
</script>
