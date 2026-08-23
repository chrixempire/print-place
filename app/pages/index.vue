<script setup lang="ts">
import type { FaqItem } from '~/components/FaqAccordion.vue'

useHead({ title: 'Printplaceng — Your custom merch branding partner' })

const heroCollage = [
  { src: '/img/about/hero/h1.png', w: 194, h: 248 },
  { src: '/img/about/hero/h2.png', w: 194, h: 338 },
  { src: '/img/about/hero/h3.png', w: 231, h: 286 },
  { src: '/img/about/hero/h4.png', w: 374, h: 437 },
  { src: '/img/about/hero/h5.png', w: 181, h: 228 },
  { src: '/img/about/hero/h6.png', w: 188, h: 266 },
  { src: '/img/about/hero/h7.png', w: 151, h: 173 },
]

const features = [
  { icon: '/icons/f-structure.svg', title: 'Structured Process', desc: 'From discovery to delivery, everything is organized' },
  { icon: '/icons/f-medal.svg', title: 'Quality Assurance', desc: 'We are keen on delivering excellence, every single time' },
  { icon: '/icons/f-users.svg', title: 'Young and Driven Team', desc: 'We are hands-on, updated on the latest technology and constantly evolving to be your best option' },
]
// Process section is a single-open accordion — opening one closes the others.
const openFeature = ref(0)
const toggleFeature = (i: number) => (openFeature.value = openFeature.value === i ? -1 : i)

const team = [
  { img: '/img/about/founder.png', name: 'Olajumoke Olutomiwa', role: 'Founder & CEO', pos: 'center 20%', zoom: 1.15 },
  // Placeholder portrait until a real photo of Abiola is supplied.
  { img: '/img/about/team/abiola.svg', name: 'Abiola Darasimi', role: 'Chief Operating Officer', pos: 'center 50%', zoom: 1 },
  { img: '/img/about/team/hundeyin.png', name: 'Hundeyin Serah', role: 'Head of Sales', pos: 'center 24%', zoom: 1.05 },
  { img: '/img/about/team/obasa.png', name: 'Obasa Eniola', role: 'Head of Production', pos: 'center 26%', zoom: 1.28 },
  { img: '/img/about/team/awoniyi.png', name: 'Awoniyi Peace', role: 'Quality assurance Officer', pos: 'center 28%', zoom: 1.28 },
  { img: '/img/about/team/awoponle.png', name: 'Awoponle Ibukunoluwa', role: 'Customer Support Representative', pos: 'center 45%', zoom: 1.4 },
  { img: '/img/about/team/adegboyega.png', name: 'Adegboyega Omolola', role: 'Head of Marketing', pos: 'center 22%', zoom: 1.12 },
  { img: '/img/about/team/hude.png', name: 'Hude Christianah', role: 'Head of Procurement', pos: 'center 28%', zoom: 1.28 },
]

// TEAM carousel — drag-to-scroll with hover arrows that hide at each end.
const teamTrack = ref<HTMLElement | null>(null)
const atStart = ref(true)
const atEnd = ref(false)
const dragging = ref(false)

const updateTeamArrows = () => {
  const el = teamTrack.value
  if (!el) return
  atStart.value = el.scrollLeft <= 1
  atEnd.value = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1
}

// Arrow click pages by roughly one viewport of cards.
const scrollTeam = (dir: number) => {
  const el = teamTrack.value
  if (!el) return
  el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 336), behavior: 'smooth' })
}

// Mouse drag-to-scroll (touch/pen use native horizontal scrolling).
let dragStartX = 0
let dragStartScroll = 0
const onTeamPointerDown = (e: PointerEvent) => {
  const el = teamTrack.value
  if (!el || e.pointerType !== 'mouse') return
  dragging.value = true
  dragStartX = e.clientX
  dragStartScroll = el.scrollLeft
  el.setPointerCapture(e.pointerId)
}
const onTeamPointerMove = (e: PointerEvent) => {
  if (!dragging.value) return
  teamTrack.value!.scrollLeft = dragStartScroll - (e.clientX - dragStartX)
}
const onTeamPointerUp = (e: PointerEvent) => {
  if (!dragging.value) return
  dragging.value = false
  teamTrack.value?.releasePointerCapture?.(e.pointerId)
}

// Continuous auto-scroll that bounces between the two ends; pauses while the
// pointer is over the carousel (also revealing the arrows) or during a drag.
const paused = ref(false)
const AUTO_SPEED = 42 // px per second
let rafId = 0
let lastTs = 0
let autoDir = 1
let autoPos = 0

