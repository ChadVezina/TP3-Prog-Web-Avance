<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import ForfaitsDataService from "../services/ForfaitsDataService.js";
import SectionHeader from "../components/SectionHeader.vue";
import ForfaitModal from "../components/ForfaitModal.vue";

const router = useRouter();

const forfaits = ref([]);
const loading = ref(false);
const error = ref(null);
const searchQuery = ref("");
const selectedCategorie = ref("");
const sortBy = ref("recent");
const showDeleteConfirm = ref(false);
const forfaitToDelete = ref(null);
const showForfaitModal = ref(false);
const selectedForfait = ref(null);

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
 * Ouvre la modal de confirmation de suppression
 */
const confirmerSuppression = (forfait) => {
  forfaitToDelete.value = forfait;
  showDeleteConfirm.value = true;
};

/**
 * Annule la suppression
 */
const annulerSuppression = () => {
  showDeleteConfirm.value = false;
  forfaitToDelete.value = null;
};

/**
 * Supprime un forfait via l'API
 */
const supprimerForfait = async () => {
  if (!forfaitToDelete.value) return;

  try {
    await ForfaitsDataService.delete(forfaitToDelete.value.id);
    // Retirer le forfait de la liste
    forfaits.value = forfaits.value.filter(
      (f) => f.id !== forfaitToDelete.value.id
    );
    showDeleteConfirm.value = false;
    forfaitToDelete.value = null;
  } catch (err) {
    console.error("Erreur lors de la suppression du forfait:", err);
    error.value = "Erreur lors de la suppression du forfait";
    showDeleteConfirm.value = false;
    forfaitToDelete.value = null;
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

/**
 * Liste unique des catégories disponibles
 */
const categories = computed(() => {
  const cats = new Set();
  forfaits.value.forEach((f) => {
    if (f.categorie && f.categorie.trim()) {
      cats.add(f.categorie.trim());
    }
  });
  return Array.from(cats).sort();
});

/**
 * Forfaits filtrés et triés
 */
const forfaitsFiltres = computed(() => {
  let result = [...forfaits.value];

  // Filtre par recherche
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (f) =>
        f.nom?.toLowerCase().includes(query) ||
        f.description?.toLowerCase().includes(query) ||
        f.categorie?.toLowerCase().includes(query)
    );
  }

  // Filtre par catégorie
  if (selectedCategorie.value) {
    result = result.filter((f) => f.categorie === selectedCategorie.value);
  }

  // Tri
  switch (sortBy.value) {
    case "price-asc":
      result.sort((a, b) => parsePrix(a.prix) - parsePrix(b.prix));
      break;
    case "price-desc":
      result.sort((a, b) => parsePrix(b.prix) - parsePrix(a.prix));
      break;
    case "name":
      result.sort((a, b) => (a.nom || "").localeCompare(b.nom || ""));
      break;
    case "recent":
    default:
      result.sort((a, b) => {
        const dateA = new Date(b.created_at || 0);
        const dateB = new Date(a.created_at || 0);
        return dateB - dateA;
      });
      break;
  }

  return result;
});

/**
 * Réinitialise tous les filtres
 */
const resetFilters = () => {
  searchQuery.value = "";
  selectedCategorie.value = "";
  sortBy.value = "recent";
};

/**
 * Ouvre le modal de détails du forfait
 */
const ouvrirDetailsForfait = (forfait) => {
  selectedForfait.value = forfait;
  showForfaitModal.value = true;
};

/**
 * Ferme le modal de détails
 */
const fermerModal = () => {
  showForfaitModal.value = false;
  selectedForfait.value = null;
};
</script>

