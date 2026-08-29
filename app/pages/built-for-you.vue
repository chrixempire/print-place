<script setup lang="ts">
import type { Bundle } from '~/components/BundleRow.vue'
import type { Product } from '~/components/ProductCard.vue'

useSeo({
  title: 'Merch Bundles & Packages — Printplaceng',
  description:
    'Ready-made merch bundles for teams and brands — Team-Tee, New Hire Kit, Rain Ready and Executive Essentials. Branded t-shirts, caps, bottles, totes and more, done for you.',
})

const bundles: Bundle[] = [
  {
    image: '/img/bundle-interdab.webp',
    alt: 'INTERDAB branded t-shirts in white, grey and black',
    theme: 'dark',
    price: 'N80,000',
    title: 'Team-Tee Bundle',
    descPrimary: 'Perfect for quick launch shoots, exhibitions, team bonding events and casual work fit.',
    descSecondary:
      'This package comes with a free mock up design, 10 100% cotton tshirts branded in any color and size of choice.',
  },
  {
    image: '/img/bundle-matrix.webp',
    alt: 'Matrix branded merch set — box, cap, tee, tote and bottle',
    theme: 'light',
    price: 'N30,000',
    title: 'New Hire Kit',
    descPrimary:
      'Make them feel like they always belonged. A smooth welcome, a strong first impression, and a team they can instantly connect with.',
    descSecondary:
      'Branded box, tee, baseball cap, canvas tote bag, thermal bottle, and a personalized welcome card.',
  },
  {
    image: '/img/bundle-itel.webp',
    alt: 'itel branded hoodie, umbrella and mug in red',
    theme: 'light',
    price: 'N350,000',
    title: 'Rain Ready Kit',
    descPrimary: 'Cozy weather, but your merch is still out there, subtly keeping your brand top of mind',
    descSecondary:
      '10 canopy-crafted umbrellas, 10 100% cotton hoodies and 10 microwave-safe ceramic coffee mug',
  },
  {
    image: '/img/bundle-parthian.webp',
    alt: 'PARTHIAN executive leather gift set — journal, pen, bottle and keyholder',
    theme: 'light',
    price: '20k/box',
    title: 'Executive Essentials',
    descPrimary: 'Appreciate clients with functional items',
    descSecondary:
      'Sturdy leather journal, ball pen, temperature bottle, dome keyholder, crafted to fit box, all branded',
  },
  {
    image: '/img/bundle-korapay.webp',
    alt: 'korapay branded merch — hoodie, polo, cap, box and tote',
    theme: 'light',
    type: 'cta',
    title: 'Got something in mind?',
    subtitle: 'Share your brief.',
    cta: 'Start here',
  },
]

const products: Product[] = [
  { image: '/img/products/tshirt.webp', name: 'T-shirt', price: 'N7,000' },
  { image: '/img/products/facecap.webp', name: 'Face cap', price: 'N4,000' },
  { image: '/img/products/thermal.webp', name: 'Thermal Bottles', price: 'N7,500' },
  { image: '/img/products/tote.webp', name: 'Tote bag', price: 'N5,000' },
  { image: '/img/products/umbrella.webp', name: 'Umbrella', price: 'N9,000' },
  { image: '/img/products/journal.webp', name: 'Spiral Journals', price: 'N1,000' },
  { image: '/img/products/handfans.webp', name: 'Handfans', price: 'N1,000' },
  { image: '/img/products/mug.webp', name: 'Coffee mug', price: 'N3,000' },
  { image: '/img/products/ballpen.webp', name: 'Ball pen', price: 'N1,200' },
]

// Structured data: the bundles as a Product ItemList (helps rich results).
const { public: { siteUrl } } = useRuntimeConfig()
const bundleLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Printplaceng merch bundles',
  itemListElement: bundles
    .filter((b) => b.type !== 'cta')
    .map((b, i) => {
      const amount = /^N[\d,]+$/.test(b.price ?? '') ? (b.price ?? '').replace(/[^\d]/g, '') : null
      return {
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: b.title,
          description: b.descPrimary,
          image: `${siteUrl}${b.image}`,
          brand: { '@type': 'Brand', name: 'Printplaceng' },
          ...(amount
            ? { offers: { '@type': 'Offer', priceCurrency: 'NGN', price: amount, availability: 'https://schema.org/InStock', url: `${siteUrl}/contact` } }
            : {}),
        },
      }
    }),
}
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(bundleLd) }] })
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="px-5 pb-16 pt-16 text-center md:pb-24 md:pt-20">
      <div class="mx-auto flex max-w-[640px] flex-col items-center gap-2.5">
        <h1 v-words class="text-[32px] font-bold leading-[1.05] tracking-[-1px] text-neutral-500 sm:text-[46px] sm:leading-[50px] sm:tracking-[-1.38px]">
          We’ve handled the hard part.
        </h1>
        <p v-anim:up="150" class="text-[18px] leading-6 text-neutral-400">Your turn to choose</p>
        <AppButton to="/contact" class="mt-2">Let’s talk more</AppButton>
      </div>
    </section>

    <!-- Bundles -->
    <section class="mx-auto max-w-[1080px] px-5 pb-20 md:px-6">
      <div class="flex flex-col gap-5">
        <BundleRow v-for="(b, i) in bundles" :key="b.title" v-flip="i * 60" :bundle="b" />
      </div>
    </section>

    <!-- Top picks -->
    <section class="overflow-hidden bg-neutral-500 py-16 md:py-24">
      <h2 v-words class="mb-10 text-center text-[32px] font-bold leading-tight tracking-[-1px] text-white md:mb-14 md:text-[40px]">
        Top picks
      </h2>
      <TopPicksCarousel v-anim:up="150" :products="products" />
    </section>
  </div>
</template>
