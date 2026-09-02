<script setup lang="ts">
import type { FaqItem } from '~/components/FaqAccordion.vue'

useSeo({
  title: 'Printplaceng — Custom Merch & Branding Partner in Lagos',
  description:
    'Printplaceng is Lagos’ custom merch and branding partner — premium branded t-shirts, mugs, tote bags, packaging and print, delivered with structure and speed. Get a quote today.',
})

// Hero collage marquee. Two groups of three small product shots alternate, each
// followed by a big (portrait-cropped) gallery photo — A, g1, B, g2, A, g3, B, g4
// — then the whole strip loops seamlessly to the left (see buildCollageLoop).
type CollageCard = { src: string; w: number; h: number; big?: boolean }
const smallA: CollageCard[] = [
  { src: '/img/about/hero/h1.webp', w: 194, h: 248 },
  { src: '/img/about/hero/h2.webp', w: 194, h: 338 },
  { src: '/img/about/hero/h3.webp', w: 231, h: 286 },
]
const smallB: CollageCard[] = [
  { src: '/img/about/hero/h5.webp', w: 181, h: 228 },
  { src: '/img/about/hero/h6.webp', w: 188, h: 266 },
  { src: '/img/about/hero/h7.webp', w: 151, h: 173 },
]
// Width matches the gallery photos' 3:2 ratio at h=437 so the full image shows
// (no crop); small cards keep their own widths.
const bigGallery = (n: number): CollageCard => ({ src: `/img/gallery/gallery-${n}.webp`, w: 656, h: 437, big: true })
const heroCollage = [
  ...smallA, bigGallery(1),
  ...smallB, bigGallery(2),
  ...smallA, bigGallery(3),
  ...smallB, bigGallery(4),
]
// Rendered twice while the marquee is active so the loop has an identical second
// copy to wrap into with no visible seam.
const heroLoop = computed(() => (marquee.value ? [...heroCollage, ...heroCollage] : heroCollage))

