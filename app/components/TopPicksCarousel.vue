<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { Product } from '~/components/ProductCard.vue'

const props = withDefaults(defineProps<{ products: Product[]; interval?: number }>(), {
  interval: 2800,
})

const active = ref(0)
const paused = ref(false)
const count = computed(() => props.products.length)
let timer: ReturnType<typeof setInterval> | null = null

const STEP = 230 // horizontal gap between adjacent cards (px)

// --- drag state ---
const dragX = ref(0) // live horizontal offset while a drag is in progress
const dragging = ref(false)
let startX = 0
let moved = false // crossed the click/drag threshold → suppress the trailing click

// signed distance of card i from the active (center) card, wrapped to the shortest way round
function rel(i: number) {
  const n = count.value
  let r = i - active.value
  if (r > n / 2) r -= n
  if (r < -n / 2) r += n
  return r
}

function cardStyle(i: number) {
  const r = rel(i)
  const ar = Math.abs(r)
  // keep the neighbours just past the edge mounted so they slide in during a drag
  if (ar > 2.6) {
    return { opacity: 0, transform: `translate(-50%, -50%) scale(0.6)`, zIndex: 0, pointerEvents: 'none' as const }
  }
  // fractional position including the live drag offset, so the strip follows the finger 1:1
  const rr = r + dragX.value / STEP
  const arr = Math.abs(rr)
  const x = rr * STEP
  const y = 14 * Math.min(arr, 1)
  const scale = 1 - Math.min(arr, 2) * 0.17 // 1 → 0.83 → 0.66
  const opacity = arr < 1 ? 1 - arr * 0.1 : Math.max(0, 0.9 - (arr - 1) * 0.55)
  return {
    transform: `translate(-50%, -50%) translateX(${x}px) translateY(${y}px) scale(${scale})`,
    opacity,
    zIndex: 30 - Math.round(arr) * 10,
    // no transition while dragging → the cards track the pointer instantly
    transition: dragging.value ? 'none' : '',
    pointerEvents: 'auto' as const,
  }
}

function go(i: number) {
  const n = count.value
  active.value = ((i % n) + n) % n
}

// --- drag handlers ---
function onDown(e: PointerEvent) {
  dragging.value = true
  paused.value = true
  moved = false
  startX = e.clientX
  try { (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId) } catch {}
}
function onMove(e: PointerEvent) {
  if (!dragging.value) return
  const dx = e.clientX - startX
  if (Math.abs(dx) > 6) moved = true
  // a little resistance and a cap (~1.4 cards) so it never drags into empty space
  dragX.value = Math.max(-STEP * 1.4, Math.min(STEP * 1.4, dx))
}
function onUp(e: PointerEvent) {
  if (!dragging.value) return
  // Resolve the drag FIRST so a capture-release exception can never leave it stuck.
  const dropped = dragX.value
  dragging.value = false
  dragX.value = 0 // snap: the transition animates to the resolved layout
  paused.value = false
  // dragging left (negative) advances; distance decides how many cards
  let steps = Math.round(-dropped / STEP)
  if (steps === 0 && Math.abs(dropped) > 55) steps = dropped < 0 ? 1 : -1
  if (steps !== 0) go(active.value + steps)
  try { (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId) } catch {}
}
// a completed drag shouldn't also fire the card's click-to-focus
function onCardClick(i: number) {
  if (moved) return
  go(i)
}
function start() {
  if (typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (timer) clearInterval(timer)
  // interval always runs; it simply skips advancing while paused (hovered)
  timer = setInterval(() => {
    if (!paused.value) go(active.value + 1)
  }, props.interval)
}
function stop() {
  if (timer) clearInterval(timer)
  timer = null
}

onMounted(start)
onBeforeUnmount(stop)
</script>

<template>
  <div>
    <!-- stage -->
    <div
      class="relative mx-auto h-[500px] w-full max-w-[1080px] touch-pan-y select-none overflow-hidden md:h-[560px]"
      :class="dragging ? 'cursor-grabbing' : 'cursor-grab'"
      @pointerenter="paused = true"
      @pointerleave="(paused = false), onUp($event)"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointercancel="onUp"
    >
      <button
        v-for="(p, i) in products"
        :key="p.name"
        class="absolute left-1/2 top-1/2 w-[260px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:w-[300px] md:w-[352px]"
        :style="cardStyle(i)"
        :aria-label="`Show ${p.name}`"
        @click="onCardClick(i)"
      >
        <ProductCard :product="p" :flippable="i === active" :featured="i === active" />
      </button>
    </div>

    <!-- progress dots -->
    <div class="mt-8 flex items-center justify-center gap-2">
      <button
        v-for="(p, i) in products"
        :key="`dot-${i}`"
        class="h-[5px] cursor-pointer rounded-full transition-all duration-300"
        :class="i === active ? 'w-[50px] bg-white' : 'w-[5px] bg-white/40 hover:bg-white/70'"
        :aria-label="`Go to slide ${i + 1}`"
        @click="go(i)"
      />
    </div>
  </div>
</template>
