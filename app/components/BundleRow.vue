<script setup lang="ts">
export interface Bundle {
  image: string
  alt: string
  theme: 'dark' | 'light'
  type?: 'bundle' | 'cta'
  price?: string
  title: string
  descPrimary?: string
  descSecondary?: string
  subtitle?: string
  cta?: string
}
const props = defineProps<{ bundle: Bundle }>()
const isCta = props.bundle.type === 'cta'
const isDark = props.bundle.theme === 'dark'
</script>

<template>
  <div class="group flex flex-col items-stretch gap-4 md:flex-row md:items-center">
    <!-- Image -->
    <div class="relative h-[260px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-[360px] md:h-[551px] md:w-[648px]">
      <img
        :src="bundle.image"
        :alt="bundle.alt"
        class="absolute inset-0 size-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
      />
    </div>

    <!-- Content card -->
    <div
      class="flex w-full shrink-0 flex-col justify-between gap-8 overflow-hidden rounded-2xl p-6 md:h-[551px] md:w-[416px]"
      :class="isDark ? 'bg-neutral-500 text-white' : 'bg-gray-300 text-neutral-500'"
    >
      <!-- Top -->
      <div class="flex flex-col items-start">
        <template v-if="!isCta">
          <p class="text-[20px] font-semibold leading-6" :class="isDark ? 'text-coral-500' : 'text-coral-800'">
            {{ bundle.price }}
          </p>
          <h3 class="max-w-[240px] text-[36px] font-bold leading-[42px] tracking-[-1.08px]">
            {{ bundle.title }}
          </h3>
        </template>
        <template v-else>
          <h3 class="max-w-[324px] text-[36px] font-bold leading-[42px] tracking-[-1.08px] text-neutral-500">
            {{ bundle.title }}
          </h3>
          <p class="mt-1 text-[18px] leading-normal tracking-[-0.54px] text-neutral-400">{{ bundle.subtitle }}</p>
        </template>
      </div>

      <!-- Bottom -->
      <div class="flex flex-col items-start gap-4">
        <div v-if="!isCta" class="flex max-w-[359px] flex-col" :class="isDark ? 'gap-[5px]' : 'gap-0'">
          <p
            class="text-[18px] font-[450] leading-normal"
            :class="isDark ? 'tracking-[-0.36px] text-white' : 'tracking-[-0.54px] text-neutral-500'"
          >
            {{ bundle.descPrimary }}
          </p>
          <p class="text-[16px] leading-6" :class="isDark ? 'text-stone-500' : 'text-neutral-400'">
            {{ bundle.descSecondary }}
          </p>
        </div>

        <!-- Bundle button -->
        <NuxtLink
          v-if="!isCta"
          to="/contact"
          class="group/btn flex w-full cursor-pointer items-center justify-between rounded-full bg-white py-2 pl-6 pr-2.5 text-left transition-shadow duration-300 hover:shadow-lg"
        >
          <span class="text-[18px] font-bold leading-6 text-neutral-500">Let’s talk more</span>
          <span
            class="flex size-8 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover/btn:translate-x-1"
            :class="isDark ? 'bg-coral-500' : 'bg-neutral-500'"
          >
            <IconArrowRight class="size-4" />
          </span>
        </NuxtLink>

        <!-- CTA button -->
        <NuxtLink
          v-else
          to="/contact"
          class="group/btn flex w-full cursor-pointer items-center justify-between rounded-[24px] bg-coral-500 py-1.5 pl-4 pr-1.5 transition-colors duration-300 hover:bg-coral-700"
        >
          <span class="text-[16px] font-semibold leading-6 text-white">{{ bundle.cta }}</span>
          <span class="flex size-8 items-center justify-center rounded-full bg-white text-neutral-500 transition-transform duration-300 group-hover/btn:translate-x-1">
            <IconArrowRight class="size-4" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
