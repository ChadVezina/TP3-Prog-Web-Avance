<!-- Composant de pied de page réutilisable avec informations de l'entreprise, liens et newsletter -->
<template>
  <footer
    class="footer-section bg-gray-800 text-white mt-auto"
    role="contentinfo"
  >
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- Section Informations sur l'entreprise -->
        <div class="footer-column">
          <h3 class="text-xl font-bold mb-4 text-blue-400">
            {{ companyName }}
          </h3>
          <p class="text-gray-300 mb-4 leading-relaxed">
            {{ companyDescription }}
          </p>
          <!-- Liens des réseaux sociaux -->
          <div v-if="showSocial" class="flex gap-4" role="list">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              :aria-label="`Visitez notre ${social.name}`"
              class="social-link w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="text-lg" aria-hidden="true">{{ social.icon }}</span>
            </a>
          </div>
        </div>

        <!-- Section Liens rapides -->
        <div class="footer-column">
          <h3 class="text-lg font-semibold mb-4 text-blue-400">
            Liens Rapides
          </h3>
          <nav aria-label="Liens rapides">
            <ul class="space-y-2">
              <!-- Boucle sur les liens de navigation -->
              <li v-for="link in quickLinks" :key="link.to">
                <router-link
                  :to="link.to"
                  class="text-gray-300 hover:text-blue-400 transition-colors duration-200 inline-flex items-center group focus:outline-none focus:text-blue-400"
                >
                  <span
                    class="mr-2 transform group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                    >→</span
                  >
                  {{ link.text }}
                </router-link>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Section Informations de contact -->
        <div class="footer-column">
          <h3 class="text-lg font-semibold mb-4 text-blue-400">Contact</h3>
          <ul class="space-y-3">
            <!-- Adresse -->
            <li class="flex items-start gap-3">
              <span class="text-blue-400 mt-1" aria-hidden="true">📍</span>
              <div>
                <span class="sr-only">Adresse:</span>
                <p class="text-gray-300">{{ contactInfo.address }}</p>
              </div>
            </li>
            <!-- Téléphone -->
            <li class="flex items-start gap-3">
              <span class="text-blue-400 mt-1" aria-hidden="true">📞</span>
              <div>
                <span class="sr-only">Téléphone:</span>
                <a
                  :href="`tel:${contactInfo.phone.replace(/\s/g, '')}`"
                  class="text-gray-300 hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:text-blue-400"
                >
                  {{ contactInfo.phone }}
                </a>
              </div>
            </li>
            <!-- Email -->
            <li class="flex items-start gap-3">
              <span class="text-blue-400 mt-1" aria-hidden="true">✉️</span>
              <div>
                <span class="sr-only">Email:</span>
                <a
                  :href="`mailto:${contactInfo.email}`"
                  class="text-gray-300 hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:text-blue-400 break-all"
                >
                  {{ contactInfo.email }}
                </a>
              </div>
            </li>
          </ul>
        </div>

        <!-- Section Newsletter -->
        <div v-if="showNewsletter" class="footer-column">
          <h3 class="text-lg font-semibold mb-4 text-blue-400">Newsletter</h3>
          <p class="text-gray-300 mb-4">
            Restez informé de nos dernières offres et destinations.
          </p>
          <!-- Formulaire d'inscription à la newsletter -->
          <form
            @submit.prevent="handleNewsletterSubmit"
            class="space-y-3"
            aria-label="Formulaire d'inscription à la newsletter"
          >
            <div>
              <label for="newsletter-email" class="sr-only"
                >Adresse e-mail</label
              >
              <!-- Champ de saisie d'email -->
              <input
                id="newsletter-email"
                v-model="newsletterEmail"
                type="email"
                placeholder="Votre e-mail"
                required
                class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                aria-required="true"
              />
            </div>
            <!-- Bouton d'inscription -->
            <button
              type="submit"
              class="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </div>

      <!-- Barre inférieure avec copyright et liens légaux -->
      <div
        class="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <!-- Copyright -->
        <p class="text-gray-400 text-sm text-center md:text-left">
          © {{ currentYear }} {{ companyName }}. Tous droits réservés.
        </p>

        <!-- Liens légaux -->
        <div
          class="flex flex-wrap gap-6 justify-center"
          role="navigation"
          aria-label="Liens légaux"
        >
          <a
            v-for="legal in legalLinks"
            :key="legal.to"
            :href="legal.to"
            class="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200 focus:outline-none focus:text-blue-400"
          >
            {{ legal.text }}
          </a>
        </div>
      </div>
    </div>

    <!-- Vague décorative en haut du pied de page -->
    <div class="absolute top-0 left-0 right-0 transform rotate-180">
      <svg
        class="waves-top"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="footer-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax-footer">
          <use href="#footer-wave" x="48" y="7" fill="rgba(31, 41, 55, 1)" />
        </g>
      </svg>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from "vue";

// Définition des props du composant
const props = defineProps({
  companyName: {
    type: String,
    default: "Agence de Voyage", // Nom de l'entreprise
  },
  companyDescription: {
    type: String,
    default:
      "Votre partenaire de confiance pour des voyages inoubliables à travers le monde.", // Description
  },
  showSocial: {
    type: Boolean,
    default: true, // Afficher les liens sociaux
  },
  showNewsletter: {
    type: Boolean,
    default: true, // Afficher la section newsletter
  },
  contactInfo: {
    type: Object,
    default: () => ({
      address: "123 Rue du Voyage, Montréal, QC H2X 1Y1",
      phone: "+1 (514) 555-0123",
      email: "info@agencevoyage.com",
    }), // Informations de contact
  },
  quickLinks: {
    type: Array,
    default: () => [
      { to: "/", text: "Accueil" },
      { to: "/forfaits", text: "Forfaits" },
      { to: "/a-propos", text: "À Propos" },
      { to: "/forfaits/ajouter", text: "Ajouter un Forfait" },
    ], // Liens de navigation rapide
  },
  socialLinks: {
    type: Array,
    default: () => [
      { name: "Facebook", url: "#", icon: "📘" },
      { name: "Twitter", url: "#", icon: "🐦" },
      { name: "Instagram", url: "#", icon: "📷" },
      { name: "LinkedIn", url: "#", icon: "💼" },
    ], // Liens des réseaux sociaux
  },
  legalLinks: {
    type: Array,
    default: () => [
      { to: "#privacy", text: "Politique de confidentialité" },
      { to: "#terms", text: "Conditions d'utilisation" },
      { to: "#cookies", text: "Cookies" },
    ], // Liens légaux
  },
});

// État réactif pour l'email de la newsletter
const newsletterEmail = ref("");
// Année actuelle calculée dynamiquement
const currentYear = computed(() => new Date().getFullYear());

// Gestionnaire de soumission du formulaire newsletter
const handleNewsletterSubmit = () => {
  if (newsletterEmail.value) {
    // Émettre un événement pour que le parent puisse le gérer
    alert(
      `Merci de vous être inscrit avec l'adresse: ${newsletterEmail.value}`
    );
    // Réinitialise le champ email
    newsletterEmail.value = "";
  }
};
</script>