// Icons are inlined (not <img>) so their stroke follows `currentColor` — the icon
// "comes alive" (turns dark) together with its title when the row is open, and
// dims to the muted grey when closed, instead of being a fixed disabled colour.
const features = [
  {
    title: 'Structured Process',
    desc: 'From discovery to delivery, everything is organized',
    icon: '<path d="M8 5C8 6.65685 6.65685 8 5 8C3.34315 8 2 6.65685 2 5C2 3.34315 3.34315 2 5 2C6.65685 2 8 3.34315 8 5Z"/><path d="M22 5C22 6.65685 20.6569 8 19 8C17.3431 8 16 6.65685 16 5C16 3.34315 17.3431 2 19 2C20.6569 2 22 3.34315 22 5Z"/><path d="M8 19C8 20.6569 6.65685 22 5 22C3.34315 22 2 20.6569 2 19C2 17.3431 3.34315 16 5 16C6.65685 16 8 17.3431 8 19Z"/><path d="M22 19C22 20.6569 20.6569 22 19 22C17.3431 22 16 20.6569 16 19C16 17.3431 17.3431 16 19 16C20.6569 16 22 17.3431 22 19Z"/><path d="M8 19H16" stroke-linecap="round"/><path d="M8 5H16" stroke-linecap="round"/><path d="M19 16V8" stroke-linecap="round"/><path d="M5 16V8" stroke-linecap="round"/>',
  },
  {
    title: 'Quality Assurance',
    desc: 'We are keen on delivering excellence, every single time',
    icon: '<path d="M11.1459 7.02251C11.5259 6.34084 11.7159 6 12 6C12.2841 6 12.4741 6.34084 12.8541 7.02251L12.9524 7.19887C13.0603 7.39258 13.1143 7.48944 13.1985 7.55334C13.2827 7.61725 13.3875 7.64097 13.5972 7.68841L13.7881 7.73161C14.526 7.89857 14.895 7.98205 14.9828 8.26432C15.0706 8.54659 14.819 8.84072 14.316 9.42898L14.1858 9.58117C14.0429 9.74833 13.9714 9.83191 13.9392 9.93531C13.9071 10.0387 13.9179 10.1502 13.9395 10.3733L13.9592 10.5763C14.0352 11.3612 14.0733 11.7536 13.8435 11.9281C13.6136 12.1025 13.2682 11.9435 12.5773 11.6254L12.3986 11.5431C12.2022 11.4527 12.1041 11.4075 12 11.4075C11.8959 11.4075 11.7978 11.4527 11.6014 11.5431L11.4227 11.6254C10.7318 11.9435 10.3864 12.1025 10.1565 11.9281C9.92674 11.7536 9.96476 11.3612 10.0408 10.5763L10.0605 10.3733C10.0821 10.1502 10.0929 10.0387 10.0608 9.93531C10.0286 9.83191 9.95713 9.74833 9.81418 9.58117L9.68403 9.42898C9.18097 8.84072 8.92945 8.54659 9.01723 8.26432C9.10501 7.98205 9.47396 7.89857 10.2119 7.73161L10.4028 7.68841C10.6125 7.64097 10.7173 7.61725 10.8015 7.55334C10.8857 7.48944 10.9397 7.39258 11.0476 7.19887L11.1459 7.02251Z"/><path d="M19 9C19 12.866 15.866 16 12 16C8.13401 16 5 12.866 5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9Z"/><path d="M7.35111 15L6.71424 17.323C6.0859 19.6148 5.77173 20.7607 6.19097 21.3881C6.3379 21.6079 6.535 21.7844 6.76372 21.9008C7.41635 22.2331 8.42401 21.7081 10.4393 20.658C11.1099 20.3086 11.4452 20.1339 11.8014 20.0959C11.9335 20.0818 12.0665 20.0818 12.1986 20.0959C12.5548 20.1339 12.8901 20.3086 13.5607 20.658C15.576 21.7081 16.5837 22.2331 17.2363 21.9008C17.465 21.7844 17.6621 21.6079 17.809 21.3881C18.2283 20.7607 17.9141 19.6148 17.2858 17.323L16.6489 15" stroke-linecap="round"/>',
  },
  {
    title: 'Young and Driven Team',
    desc: 'We are hands-on, updated on the latest technology and constantly evolving to be your best option',
    icon: '<path d="M9.17157 8.82843C8.42143 8.07828 8 7.06087 8 6C8 4.93913 8.42143 3.92172 9.17157 3.17157C9.92172 2.42143 10.9391 2 12 2C13.0609 2 14.0783 2.42143 14.8284 3.17157C15.5786 3.92172 16 4.93913 16 6C16 7.06087 15.5786 8.07828 14.8284 8.82843C14.0783 9.57857 13.0609 10 12 10C10.9391 10 9.92172 9.57857 9.17157 8.82843Z"/><path d="M18 9C19.6569 9 21 7.88071 21 6.5C21 5.11929 19.6569 4 18 4" stroke-linecap="round"/><path d="M6 9C4.34315 9 3 7.88071 3 6.5C3 5.11929 4.34315 4 6 4" stroke-linecap="round"/><path d="M7.75736 19.8284C6.63214 19.0783 6 18.0609 6 17C6 15.9391 6.63214 14.9217 7.75736 14.1716C8.88258 13.4214 10.4087 13 12 13C13.5913 13 15.1174 13.4214 16.2426 14.1716C17.3679 14.9217 18 15.9391 18 17C18 18.0609 17.3679 19.0783 16.2426 19.8284C15.1174 20.5786 13.5913 21 12 21C10.4087 21 8.88258 20.5786 7.75736 19.8284Z"/><path d="M20 19C21.7542 18.6153 23 17.6411 23 16.5C23 15.3589 21.7542 14.3847 20 14" stroke-linecap="round"/><path d="M4 19C2.24575 18.6153 1 17.6411 1 16.5C1 15.3589 2.24575 14.3847 4 14" stroke-linecap="round"/>',
  },
]
// Process section is a single-open accordion — opening one closes the others.
const openFeature = ref(0)
const toggleFeature = (i: number) => (openFeature.value = openFeature.value === i ? -1 : i)

