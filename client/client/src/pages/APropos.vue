<!-- Page À propos de l'agence de voyage -->
<script setup>
// Importation des composants nécessaires
import SectionHeader from "../components/SectionHeader.vue";
import InfoCard from "../components/InfoCard.vue";
import ValueItem from "../components/ValueItem.vue";
</script>

<template>
  <div class="a-propos-page py-12 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- En-tête de la page -->
      <SectionHeader
        title="À Propos de Notre Agence"
        subtitle="Une passion pour les voyages, un engagement envers l'excellence"
      />

      <!-- Who We Are Section -->
      <section class="mb-16" aria-labelledby="who-we-are">
        <div class="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2
            id="who-we-are"
            class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3"
          >
            <span class="text-blue-600" aria-hidden="true">🌟</span>
            Qui Sommes-Nous?
          </h2>
          <div class="prose prose-lg max-w-none">
            <p class="text-gray-600 leading-relaxed mb-4">
              Nous sommes une agence de voyage passionnée par la création
              d'expériences inoubliables. Depuis plus de
              <strong class="text-blue-600">20 ans</strong>, nous guidons nos
              clients à travers les destinations les plus extraordinaires du
              monde.
            </p>
            <p class="text-gray-600 leading-relaxed">
              Notre équipe d'experts en voyages combine une connaissance
              approfondie des destinations avec un service personnalisé
              exceptionnel pour créer des aventures qui dépassent vos attentes.
            </p>
          </div>
        </div>
      </section>

      <!-- Mission Section -->
      <section class="mb-16" aria-labelledby="our-mission">
        <div
          class="bg-blue-50 rounded-xl shadow-lg p-8 md:p-12 border-l-4 border-blue-600"
        >
          <h2
            id="our-mission"
            class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3"
          >
            <span class="text-blue-600" aria-hidden="true">🎯</span>
            Notre Mission
          </h2>
          <p class="text-gray-700 text-lg leading-relaxed mb-4">
            Notre mission est de
            <strong
              >rendre les voyages accessibles et mémorables pour tous</strong
            >. Nous croyons que chaque personne mérite de vivre des aventures
            exceptionnelles et de découvrir de nouvelles cultures.
          </p>
          <p class="text-gray-700 leading-relaxed">
            Nous nous efforçons de créer des expériences authentiques qui
            enrichissent la vie de nos clients tout en respectant et en
            soutenant les communautés locales que nous visitons.
          </p>
        </div>
      </section>

      <!-- Values Section -->
      <section class="mb-16" aria-labelledby="our-values">
        <SectionHeader
          id="our-values"
          title="Nos Valeurs"
          subtitle="Les principes qui guident chacune de nos actions"
          alignment="left"
          size="default"
        />

        <ul class="space-y-4" role="list">
          <ValueItem
            title="Authenticité"
            description="Nous proposons des expériences authentiques et personnalisées qui vous permettent de découvrir la vraie essence de chaque destination."
          />

          <ValueItem
            title="Excellence"
            description="Nous nous engageons à fournir un service de qualité supérieure à chaque étape de votre voyage, de la planification au retour."
          />

          <ValueItem
            title="Durabilité"
            description="Nous respectons l'environnement et les communautés locales en promouvant un tourisme responsable et durable."
          />

          <ValueItem
            title="Innovation"
            description="Nous restons constamment à jour avec les nouvelles destinations et technologies pour offrir les meilleures expériences de voyage."
          />

          <ValueItem
            title="Transparence"
            description="Nous croyons en une communication honnête et claire, sans frais cachés ni surprises désagréables."
          />
        </ul>
      </section>

      <!-- Contact Section -->
      <section class="mb-8" aria-labelledby="contact-us">
        <SectionHeader
          id="contact-us"
          title="Contactez-Nous"
          subtitle="Notre équipe est prête à vous aider à planifier votre prochain voyage"
          alignment="left"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            title="Par Email"
            icon="📧"
            icon-aria-label="Enveloppe email"
            variant="blue"
            elevated
          >
            <p class="text-gray-700">
              <a
                href="mailto:info@agencedevoyage.com"
                class="text-blue-600 hover:text-blue-700 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                info@agencedevoyage.com
              </a>
            </p>
            <p class="text-sm text-gray-500 mt-2">Réponse sous 24h ouvrables</p>
          </InfoCard>

          <InfoCard
            title="Par Téléphone"
            icon="📞"
            icon-aria-label="Téléphone"
            variant="green"
            elevated
          >
            <p class="text-gray-700">
              <a
                href="tel:+15551234567"
                class="text-green-600 hover:text-green-700 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
              >
                +1 (555) 123-4567
              </a>
            </p>
            <p class="text-sm text-gray-500 mt-2">
              Lundi - Vendredi: 9h - 18h<br />
              Samedi: 10h - 16h
            </p>
          </InfoCard>

          <InfoCard
            title="Notre Bureau"
            icon="📍"
            icon-aria-label="Localisation"
            variant="purple"
            elevated
          >
            <address class="text-gray-700 not-italic">
              123 Rue du Voyage<br />
              Montréal, QC H1A 0A0<br />
              Canada
            </address>
          </InfoCard>

          <InfoCard
            title="Horaires d'Ouverture"
            icon="🕐"
            icon-aria-label="Horloge"
            variant="orange"
            elevated
          >
            <div class="text-gray-700 space-y-1">
              <p><strong>Lun - Ven:</strong> 9h00 - 18h00</p>
              <p><strong>Samedi:</strong> 10h00 - 16h00</p>
              <p><strong>Dimanche:</strong> Fermé</p>
            </div>
          </InfoCard>
        </div>

        <!-- Call to Action -->
        <div
          class="mt-12 bg-linear-to-r from-blue-600 to-blue-700 rounded-xl shadow-xl p-8 md:p-12 text-center text-white"
        >
          <h3 class="text-2xl md:text-3xl font-bold mb-4">
            Prêt à Commencer Votre Aventure?
          </h3>
          <p class="text-lg text-blue-100 mb-6">
            Découvrez nos forfaits exceptionnels et laissez-nous vous guider
            vers des destinations de rêve.
          </p>
          <router-link
            to="/forfaits"
            class="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-blue-50 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="Voir tous nos forfaits de voyage"
          >
            Voir nos forfaits
            <svg
              class="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>
