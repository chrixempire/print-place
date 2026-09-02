<script setup lang="ts">
// Agency-style trailing cursor ring. Keeps the native cursor visible (the ring
// just trails it), grows/fills over interactive elements. Desktop + motion only.
const ring = ref<HTMLElement | null>(null)
let move: ((e: PointerEvent) => void) | null = null

onMounted(() => {
  const { gsap, reduced } = useGsap()
  const fine = window.matchMedia?.('(pointer: fine)').matches ?? false
  if (reduced || !fine || !ring.value) return

  const el = ring.value
  gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 })
  const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })
  const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' })
  let shown = false

  move = (e: PointerEvent) => {
    if (!shown) {
      shown = true
      gsap.to(el, { opacity: 1, duration: 0.3 })
    }
    xTo(e.clientX)
    yTo(e.clientY)
    const hot = (e.target as HTMLElement)?.closest?.('a, button, [role="button"], [data-cursor], input, textarea, label')
    gsap.to(el, {
      scale: hot ? 1.7 : 1,
      backgroundColor: hot ? 'rgba(255,79,41,0.14)' : 'rgba(255,79,41,0)',
      borderColor: hot ? '#ff4f29' : 'rgba(255,79,41,0.55)',
      duration: 0.28,
      ease: 'power3',
    })
  }
  window.addEventListener('pointermove', move, { passive: true })
})

onBeforeUnmount(() => {
  if (move) window.removeEventListener('pointermove', move)
})
</script>

<template>
  <div ref="ring" class="app-cursor" aria-hidden="true"></div>
</template>