const autoTick = (ts: number) => {
  rafId = requestAnimationFrame(autoTick)
  const el = teamTrack.value
  if (!el) return
  const dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.05) : 0
  lastTs = ts
  const max = el.scrollWidth - el.clientWidth
  if (paused.value || dragging.value || max <= 1) {
    autoPos = el.scrollLeft // stay in sync with manual scrolling
    return
  }
  autoPos += autoDir * AUTO_SPEED * dt
  if (autoPos >= max) { autoPos = max; autoDir = -1 }
  else if (autoPos <= 0) { autoPos = 0; autoDir = 1 }
  el.scrollLeft = autoPos
}

onMounted(() => {
  updateTeamArrows()
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (!reduced) rafId = requestAnimationFrame(autoTick)
})
onBeforeUnmount(() => cancelAnimationFrame(rafId))

// Cinematic hero entrance + collage depth-drift on scroll.
const heroRoot = ref<HTMLElement | null>(null)
let heroCtx: any = null
onMounted(() => {
  const { gsap, reduced } = useGsap()
  if (reduced || !heroRoot.value) return
  heroCtx = gsap.context((self: any) => {
    const q = self.selector
    // fromTo (not from): these elements are pre-hidden via `.anim-ready
    // [data-anim] { opacity: 0 }`, so `.from` would read 0 as the destination
    // and never reveal them. Explicit `to` states avoid that.
    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(q('[data-hero=title]'), { yPercent: 45, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1 }, 0)
      .fromTo(q('[data-hero=sub]'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.15)
      .fromTo(q('.hero-cta'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, clearProps: 'transform' }, 0.3)
      .fromTo(
        q('.hero-card'),
        { yPercent: 60, opacity: 0, scale: 0.8 },
        { yPercent: 0, opacity: 1, scale: 1, duration: 0.85, stagger: 0.09, ease: 'back.out(1.6)', clearProps: 'transform' },
        0.3,
      )
    gsap.to(q('.hero-collage'), {
      yPercent: -6,
      ease: 'none',
      scrollTrigger: { trigger: heroRoot.value, start: 'top top', end: 'bottom top', scrub: true },
    })
  }, heroRoot.value)
})
onBeforeUnmount(() => heroCtx?.revert())

const brands = [
  '/img/about/brands/b1.png', '/img/about/brands/b2.png', '/img/about/brands/itel.png',
  '/img/about/brands/b4.png', '/img/about/brands/b5.png', '/img/about/brands/ehealth.png',
  '/img/about/brands/b7.png', '/img/about/brands/b8.png', '/img/about/brands/korapay.png',
]

// "Stop guessing" — product photos placed around a big circle whose centre is
// off to the right, so they sit on the visible left arc and rotate around it.
const budgetImgs = [
  '/img/about/budget/g1.png',
  '/img/about/budget/g2.png',
  '/img/about/budget/g3.png',
  '/img/about/budget/g4.png',
  '/img/about/budget/g5.png',
  '/img/about/budget/g6.png',
]
// 12 slots (30° apart) — matches the Figma arc; big cards overlap slightly while rotating
const budgetOrbit = [...budgetImgs, ...budgetImgs]
// Pause the spin whenever the pointer is anywhere over the gallery column
// (JS toggle — more reliable than CSS :hover across the clipped, overflowing cards).
const orbitPaused = ref(false)

const faqs: FaqItem[] = [
  { q: 'What products can Print Place customize?', a: 'We print on a wide range of products including T-shirts, hoodies, tote bags, mugs, pens, notebooks, caps, bottles, business cards, flyers, brochures, posters, packaging, and more. If you have a custom request, we’d love to hear about it.' },
  { q: 'Is there a minimum order quantity?', a: 'It depends on the product. Some items can be ordered in small quantities, while others are more cost-effective for bulk orders. Reach out with your requirements, and we’ll recommend the best option.' },
  { q: 'Can you help if I don’t have a design?', a: 'Absolutely. If your artwork isn’t ready, our team can help prepare your files or create designs that are ready for print.' },
  { q: 'How long does production take?', a: 'Production timelines vary depending on the product, quantity, and finishing options. Once your order is confirmed, we’ll provide an estimated delivery date before production begins.' },
  { q: 'Do you offer nationwide delivery?', a: 'Yes. We deliver across Nigeria, and customers can also choose to pick up their orders from our showroom when available.' },
]
</script>

<template>
  <div>
    <!-- HERO -->
    <section ref="heroRoot" class="overflow-hidden bg-neutral-500 px-5 pt-16 md:pt-20">
      <div class="mx-auto flex max-w-[640px] flex-col items-center gap-4 text-center">
        <h1 data-hero="title" data-anim class="text-[36px] font-bold leading-[1.02] tracking-[-1.2px] text-white sm:text-[56px] md:text-[64px] md:leading-[64px] md:tracking-[-1.92px]">
          Your custom merch branding <span class="text-coral-500">partner</span>
        </h1>
        <p data-hero="sub" data-anim class="max-w-[417px] text-[18px] leading-normal text-gray-500 md:text-[20px]">
          A young team obsessed with quality, structure and helping brands show up properly
        </p>
        <AppButton to="/contact" class="mt-2 hero-cta" data-anim>Chat with us</AppButton>
      </div>

      <!-- staggered collage -->
      <div class="hero-collage mt-12 flex items-end justify-start gap-3 overflow-x-auto pb-0 [--s:0.6] md:mt-16 md:justify-center md:gap-5 md:overflow-hidden md:[--s:1] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          v-for="(img, i) in heroCollage"
          :key="i"
          data-anim
          class="hero-card group h-[calc(var(--h)*var(--s)*1px)] w-[calc(var(--w)*var(--s)*1px)] shrink-0 overflow-hidden rounded-[2px] bg-white transition-transform duration-300 ease-out hover:-translate-y-1.5"
          :style="{ '--w': img.w, '--h': img.h }"
        >
          <img :src="img.src" alt="" class="size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-110" />
        </div>
      </div>
    </section>

    <!-- PROCESS -->
    <section class="bg-stone-500 px-5 py-16 md:px-6 md:py-24">
      <div class="mx-auto flex max-w-[1080px] flex-col items-center gap-10 md:flex-row md:items-center md:gap-12">
        <div v-curtain class="group w-full overflow-hidden rounded-2xl md:w-[532px] md:shrink-0">
          <img src="/img/about/process.png" alt="Our process" class="h-[300px] w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04] md:h-[606px]" />
        </div>
        <div class="w-full md:flex-1">
          <h2 v-words class="text-[32px] font-bold leading-tight tracking-[-1px] text-neutral-500 md:text-[46px] md:leading-[50px] md:tracking-[-1.38px]">
            Process over promises
          </h2>
          <p v-anim:up="120" class="mt-3 text-[18px] leading-6 text-neutral-400">Here’s why you should work with us.</p>
          <div v-anim:up.stagger="{ delay: 0.1 }" class="mt-6 flex flex-col">
            <button
              v-for="(f, i) in features"
              :key="f.title"
              class="flex w-full cursor-pointer items-start justify-between gap-6 border-b border-gray-500 py-3.5 text-left"
              :aria-expanded="openFeature === i"
              @click="toggleFeature(i)"
            >
              <div class="flex min-w-0 flex-col gap-2.5">
                <div class="flex items-center gap-2.5">
                  <img :src="f.icon" alt="" class="size-6" />
                  <span
                    class="text-[20px] font-medium leading-[26px] transition-colors duration-300"
                    :class="openFeature === i ? 'text-neutral-500' : 'text-neutral-200'"
                  >{{ f.title }}</span>
                </div>
                <div
                  class="grid transition-[grid-template-rows] duration-300 ease-out"
                  :style="{ gridTemplateRows: openFeature === i ? '1fr' : '0fr' }"
                >
                  <div class="overflow-hidden">
                    <p class="text-[18px] leading-5 text-neutral-300">{{ f.desc }}</p>
                  </div>
                </div>
              </div>
              <!-- coral plus/minus -->
              <svg class="mt-1 size-5 shrink-0 text-coral-500" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="2" width="16" height="16" rx="4" />
                <path stroke-linecap="round" d="M6.5 10h7" />
                <path
                  class="origin-center transition-all duration-300"
                  :class="openFeature === i ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'"
                  stroke-linecap="round"
                  d="M10 6.5v7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <AppMarquee />

    <!-- SIDE HUSTLE -->
    <section class="bg-stone-500 px-5 py-16 md:px-6 md:py-24">
      <div class="mx-auto flex max-w-[1080px] flex-col items-start gap-10 md:flex-row md:items-center md:justify-between md:gap-[143px]">
        <div class="flex max-w-[407px] flex-col gap-2.5">
          <h2 v-words class="text-[36px] font-bold leading-[1.05] tracking-[-1.2px] text-neutral-500 md:text-[50px] md:leading-[42px] md:tracking-[-1.5px]">
            Who are we?
          </h2>
          <p v-anim:up="200" class="text-[18px] leading-[26px] text-neutral-400">
            Printplaceng started as a side hustle by a 200 level engineering student from the university of Lagos.
            Today, we are a growing team building structure in an industry that often lacks it. We have seen the
            delays, the inconsistency and the mediocrity culture so we decided to do branding differently.
          </p>
        </div>
        <div v-curtain class="group relative h-[420px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#efe7dd] to-[#d8ccbf] md:h-[509px] md:w-[530px] md:shrink-0">
          <img src="/img/about/founder.png" alt="Olajumoke Olutomiwa" class="size-full object-cover object-top transition-transform duration-[700ms] ease-out group-hover:scale-[1.05]" />
          <div class="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/90 via-black/45 to-transparent"></div>
          <div class="absolute inset-x-0 bottom-6 flex flex-col items-center text-white">
            <p class="text-[20px] font-bold leading-6">Olajumoke Olutomiwa</p>
            <p class="text-[16px] font-medium leading-5">Founder &amp; CEO</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TEAM -->
    <section class="bg-stone-500 py-16 md:py-20">
      <h2 v-words class="mb-8 px-5 text-center text-[28px] font-bold leading-[42px] tracking-[-0.84px] text-neutral-500 md:text-[32px]">
        Our team
      </h2>
      <!-- draggable carousel; arrows fade in on hover and hide at each extreme -->
      <div
        class="group/car relative mx-auto max-w-[1400px]"
        @pointerenter="paused = true"
        @pointerleave="paused = false"
      >
        <div
          ref="teamTrack"
          v-flip.stagger
          class="no-scrollbar flex gap-4 select-none overflow-x-auto px-5 py-3"
          :class="dragging ? 'cursor-grabbing' : 'cursor-grab'"
          @scroll="updateTeamArrows"
          @pointerdown="onTeamPointerDown"
          @pointermove="onTeamPointerMove"
          @pointerup="onTeamPointerUp"
          @pointercancel="onTeamPointerUp"
        >
          <div
            v-for="(m, mi) in team"
            :key="m.name"
            class="group w-[260px] shrink-0 rounded-[20px] bg-coral-600 p-2.5 transition-transform duration-300 ease-out hover:-translate-y-2 md:w-[320px]"
          >
            <!-- full photo with name overlaid; shape alternates curved-square / oval -->
            <div
              class="relative h-[380px] overflow-hidden bg-gradient-to-b from-neutral-50 to-neutral-100 md:h-[444px]"
              :class="mi % 2 === 0 ? 'rounded-[28px]' : 'rounded-[150px]'"
            >
              <img
                :src="m.img"
                :alt="m.name"
                :style="{ objectPosition: m.pos, '--z': m.zoom }"
                draggable="false"
                class="pointer-events-none absolute inset-0 size-full scale-[var(--z)] object-cover transition-[scale] duration-500 ease-out group-hover:scale-[calc(var(--z)*1.05)]"
              />
              <div class="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-black/70 via-black/15 to-transparent"></div>
              <div class="absolute inset-x-0 bottom-5 flex flex-col items-center px-3 text-center text-white">
                <p class="text-[18px] font-medium leading-6">{{ m.name }}</p>
                <p class="text-[14px] leading-5 text-white/85">{{ m.role }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- navigators: fade in on hover, each hides once its end is reached -->
        <button
          type="button"
          aria-label="Previous team members"
          :disabled="atStart"
          class="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white opacity-0 shadow-[2px_4px_6px_rgba(0,0,0,0.15)] transition-opacity duration-300 hover:bg-neutral-50 group-hover/car:opacity-100 disabled:pointer-events-none disabled:!opacity-0 md:left-6"
          @click="scrollTeam(-1)"
        >
          <img src="/icons/arrow-right.svg" alt="" class="size-6 rotate-180" />
        </button>
        <button
          type="button"
          aria-label="Next team members"
          :disabled="atEnd"
          class="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white opacity-0 shadow-[2px_4px_6px_rgba(0,0,0,0.15)] transition-opacity duration-300 hover:bg-neutral-50 group-hover/car:opacity-100 disabled:pointer-events-none disabled:!opacity-0 md:right-6"
          @click="scrollTeam(1)"
        >
          <img src="/icons/arrow-right.svg" alt="" class="size-6" />
        </button>
      </div>
    </section>

    <!-- BRANDS -->
    <section class="bg-stone-500 px-5 pb-16 pt-4 md:pb-24">
      <p class="mb-2 text-center text-[18px] font-[450] tracking-[-0.54px] text-neutral-500">
        Brands we have helped show up better
      </p>
      <p class="mb-8 text-center text-[14px] leading-5 text-neutral-300">
        Just a few of the many brands that have trusted our team
      </p>
      <!-- edge-faded, continuously scrolling logo track -->
      <div
        class="pause-hover relative mx-auto max-w-[1100px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div class="auto-scroll flex w-max items-center" style="animation-duration: 32s">
          <template v-for="n in 2" :key="n">
            <div
              v-for="(b, i) in brands"
              :key="`${n}-${i}`"
              class="flex h-[90px] w-[150px] shrink-0 items-center justify-center opacity-80 transition-opacity duration-300 hover:opacity-100"
            >
              <img :src="b" alt="Brand logo" class="max-h-[70px] max-w-[75%] object-contain" />
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- BUDGET -->
    <section class="overflow-hidden bg-neutral-500 px-5 py-16 md:py-0">
      <div class="mx-auto flex min-h-[500px] max-w-[1280px] flex-col items-start gap-10 md:h-[820px] md:flex-row md:items-center">
        <!-- rotating circular gallery -->
        <div
          class="orbit-viewport relative h-[520px] w-full shrink-0 overflow-hidden md:h-full md:w-[620px]"
          @pointerenter="orbitPaused = true"
          @pointerleave="orbitPaused = false"
        >
          <div class="orbit" :class="{ 'orbit-paused': orbitPaused }">
            <div
              v-for="(src, i) in budgetOrbit"
              :key="i"
              class="orbit-item"
              :style="{ '--a': (i * (360 / budgetOrbit.length)) + 'deg' }"
            >
              <div class="orbit-card">
                <img :src="src" alt="" class="size-full object-cover" draggable="false" />
              </div>
            </div>
          </div>
        </div>
        <!-- text -->
        <div class="flex max-w-[446px] flex-col gap-3 md:ml-auto">
          <h2 v-words class="text-[36px] font-bold leading-[1.05] tracking-[-1.2px] text-white md:text-[50px] md:leading-[50px] md:tracking-[-1.5px]">
            Stop guessing your merch budget
          </h2>
          <p v-anim:up="200" class="text-[18px] text-gray-500">We’ve already done the maths for you</p>
          <AppButton to="/built-for-you" class="mt-2">Explore our Options</AppButton>
        </div>
      </div>
    </section>

    <AppMarquee />

    <!-- FAQ -->
    <section class="bg-stone-500 px-5 py-16 md:px-6 md:py-24">
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
/* Rotating circular gallery ("Stop guessing your merch budget") — Figma 18491:463564.
   Cards (273×363) sit on a right-facing arc, ring centre near the left edge, each
   card turned +90° so the product's top points to the right as the ring rotates. */
.orbit {
  --s: 0.46; /* scale: card + radius all derive from this */
  --rad: calc(486px * var(--s));
  --cw: calc(273px * var(--s));
  --ch: calc(363px * var(--s));
  position: absolute;
  left: -8px; /* ring centre just off the left edge so the right arc shows in full */
  top: 50%;
  width: 0;
  height: 0;
  animation: orbit-spin 70s linear infinite;
}
@media (min-width: 768px) {
  .orbit {
    --s: 0.9;
    left: -24px;
  }
}
@keyframes orbit-spin {
  to {
    transform: rotate(360deg);
  }
}
/* Pause whenever the pointer is anywhere over the gallery column (JS-toggled) */
.orbit.orbit-paused {
  animation-play-state: paused;
}
.orbit-item {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
  /* from the ring centre: rotate to --a, push out by --rad, turn the card +90°
     so its top points right (tangential), then centre it on that point */
  transform: rotate(var(--a)) translateX(var(--rad)) rotate(90deg) translate(-50%, -50%);
}
.orbit-card {
  width: var(--cw);
  height: var(--ch);
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 22px 45px rgba(0, 0, 0, 0.4);
}
.orbit-card img {
  display: block;
}
@media (prefers-reduced-motion: reduce) {
  .orbit {
    animation: none;
  }
}
</style>
