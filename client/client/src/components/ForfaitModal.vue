<script setup>
import { computed } from "vue";

const props = defineProps({
  forfait: {
    type: Object,
    default: null,
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

/**
 * Ferme le modal
 */
const closeModal = () => {
  emit("close");
};

/**
 * Convertit et formate le prix
 */
const parsePrix = (val) => {
  if (val === null || val === undefined) return 0;
  if (typeof val === "number") return val;

  let s = String(val).trim();
  s = s.replace(/,/g, ".");
  s = s.replace(/[^0-9.\-]/g, "");

  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
};

const formatPrix = (val) => {
  const n = parsePrix(val);
  return n.toFixed(2);
};

/**
 * Formate la date
 */
const formatDate = (dateString) => {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<template>
  <!-- Overlay -->
  <Transition name="fade">
    <div
      v-if="show && forfait"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <!-- Modal Content -->
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden transform transition-all animate-scale-in"
      >
        <!-- Header avec bouton fermer -->
        <div class="relative">
          <!-- Image -->
          <div
            class="relative h-64 bg-linear-to-br from-blue-400 to-blue-600 overflow-hidden"
          >
            <img
              v-if="forfait.image"
              :src="forfait.image"
              :alt="forfait.nom"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="flex items-center justify-center h-full text-white text-8xl"
            >
              🌍
            </div>

            <!-- Badge catégorie -->
            <div v-if="forfait.categorie" class="absolute top-4 left-4">
              <span
                class="inline-block bg-white/90 backdrop-blur-sm text-blue-800 text-sm font-semibold px-4 py-2 rounded-full shadow-lg"
              >
                {{ forfait.categorie }}
              </span>
            </div>

            <!-- Bouton fermer -->
            <button
              @click="closeModal"
              class="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-gray-900 transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-white/50"
              aria-label="Fermer le modal"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Contenu scrollable -->
        <div class="overflow-y-auto max-h-[calc(90vh-16rem)] p-8">
          <!-- Titre -->
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            {{ forfait.nom }}
          </h2>

          <!-- Prix -->
          <div class="mb-6 pb-6 border-b border-gray-200">
            <div class="flex items-baseline gap-2">
              <div class="text-4xl font-bold text-green-600">
                {{ formatPrix(forfait.prix) }} $
              </div>
              <div class="text-lg text-gray-500">par personne</div>
            </div>
          </div>

          <!-- Description -->
          <div class="mb-6">
            <h3
              class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2"
            >
              <svg
                class="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Description
            </h3>
            <p class="text-gray-700 leading-relaxed whitespace-pre-line">
              {{ forfait.description }}
            </p>
          </div>

          <!-- Informations supplémentaires -->
          <div class="bg-gray-50 rounded-xl p-6 space-y-3">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Informations
            </h3>

            <!-- Catégorie -->
            <div class="flex items-center gap-3">
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <div>
                <div class="text-sm text-gray-500">Catégorie</div>
                <div class="font-medium text-gray-900">
                  {{ forfait.categorie || "Non spécifié" }}
                </div>
              </div>
            </div>

            <!-- Date de création -->
            <div v-if="forfait.created_at" class="flex items-center gap-3">
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div>
                <div class="text-sm text-gray-500">Date de création</div>
                <div class="font-medium text-gray-900">
                  {{ formatDate(forfait.created_at) }}
                </div>
              </div>
            </div>

            <!-- Date de mise à jour -->
            <div v-if="forfait.updated_at" class="flex items-center gap-3">
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <div class="text-sm text-gray-500">Dernière mise à jour</div>
                <div class="font-medium text-gray-900">
                  {{ formatDate(forfait.updated_at) }}
                </div>
              </div>
            </div>

            <!-- ID du forfait -->
            <div class="flex items-center gap-3">
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                />
              </svg>
              <div>
                <div class="text-sm text-gray-500">Référence</div>
                <div class="font-medium text-gray-900">{{ forfait.id }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
