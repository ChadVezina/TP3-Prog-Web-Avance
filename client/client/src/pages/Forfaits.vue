<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import ForfaitsDataService from "../services/ForfaitsDataService.js";

const router = useRouter();

const forfaits = ref([]);
const loading = ref(false);
const error = ref(null);

/**
 * Récupère la liste de tous les forfaits depuis l'API
 */
const chargerForfaits = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await ForfaitsDataService.getAll();
    forfaits.value = response.data || response;
  } catch (err) {
    console.error("Erreur lors du chargement des forfaits:", err);
    error.value = "Impossible de charger les forfaits";
  } finally {
    loading.value = false;
  }
};

/**
 * Charge les forfaits au montage du composant
 */
onMounted(() => {
  chargerForfaits();
});

/**
 * Naviguer vers la page d'édition du forfait
 */
const editerForfait = (id) => {
  router.push(`/forfaits/${id}`);
};

/**
 * Supprime un forfait via l'API
 */
const supprimerForfait = async (id) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce forfait ?")) {
    try {
      await ForfaitsDataService.delete(id);

      // Retirer le forfait de la liste
      forfaits.value = forfaits.value.filter((f) => f.id !== id);
    } catch (err) {
      console.error("Erreur lors de la suppression du forfait:", err);
      error.value = "Erreur lors de la suppression du forfait";
    }
  }
};

/**
 * Convertit différentes représentations de prix en nombre et renvoie une chaîne formatée
 * Accepte des nombres, des chaînes contenant des nombres (ex: "123.45", "123,45", "$123.45")
 * Retourne toujours une chaîne avec 2 décimales (ex: "0.00", "123.45").
 */
const parsePrix = (val) => {
  if (val === null || val === undefined) return 0;
  if (typeof val === "number") return val;

  // Normaliser en string
  let s = String(val).trim();
  // Remplacer la virgule décimale par un point (fr-FR -> 123,45)
  s = s.replace(/,/g, ".");
  // Enlever tout caractère non numérique sauf le point et le signe -
  s = s.replace(/[^0-9.\-]/g, "");

  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
};

const formatPrix = (val) => {
  const n = parsePrix(val);
  // toFixed existe toujours sur les Number primitives
  return n.toFixed(2);
};
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-semibold text-gray-800 mb-4">
      Nos forfaits touristiques
    </h1>

    <!-- Messages d'erreur -->
    <div v-if="error" class="mb-6 p-4 bg-red-100 text-red-800 rounded">
      {{ error }}
    </div>

    <!-- État de chargement -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-600">Chargement des forfaits...</p>
    </div>

    <!-- Contenu principal -->
    <div v-else>
      <div class="mb-8">
        <RouterLink
          to="/forfaits/ajouter"
          class="inline-block px-6 py-3 bg-green-600 text-white rounded cursor-pointer text-base mb-4 transition-colors hover:bg-green-700 no-underline"
        >
          + Ajouter un forfait
        </RouterLink>
      </div>

      <!-- Liste des forfaits -->
      <div v-if="forfaits.length === 0" class="text-center py-12">
        <p class="text-gray-600">Aucun forfait disponible pour le moment.</p>
      </div>

      <div
        v-else
        class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8"
      >
        <div
          v-for="forfait in forfaits"
          :key="forfait.id"
          class="bg-white border border-gray-200 rounded p-6 shadow transition hover:-translate-y-1 hover:shadow-md"
        >
          <!-- Image -->
          <div v-if="forfait.image" class="mb-4 overflow-hidden rounded">
            <img
              :src="forfait.image"
              :alt="forfait.nom"
              class="w-full h-40 object-cover rounded"
            />
          </div>

          <!-- Titre et catégorie -->
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-blue-600 font-semibold text-lg">
              {{ forfait.nom }}
            </h3>
            <span
              v-if="forfait.categorie"
              class="inline-block bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded"
              >{{ forfait.categorie }}</span
            >
          </div>

          <!-- Description -->
          <p class="text-gray-600 mb-4 line-clamp-2">
            {{ forfait.description }}
          </p>

          <!-- Prix -->
          <p class="text-2xl text-green-600 font-bold mb-4">
            ${{ formatPrix(forfait.prix) }}
          </p>

          <!-- Dates -->
          <p
            v-if="forfait.created_at || forfait.updated_at"
            class="text-xs text-gray-400 mb-4"
          >
            Créé:
            {{
              forfait.created_at
                ? new Date(forfait.created_at).toLocaleString("fr-FR")
                : "—"
            }}<br />
            Mis à jour:
            {{
              forfait.updated_at
                ? new Date(forfait.updated_at).toLocaleString("fr-FR")
                : "—"
            }}
          </p>

          <!-- Boutons d'action -->
          <div class="flex gap-2">
            <button
              @click="editerForfait(forfait.id)"
              class="flex-1 px-4 py-2 rounded bg-yellow-400 text-black font-semibold transition-colors hover:bg-yellow-500"
            >
              Modifier
            </button>
            <button
              @click="supprimerForfait(forfait.id)"
              class="flex-1 px-4 py-2 rounded bg-red-600 text-white font-semibold transition-colors hover:bg-red-700"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
