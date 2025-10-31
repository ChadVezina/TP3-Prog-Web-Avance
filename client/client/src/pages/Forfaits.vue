<script setup>
import { ref } from 'vue';

const forfaits = ref([
  {
    id: 1,
    nom: 'Forfait Montagne',
    description: 'Explorez les majestueux paysages montagneux',
    prix: 1299
  },
  {
    id: 2,
    nom: 'Forfait Plage',
    description: 'Détendez-vous sur les plus belles plages',
    prix: 999
  },
  {
    id: 3,
    nom: 'Forfait Aventure',
    description: 'Vivez des expériences inoubliables',
    prix: 1599
  }
]);

const showForm = ref(false);
const formData = ref({
  nom: '',
  description: '',
  prix: ''
});
const editingId = ref(null);

const toggleForm = () => {
  showForm.value = !showForm.value;
  if (!showForm.value) {
    resetForm();
  }
};

const resetForm = () => {
  formData.value = { nom: '', description: '', prix: '' };
  editingId.value = null;
};

const ajouterForfait = () => {
  if (formData.value.nom && formData.value.description && formData.value.prix) {
    forfaits.value.push({
      id: Math.max(...forfaits.value.map(f => f.id)) + 1,
      ...formData.value,
      prix: parseFloat(formData.value.prix)
    });
    resetForm();
    showForm.value = false;
  }
};

const editerForfait = (forfait) => {
  editingId.value = forfait.id;
  formData.value = { ...forfait };
  showForm.value = true;
};

const sauvegarderModification = () => {
  const index = forfaits.value.findIndex(f => f.id === editingId.value);
  if (index !== -1) {
    forfaits.value[index] = {
      id: editingId.value,
      ...formData.value,
      prix: parseFloat(formData.value.prix)
    };
    resetForm();
    showForm.value = false;
  }
};

const supprimerForfait = (id) => {
  forfaits.value = forfaits.value.filter(f => f.id !== id);
};
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-semibold text-gray-800 mb-8">Nos forfaits touristiques</h1>
    <button @click="toggleForm" class="px-6 py-3 bg-green-600 text-white rounded cursor-pointer text-base mb-8 transition-colors hover:bg-green-700">
      {{ showForm ? 'Annuler' : 'Ajouter un forfait' }}
    </button>

    <div v-if="showForm" class="bg-gray-100 p-6 rounded mb-8">
      <h2 class="text-xl font-semibold text-gray-600 mb-6">{{ editingId ? 'Modifier le forfait' : 'Ajouter un nouveau forfait' }}</h2>
      <form @submit.prevent="editingId ? sauvegarderModification() : ajouterForfait()">
        <div class="mb-4">
          <label for="nom" class="block mb-2 font-bold text-gray-800">Nom du forfait:</label>
          <input v-model="formData.nom" type="text" id="nom" required class="w-full p-2 border border-gray-300 rounded text-base" />
        </div>
        <div class="mb-4">
          <label for="description" class="block mb-2 font-bold text-gray-800">Description:</label>
          <textarea v-model="formData.description" id="description" required class="w-full p-2 border border-gray-300 rounded text-base resize-y min-h-20"></textarea>
        </div>
        <div class="mb-4">
          <label for="prix" class="block mb-2 font-bold text-gray-800">Prix ($):</label>
          <input v-model="formData.prix" type="number" id="prix" step="0.01" required class="w-full p-2 border border-gray-300 rounded text-base" />
        </div>
        <button type="submit" class="px-6 py-3 bg-blue-600 text-white rounded text-base transition-colors hover:bg-blue-700">
          {{ editingId ? 'Modifier' : 'Ajouter' }}
        </button>
      </form>
    </div>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
      <div v-for="forfait in forfaits" :key="forfait.id" class="bg-white border border-gray-200 rounded p-6 shadow transition hover:-translate-y-1 hover:shadow-md">
        <h3 class="text-blue-600 font-semibold mb-2">{{ forfait.nom }}</h3>
        <p class="text-gray-600 mb-2">{{ forfait.description }}</p>
        <p class="text-2xl text-green-600 my-4"><strong>${{ forfait.prix }}</strong></p>
        <div class="flex gap-2 mt-4">
          <button @click="editerForfait(forfait)" class="flex-1 px-4 py-2 rounded bg-yellow-400 text-black transition-colors hover:bg-yellow-500">
            Modifier
          </button>
          <button @click="supprimerForfait(forfait.id)" class="flex-1 px-4 py-2 rounded bg-red-600 text-white transition-colors hover:bg-red-700">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

