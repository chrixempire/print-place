<script setup lang="ts">
import type { Bundle } from '~/components/BundleRow.vue'
import type { Product } from '~/components/ProductCard.vue'

useHead({ title: 'Printplaceng — We’ve handled the hard part.' })

const bundles: Bundle[] = [
  {
    image: '/img/bundle-team-tee.png',
    alt: 'Team-Tee bundle — branded t-shirts',
    theme: 'dark',
    price: 'N80,000',
    title: 'Team-Tee Bundle',
    descPrimary: 'Perfect for quick launch shoots, exhibitions, team bonding events and casual work fit.',
    descSecondary:
      'This package comes with a free mock up design, 10 100% cotton tshirts branded in any color and size of choice.',
  },
  {
    image: '/img/bundle-new-hire.png',
    alt: 'New Hire kit — branded merch set',
    theme: 'light',
    price: 'N30,000',
    title: 'New Hire Kit',
    descPrimary: 'A smooth welcome, a strong first impression, and a team they can instantly connect with.',
    descSecondary: 'Thermal bottle, and a personalized welcome card.',
  },
  {
    image: '/img/bundle-rain-ready.png',
    alt: 'Rain Ready kit — hoodie, umbrella, mug',
    theme: 'light',
    price: 'N350,000',
    title: 'Rain Ready Kit',
    descPrimary: 'Cozy weather, but your merch is still out there, subtly keeping your brand top of mind',
    descSecondary:
      '10 canopy-crafted umbrellas, 10 100% cotton hoodies and 10 microwave-safe ceramic coffee mug',
  },
  {
    image: '/img/bundle-executive.png',
    alt: 'Executive Essentials — leather kit',
    theme: 'light',
    price: '20k/box',
    title: 'Executive Essentials',
    descPrimary: 'Appreciate clients with functional items',
    descSecondary:
      'Sturdy leather journal, ball pen, temperature bottle, dome keyholder, crafted to fit box, all branded',
  },
  {
    image: '/img/bundle-brief.png',
    alt: 'Custom merch — share your brief',
    theme: 'light',
    type: 'cta',
    title: 'Got something in mind?',
    subtitle: 'Share your brief.',
    cta: 'Let’s get started.',
  },
]

const products: Product[] = [
  { image: '/img/products/umbrella.png', name: 'Umbrella', price: 'N9,000' },
  { image: '/img/products/thermal.png', name: 'Thermal Bottles', price: 'N7,500' },
  { image: '/img/products/tote.png', name: 'Tote bag', price: 'N5,000' },
  { image: '/img/products/mug.png', name: 'Coffee mug', price: 'N3,000' },
  { image: '/img/products/handfans.png', name: 'Handfans', price: 'N5,000' },
  { image: '/img/products/ballpen.png', name: 'Ball pen', price: 'N1,200' },
  { image: '/img/products/journal.png', name: 'Spiral Journals', price: 'N1,000' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="px-5 pb-16 pt-16 text-center md:pb-24 md:pt-20">
      <div class="mx-auto flex max-w-[640px] flex-col items-center gap-2.5">
        <h1 class="text-[32px] font-bold leading-[1.05] tracking-[-1px] text-neutral-500 sm:text-[46px] sm:leading-[50px] sm:tracking-[-1.38px]">
          We’ve handled the hard part.
        </h1>
        <p class="text-[18px] leading-6 text-neutral-400">Your turn to choose</p>
        <AppButton to="/contact" class="mt-2">Let’s talk more</AppButton>
      </div>
    </section>

    <!-- Bundles -->
    <section class="mx-auto max-w-[1080px] px-5 pb-20 md:px-6">
      <div class="flex flex-col gap-5">
        <BundleRow v-for="(b, i) in bundles" :key="b.title" v-reveal="i % 2 === 0 ? 0 : 80" :bundle="b" />
      </div>
    </section>

    <!-- Top picks -->
    <section class="overflow-hidden bg-neutral-500 py-16 md:py-24">
      <h2 class="mb-10 text-center text-[32px] font-bold leading-tight tracking-[-1px] text-white md:mb-14 md:text-[40px]">
        Top picks
      </h2>
      <TopPicksCarousel :products="products" />
    </section>
  </div>
</template>
