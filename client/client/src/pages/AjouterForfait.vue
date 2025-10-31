<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import ForfaitsDataService from "../services/ForfaitsDataService.js";

import FormInput from "../components/FormInput.vue";
import FormTextarea from "../components/FormTextarea.vue";
import FormSelect from "../components/FormSelect.vue";
import ActionButtons from "../components/ActionButtons.vue";
import ErrorAlert from "../components/ErrorAlert.vue";

const router = useRouter();

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

function validate() {
  let valid = true;
  fieldErrors.nom = form.nom && form.nom.trim() ? "" : "Le nom est requis.";
  fieldErrors.description = form.description && form.description.trim() ? "" : "La description est requise.";
  fieldErrors.prix = form.prix !== null && form.prix !== "" && !isNaN(Number(form.prix)) && Number(form.prix) >= 0 ? "" : "Prix invalide.";

  if (fieldErrors.nom || fieldErrors.description || fieldErrors.prix) valid = false;
  return valid;
}

async function ajouterForfait() {
  generalError.value = null;

  if (!validate()) return;

  loading.value = true;
  try {
    await ForfaitsDataService.create({
      nom: form.nom.trim(),
      description: form.description.trim(),
      prix: Number(form.prix),
      image: form.image ? form.image.trim() : "",
      categorie: form.categorie || "",
    });
    router.push("/forfaits");
  } catch (err) {
    console.error("Erreur lors de l'ajout du forfait:", err);
    // Prefer server message if available
    generalError.value = err.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.";
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
      Ajouter un nouveau forfait
    </h1>

    <!-- Messages d'erreur -->
    <ErrorAlert :message="generalError" />

    <!-- Formulaire d'ajout -->
    <div class="bg-white border border-gray-200 rounded p-8 shadow">
      <form @submit.prevent="ajouterForfait">
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
        <ActionButtons :loading="loading" @cancel="annuler" />
      </form>
    </div>

    <p class="mt-4 text-sm text-gray-500">
      <span class="text-red-600">*</span> Champs obligatoires
    </p>
  </div>
</template>
