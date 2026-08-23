import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Access GSAP + ScrollTrigger inside a page/component. `reduced` reflects the
 * user's motion preference so callers can bail out of bespoke timelines.
 *
 * Typical use:
 *   const { gsap, reduced } = useGsap()
 *   onMounted(() => {
 *     if (reduced) return
 *     const ctx = gsap.context(() => { ... }, rootEl.value)
 *     onBeforeUnmount(() => ctx.revert())
 *   })
 */
export function useGsap() {
  const reduced =
    import.meta.client && (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  return { gsap, ScrollTrigger, reduced }
}
