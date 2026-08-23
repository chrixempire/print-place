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
  if (ar > 2) {
    return { opacity: 0, transform: `translate(-50%, -50%) scale(0.6)`, zIndex: 0, pointerEvents: 'none' as const }
  }
  const x = r * 230
  const y = ar === 0 ? 0 : 14
  const scale = ar === 0 ? 1 : ar === 1 ? 0.82 : 0.66
  const opacity = ar === 0 ? 1 : ar === 1 ? 0.9 : 0.45
  return {
    transform: `translate(-50%, -50%) translateX(${x}px) translateY(${y}px) scale(${scale})`,
    opacity,
    zIndex: 30 - ar * 10,
    pointerEvents: (ar === 0 ? 'auto' : 'auto') as const,
  }
}

function go(i: number) {
  const n = count.value
  active.value = ((i % n) + n) % n
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
      class="relative mx-auto h-[500px] w-full max-w-[1080px] overflow-hidden md:h-[560px]"
      @pointerenter="paused = true"
      @pointerleave="paused = false"
      @pointerdown="paused = true"
      @pointerup="paused = false"
    >
      <button
        v-for="(p, i) in products"
        :key="p.name"
        class="absolute left-1/2 top-1/2 w-[260px] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:w-[300px] md:w-[340px]"
        :style="cardStyle(i)"
        :aria-label="`Show ${p.name}`"
        @click="go(i)"
      >
        <ProductCard :product="p" />
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
