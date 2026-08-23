/**
 * GSAP-powered animation system.
 *
 * Universal plugin: directives are registered on both server and client so
 * templates resolve during SSR (no hydration warnings), but every bit of DOM /
 * GSAP work runs client-only. Respects `prefers-reduced-motion`: when reduced,
 * nothing is hidden and every directive is a no-op, so all content shows.
 *
 * Directives
 *   v-reveal="delayMs?"            fade + rise on scroll (drop-in, back-compat)
 *   v-anim:<type>.<mods>="opts"    type: up|down|left|right|fade|scale|zoom|blur|flip
 *                                  mods: .now (play on mount) .stagger (children)
 *                                  opts: number (delay ms) | { delay, duration, ease, stagger, start }
 *   v-words="delayMs?"             per-word rise/stagger for headings (safe fallback)
 *   v-parallax="range?"            scrub parallax (yPercent range, default 8)
 *   v-tilt="{max,lift}?"           pointer 3-D tilt + lift (owns the transform)
 *   v-magnetic="strength?"         pointer magnetic pull (for transform-free elements)
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const DIST = 48

type Vars = Record<string, unknown>
const REST: Vars = { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)', rotationX: 0, rotationY: 0 }

function fromVars(type?: string): Vars {
  switch (type) {
    case 'fade': return { opacity: 0 }
    case 'down': return { opacity: 0, y: -DIST }
    case 'left': return { opacity: 0, x: -DIST }
    case 'right': return { opacity: 0, x: DIST }
    case 'scale': return { opacity: 0, scale: 0.82 }
    case 'zoom': return { opacity: 0, scale: 1.16 }
    case 'blur': return { opacity: 0, filter: 'blur(16px)' }
    case 'flip': return { opacity: 0, rotationX: -75, transformPerspective: 900, transformOrigin: 'center bottom' }
    case 'up':
    default: return { opacity: 0, y: DIST }
  }
}
function restFor(from: Vars): Vars {
  const to: Vars = {}
  for (const k of Object.keys(from)) if (k in REST) to[k] = REST[k]
  return to
}

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp
  // Read the preference live (not captured once) so a reduced-motion user
  // never gets an animation, no matter when the query resolves.
  const isReduced = () =>
    import.meta.client && (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)

  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger)
    if (!isReduced()) document.documentElement.classList.add('anim-ready')

    // Layout settles once fonts/images load and after each route render.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    nuxtApp.hook('page:finish', () => requestAnimationFrame(refresh))
  }

  const noop = { getSSRProps: () => ({}) }

  // Core reveal used by both v-reveal and v-anim.
  function createReveal(el: HTMLElement, type: string, mods: Record<string, boolean>, value: unknown) {
    const opts = (typeof value === 'number' ? { delay: value / 1000 } : (value as any)) || {}
    const from = fromVars(type)
    const to: Vars = {
      ...restFor(from),
      duration: opts.duration ?? 0.9,
      ease: opts.ease ?? 'power3.out',
      delay: opts.delay ?? 0,
      overwrite: 'auto',
      // Drop the leftover inline transform so CSS :hover lifts still work.
      // (Opacity is intentionally NOT cleared — that would re-hide via the
      // `.anim-ready [data-anim]` rule.)
      clearProps: 'transform',
    }

    if (mods.stagger) {
      const kids = Array.from(el.children) as HTMLElement[]
      gsap.set(el, { opacity: 1 }) // clear the pre-hide; children carry the animation
      const st = mods.now ? undefined : { trigger: el, start: opts.start ?? 'top 85%', toggleActions: 'restart reset restart reset' }
      const tween = gsap.fromTo(kids, from, { ...to, stagger: opts.stagger ?? 0.12, scrollTrigger: st })
      ;(el as any)._anim = tween
      return
    }

    const st = mods.now ? undefined : { trigger: el, start: opts.start ?? 'top 85%', toggleActions: 'restart reset restart reset' }
    const tween = gsap.fromTo(el, from, { ...to, scrollTrigger: st })
    ;(el as any)._anim = tween
  }

  function killAnim(el: HTMLElement) {
    const t = (el as any)._anim
    if (t) { t.scrollTrigger?.kill(); t.kill() }
  }

  // v-reveal — back-compat fade+rise
  app.directive('reveal', {
    ...noop,
    mounted(el: HTMLElement, binding) {
      if (!import.meta.client || isReduced()) return
      try {
        el.setAttribute('data-anim', '')
        createReveal(el, 'up', {}, binding.value)
      } catch { gsap.set(el, { clearProps: 'all' }) }
    },
    unmounted: (el: HTMLElement) => killAnim(el),
  })

  // v-anim — flexible variants
  app.directive('anim', {
    ...noop,
    mounted(el: HTMLElement, binding) {
      if (!import.meta.client || isReduced()) return
      try {
        el.setAttribute('data-anim', '')
        createReveal(el, binding.arg || 'up', binding.modifiers || {}, binding.value)
      } catch { gsap.set(el, { clearProps: 'all' }) }
    },
    unmounted: (el: HTMLElement) => killAnim(el),
  })

  // v-words — per-word headline reveal (safe: falls back for markup/empty)
  app.directive('words', {
    ...noop,
    mounted(el: HTMLElement, binding) {
      if (!import.meta.client || isReduced()) return
      const text = el.textContent || ''
      if (el.childElementCount > 0 || !text.trim()) {
        el.setAttribute('data-anim', '')
        createReveal(el, 'up', {}, binding.value)
        return
      }
      try {
        const parts = text.split(/(\s+)/)
        el.textContent = ''
        const inners: HTMLElement[] = []
        for (const p of parts) {
          if (!p) continue
          if (/^\s+$/.test(p)) { el.appendChild(document.createTextNode(p)); continue }
          const word = document.createElement('span')
          word.style.display = 'inline-block'
          word.style.willChange = 'transform'
          word.textContent = p
          el.appendChild(word)
          inners.push(word)
        }
        gsap.set(el, { opacity: 1 })
        const delay = typeof binding.value === 'number' ? binding.value / 1000 : 0
        const tween = gsap.from(inners, {
          yPercent: 60, opacity: 0, duration: 0.8, ease: 'power4.out',
          stagger: 0.055, delay,
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'restart reset restart reset' },
        })
        ;(el as any)._anim = tween
      } catch {
        el.textContent = text
        gsap.set(el, { opacity: 1 })
      }
    },
    unmounted: (el: HTMLElement) => killAnim(el),
  })

  // v-flip — dramatic 3-D flip-in entrance (rotateY by default)
  //   v-flip                cards flip in on scroll
  //   v-flip.stagger        flip the element's children in sequence
  //   v-flip.x              flip around the X axis instead of Y
  //   v-flip.rev            reverse the flip direction
  //   v-flip.now            play on mount instead of on scroll
  //   v-flip="delayMs | { delay, duration, start, stagger }"
  app.directive('flip', {
    ...noop,
    mounted(el: HTMLElement, binding) {
      if (!import.meta.client || isReduced()) return
      const mods = binding.modifiers || {}
      const opts = (typeof binding.value === 'number' ? { delay: binding.value / 1000 } : binding.value) || {}
      const axis = mods.x ? 'rotationX' : 'rotationY'
      const start = opts.start ?? 'top 82%'
      const spin = 90 * (mods.rev ? -1 : 1)
      const dur = opts.duration ?? 0.95
      try {
        el.setAttribute('data-anim', '')
        if (mods.stagger) {
          const kids = Array.from(el.children) as HTMLElement[]
          gsap.set(el, { opacity: 1, perspective: 1000 })
          gsap.set(kids, { transformOrigin: 'center center' })
          const tween = gsap.fromTo(
            kids,
            { opacity: 0, [axis]: spin, z: -120 },
            {
              opacity: 1, [axis]: 0, z: 0, duration: dur, ease: 'power3.out',
              stagger: opts.stagger ?? 0.13, clearProps: 'transform',
              scrollTrigger: mods.now ? undefined : { trigger: el, start, toggleActions: 'restart reset restart reset' },
              delay: opts.delay ?? 0,
            },
          )
          ;(el as any)._anim = tween
          return
        }
        gsap.set(el, { transformPerspective: 1000, transformOrigin: 'center center' })
        const tween = gsap.fromTo(
          el,
          { opacity: 0, [axis]: spin, z: -120 },
          {
            opacity: 1, [axis]: 0, z: 0, duration: dur, ease: 'power3.out',
            delay: opts.delay ?? 0, clearProps: 'transform',
            scrollTrigger: mods.now ? undefined : { trigger: el, start, toggleActions: 'restart reset restart reset' },
          },
        )
        ;(el as any)._anim = tween
      } catch { gsap.set(el, { clearProps: 'all' }) }
    },
    unmounted: (el: HTMLElement) => killAnim(el),
  })

  // v-curtain — clip-path wipe reveal (top→down by default) for big images
  //   v-curtain        wipe down     v-curtain.up  wipe up
  //   v-curtain.left / .right        wipe sideways
  app.directive('curtain', {
    ...noop,
    mounted(el: HTMLElement, binding) {
      if (!import.meta.client || isReduced()) return
      const m = binding.modifiers || {}
      const hidden = m.up
        ? 'inset(100% 0 0 0)'
        : m.left
          ? 'inset(0 100% 0 0)'
          : m.right
            ? 'inset(0 0 0 100%)'
            : 'inset(0 0 100% 0)'
      try {
        el.setAttribute('data-curtain', '')
        const tween = gsap.fromTo(
          el,
          { clipPath: hidden, webkitClipPath: hidden },
          {
            clipPath: 'inset(0% 0 0 0)', webkitClipPath: 'inset(0% 0 0 0)',
            duration: 1.1, ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'restart reset restart reset' },
          },
        )
        ;(el as any)._anim = tween
      } catch { gsap.set(el, { clearProps: 'clipPath' }) }
    },
    unmounted: (el: HTMLElement) => killAnim(el),
  })

  // v-parallax — scrub translate as the element crosses the viewport
  app.directive('parallax', {
    ...noop,
    mounted(el: HTMLElement, binding) {
      if (!import.meta.client || isReduced()) return
      const range = (typeof binding.value === 'number' ? binding.value : binding.value?.range) ?? 8
      // scale is opt-in: pass it when the element is clipped (image in an
      // overflow-hidden box) so the drift never exposes an edge.
      const scale = typeof binding.value === 'object' ? binding.value?.scale : undefined
      if (scale) gsap.set(el, { scale })
      const st = gsap.fromTo(
        el,
        { yPercent: -range },
        {
          yPercent: range, ease: 'none',
          scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
      ;(el as any)._anim = st
    },
    unmounted: (el: HTMLElement) => killAnim(el),
  })

  // v-tilt — owns its transform (remove any Tailwind hover-translate on the same el)
  app.directive('tilt', {
    ...noop,
    mounted(el: HTMLElement, binding) {
      if (!import.meta.client || isReduced()) return
      const max = binding.value?.max ?? 8
      const lift = binding.value?.lift ?? 8
      gsap.set(el, { transformPerspective: 700 })
      const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3' })
      const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
      const sTo = gsap.quickTo(el, 'scale', { duration: 0.5, ease: 'power3' })
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        rotY(px * max * 2); rotX(-py * max * 2); yTo(-lift); sTo(1.02)
      }
      const onLeave = () => { rotX(0); rotY(0); yTo(0); sTo(1) }
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerenter', onMove)
      el.addEventListener('pointerleave', onLeave)
      ;(el as any)._tilt = { onMove, onLeave }
    },
    unmounted(el: HTMLElement) {
      const h = (el as any)._tilt
      if (h) {
        el.removeEventListener('pointermove', h.onMove)
        el.removeEventListener('pointerenter', h.onMove)
        el.removeEventListener('pointerleave', h.onLeave)
      }
    },
  })

  // v-magnetic — pointer pull (only for elements without their own transform)
  app.directive('magnetic', {
    ...noop,
    mounted(el: HTMLElement, binding) {
      if (!import.meta.client || isReduced()) return
      const strength = typeof binding.value === 'number' ? binding.value : 0.4
      const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' })
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * strength)
        yTo((e.clientY - (r.top + r.height / 2)) * strength)
      }
      const onLeave = () => { xTo(0); yTo(0) }
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
      ;(el as any)._mag = { onMove, onLeave }
    },
    unmounted(el: HTMLElement) {
      const h = (el as any)._mag
      if (h) {
        el.removeEventListener('pointermove', h.onMove)
        el.removeEventListener('pointerleave', h.onLeave)
      }
    },
  })

  return { provide: { gsap, ScrollTrigger } }
})
