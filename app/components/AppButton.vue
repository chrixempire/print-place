<script setup lang="ts">
/**
 * Pill button. Pass `to` to render a real navigating link (NuxtLink); otherwise a <button>.
 * primary   = coral-500 (#ff4f29) w/ white text — main CTA
 * secondary = stone-500 (#f7f6f3) w/ ink text
 * dark      = ink w/ white text
 */
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'dark'
    to?: string
    block?: boolean
  }>(),
  { variant: 'primary', block: false },
)

const classes = computed(() => [
  'group/ab relative isolate inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full px-6 py-3 text-[18px] font-bold leading-6 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]',
  props.block ? 'w-full' : '',
  props.variant === 'primary' ? 'bg-coral-500 text-white hover:bg-coral-600' : '',
  props.variant === 'secondary' ? 'bg-stone-500 text-neutral-500 hover:bg-stone-600' : '',
  props.variant === 'dark' ? 'bg-neutral-500 text-white hover:bg-neutral-400' : '',
])

// A diagonal light sweeps across the pill on hover — subtle, premium sheen.
const sheen =
  'pointer-events-none absolute inset-y-0 -left-full z-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-[left] duration-700 ease-out group-hover/ab:left-[150%]'
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="classes">
    <span :class="sheen" aria-hidden="true" />
    <span class="relative z-10 inline-flex items-center gap-2"><slot /></span>
  </NuxtLink>
  <button v-else type="button" :class="classes">
    <span :class="sheen" aria-hidden="true" />
    <span class="relative z-10 inline-flex items-center gap-2"><slot /></span>
  </button>
</template>