const team = [
  // CEO card hidden from the "Our team" carousel for now.
  // { img: '/img/about/founder.webp', name: 'Olajumoke Olutomiwa', role: 'Founder & CEO', pos: 'center top', zoom: 1 },
  { img: '/img/team/darasimi.webp', name: 'Abiola Darasimi', role: 'Chief Operating Officer', pos: 'center 20%', zoom: 1 },
  { img: '/img/team/serah.webp', name: 'Hundeyin Serah', role: 'Head of Sales', pos: 'center 20%', zoom: 1 },
  { img: '/img/team/eniola.webp', name: 'Obasa Eniola', role: 'Head of Production', pos: 'center 20%', zoom: 1 },
  { img: '/img/team/peace.webp', name: 'Awoniyi Peace', role: 'Quality assurance Officer', pos: 'center 20%', zoom: 1 },
  // dami.jpg assigned to Ibukunoluwa by elimination — confirm this is the right person.
  { img: '/img/team/dami.webp', name: 'Awoponle Ibukunoluwa', role: 'Customer Support Representative', pos: 'center 20%', zoom: 1 },
  { img: '/img/team/omolola.webp', name: 'Adegboyega Omolola', role: 'Head of Marketing', pos: 'center 20%', zoom: 1 },
  { img: '/img/team/christianah.webp', name: 'Hude Christianah', role: 'Head of Procurement', pos: 'center 20%', zoom: 1 },
]

// TEAM carousel — hover arrows + hand/drag scroll, with a continuous, seamless
// INFINITE LEFT loop. The track renders the team twice; scrollLeft advances
// leftward forever and wraps by exactly one set width, so it never reverses or
// hits a visible end. User interaction (drag / arrows) takes over, then the loop
// resumes seamlessly from wherever they left it.
const teamTrack = ref<HTMLElement | null>(null)
const dragging = ref(false)

// Exact width of one full set = left offset of the first card of the 2nd set.
const setWidth = () => {
  const el = teamTrack.value
  if (!el || el.children.length <= team.length) return 0
  return (el.children[team.length] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft
}
const wrap = (v: number, w: number) => (w > 0 ? ((v % w) + w) % w : v)

// Arrow paging — briefly hand control to a smooth scroll, then resume the loop.
const interacting = ref(false)
let interactTimer = 0
const scrollTeam = (dir: number) => {
  const el = teamTrack.value
  if (!el) return
  interacting.value = true
  clearTimeout(interactTimer)
  el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 336), behavior: 'smooth' })
  interactTimer = window.setTimeout(() => { interacting.value = false }, 600)
}

// Mouse drag-to-scroll; touch/pen use the browser's native horizontal scrolling.
// Either way we pause the auto-scroll while the user is interacting so it doesn't
// fight their gesture (on touch the RAF loop would otherwise overwrite scrollLeft
// every frame, making swipes feel stuck).
let dragStartX = 0
let dragStartScroll = 0
const onTeamPointerDown = (e: PointerEvent) => {
  const el = teamTrack.value
  if (!el) return
  interacting.value = true
  clearTimeout(interactTimer)
  if (e.pointerType === 'mouse') {
    dragging.value = true
    dragStartX = e.clientX
    dragStartScroll = el.scrollLeft
    el.setPointerCapture(e.pointerId)
  }
  // touch/pen: let the native scroll container handle the pan
}
const onTeamPointerMove = (e: PointerEvent) => {
  if (!dragging.value) return
  const el = teamTrack.value!
  const w = setWidth()
  let x = dragStartScroll - (e.clientX - dragStartX)
  if (w > 0) {
    if (x >= w) { x -= w; dragStartScroll -= w }
    else if (x < 0) { x += w; dragStartScroll += w }
  }
  el.scrollLeft = x
}
const onTeamPointerUp = (e: PointerEvent) => {
  if (dragging.value) {
    dragging.value = false
    teamTrack.value?.releasePointerCapture?.(e.pointerId)
  }
  // Resume the loop only after any touch momentum has settled.
  clearTimeout(interactTimer)
  interactTimer = window.setTimeout(() => { interacting.value = false }, 1000)
}