<template>
  <div class="min-h-screen bg-linear-to-b from-blue-50 to-white">
    <!-- Hero Header -->
    <div
      class="bg-linear-to-r from-blue-600 to-blue-800 text-white py-12 px-4 shadow-lg"
    >
      <div class="max-w-7xl mx-auto">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div class="animate-fade-in">
            <h1 class="text-4xl md:text-5xl font-bold mb-3">
              Nos Forfaits Touristiques
            </h1>
            <p class="text-blue-100 text-lg">
              Découvrez nos destinations exceptionnelles à travers le monde
            </p>
          </div>
          <RouterLink
            to="/forfaits/ajouter"
            class="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-blue-50 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 no-underline animate-fade-in-delay"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Ajouter un forfait
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Messages d'erreur -->
      <div
        v-if="error"
        class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-800 rounded-lg shadow-sm animate-fade-in"
        role="alert"
      >
        <div class="flex items-center">
          <svg
            class="w-5 h-5 mr-3 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="font-medium">{{ error }}</span>
        </div>
      </div>

      <!-- État de chargement -->
      <div v-if="loading" class="text-center py-20">
        <div
          class="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"
        ></div>
        <p class="text-gray-600 text-lg">Chargement des forfaits...</p>
      </div>

      <!-- Contenu principal -->
      <div v-else>
        <!-- Filtres et recherche -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-8 animate-fade-in">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Barre de recherche -->
            <div class="md:col-span-2">
              <label
                for="search"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                <svg
                  class="w-4 h-4 inline mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Rechercher
              </label>
              <input
                id="search"
                v-model="searchQuery"
                type="text"
                placeholder="Nom, description, catégorie..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                aria-label="Rechercher un forfait"
              />
            </div>

            <!-- Filtre par catégorie -->
            <div>
              <label
                for="category"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                <svg
                  class="w-4 h-4 inline mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                Catégorie
              </label>
              <select
                id="category"
                v-model="selectedCategorie"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                aria-label="Filtrer par catégorie"
              >
                <option value="">Toutes</option>
                <option v-for="cat in categories" :key="cat" :value="cat">
                  {{ cat }}
                </option>
              </select>
            </div>

            <!-- Tri -->
            <div>
              <label
                for="sort"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                <svg
                  class="w-4 h-4 inline mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
                Trier par
              </label>
              <select
                id="sort"
                v-model="sortBy"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                aria-label="Trier les forfaits"
              >
                <option value="recent">Plus récent</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="name">Nom (A-Z)</option>
              </select>
            </div>
          </div>

          <!-- Bouton réinitialiser et compteur -->
          <div
            class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200"
          >
            <div class="text-sm text-gray-600">
              <span class="font-semibold text-blue-600">{{
                forfaitsFiltres.length
              }}</span>
              forfait{{ forfaitsFiltres.length !== 1 ? "s" : "" }} trouvé{{
                forfaitsFiltres.length !== 1 ? "s" : ""
              }}
            </div>
            <button
              v-if="searchQuery || selectedCategorie || sortBy !== 'recent'"
              @click="resetFilters"
              class="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors font-medium"
            >
              Réinitialiser les filtres
            </button>
          </div>
        </div>

        <!-- Message aucun forfait -->
        <div
          v-if="forfaitsFiltres.length === 0"
          class="text-center py-20 bg-white rounded-xl shadow-md"
        >
          <svg
            class="w-24 h-24 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-gray-600 text-xl mb-2">
            {{
              forfaits.length === 0
                ? "Aucun forfait disponible"
                : "Aucun forfait trouvé"
            }}
          </p>
          <p class="text-gray-500 mb-6">
            {{
              forfaits.length === 0
                ? "Commencez par créer votre premier forfait !"
                : "Essayez de modifier vos critères de recherche"
            }}
          </p>
          <RouterLink
            v-if="forfaits.length === 0"
            to="/forfaits/ajouter"
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl no-underline"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Créer un forfait
          </RouterLink>
        </div>

        <!-- Grille des forfaits -->
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <article
            v-for="(forfait, index) in forfaitsFiltres"
            :key="forfait.id"
            class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-fade-in cursor-pointer"
            :style="{ animationDelay: `${index * 0.05}s` }"
            @click="ouvrirDetailsForfait(forfait)"
          >
            <!-- Image -->
            <div
              class="relative h-48 bg-linear-to-br from-blue-400 to-blue-600 overflow-hidden group"
            >
              <img
                v-if="forfait.image"
                :src="forfait.image"
                :alt="forfait.nom"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div
                v-else
                class="flex items-center justify-center h-full text-white text-6xl"
              >
                🌍
              </div>

              <!-- Badge catégorie -->
              <div v-if="forfait.categorie" class="absolute top-4 right-4">
                <span
                  class="inline-block bg-white/90 backdrop-blur-sm text-blue-800 text-sm font-semibold px-3 py-1 rounded-full shadow-lg"
                >
                  {{ forfait.categorie }}
                </span>
              </div>
            </div>

            <!-- Contenu -->
            <div class="p-6">
              <!-- Titre -->
              <h3
                class="text-xl font-bold text-gray-800 mb-3 line-clamp-2 min-h-14"
              >
                {{ forfait.nom }}
              </h3>

              <!-- Description -->
              <p class="text-gray-600 mb-4 line-clamp-3 min-h-18">
                {{ forfait.description }}
              </p>

              <!-- Prix -->
              <div class="mb-4">
                <div class="text-3xl font-bold text-green-600">
                  {{ formatPrix(forfait.prix) }} $
                </div>
                <div class="text-sm text-gray-500">par personne</div>
              </div>

              <!-- Dates (tooltip on hover) -->
              <div
                v-if="forfait.created_at || forfait.updated_at"
                class="mb-4 text-xs text-gray-400 border-t border-gray-100 pt-3"
              >
                <div class="flex items-center gap-2">
                  <svg
                    class="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Mis à jour:
                    {{
                      forfait.updated_at
                        ? new Date(forfait.updated_at).toLocaleDateString(
                            "fr-FR"
                          )
                        : "—"
                    }}
                  </span>
                </div>
              </div>

              <!-- Boutons d'action -->
              <div class="flex gap-2">
                <button
                  @click.stop="editerForfait(forfait.id)"
                  class="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                  :aria-label="`Modifier le forfait ${forfait.nom}`"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Modifier
                </button>
                <button
                  @click.stop="confirmerSuppression(forfait)"
                  class="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                  :aria-label="`Supprimer le forfait ${forfait.nom}`"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Supprimer
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- Modal de confirmation de suppression -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      @click.self="annulerSuppression"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all animate-fade-in"
        role="dialog"
        aria-labelledby="delete-title"
        aria-modal="true"
      >
        <div class="flex items-center gap-4 mb-4">
          <div
            class="shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h3 id="delete-title" class="text-xl font-bold text-gray-900">
              Confirmer la suppression
            </h3>
          </div>
        </div>

        <p class="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir supprimer le forfait
          <span class="font-semibold text-gray-900"
            >"{{ forfaitToDelete?.nom }}"</span
          >
          ? Cette action est irréversible.
        </p>

        <div class="flex gap-3">
          <button
            @click="annulerSuppression"
            class="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all"
          >
            Annuler
          </button>
          <button
            @click="supprimerForfait"
            class="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de détails du forfait -->
    <ForfaitModal
      :show="showForfaitModal"
      :forfait="selectedForfait"
      @close="fermerModal"
    />
  </div>
</template>
