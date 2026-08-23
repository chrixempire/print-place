<script setup lang="ts">
import type { FaqItem } from '~/components/FaqAccordion.vue'

useHead({ title: 'Contact — Printplaceng' })

const colA = [
  { icon: '/icons/phone.svg', title: 'Talk to our team', value: 'hello@printplace.ng' },
  { icon: '/icons/linkedin.svg', title: 'Connect on LinkedIn', value: 'Print Place' },
  { icon: '/icons/map-point.svg', title: 'Visit our showroom', value: '121 Isolo rd, Palm Avenue, Lagos' },
]
const colB = [
  { icon: '/icons/instagram.svg', title: 'Follow our work', value: '@printplace' },
  { icon: '/icons/whatsapp.svg', title: 'Chat with us', value: '+234 XXX XXX XXXX' },
]

// Bento gallery cells — positions/sizes as % of the 890×811 Figma frame.
const gallery = [
  { src: '/img/contact/g1.png', l: '0.22%', t: '0%', w: '44.83%', h: '54.13%', r: '20px' },
  { src: '/img/contact/g2.png', l: '49.55%', t: '0%', w: '46.63%', h: '26.51%', r: '20px' },
  { src: '/img/contact/g6.png', l: '49.55%', t: '28.98%', w: '49.55%', h: '28.11%', r: '110px' },
  { src: '/img/contact/g3.png', l: '0%', t: '56.60%', w: '30.00%', h: '41.31%', r: '20px' },
  { src: '/img/contact/g5.png', l: '34.61%', t: '58.69%', w: '30.34%', h: '31.07%', r: '60px', zoom: 1.85, origin: 'top' },
  { src: '/img/contact/g4.png', l: '69.55%', t: '59.56%', w: '30.45%', h: '31.07%', r: '24px' },
]

const faqs: FaqItem[] = [
  { q: 'What products can Print Place customize?', a: 'We print on a wide range of products including T-shirts, hoodies, tote bags, mugs, pens, notebooks, caps, bottles, business cards, flyers, brochures, posters, packaging, and more. If you have a custom request, we’d love to hear about it.' },
  { q: 'Is there a minimum order quantity?', a: 'It depends on the product. Some items can be ordered in small quantities, while others are more cost-effective for bulk orders. Reach out with your requirements, and we’ll recommend the best option.' },
  { q: 'Can you help if I don’t have a design?', a: 'Absolutely. If your artwork isn’t ready, our team can help prepare your files or create designs that are ready for print.' },
  { q: 'How long does production take?', a: 'Production timelines vary depending on the product, quantity, and finishing options. Once your order is confirmed, we’ll provide an estimated delivery date before production begins.' },
  { q: 'Do you offer nationwide delivery?', a: 'Yes. We deliver across Nigeria, and customers can also choose to pick up their orders from our showroom when available.' },
  { q: 'Can I request a custom quote?', a: 'Of course. Every project is different. Tell us what you’d like to print, the quantity, and any special requirements, and we’ll send you a personalized quote.' },
  { q: 'Can you handle large event orders?', a: 'Yes. Whether it’s onboarding kits, conference merchandise, promotional campaigns, or company-wide branding, we’re equipped to handle bulk orders with consistent quality.' },
  { q: 'What file formats do you accept?', a: 'We recommend high-resolution PDF, AI, EPS, PSD, or PNG files. If you’re unsure whether your file is print-ready, we’ll review it before production.' },
  { q: 'What types of businesses do you work with?', a: 'We work with startups, SMEs, schools, churches, corporate organizations, event planners, and growing brands looking for high-quality print and merchandise solutions.' },
  { q: 'Can I see a sample before production?', a: 'For selected projects, we can provide digital proofs or physical samples so you can approve the design before full production begins.' },
]
</script>

