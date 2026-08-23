<script setup lang="ts">
// Scroll-progress bar — a thin coral line at the very top that fills as the
// page scrolls. Driven by GSAP ScrollTrigger; refreshes on route change.
const bar = ref<HTMLElement | null>(null)

onMounted(() => {
  const { gsap, reduced } = useGsap()
  if (reduced || !bar.value) return
  gsap.to(bar.value, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
  })
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-stone-500">
    <div ref="bar" class="scroll-progress" aria-hidden="true"></div>
    <AppCursor />
    <AppNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
