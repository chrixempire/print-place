<script setup lang="ts">
// Seamless, non-stop right→left marquee. Two identical sets; each set is repeated
// enough times to exceed the viewport so the -50% loop never shows a gap.
const props = withDefaults(
  defineProps<{
    items?: string[]
    duration?: number
    repeat?: number
  }>(),
  {
    items: () => ['Your prints should be premium', 'Built to be noticed', 'Designed to impress'],
    duration: 30,
    repeat: 4,
  },
)

// one "set" = the phrase list repeated `repeat` times
const setItems = computed(() => Array.from({ length: props.repeat }).flatMap(() => props.items))
</script>

<template>
  <div class="w-full overflow-hidden bg-coral-500 py-3 text-white select-none">
    <div class="auto-scroll flex w-max items-center" :style="{ animationDuration: `${duration}s` }">
      <!-- two identical sets -> translateX(-50%) loops seamlessly -->
      <div v-for="s in 2" :key="s" class="flex shrink-0 items-center" aria-hidden="true">
        <span v-for="(item, i) in setItems" :key="`${s}-${i}`" class="flex items-center">
          <span class="whitespace-nowrap px-6 text-[16px] font-medium leading-5">{{ item }}</span>
          <span class="text-[18px] leading-none">🔥</span>
        </span>
      </div>
    </div>
  </div>
</template>
