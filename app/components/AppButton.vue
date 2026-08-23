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
  'inline-flex cursor-pointer items-center justify-center rounded-full px-6 py-3 text-[18px] font-bold leading-6 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]',
  props.block ? 'w-full' : '',
  props.variant === 'primary' ? 'bg-coral-500 text-white hover:bg-coral-600' : '',
  props.variant === 'secondary' ? 'bg-stone-500 text-neutral-500 hover:bg-stone-600' : '',
  props.variant === 'dark' ? 'bg-neutral-500 text-white hover:bg-neutral-400' : '',
])
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="classes">
    <slot />
  </NuxtLink>
  <button v-else type="button" :class="classes">
    <slot />
  </button>
</template>
