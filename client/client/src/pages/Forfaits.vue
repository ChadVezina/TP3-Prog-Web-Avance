<script setup>
import { ref, onMounted } from "vue";
import ForfaitsDataService from "../services/ForfaitsDataService.js";

const forfaits = ref([]);
const loading = ref(false);
const error = ref(null);

const showForm = ref(false);
const formData = ref({
  nom: "",
  description: "",
  prix: "",
  image: "",
  categorie: "",
});
const editingId = ref(null);
const categories = ref([
  "Europe",
  "Amérique",
  "Afrique",
  "Asie",
  "Plage",
  "Nature",
  "Aventure",
  "Autre",
]);

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

const toggleForm = () => {
  showForm.value = !showForm.value;
  if (!showForm.value) {
    resetForm();
  }
};

const resetForm = () => {
  formData.value = {
    nom: "",
    description: "",
    prix: "",
    image: "",
    categorie: "",
  };
  editingId.value = null;
};

/**
 * Ajoute un nouveau forfait via l'API
 */
const ajouterForfait = async () => {
  if (formData.value.nom && formData.value.description && formData.value.prix) {
    try {
      const response = await ForfaitsDataService.create({
        nom: formData.value.nom,
        description: formData.value.description,
        prix: parseFloat(formData.value.prix),
        image: formData.value.image,
        categorie: formData.value.categorie,
      });

      // Ajouter le forfait créé à la liste
      forfaits.value.unshift(response.data || response);
      resetForm();
      showForm.value = false;
    } catch (err) {
      console.error("Erreur lors de l'ajout du forfait:", err);
      error.value = "Erreur lors de l'ajout du forfait";
    }
  }
};

const editerForfait = (forfait) => {
  editingId.value = forfait.id;
  formData.value = { ...forfait };
  showForm.value = true;
};

/**
 * Met à jour un forfait existant via l'API
 */
const sauvegarderModification = async () => {
  try {
    const response = await ForfaitsDataService.update(editingId.value, {
      nom: formData.value.nom,
      description: formData.value.description,
      prix: parseFloat(formData.value.prix),
      image: formData.value.image,
      categorie: formData.value.categorie,
    });

    // Mettre à jour le forfait dans la liste
    const index = forfaits.value.findIndex((f) => f.id === editingId.value);
    if (index !== -1) {
      forfaits.value[index] = {
        ...forfaits.value[index],
        ...formData.value,
        prix: parseFloat(formData.value.prix),
      };
    }

    resetForm();
    showForm.value = false;
  } catch (err) {
    console.error("Erreur lors de la modification du forfait:", err);
    error.value = "Erreur lors de la modification du forfait";
  }
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
        <button
          @click="toggleForm"
          class="px-6 py-3 bg-green-600 text-white rounded cursor-pointer text-base mb-4 transition-colors hover:bg-green-700"
        >
          {{ showForm ? "Annuler" : "Ajouter un forfait" }}
        </button>

        <!-- Formulaire d'ajout/modification -->
        <div v-if="showForm" class="bg-gray-100 p-6 rounded">
          <h2 class="text-xl font-semibold text-gray-600 mb-6">
            {{
              editingId ? "Modifier le forfait" : "Ajouter un nouveau forfait"
            }}
          </h2>
          <form
            @submit.prevent="
              editingId ? sauvegarderModification() : ajouterForfait()
            "
          >
            <div class="mb-4">
              <label for="nom" class="block mb-2 font-bold text-gray-800"
                >Nom du forfait:</label
              >
              <input
                v-model="formData.nom"
                type="text"
                id="nom"
                required
                class="w-full p-2 border border-gray-300 rounded text-base"
              />
            </div>
            <div class="mb-4">
              <label
                for="description"
                class="block mb-2 font-bold text-gray-800"
                >Description:</label
              >
              <textarea
                v-model="formData.description"
                id="description"
                required
                class="w-full p-2 border border-gray-300 rounded text-base resize-y min-h-20"
              ></textarea>
            </div>
            <div class="mb-4">
              <label for="prix" class="block mb-2 font-bold text-gray-800"
                >Prix ($):</label
              >
              <input
                v-model="formData.prix"
                type="number"
                id="prix"
                step="0.01"
                required
                class="w-full p-2 border border-gray-300 rounded text-base"
              />
            </div>
            <div class="mb-4">
              <label for="image" class="block mb-2 font-bold text-gray-800"
                >URL de l'image:</label
              >
              <input
                v-model="formData.image"
                type="url"
                id="image"
                class="w-full p-2 border border-gray-300 rounded text-base"
                placeholder="https://..."
              />
            </div>
            <div class="mb-4">
              <label for="categorie" class="block mb-2 font-bold text-gray-800"
                >Catégorie:</label
              >
              <select
                v-model="formData.categorie"
                id="categorie"
                class="w-full p-2 border border-gray-300 rounded text-base"
              >
                <option value="">-- Sélectionnez une catégorie --</option>
                <option v-for="cat in categories" :key="cat" :value="cat">
                  {{ cat }}
                </option>
              </select>
            </div>
            <button
              type="submit"
              class="px-6 py-3 bg-blue-600 text-white rounded text-base transition-colors hover:bg-blue-700"
            >
              {{ editingId ? "Modifier" : "Ajouter" }}
            </button>
          </form>
        </div>
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
              @click="editerForfait(forfait)"
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