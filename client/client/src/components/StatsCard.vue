<template>
  <div class="stats-card text-center p-6" :class="cardClass">
    <div
      class="stat-icon mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full"
      :class="iconBgClass"
      :aria-hidden="true"
    >
      <span class="text-3xl" role="img" :aria-label="iconAriaLabel">
        {{ icon }}
      </span>
    </div>

    <div
      class="stat-value text-4xl md:text-5xl font-bold mb-2"
      :class="valueColorClass"
    >
      <span v-if="prefix">{{ prefix }}</span>
      <span ref="numberRef">{{ animatedValue }}</span>
      <span v-if="suffix">{{ suffix }}</span>
    </div>

    <h3 class="stat-label text-lg font-semibold text-gray-700 mb-2">
      {{ label }}
    </h3>

    <p v-if="description" class="text-sm text-gray-500">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "📊",
  },
  iconAriaLabel: {
    type: String,
    default: "Statistics",
  },
  prefix: {
    type: String,
    default: "",
  },
  suffix: {
    type: String,
    default: "",
  },
  duration: {
    type: Number,
    default: 2000,
  },
  variant: {
    type: String,
    default: "blue",
    validator: (value) => ["blue", "green", "purple", "orange"].includes(value),
  },
  animate: {
    type: Boolean,
    default: true,
  },
});

const animatedValue = ref(0);
const numberRef = ref(null);

const iconBgClass = computed(() => {
  const colors = {
    blue: "bg-blue-100",
    green: "bg-green-100",
    purple: "bg-purple-100",
    orange: "bg-orange-100",
  };
  return colors[props.variant];
});

const valueColorClass = computed(() => {
  const colors = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
  };
  return colors[props.variant];
});

const cardClass = computed(() => {
  return "transform transition-transform duration-300 hover:scale-105";
});

const animateNumber = () => {
  if (!props.animate) {
    animatedValue.value = props.value;
    return;
  }

  const startTime = Date.now();
  const startValue = 0;
  const endValue = props.value;
  const duration = props.duration;

  const updateValue = () => {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);

    animatedValue.value = Math.floor(
      startValue + (endValue - startValue) * easeOutQuart
    );

    if (progress < 1) {
      requestAnimationFrame(updateValue);
    } else {
      animatedValue.value = endValue;
    }
  };

  requestAnimationFrame(updateValue);
};

onMounted(() => {
  // Use Intersection Observer to trigger animation when visible
  if ("IntersectionObserver" in window && props.animate) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateNumber();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (numberRef.value) {
      observer.observe(numberRef.value);
    }
  } else {
    animatedValue.value = props.value;
  }
});

watch(
  () => props.value,
  () => {
    if (!props.animate) {
      animatedValue.value = props.value;
    }
  }
);
</script>
