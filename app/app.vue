<script setup lang="ts">
// Site-wide structured data (Organization + WebSite). Page-specific JSON-LD
// (LocalBusiness, ItemList) is added on the relevant pages.
const { public: { siteUrl } } = useRuntimeConfig()

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Printplaceng',
  legalName: 'Print Place',
  url: siteUrl,
  logo: `${siteUrl}/icon-512.png`,
  image: `${siteUrl}/og-image.jpg`,
  description:
    'Printplaceng is a custom merch and branding partner in Lagos, Nigeria — premium print on t-shirts, mugs, tote bags, packaging and more.',
  email: 'hello@printplace.ng',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '121 Isolo Road, Palm Avenue',
    addressLocality: 'Lagos',
    addressCountry: 'NG',
  },
  sameAs: [
    'https://www.instagram.com/printplaceng',
    'https://youtube.com/@theprintplaceteam',
    'https://www.tiktok.com/@printplaceng',
    'https://www.linkedin.com/company/printplacengr/',
    'https://x.com/printplaceng_',
  ],
}

const siteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Printplaceng',
  url: siteUrl,
  inLanguage: 'en',
  publisher: { '@id': `${siteUrl}/#organization` },
}

useHead({
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(orgLd) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(siteLd) },
  ],
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
