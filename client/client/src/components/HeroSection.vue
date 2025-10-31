<template>
  <section
    class="hero-section relative overflow-hidden bg-linear-to-br from-blue-600 to-blue-800 text-white"
    :class="heightClass"
    role="banner"
  >
    <div class="absolute inset-0 bg-black opacity-20"></div>

    <div
      class="relative z-10 container mx-auto px-4 h-full flex items-center justify-center"
    >
      <div class="text-center max-w-4xl">
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in"
          :class="{ 'sr-only': !title }"
        >
          {{ title }}
        </h1>

        <p
          v-if="description"
          class="text-lg md:text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed animate-fade-in-delay"
        >
          {{ description }}
        </p>

        <div
          v-if="showCta"
          class="flex flex-wrap gap-4 justify-center animate-fade-in-delay-2"
        >
          <router-link
            v-if="ctaLink"
            :to="ctaLink"
            class="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-blue-50 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            :aria-label="ctaAriaLabel || ctaText"
          >
            {{ ctaText }}
            <svg
              v-if="showArrow"
              class="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </router-link>

          <slot name="additional-cta"></slot>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0">
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax">
          <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
          <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div>
  </section>
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
    default: "",
  },
  ctaText: {
    type: String,
    default: "En savoir plus",
  },
  ctaLink: {
    type: String,
    default: "",
  },
  ctaAriaLabel: {
    type: String,
    default: "",
  },
  showCta: {
    type: Boolean,
    default: true,
  },
  showArrow: {
    type: Boolean,
    default: true,
  },
  height: {
    type: String,
    default: "large",
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
});

const heightClass = computed(() => {
  const heights = {
    small: "h-64 md:h-80",
    medium: "h-96 md:h-[32rem]",
    large: "h-[32rem] md:h-[40rem]",
  };
  return heights[props.height];
});
</script>
