<script setup lang="ts">
import type { FaqItem } from '~/components/FaqAccordion.vue'

useSeo({
  title: 'Contact Printplaceng — Custom Printing in Lagos',
  description:
    'Talk to Printplaceng about your custom merch and print project. Visit our Lagos showroom, chat on WhatsApp, or email hello@printplace.ng for a quote.',
})

// Single ordered list (2-col grid, row-major) — drag to re-arrange.
// Order is interleaved so the initial grid matches the original two-column layout.
const cards = ref([
  { icon: '/icons/phone.svg', title: 'Talk to our team', value: 'hello@printplace.ng' },
  { icon: '/icons/instagram.svg', title: 'Follow our work', value: '@printplace' },
  { icon: '/icons/linkedin.svg', title: 'Connect on LinkedIn', value: 'Print Place' },
  { icon: '/icons/whatsapp.svg', title: 'Chat with us', value: '+234 XXX XXX XXXX' },
  { icon: '/icons/map-point.svg', title: 'Visit our showroom', value: '121 Isolo rd, Palm Avenue, Lagos' },
])

// --- drag-to-reorder (native DnD + <TransitionGroup> FLIP shuffle) ---
const dragIndex = ref<number | null>(null)
function onDragStart(i: number, e: DragEvent) {
  dragIndex.value = i
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(i)) // Firefox needs a payload to drag
  }
}
function onDragEnter(i: number) {
  const from = dragIndex.value
  if (from === null || from === i) return
  const list = cards.value.slice()
  const [item] = list.splice(from, 1)
  list.splice(i, 0, item)
  cards.value = list
  dragIndex.value = i // the dragged card now lives at slot i
}
function onDragEnd() {
  dragIndex.value = null
}

// Auto re-arrange every 2 minutes (skips while a manual drag is in progress).
// The <TransitionGroup> animates the new order with the same FLIP shuffle.
let shuffleTimer: ReturnType<typeof setInterval> | null = null
function shuffleCards() {
  if (dragIndex.value !== null) return // don't disrupt an active drag
  const list = cards.value.slice()
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[list[i], list[j]] = [list[j], list[i]]
  }
  // guarantee a visible change
  if (list.every((c, i) => c.title === cards.value[i].title)) list.push(list.shift()!)
  cards.value = list
}
onMounted(() => {
  shuffleTimer = setInterval(shuffleCards, 120_000)
})
onBeforeUnmount(() => {
  if (shuffleTimer) clearInterval(shuffleTimer)
})

// "Fresh off the press" — pixel-perfect bento (Figma 18491:464068).
// pressCells: fixed geometry (as % of the 890×811 frame) for the 6 desktop cells.
// The cells stay put; only the image inside each swaps, so images "move" cells.
const pressCells = [
  { l: '0.22%',  t: '0%',     w: '44.83%', h: '54.13%', r: '20px' },  // big top-left
  { l: '49.55%', t: '0%',     w: '46.63%', h: '26.51%', r: '20px' },  // wide top-right
  { l: '49.55%', t: '28.97%', w: '49.55%', h: '28.11%', r: '110px' }, // pill mid-right
  { l: '0%',     t: '56.60%', w: '30.00%', h: '41.31%', r: '20px' },  // tall bottom-left
  { l: '34.61%', t: '58.69%', w: '30.34%', h: '31.07%', r: '60px' },  // rounded bottom-mid
  { l: '69.55%', t: '59.56%', w: '30.45%', h: '31.07%', r: '24px' },  // bottom-right
]
// First 6 = the exact Figma arrangement (in cell order); the gallery photos join
// the pool so they rotate into the cells over time.
const pressPool = [
  { src: '/img/contact/g1.png' },          // ICHAD journals
  { src: '/img/contact/g2.png' },          // studio / press machines
  { src: '/img/contact/g6.png' },          // desk + blinds
  { src: '/img/contact/g3.png' },          // branded pens
  { src: '/img/contact/team-group.jpg' },  // team group (DSC09557)
  { src: '/img/contact/g4.png' },          // workshop
  { src: '/img/gallery/gallery-1.jpg' },
  { src: '/img/gallery/gallery-2.jpg' },
  { src: '/img/gallery/gallery-3.jpg' },
  { src: '/img/gallery/gallery-4.jpg' },
]
const pressSlots = ref(pressPool.slice(0, 6)) // initial paint = pixel-perfect Figma
const pressRoot = ref<HTMLElement | null>(null)
// Mobile marquee — all images, doubled for a seamless right→left loop.
const pressMarqueeLoop = [...pressPool, ...pressPool]
const pressTrack = ref<HTMLElement | null>(null)
const PRESS_MARQUEE_SPEED = 60 // px / second
let pressTimer: ReturnType<typeof setInterval> | null = null
let pressTween: any = null
let pressResizeT: ReturnType<typeof setTimeout>

