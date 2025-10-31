<script setup>
import HeroSection from "../components/HeroSection.vue";
import SectionHeader from "../components/SectionHeader.vue";
import FeatureCard from "../components/FeatureCard.vue";
import StatsCard from "../components/StatsCard.vue";
</script>

<template>
  <div class="accueil-page">
    <!-- Hero Section -->
    <HeroSection
      title="Bienvenue à Notre Agence de Voyage"
      description="Découvrez le monde avec nous. Des expériences authentiques, des souvenirs inoubliables."
      cta-text="Découvrir nos forfaits"
      cta-link="/forfaits"
      cta-aria-label="Naviguer vers la page des forfaits touristiques"
      height="large"
    />

    <!-- Why Choose Us Section -->
    <section class="py-16 px-4 bg-white" aria-labelledby="why-choose-us">
      <div class="max-w-6xl mx-auto">
        <SectionHeader
          id="why-choose-us"
          title="Pourquoi Nous Choisir?"
          subtitle="Nous offrons bien plus qu'un simple voyage. Découvrez ce qui nous rend uniques."
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Expériences Authentiques"
            description="Vivez des moments uniques avec des guides locaux passionnés qui connaissent chaque recoin de leur destination."
            icon="🌍"
            icon-aria-label="Globe terrestre"
            icon-color="blue"
          />

          <FeatureCard
            title="Prix Compétitifs"
            description="Profitez de tarifs avantageux sans compromis sur la qualité. Nos forfaits offrent le meilleur rapport qualité-prix."
            icon="💰"
            icon-aria-label="Économies"
            icon-color="green"
          />

          <FeatureCard
            title="Service Personnalisé"
            description="Notre équipe d'experts est à votre écoute pour créer le voyage qui vous ressemble, adapté à vos envies et votre budget."
            icon="⭐"
            icon-aria-label="Étoile d'excellence"
            icon-color="orange"
          />

          <FeatureCard
            title="Sécurité Garantie"
            description="Voyagez l'esprit tranquille. Tous nos forfaits incluent une assurance complète et un support 24/7."
            icon="🛡️"
            icon-aria-label="Bouclier de protection"
            icon-color="purple"
          />

          <FeatureCard
            title="Destinations Variées"
            description="Du farniente tropical aux aventures en montagne, explorez une multitude de destinations pour tous les goûts."
            icon="🏝️"
            icon-aria-label="Île paradisiaque"
            icon-color="blue"
          />

          <FeatureCard
            title="Satisfaction Client"
            description="Plus de 95% de nos clients nous recommandent. Rejoignez des milliers de voyageurs satisfaits."
            icon="❤️"
            icon-aria-label="Coeur satisfaction"
            icon-color="red"
          />
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section
      class="py-16 px-4 bg-linear-to-b from-gray-50 to-white"
      aria-labelledby="our-stats"
    >
      <div class="max-w-6xl mx-auto">
        <SectionHeader
          id="our-stats"
          title="Nos Chiffres Parlent d'Eux-Mêmes"
          subtitle="Des années d'expérience et des milliers de clients satisfaits"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatsCard
            :value="20"
            label="Années d'Expérience"
            description="Au service de vos rêves"
            suffix="+"
            icon="🎯"
            icon-aria-label="Cible"
            variant="blue"
          />

          <StatsCard
            :value="15000"
            label="Clients Satisfaits"
            description="Et ce n'est qu'un début"
            suffix="+"
            icon="😊"
            icon-aria-label="Visage souriant"
            variant="green"
          />

          <StatsCard
            :value="150"
            label="Destinations"
            description="À travers le monde"
            suffix="+"
            icon="🌍"
            icon-aria-label="Globe"
            variant="purple"
          />

          <StatsCard
            :value="95"
            label="Taux de Satisfaction"
            description="Clients recommandent"
            suffix="%"
            icon="⭐"
            icon-aria-label="Étoile"
            variant="orange"
          />
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section
      class="py-16 px-4 bg-blue-600 text-white"
      aria-labelledby="cta-section"
    >
      <div class="max-w-4xl mx-auto text-center">
        <h2 id="cta-section" class="text-3xl md:text-4xl font-bold mb-6">
          Prêt à Partir à l'Aventure?
        </h2>
        <p class="text-xl mb-8 text-blue-100">
          Explorez nos forfaits soigneusement sélectionnés et trouvez votre
          prochaine destination de rêve.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <router-link
            to="/forfaits"
            class="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-blue-50 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="Voir tous nos forfaits disponibles"
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
          <router-link
            to="/a-propos"
            class="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="En savoir plus sur notre agence"
          >
            En savoir plus
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