// Continuous leftward auto-scroll; yields during drag / arrow interaction.
const AUTO_SPEED = 42 // px per second
let rafId = 0
let lastTs = 0
let autoPos = 0
const autoTick = (ts: number) => {
  rafId = requestAnimationFrame(autoTick)
  const el = teamTrack.value
  if (!el) return
  const dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.05) : 0
  lastTs = ts
  const w = setWidth()
  if (dragging.value || interacting.value || w <= 1) {
    autoPos = wrap(el.scrollLeft, w) // stay in sync with manual scrolling
    return
  }
  autoPos = wrap(autoPos + AUTO_SPEED * dt, w)
  el.scrollLeft = autoPos
}
onMounted(() => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (!reduced) rafId = requestAnimationFrame(autoTick)
})
onBeforeUnmount(() => { cancelAnimationFrame(rafId); clearTimeout(interactTimer) })

// Cinematic hero entrance + collage depth-drift on scroll.
const heroRoot = ref<HTMLElement | null>(null)
let heroCtx: any = null

// Hero collage marquee — a seamless, continuous right→left "flow" driven by GSAP,
// inside a fixed-width window (the width the row had with the original 7 images).
// A single translate tween slides the (doubled) track one copy-width forever, so
// the wrap point is invisible. Each card gets ONE subtle settle-bounce on entrance
// (see the entrance timeline); after that the strip just scrolls — no perpetual
// bobbing. Hover ramps the translate's timeScale to 0 (a soft slow-to-stop).
const collageTrack = ref<HTMLElement | null>(null)
const marquee = ref(false)
const COLLAGE_SPEED = 55 // px / second
let collageTween: any = null
let collageResizeT: ReturnType<typeof setTimeout>

const buildCollageLoop = () => {
  const { gsap } = useGsap()
  const track = collageTrack.value
  if (!track || track.children.length <= heroCollage.length) return
  collageTween?.kill()
  gsap.set(track, { x: 0 })
  // Distance from the first card to its duplicate = one full copy (incl. gaps).
  const loopDist =
    (track.children[heroCollage.length] as HTMLElement).offsetLeft -
    (track.children[0] as HTMLElement).offsetLeft
  if (loopDist <= 0) return
  // Slide from 0 to one copy left → content moves right→left; wraps seamlessly.
  collageTween = gsap.to(track, {
    x: -loopDist,
    duration: loopDist / COLLAGE_SPEED,
    ease: 'none',
    repeat: -1,
  })
}
const pauseCollage = () =>
  collageTween && useGsap().gsap.to(collageTween, { timeScale: 0, duration: 0.6, ease: 'power2.out', overwrite: true })
const resumeCollage = () =>
  collageTween && useGsap().gsap.to(collageTween, { timeScale: 1, duration: 0.9, ease: 'power2.in', overwrite: true })
const onCollageResize = () => {
  clearTimeout(collageResizeT)
  collageResizeT = setTimeout(buildCollageLoop, 200)
}