function shufflePool<T>(a: T[]): T[] {
  const arr = a.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Desktop: fade the cells out, reshuffle which images fill them, fade back in.
function shufflePress() {
  const { gsap, reduced } = useGsap()
  let next = shufflePool(pressPool).slice(0, 6)
  while (next.every((p, i) => p.src === pressSlots.value[i].src)) next = shufflePool(pressPool).slice(0, 6)
  const tiles = pressRoot.value?.querySelectorAll('.press-tile')
  if (reduced || !tiles?.length) { pressSlots.value = next; return }
  gsap
    .timeline()
    .to(tiles, { autoAlpha: 0, duration: 0.5, ease: 'power2.in', stagger: { each: 0.05, from: 'random' } })
    .add(() => { pressSlots.value = next }) // swap sources while hidden
    .to(tiles, { autoAlpha: 1, duration: 0.6, ease: 'power2.out', stagger: { each: 0.06, from: 'random' } }, '+=0.08')
}

// Mobile: seamless right→left flow of the doubled strip.
function buildPressMarquee() {
  const { gsap } = useGsap()
  const track = pressTrack.value
  if (!track || track.children.length <= pressPool.length) return
  pressTween?.kill()
  gsap.set(track, { x: 0 })
  const loopDist =
    (track.children[pressPool.length] as HTMLElement).offsetLeft - (track.children[0] as HTMLElement).offsetLeft
  if (loopDist <= 0) return
  pressTween = gsap.to(track, { x: -loopDist, duration: loopDist / PRESS_MARQUEE_SPEED, ease: 'none', repeat: -1 })
}

// Desktop shuffles every 2 min; mobile scrolls. Pick the right one per breakpoint.
function setupPress() {
  const { reduced } = useGsap()
  if (pressTimer) { clearInterval(pressTimer); pressTimer = null }
  pressTween?.kill(); pressTween = null
  if (reduced) return
  if (window.matchMedia('(max-width: 767px)').matches) buildPressMarquee()
  else pressTimer = setInterval(shufflePress, 120_000)
}
function onPressResize() { clearTimeout(pressResizeT); pressResizeT = setTimeout(setupPress, 200) }
onMounted(() => { setupPress(); window.addEventListener('resize', onPressResize) })
onBeforeUnmount(() => {
  if (pressTimer) clearInterval(pressTimer)
  pressTween?.kill()
  clearTimeout(pressResizeT)
  window.removeEventListener('resize', onPressResize)
})

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

// Structured data: LocalBusiness (showroom) + FAQPage (from the FAQ list).
const { public: { siteUrl } } = useRuntimeConfig()
const businessLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#organization`,
  name: 'Printplaceng',
  image: `${siteUrl}/og-image.jpg`,
  url: siteUrl,
  email: 'hello@printplace.ng',
  priceRange: '₦₦',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '121 Isolo Road, Palm Avenue',
    addressLocality: 'Lagos',
    addressCountry: 'NG',
  },
  areaServed: 'NG',
  sameAs: [
    'https://www.instagram.com/printplaceng',
    'https://youtube.com/@theprintplaceteam',
    'https://www.tiktok.com/@printplaceng',
    'https://www.linkedin.com/company/printplacengr/',
    'https://x.com/printplaceng_',
  ],
}
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}
useHead({
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(businessLd) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(faqLd) },
  ],
})
</script>

