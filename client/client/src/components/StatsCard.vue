<!-- Composant de carte de statistique avec animation de compteur -->
<template>
  <div class="stats-card text-center p-6" :class="cardClass">
    <!-- Icône de la statistique -->
    <div
      class="stat-icon mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full"
      :class="iconBgClass"
      :aria-hidden="true"
    >
      <span class="text-3xl" role="img" :aria-label="iconAriaLabel">
        {{ icon }}
      </span>
    </div>

    <!-- Valeur numérique animée -->
    <div
      class="stat-value text-4xl md:text-5xl font-bold mb-2"
      :class="valueColorClass"
    >
      <span v-if="prefix">{{ prefix }}</span>
      <span ref="numberRef">{{ animatedValue }}</span>
      <span v-if="suffix">{{ suffix }}</span>
    </div>

    <!-- Label de la statistique -->
    <h3 class="stat-label text-lg font-semibold text-gray-700 mb-2">
      {{ label }}
    </h3>

    <!-- Description optionnelle -->
    <p v-if="description" class="text-sm text-gray-500">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";

// Définition des props du composant
const props = defineProps({
  value: {
    type: Number,
    required: true, // Valeur numérique à afficher (requis)
  },
  label: {
    type: String,
    required: true, // Label de la statistique (requis)
  },
  description: {
    type: String,
    default: "", // Description optionnelle
  },
  icon: {
    type: String,
    default: "📊", // Icône par défaut
  },
  iconAriaLabel: {
    type: String,
    default: "Statistics", // Label d'accessibilité
  },
  prefix: {
    type: String,
    default: "", // Préfixe (ex: "$")
  },
  suffix: {
    type: String,
    default: "", // Suffixe (ex: "%", "+")
  },
  duration: {
    type: Number,
    default: 2000, // Durée de l'animation en millisecondes
  },
  variant: {
    type: String,
    default: "blue", // Variante de couleur
    validator: (value) => ["blue", "green", "purple", "orange"].includes(value),
  },
  animate: {
    type: Boolean,
    default: true, // Activer l'animation
  },
});

// État réactif pour la valeur animée
const animatedValue = ref(0);
const numberRef = ref(null);

// Classe CSS pour le fond de l'icône
const iconBgClass = computed(() => {
  const colors = {
    blue: "bg-blue-100",
    green: "bg-green-100",
    purple: "bg-purple-100",
    orange: "bg-orange-100",
  };
  return colors[props.variant];
});

// Classe CSS pour la couleur de la valeur
const valueColorClass = computed(() => {
  const colors = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
  };
  return colors[props.variant];
});

// Classe CSS pour l'effet hover sur la carte
const cardClass = computed(() => {
  return "transform transition-transform duration-300 hover:scale-105";
});

// Fonction pour animer le compteur numérique
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

    // Fonction d'easing pour une animation fluide
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

// Déclenche l'animation au montage du composant
onMounted(() => {
  // Utilise IntersectionObserver pour déclencher l'animation quand visible
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

// Surveille les changements de valeur
watch(
  () => props.value,
  () => {
    if (!props.animate) {
      animatedValue.value = props.value;
    }
  }
);
</script>