onMounted(async () => {
  const { gsap, reduced } = useGsap()
  if (reduced || !heroRoot.value) return
  marquee.value = true // render the duplicate copy, then measure + loop it
  await nextTick()
  heroCtx = gsap.context((self: any) => {
    const q = self.selector
    // fromTo (not from): these elements are pre-hidden via `.anim-ready
    // [data-anim] { opacity: 0 }`, so `.from` would read 0 as the destination
    // and never reveal them. Explicit `to` states avoid that.
    gsap
      .timeline({
        defaults: { ease: 'power3.out' },
        // Play ONCE. The hero starts in view, so replaying on re-entry only made
        // the collage visibly "restart" (fade from 0 / jump) when scrolling back
        // up — the marquee flow itself is continuous and should never reset.
        scrollTrigger: { trigger: heroRoot.value, start: 'top 85%', toggleActions: 'play none none none' },
      })
      .fromTo(q('[data-hero=title]'), { yPercent: 45, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1 }, 0)
      .fromTo(q('[data-hero=sub]'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.15)
      .fromTo(q('.hero-cta'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, clearProps: 'transform' }, 0.3)
      // The collage fades/rises in as one block; the flow itself carries the cards.
      .fromTo(q('.hero-collage'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, 0.3)
      // Each card gets ONE soft settle-bounce as it arrives, then rests at y:0 and
      // simply rides the horizontal scroll — no continuous bobbing.
      .fromTo(
        q('.hero-card'),
        { y: 20 },
        { y: 0, duration: 1, ease: 'elastic.out(1, 0.55)', stagger: { each: 0.035, from: 'start' } },
        0.45,
      )
    gsap.to(q('.hero-collage'), {
      yPercent: -6,
      ease: 'none',
      scrollTrigger: { trigger: heroRoot.value, start: 'top top', end: 'bottom top', scrub: true },
    })
  }, heroRoot.value)
  buildCollageLoop()
  window.addEventListener('resize', onCollageResize)
})
onBeforeUnmount(() => {
  heroCtx?.revert()
  collageTween?.kill()
  clearTimeout(collageResizeT)
  window.removeEventListener('resize', onCollageResize)
})

const brands = [
  '/img/about/brands/b1.webp', '/img/about/brands/b2.webp', '/img/about/brands/itel.webp',
  '/img/about/brands/b4.webp', '/img/about/brands/b5.webp', '/img/about/brands/ehealth.webp',
  '/img/about/brands/b7.webp', '/img/about/brands/b8.webp', '/img/about/brands/korapay.webp',
]

// "Stop guessing" — product photos placed around a big circle whose centre is
// off to the right, so they sit on the visible left arc and rotate around it.
const budgetImgs = [
  '/img/about/budget/g1.webp',
  '/img/about/budget/g2.webp',
  '/img/about/budget/g3.webp',
  '/img/about/budget/g4.webp',
  '/img/about/budget/g5.webp',
  '/img/about/budget/g6.webp',
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
        <AppButton to="/built-for-you" class="mt-2 hero-cta" data-anim>See packages</AppButton>
      </div>

      <!-- staggered collage — seamless GSAP marquee, flows right→left, pauses on hover -->
      <!-- Full-bleed: breaks out of the section's px-5 so the collage runs edge to
           edge of the viewport. No mask — the carousel spans the whole screen. -->
      <div
        data-anim
        class="hero-collage relative -mx-5 mt-12 w-[calc(100%+2.5rem)] pb-0 [--s:0.6] md:mt-16 md:[--s:1]"
        :class="marquee
          ? 'overflow-hidden'
          : 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'"
        @mouseenter="pauseCollage"
        @mouseleave="resumeCollage"
        @touchstart.passive="pauseCollage"
        @touchend.passive="resumeCollage"
      >
        <div
          ref="collageTrack"
          class="flex w-max items-end gap-3 md:gap-5"
          :class="marquee ? 'will-change-transform' : 'justify-start'"
        >
          <div
            v-for="(img, i) in heroLoop"
            :key="i"
            :aria-hidden="i >= heroCollage.length ? 'true' : undefined"
            class="hero-card group h-[calc(var(--h)*var(--s)*1px)] w-[calc(var(--w)*var(--s)*1px)] shrink-0 overflow-hidden rounded-[2px] bg-white"
            :style="{ '--w': img.w, '--h': img.h }"
          >
            <img
              :src="img.src"
              :alt="img.big ? 'Printplaceng brand campaign' : 'Custom branded merchandise by Printplaceng'"
              class="size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- PROCESS -->
    <section class="bg-stone-500 px-5 py-16 md:px-6 md:py-24">
      <div class="mx-auto flex max-w-[1080px] flex-col items-center gap-10 md:flex-row md:items-center md:gap-12">
        <div v-curtain class="group w-full overflow-hidden rounded-2xl md:w-[532px] md:shrink-0">
          <img src="/img/about/process.webp" alt="Our process" loading="lazy" decoding="async" class="h-[300px] w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04] md:h-[606px]" />
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
                <div
                  class="flex items-center gap-2.5 transition-colors duration-300"
                  :class="openFeature === i ? 'text-neutral-500' : 'text-neutral-200'"
                >
                  <svg
                    class="size-6 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                    v-html="f.icon"
                  ></svg>
                  <span class="text-[20px] font-medium leading-[26px]">{{ f.title }}</span>
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
        <div class="flex max-w-[407px] flex-col gap-1.5 md:gap-2.5">
          <h2 v-words class="max-w-[296px] text-[28px] font-bold leading-[36px] tracking-[-0.84px] text-neutral-500 md:max-w-none md:text-[50px] md:leading-[42px] md:tracking-[-1.5px]">
            Started as a side hustle in a hostel room
          </h2>
          <p v-anim:up="200" class="text-[14px] leading-normal text-neutral-400 md:text-[18px] md:leading-[26px]">
            With only a 200 level engineering student from the university of Lagos. Today, we are a growing team
            building structure in an industry that often lacks it. We have seen the delays, the inconsistency and
            the mediocrity culture so we decided to do branding differently.
          </p>
        </div>
        <div v-curtain class="group relative h-[420px] w-full overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_32%,#e8cfa0,#bd9862_52%,#6f4f30)] md:h-[509px] md:w-[530px] md:shrink-0">
          <!-- Mobile: exact Figma composite (headshot on the golden backdrop, baked in). -->
          <img src="/img/about/founder-mobile.webp" alt="Olajumoke Olutomiwa" loading="lazy" decoding="async" class="size-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.05] md:hidden" />
          <!-- Desktop: cutout over the CSS golden gradient. -->
          <img src="/img/about/founder.webp" alt="Olajumoke Olutomiwa" loading="lazy" decoding="async" class="hidden size-full object-cover object-top transition-transform duration-[700ms] ease-out group-hover:scale-[1.05] md:block" />
          <div class="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/90 via-black/45 to-transparent"></div>
          <div class="absolute inset-x-0 bottom-6 flex flex-col items-center text-white">
            <p class="text-[20px] font-bold leading-6">Olajumoke Olutomiwa</p>
            <p class="text-[16px] font-medium leading-5">Founder &amp; CEO</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TEAM -->
    <section class="bg-stone-500 pb-6 pt-16 md:pb-8 md:pt-20">
      <h2 v-words class="mb-8 px-5 text-center text-[28px] font-bold leading-[42px] tracking-[-0.84px] text-neutral-500 md:text-[32px]">
        The people on your order
      </h2>
      <!-- original carousel (hover arrows + hand/drag); the team is rendered twice
           so the continuous leftward auto-scroll wraps by one set width seamlessly -->
      <div class="group/car relative w-full">
        <div
          ref="teamTrack"
          v-flip.stagger
          class="no-scrollbar flex gap-4 select-none overflow-x-auto px-5 py-3"
          :class="dragging ? 'cursor-grabbing' : 'cursor-grab'"
          @pointerdown="onTeamPointerDown"
          @pointermove="onTeamPointerMove"
          @pointerup="onTeamPointerUp"
          @pointercancel="onTeamPointerUp"
        >
          <template v-for="s in 2" :key="s">
            <div
              v-for="(m, mi) in team"
              :key="`${s}-${m.name}`"
              class="group w-[260px] shrink-0 rounded-[20px] bg-coral-600 p-2.5 transition-transform duration-300 ease-out hover:-translate-y-2 md:w-[320px]"
              :aria-hidden="s === 2 ? 'true' : undefined"
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
          </template>
        </div>

        <!-- navigators: fade in on hover (always available — the loop is infinite) -->
        <button
          type="button"
          aria-label="Previous team members"
          class="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white opacity-0 shadow-[2px_4px_6px_rgba(0,0,0,0.15)] transition-opacity duration-300 hover:bg-neutral-50 group-hover/car:opacity-100 md:left-6"
          @click="scrollTeam(-1)"
        >
          <img src="/icons/arrow-right.svg" alt="" class="size-6 rotate-180" />
        </button>
        <button
          type="button"
          aria-label="Next team members"
          class="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white opacity-0 shadow-[2px_4px_6px_rgba(0,0,0,0.15)] transition-opacity duration-300 hover:bg-neutral-50 group-hover/car:opacity-100 md:right-6"
          @click="scrollTeam(1)"
        >
          <img src="/icons/arrow-right.svg" alt="" class="size-6" />
        </button>
      </div>
    </section>

    <!-- BRANDS -->
    <section class="bg-stone-500 px-5 pb-16 pt-0 md:pb-24">
      <p class="mb-2 text-center text-[18px] font-[450] tracking-[-0.54px] text-neutral-500">
        Brands we have helped show up better
      </p>
      <p class="mb-4 text-center text-[14px] leading-5 text-neutral-300 md:mb-8">
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
              class="flex h-[60px] w-[120px] shrink-0 items-center justify-center opacity-80 transition-opacity duration-300 hover:opacity-100 md:h-[90px] md:w-[150px]"
            >
              <!-- Uniform height so every logo reads the same optical size; source
                   images are trimmed to their content so padding no longer varies. -->
              <img :src="b" alt="Brand logo" loading="lazy" decoding="async" class="h-[30px] w-auto max-w-[112px] object-contain md:h-[42px] md:max-w-[140px]" />
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- BUDGET -->
    <section class="relative overflow-hidden bg-neutral-500">
      <!-- rotating circular gallery — fills the section so the cards arc AROUND the
           copy (left-centre on mobile, left column on desktop). -->
      <div
        class="orbit-viewport absolute inset-0 z-0"
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
              <img :src="src" alt="Branded product sample from Printplaceng" loading="lazy" decoding="async" class="size-full object-cover" draggable="false" />
            </div>
          </div>
        </div>
      </div>
      <!-- mobile scrim: darkens the copy's corner so it stays legible over the
           moving cards (desktop keeps the copy in the clear right column) -->
      <div class="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(circle_at_10%_50%,rgba(7,6,7,0.95),rgba(7,6,7,0.7)_40%,transparent_64%)] md:hidden"></div>
      <!-- copy -->
      <div class="relative z-10 mx-auto flex min-h-[640px] max-w-[1280px] items-center px-5 md:min-h-[820px] md:px-6">
        <div class="flex max-w-[290px] flex-col gap-3 md:ml-auto md:max-w-[446px]">
          <h2 v-words class="text-[36px] font-bold leading-[1.05] tracking-[-1.2px] text-white md:text-[50px] md:leading-[50px] md:tracking-[-1.5px]">
            Stop guessing your merch budget
          </h2>
          <p v-anim:up="200" class="text-[18px] text-gray-500">We’ve already done the maths for you</p>
          <AppButton to="/built-for-you" class="mt-2 self-start">Explore our options</AppButton>
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
   Cards sit on a right-facing arc, ring centre just off the left edge, each card
   turned +90° so the product's top points tangentially as the ring rotates. The
   radius and card size are set independently so the mobile ring can be large
   enough to wrap AROUND the copy without oversizing the cards. */
.orbit {
  /* mobile: a big ring so the arc reaches the top/right/bottom edges and the copy
     sits in the clear left-centre */
  --rad: 432px;
  --cw: 168px;
  --ch: 224px;
  position: absolute;
  left: -60px; /* ring centre just off the left edge → cards arc on the right */
  top: 50%;
  width: 0;
  height: 0;
  animation: orbit-spin 70s linear infinite;
}
@media (min-width: 768px) {
  .orbit {
    /* desktop: based on the Figma ring (node 18491:463564 — radius 499, cards
       273×363, centre ~12px off the left edge), but the radius is pushed out further
       so the arc's waist bulges closer to the copy (the orbit is anchored to the
       viewport's left edge while the text sits in the centred column, so a plain
       Figma radius leaves too wide a gap on real desktop widths). */
    --rad: 588px;
    --cw: 288px;
    --ch: 384px;
    left: -12px;
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
  /* sharp corners — the design uses square photo cards, no border radius */
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
