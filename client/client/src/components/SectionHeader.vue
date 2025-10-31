<template>
  <header class="section-header text-center mb-12" :class="alignmentClass">
    <h2
      class="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
      :class="titleClass"
    >
      {{ title }}
      <span v-if="accent" class="block text-blue-600 mt-2" :class="accentClass">
        {{ accent }}
      </span>
    </h2>

    <div
      v-if="showUnderline"
      class="w-24 h-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full mb-6"
      :class="underlinePosition"
      aria-hidden="true"
    ></div>

    <p
      v-if="subtitle"
      class="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed"
      :class="subtitlePosition"
    >
      {{ subtitle }}
    </p>

    <slot></slot>
  </header>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
  accent: {
    type: String,
    default: "",
  },
  alignment: {
    type: String,
    default: "center",
    validator: (value) => ["left", "center", "right"].includes(value),
  },
  showUnderline: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: "default",
    validator: (value) => ["small", "default", "large"].includes(value),
  },
});

const alignmentClass = computed(() => {
  const alignments = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
  return alignments[props.alignment];
});

const titleClass = computed(() => {
  const sizes = {
    small: "text-2xl md:text-3xl",
    default: "text-3xl md:text-4xl",
    large: "text-4xl md:text-5xl",
  };
  return sizes[props.size];
});

const accentClass = computed(() => {
  const sizes = {
    small: "text-xl md:text-2xl",
    default: "text-2xl md:text-3xl",
    large: "text-3xl md:text-4xl",
  };
  return sizes[props.size];
});

const underlinePosition = computed(() => {
  const positions = {
    left: "mr-auto",
    center: "mx-auto",
    right: "ml-auto",
  };
  return positions[props.alignment];
});

const subtitlePosition = computed(() => {
  const positions = {
    left: "mr-auto",
    center: "mx-auto",
    right: "ml-auto",
  };
  return positions[props.alignment];
});
</script>