<template>
  <div>
    <!-- HERO + contact cards -->
    <section class="bg-stone-500 px-5 pt-16 md:px-6 md:pt-20">
      <div class="mx-auto flex max-w-[1080px] flex-col items-center gap-[60px]">
        <div class="flex flex-col items-center gap-2.5 text-center">
          <h1 v-words class="text-[32px] font-bold leading-tight tracking-[-1px] text-neutral-500 sm:text-[46px] sm:leading-[50px] sm:tracking-[-1.38px]">
            Keep up with Print Place
          </h1>
          <p v-anim:up="150" class="max-w-[509px] text-[18px] leading-6 text-neutral-400">
            Whether you’re ready to start a project, have a question, or just want to see what we’re creating, we’d love to hear from you.
          </p>
          <AppButton to="/built-for-you" class="mt-2">See packages</AppButton>
        </div>

        <!-- drag any card to re-arrange; others shuffle with a FLIP animation -->
        <TransitionGroup
          v-anim:up.stagger
          tag="div"
          name="card"
          class="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div
            v-for="(c, i) in cards"
            :key="c.title"
            draggable="true"
            @dragstart="onDragStart(i, $event)"
            @dragenter.prevent="onDragEnter(i)"
            @dragover.prevent
            @drop.prevent
            @dragend="onDragEnd"
            class="card-item group relative flex cursor-grab items-center gap-4 overflow-hidden rounded-2xl border border-gray-500/50 bg-white px-6 py-[19px] shadow-sm transition-[border-color,box-shadow,opacity] duration-300 ease-out hover:border-coral-500/40 hover:shadow-xl active:cursor-grabbing"
            :class="dragIndex === i ? 'opacity-40 ring-2 ring-coral-500/50' : ''"
          >
            <!-- coral wash sweeps in from the left on hover -->
            <span class="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-coral-500/10 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-0"></span>
            <span class="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f0f0ef] transition-all duration-300 ease-out group-hover:rotate-6 group-hover:scale-110 group-hover:bg-coral-500/15">
              <img :src="c.icon" alt="" draggable="false" class="size-5 transition-transform duration-300 group-hover:scale-110" />
            </span>
            <span class="relative flex flex-col text-[16px] leading-5">
              <span class="font-[550] text-neutral-500">{{ c.title }}</span>
              <span class="font-medium text-neutral-200 transition-colors duration-300 group-hover:text-coral-600">{{ c.value }}</span>
            </span>
            <!-- drag handle hint -->
            <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[18px] leading-none text-neutral-200 opacity-0 transition-opacity duration-300 group-hover:opacity-70">⠿</span>
          </div>
        </TransitionGroup>
      </div>
    </section>

    <!-- FRESH OFF THE PRESS -->
    <section class="bg-stone-500 px-5 py-16 md:px-6 md:py-20">
      <div class="mx-auto max-w-[1000px] rounded-[24px] bg-neutral-500 px-4 py-10 md:rounded-[32px] md:px-12 md:py-14">
        <h2 v-words class="mb-10 text-center text-[32px] font-bold leading-tight tracking-[-1px] text-white md:text-[46px] md:leading-[52px] md:tracking-[-1.38px]">
          Fresh off the press
        </h2>
        <!-- desktop bento — pixel-perfect Figma; images reshuffle across cells every 2 min -->
        <div
          v-anim:up="120"
          ref="pressRoot"
          class="relative mx-auto hidden aspect-[890/811] w-full max-w-[890px] [perspective:1600px] md:block"
        >
          <div
            v-for="(g, i) in pressSlots"
            :key="i"
            v-liquid="{ max: 10 }"
            class="press-tile group absolute overflow-hidden bg-white"
            :style="{ left: pressCells[i].l, top: pressCells[i].t, width: pressCells[i].w, height: pressCells[i].h, borderRadius: pressCells[i].r }"
          >
            <img :src="g.src" alt="Printplace work" class="size-full object-cover" />
            <div class="liquid-glow pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
          </div>
        </div>
        <!-- mobile — all images scroll left in a seamless marquee -->
        <div class="overflow-hidden md:hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div ref="pressTrack" class="flex w-max items-stretch gap-3 will-change-transform">
            <div
              v-for="(g, i) in pressMarqueeLoop"
              :key="i"
              :aria-hidden="i >= pressPool.length ? 'true' : undefined"
              class="h-[220px] w-[165px] shrink-0 overflow-hidden rounded-2xl bg-white"
            >
              <img :src="g.src" alt="Printplace work" class="size-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-stone-500 px-5 pb-16 md:px-6 md:pb-24">
      <div class="mx-auto flex max-w-[1080px] flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12">
        <h2 v-words class="max-w-[336px] text-[40px] font-bold leading-[1.1] tracking-[-1.5px] text-neutral-500 md:text-[46px]">
          Everything you need to know
        </h2>
        <div v-anim:up="120" class="w-full md:max-w-[548px]">
          <FaqAccordion :items="faqs" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* FLIP shuffle: cards glide to their new slots while dragging/reordering */
.card-move {
  transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
}
/* the lifted card shouldn't animate its own move (native drag ghost handles it) */
.card-item:active {
  transition: none;
}
@media (prefers-reduced-motion: reduce) {
  .card-move {
    transition: none;
  }
}
</style>
