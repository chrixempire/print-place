<script setup lang="ts">
import { ref } from 'vue'

export interface FaqItem {
  q: string
  a: string
}
const props = withDefaults(defineProps<{ items: FaqItem[]; defaultOpen?: number }>(), {
  defaultOpen: 0,
})
const open = ref(props.defaultOpen)
function toggle(i: number) {
  open.value = open.value === i ? -1 : i
}
</script>

<template>
  <div class="flex w-full flex-col gap-2.5">
    <div
      v-for="(item, i) in items"
      :key="item.q"
      class="overflow-hidden rounded-[10px] transition-colors duration-300"
      :class="open === i ? 'bg-coral-600 text-white' : 'bg-stone-500 text-neutral-500'"
    >
      <button
        class="flex w-full cursor-pointer items-center justify-between gap-6 px-3 py-4 text-left"
        :aria-expanded="open === i"
        @click="toggle(i)"
      >
        <span class="text-[18px] font-medium leading-6">{{ item.q }}</span>
        <!-- plus / minus in rounded square -->
        <svg class="size-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
          <path stroke-linecap="round" d="M8 12h8" />
          <path
            class="origin-center transition-transform duration-300"
            :class="open === i ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'"
            stroke-linecap="round"
            d="M12 8v8"
          />
        </svg>
      </button>

      <!-- animated answer -->
      <div
        class="grid transition-[grid-template-rows] duration-300 ease-out"
        :style="{ gridTemplateRows: open === i ? '1fr' : '0fr' }"
      >
        <div class="overflow-hidden">
          <p class="max-w-[383px] px-3 pb-4 text-[16px] leading-6 text-white/90">{{ item.a }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
