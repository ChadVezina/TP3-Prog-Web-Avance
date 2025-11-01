<!-- Page pour ajouter un nouveau forfait -->
<script setup>
// Importation des fonctionnalités Vue
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import ForfaitsDataService from "../services/ForfaitsDataService.js";

// Importation des composants de formulaire
import FormInput from "../components/FormInput.vue";
import FormTextarea from "../components/FormTextarea.vue";
import FormSelect from "../components/FormSelect.vue";
import ActionButtons from "../components/ActionButtons.vue";
import ErrorAlert from "../components/ErrorAlert.vue";

const router = useRouter();

// État du formulaire avec les champs du forfait
const form = reactive({
  nom: "",
  description: "",
  prix: null,
  image: "",
  categorie: "",
});

// État des erreurs de validation par champ
const fieldErrors = reactive({ nom: "", description: "", prix: "" });
const generalError = ref(null); // Erreur générale
const loading = ref(false); // Indicateur de chargement
const imageError = ref(false); // Erreur de chargement d'image
const showImagePreview = ref(false); // Affichage de l'aperçu d'image

// Liste des catégories disponibles
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

// Surveillance des changements d'URL d'image pour afficher/masquer l'aperçu
watch(
  () => form.image,
  (newVal) => {
    if (newVal && newVal.trim()) {
      showImagePreview.value = true;
      imageError.value = false;
    } else {
      showImagePreview.value = false;
      imageError.value = false;
    }
  }
);

// Gestionnaire d'erreur de chargement d'image
const handleImageError = () => {
  imageError.value = true;
};

// Fonction de validation du formulaire
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

// Fonction pour ajouter un nouveau forfait
async function ajouterForfait() {
  generalError.value = null;

  // Validation des champs avant soumission
  if (!validate()) return;

  loading.value = true;
  try {
    // Envoi de la requête de création via le service
    await ForfaitsDataService.create({
      nom: form.nom.trim(),
      description: form.description.trim(),
      prix: Number(form.prix),
      image: form.image ? form.image.trim() : "",
      categorie: form.categorie || "",
    });
    // Redirection vers la liste des forfaits après succès
    router.push("/forfaits");
  } catch (err) {
    console.error("Erreur lors de l'ajout du forfait:", err);
    // Affichage du message d'erreur du serveur ou message par défaut
    generalError.value =
      err.response?.data?.message ||
      "Une erreur est survenue. Veuillez réessayer.";
  } finally {
    loading.value = false;
  }
}

// Fonction d'annulation qui redirige vers la liste des forfaits
function annuler() {
  router.push("/forfaits");
}
</script>

<template>
  <div class="min-h-screen bg-linear-to-b from-green-50 to-white">
    <!-- En-tête de la page -->
    <div
      class="bg-linear-to-r from-green-600 to-green-800 text-white py-12 px-4 shadow-lg"
    >
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center gap-4 mb-3 animate-fade-in">
          <button
            @click="annuler"
            class="p-2 hover:bg-white/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Retour aux forfaits"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <div>
            <h1 class="text-4xl font-bold">Créer un nouveau forfait</h1>
            <p class="text-green-100 mt-2">
              Ajoutez une nouvelle destination touristique à votre catalogue
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Messages d'erreur -->
      <ErrorAlert :message="generalError" />

      <!-- Formulaire d'ajout -->
      <div class="animate-fade-in">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Formulaire principal -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-xl shadow-md p-8">
              <form @submit.prevent="ajouterForfait">
                <h2
                  class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"
                >
                  <svg
                    class="w-6 h-6 text-green-600"
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
                  Informations du forfait
                </h2>

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
                  :rows="6"
                  :error="fieldErrors.description"
                />

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  <FormSelect
                    v-model:modelValue="form.categorie"
                    id="categorie"
                    label="Catégorie"
                    :options="categories"
                    placeholder="Sélectionnez une catégorie"
                  />
                </div>

                <FormInput
                  v-model:modelValue="form.image"
                  id="image"
                  label="URL de l'image"
                  type="url"
                  placeholder="https://exemple.com/image.jpg"
                  help="Lien vers une image représentant le forfait"
                />

                <!-- Boutons d'action -->
                <div class="mt-8 pt-6 border-t border-gray-200">
                  <ActionButtons :loading="loading" @cancel="annuler" />
                </div>
              </form>
            </div>

            <p class="mt-4 text-sm text-gray-500 flex items-center gap-2">
              <svg
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              <span
                ><span class="text-red-600">*</span> Champs obligatoires</span
              >
            </p>
          </div>

          <!-- Aperçu -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h2
                class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"
              >
                <svg
                  class="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Aperçu
              </h2>

              <!-- Aperçu de la carte -->
              <div class="border-2 border-gray-200 rounded-lg overflow-hidden">
                <!-- Image preview -->
                <div
                  class="relative h-40 bg-linear-to-br from-green-400 to-green-600 overflow-hidden"
                >
                  <img
                    v-if="showImagePreview && !imageError"
                    :src="form.image"
                    :alt="form.nom || 'Aperçu'"
                    @error="handleImageError"
                    class="w-full h-full object-cover"
                  />
                  <div
                    v-else
                    class="flex items-center justify-center h-full text-white text-4xl"
                  >
                    🌍
                  </div>

                  <!-- Badge catégorie -->
                  <div v-if="form.categorie" class="absolute top-2 right-2">
                    <span
                      class="inline-block bg-white/90 backdrop-blur-sm text-green-800 text-xs font-semibold px-2 py-1 rounded-full shadow"
                    >
                      {{ form.categorie }}
                    </span>
                  </div>
                </div>

                <!-- Contenu -->
                <div class="p-4">
                  <h3 class="font-bold text-gray-800 mb-2 line-clamp-2">
                    {{ form.nom || "Nom du forfait" }}
                  </h3>

                  <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                    {{ form.description || "Description du forfait..." }}
                  </p>

                  <div class="mb-3">
                    <div class="text-2xl font-bold text-green-600">
                      {{ form.prix ? Number(form.prix).toFixed(2) : "0.00" }} $
                    </div>
                    <div class="text-xs text-gray-500">par personne</div>
                  </div>
                </div>
              </div>

              <!-- Info sur l'image -->
              <div
                v-if="imageError && form.image"
                class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <div class="flex items-start gap-2">
                  <svg
                    class="w-5 h-5 text-yellow-600 shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-yellow-800">
                      Image non disponible
                    </p>
                    <p class="text-xs text-yellow-700 mt-1">
                      Vérifiez que l'URL est correcte et accessible
                    </p>
                  </div>
                </div>
              </div>

              <div
                v-else-if="!form.image"
                class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <div class="flex items-start gap-2">
                  <svg
                    class="w-5 h-5 text-blue-600 shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-blue-800">
                      Aucune image
                    </p>
                    <p class="text-xs text-blue-700 mt-1">
                      Ajoutez une URL d'image pour un meilleur visuel
                    </p>
                  </div>
                </div>
              </div>

              <!-- Tips -->
              <div
                class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <div class="flex items-start gap-2">
                  <svg
                    class="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-green-800">Conseil</p>
                    <p class="text-xs text-green-700 mt-1">
                      Rédigez une description détaillée et attrayante pour mieux
                      présenter votre forfait aux clients
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
