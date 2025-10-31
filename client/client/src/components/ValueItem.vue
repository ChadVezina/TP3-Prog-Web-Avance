<template>
  <li class="value-item group">
    <article
      class="flex items-start gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-blue-50"
      role="article"
    >
      <div
        class="shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 group-hover:scale-110 transition-transform duration-300"
        :aria-hidden="true"
      >
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
        <span v-else class="text-2xl" role="img" :aria-label="iconAriaLabel">
          {{ icon }}
        </span>
      </div>

      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-bold text-gray-800 mb-2">
          {{ title }}
        </h3>
        <p class="text-gray-600 leading-relaxed">
          {{ description }}
        </p>
        <slot></slot>
      </div>
    </article>
  </li>
</template>

<script setup>
defineProps({
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
    default: "✓",
  },
  iconAriaLabel: {
    type: String,
    default: "Check mark",
  },
  showCheckmark: {
    type: Boolean,
    default: true,
  },
});
</script>
