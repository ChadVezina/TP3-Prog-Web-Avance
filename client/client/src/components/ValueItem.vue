<!-- Composant d'élément de valeur/avantage avec coche et animation au survol -->
<template>
  <li class="value-item group">
    <article
      class="flex items-start gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-blue-50"
      role="article"
    >
      <!-- Icône/Coche -->
      <div
        class="shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 group-hover:scale-110 transition-transform duration-300"
        :aria-hidden="true"
      >
        <!-- SVG de coche si showCheckmark est vrai -->
        <svg
          v-if="showCheckmark"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <!-- Sinon, affiche l'icône personnalisée -->
        <span v-else class="text-2xl" role="img" :aria-label="iconAriaLabel">
          {{ icon }}
        </span>
      </div>

      <!-- Contenu de l'élément -->
      <div class="flex-1 min-w-0">
        <!-- Titre -->
        <h3 class="text-lg font-bold text-gray-800 mb-2">
          {{ title }}
        </h3>
        <!-- Description -->
        <p class="text-gray-600 leading-relaxed">
          {{ description }}
        </p>
        <!-- Slot pour contenu supplémentaire -->
        <slot></slot>
      </div>
    </article>
  </li>
</template>

<script setup>
// Définition des props du composant
defineProps({
  title: {
    type: String,
    required: true, // Titre de l'élément (requis)
  },
  description: {
    type: String,
    required: true, // Description de l'élément (requis)
  },
  icon: {
    type: String,
    default: "✓", // Icône par défaut
  },
  iconAriaLabel: {
    type: String,
    default: "Check mark", // Label d'accessibilité
  },
  showCheckmark: {
    type: Boolean,
    default: true, // Afficher la coche SVG
  },
});
</script>
