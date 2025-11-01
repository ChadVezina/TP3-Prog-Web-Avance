<!-- Composant d'en-tête de section réutilisable avec titre, sous-titre et soulignement décoratif -->
<template>
  <header class="section-header text-center mb-12" :class="alignmentClass">
    <!-- Titre principal avec accent optionnel -->
    <h2
      class="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
      :class="titleClass"
    >
      {{ title }}
      <span v-if="accent" class="block text-blue-600 mt-2" :class="accentClass">
        {{ accent }}
      </span>
    </h2>

    <!-- Ligne de soulignement décorative -->
    <div
      v-if="showUnderline"
      class="w-24 h-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full mb-6"
      :class="underlinePosition"
      aria-hidden="true"
    ></div>

    <!-- Sous-titre (si fourni) -->
    <p
      v-if="subtitle"
      class="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed"
      :class="subtitlePosition"
    >
      {{ subtitle }}
    </p>

    <!-- Slot pour contenu supplémentaire -->
    <slot></slot>
  </header>
</template>

<script setup>
import { computed } from "vue";

// Définition des props du composant
const props = defineProps({
  title: {
    type: String,
    required: true, // Titre principal (requis)
  },
  subtitle: {
    type: String,
    default: "", // Sous-titre optionnel
  },
  accent: {
    type: String,
    default: "", // Texte d'accent optionnel
  },
  alignment: {
    type: String,
    default: "center", // Alignement du texte (left, center, right)
    validator: (value) => ["left", "center", "right"].includes(value),
  },
  showUnderline: {
    type: Boolean,
    default: true, // Afficher la ligne de soulignement
  },
  size: {
    type: String,
    default: "default", // Taille du texte (small, default, large)
    validator: (value) => ["small", "default", "large"].includes(value),
  },
});

// Classe CSS pour l'alignement du texte
const alignmentClass = computed(() => {
  const alignments = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
  return alignments[props.alignment];
});

// Classe CSS pour la taille du titre
const titleClass = computed(() => {
  const sizes = {
    small: "text-2xl md:text-3xl",
    default: "text-3xl md:text-4xl",
    large: "text-4xl md:text-5xl",
  };
  return sizes[props.size];
});

// Classe CSS pour la taille de l'accent
const accentClass = computed(() => {
  const sizes = {
    small: "text-xl md:text-2xl",
    default: "text-2xl md:text-3xl",
    large: "text-3xl md:text-4xl",
  };
  return sizes[props.size];
});

// Classe CSS pour la position du soulignement
const underlinePosition = computed(() => {
  const positions = {
    left: "mr-auto",
    center: "mx-auto",
    right: "ml-auto",
  };
  return positions[props.alignment];
});

// Classe CSS pour la position du sous-titre
const subtitlePosition = computed(() => {
  const positions = {
    left: "mr-auto",
    center: "mx-auto",
    right: "ml-auto",
  };
  return positions[props.alignment];
});
</script>
