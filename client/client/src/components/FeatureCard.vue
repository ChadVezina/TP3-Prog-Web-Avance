<template>
  <article
    class="feature-card bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
    :class="cardClass"
    role="article"
  >
    <div
      class="icon-wrapper mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full"
      :class="iconBgClass"
      :aria-hidden="true"
    >
      <component
        :is="iconComponent"
        v-if="iconComponent"
        class="w-8 h-8"
        :class="iconColorClass"
      />
      <span v-else class="text-3xl" role="img" :aria-label="iconAriaLabel">
        {{ icon }}
      </span>
    </div>

    <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-4">
      {{ title }}
    </h3>

    <p class="text-gray-600 leading-relaxed mb-4">
      {{ description }}
    </p>

    <router-link
      v-if="linkTo"
      :to="linkTo"
      class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
      :aria-label="`En savoir plus sur ${title}`"
    >
      {{ linkText }}
      <svg
        class="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </router-link>

    <slot></slot>
  </article>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "✨",
  },
  iconComponent: {
    type: Object,
    default: null,
  },
  iconAriaLabel: {
    type: String,
    default: "Icon",
  },
  iconColor: {
    type: String,
    default: "blue",
    validator: (value) =>
      ["blue", "green", "purple", "orange", "red"].includes(value),
  },
  linkTo: {
    type: String,
    default: "",
  },
  linkText: {
    type: String,
    default: "En savoir plus",
  },
  variant: {
    type: String,
    default: "default",
    validator: (value) => ["default", "compact"].includes(value),
  },
});

const iconBgClass = computed(() => {
  const colors = {
    blue: "bg-blue-100",
    green: "bg-green-100",
    purple: "bg-purple-100",
    orange: "bg-orange-100",
    red: "bg-red-100",
  };
  return colors[props.iconColor];
});

const iconColorClass = computed(() => {
  const colors = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
    red: "text-red-600",
  };
  return colors[props.iconColor];
});

const cardClass = computed(() => {
  return props.variant === "compact" ? "p-4 md:p-6" : "";
});
</script>
