// Dependency-free scroll-reveal. Usage: v-reveal  or  v-reveal="120" (ms stagger delay).
// SSR-safe: content is only hidden once JS marks <html> as reveal-ready, so no-JS users see everything.
export default defineNuxtPlugin((nuxtApp) => {
  let io: IntersectionObserver | null = null

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      if (!import.meta.client) return
      document.documentElement.classList.add('reveal-ready')
      el.setAttribute('data-reveal', '')
      if (binding.value) el.style.transitionDelay = `${binding.value}ms`

      if (!io) {
        io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (e.isIntersecting) {
                e.target.classList.add('in-view')
                io!.unobserve(e.target)
              }
            }
          },
          { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
        )
      }
      io.observe(el)
    },
    unmounted(el: HTMLElement) {
      io?.unobserve(el)
    },
    // Registered on the server so templates resolve; no SSR attributes needed.
    getSSRProps() {
      return {}
    },
  })
})
