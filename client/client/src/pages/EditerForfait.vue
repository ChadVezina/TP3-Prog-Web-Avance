<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import ForfaitsDataService from "../services/ForfaitsDataService.js";

import FormInput from "../components/FormInput.vue";
import FormTextarea from "../components/FormTextarea.vue";
import FormSelect from "../components/FormSelect.vue";
import ActionButtons from "../components/ActionButtons.vue";
import ErrorAlert from "../components/ErrorAlert.vue";

const router = useRouter();
const route = useRoute();

// Form state using reactive for easier v-model bindings
const form = reactive({
  nom: "",
  description: "",
  prix: null,
  image: "",
  categorie: "",
});

const fieldErrors = reactive({ nom: "", description: "", prix: "" });
const generalError = ref(null);
const loading = ref(false);
const loadingData = ref(true);

const categories = [
  "Europe",
  "Amérique",
  "Afrique",
  "Asie",
  "Plage",
  "Nature",
  "Aventure",
  "Autre",
];

// Charger les données du forfait
onMounted(async () => {
  const id = route.params.id;

  if (!id) {
    generalError.value = "ID du forfait manquant.";
    loadingData.value = false;
    return;
  }

  try {
    const forfait = await ForfaitsDataService.get(id);

    // Pré-remplir le formulaire avec les données existantes
    form.nom = forfait.nom || "";
    form.description = forfait.description || "";
    form.prix = forfait.prix;
    form.image = forfait.image || "";
    form.categorie = forfait.categorie || "";
  } catch (err) {
    console.error("Erreur lors du chargement du forfait:", err);
    generalError.value =
      err.response?.data?.message || "Impossible de charger le forfait.";
  } finally {
    loadingData.value = false;
  }
});

function validate() {
  let valid = true;
  fieldErrors.nom = form.nom && form.nom.trim() ? "" : "Le nom est requis.";
  fieldErrors.description =
    form.description && form.description.trim()
      ? ""
      : "La description est requise.";
  fieldErrors.prix =
    form.prix !== null &&
    form.prix !== "" &&
    !isNaN(Number(form.prix)) &&
    Number(form.prix) >= 0
      ? ""
      : "Prix invalide.";

  if (fieldErrors.nom || fieldErrors.description || fieldErrors.prix)
    valid = false;
  return valid;
}

async function modifierForfait() {
  generalError.value = null;

  if (!validate()) return;

  const id = route.params.id;
  loading.value = true;

  try {
    await ForfaitsDataService.update(id, {
      nom: form.nom.trim(),
      description: form.description.trim(),
      prix: Number(form.prix),
      image: form.image ? form.image.trim() : "",
      categorie: form.categorie || "",
    });
    router.push("/forfaits");
  } catch (err) {
    console.error("Erreur lors de la modification du forfait:", err);
    generalError.value =
      err.response?.data?.message ||
      "Une erreur est survenue. Veuillez réessayer.";
  } finally {
    loading.value = false;
  }
}

function annuler() {
  router.push("/forfaits");
}
</script>

<template>
  <div class="p-8 max-w-3xl mx-auto">
    <h1 class="text-3xl font-semibold text-gray-800 mb-6">
      Modifier le forfait
    </h1>

    <!-- Messages d'erreur -->
    <ErrorAlert :message="generalError" />

    <!-- Chargement des données -->
    <div
      v-if="loadingData"
      class="bg-white border border-gray-200 rounded p-8 shadow text-center"
    >
      <p class="text-gray-600">Chargement du forfait...</p>
    </div>

    <!-- Formulaire d'édition -->
    <div v-else class="bg-white border border-gray-200 rounded p-8 shadow">
      <form @submit.prevent="modifierForfait">
        <FormInput
          v-model:modelValue="form.nom"
          id="nom"
          label="Nom du forfait"
          required
          placeholder="Ex: Aventure en Islande"
          :error="fieldErrors.nom"
        />

        <FormTextarea
          v-model:modelValue="form.description"
          id="description"
          label="Description"
          required
          placeholder="Décrivez le forfait en détail..."
          :rows="5"
          :error="fieldErrors.description"
        />

        <FormInput
          v-model:modelValue="form.prix"
          id="prix"
          label="Prix ($)"
          type="number"
          step="0.01"
          :min="0"
          required
          placeholder="0.00"
          :error="fieldErrors.prix"
        />

        <FormInput
          v-model:modelValue="form.image"
          id="image"
          label="URL de l'image"
          type="url"
          placeholder="https://exemple.com/image.jpg"
          help="Lien vers une image représentant le forfait"
        />

        <FormSelect
          v-model:modelValue="form.categorie"
          id="categorie"
          label="Catégorie"
          :options="categories"
          placeholder="Sélectionnez une catégorie"
        />

        <!-- Boutons d'action -->
        <ActionButtons
          :loading="loading"
          @cancel="annuler"
          submitLabel="Modifier le forfait"
          submittingLabel="Modification en cours..."
        />
      </form>
    </div>

    <p class="mt-4 text-sm text-gray-500">
      <span class="text-red-600">*</span> Champs obligatoires
    </p>
  </div>
</template>