<template>
  <div>
    <!-- HERO + contact cards -->
    <section class="bg-stone-500 px-5 pt-16 md:px-6 md:pt-20">
      <div class="mx-auto flex max-w-[1080px] flex-col items-center gap-[60px]">
        <div class="flex flex-col items-center gap-2.5 text-center">
          <h1 class="text-[32px] font-bold leading-tight tracking-[-1px] text-neutral-500 sm:text-[46px] sm:leading-[50px] sm:tracking-[-1.38px]">
            Keep up with Print Place
          </h1>
          <p class="max-w-[509px] text-[18px] leading-6 text-neutral-400">
            Whether you’re ready to start a project, have a question, or just want to see what we’re creating, we’d love to hear from you.
          </p>
          <AppButton to="/built-for-you" class="mt-2">See packages</AppButton>
        </div>

        <div class="flex w-full flex-col items-stretch gap-4 md:flex-row md:items-start md:justify-center md:gap-5">
          <div class="flex flex-1 flex-col gap-4">
            <div
              v-for="(c, i) in colA"
              :key="c.title"
              v-reveal="i * 80"
              class="flex items-center gap-4 rounded-2xl border border-gray-500/50 bg-white px-6 py-[19px] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-coral-500/40 hover:shadow-lg"
            >
              <span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f0f0ef]">
                <img :src="c.icon" alt="" class="size-5" />
              </span>
              <span class="flex flex-col text-[16px] leading-5">
                <span class="font-[550] text-neutral-500">{{ c.title }}</span>
                <span class="font-medium text-neutral-200">{{ c.value }}</span>
              </span>
            </div>
          </div>
          <div class="flex flex-1 flex-col gap-4">
            <div
              v-for="(c, i) in colB"
              :key="c.title"
              v-reveal="i * 80"
              class="flex items-center gap-4 rounded-2xl border border-gray-500/50 bg-white px-6 py-[19px] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-coral-500/40 hover:shadow-lg"
            >
              <span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f0f0ef]">
                <img :src="c.icon" alt="" class="size-5" />
              </span>
              <span class="flex flex-col text-[16px] leading-5">
                <span class="font-[550] text-neutral-500">{{ c.title }}</span>
                <span class="font-medium text-neutral-200">{{ c.value }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FRESH OFF THE PRESS -->
    <section class="bg-stone-500 px-5 py-16 md:px-6 md:py-20">
      <div class="mx-auto max-w-[1000px] rounded-[24px] bg-neutral-500 px-4 py-10 md:rounded-[32px] md:px-12 md:py-14">
        <h2 class="mb-10 text-center text-[32px] font-bold leading-tight tracking-[-1px] text-white md:text-[46px] md:leading-[52px] md:tracking-[-1.38px]">
          Fresh off the press
        </h2>
        <!-- desktop bento -->
        <div class="relative mx-auto hidden aspect-[890/811] w-full max-w-[890px] md:block">
          <div
            v-for="(g, i) in gallery"
            :key="i"
            v-reveal="i * 90"
            class="group absolute overflow-hidden transition-transform duration-500 ease-out hover:scale-[1.03]"
            :style="{ left: g.l, top: g.t, width: g.w, height: g.h, borderRadius: g.r }"
          >
            <img
              :src="g.src"
              alt="Printplace work"
              :style="{ transform: `scale(${g.zoom || 1})`, transformOrigin: g.origin || 'center' }"
              class="size-full object-cover"
            />
          </div>
        </div>
        <!-- mobile grid -->
        <div class="grid grid-cols-2 gap-3 md:hidden">
          <div v-for="(g, i) in gallery" :key="i" class="h-40 overflow-hidden rounded-2xl">
            <img
              :src="g.src"
              alt="Printplace work"
              :style="{ transform: `scale(${g.zoom || 1})`, transformOrigin: g.origin || 'center' }"
              class="size-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-stone-500 px-5 pb-16 md:px-6 md:pb-24">
      <div class="mx-auto flex max-w-[1080px] flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12">
        <h2 v-reveal class="max-w-[336px] text-[40px] font-bold leading-[1.1] tracking-[-1.5px] text-neutral-500 md:text-[46px]">
          Everything you need to know
        </h2>
        <div v-reveal="120" class="w-full md:max-w-[548px]">
          <FaqAccordion :items="faqs" />
        </div>
      </div>
    </section>
  </div>
</template>
