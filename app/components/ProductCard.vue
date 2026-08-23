<script setup lang="ts">
export interface Product {
  image: string
  name: string
  price: string
}
defineProps<{ product: Product }>()
</script>

<template>
  <!-- 3-D flip card: hover (or focus) flips to reveal the back face -->
  <div class="flip group/flip aspect-[352/521] w-full [perspective:1400px]">
    <div
      class="flip-inner relative size-full rounded-2xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover/flip:[transform:rotateY(180deg)] group-focus-within/flip:[transform:rotateY(180deg)]"
    >
      <!-- FRONT -->
      <div class="absolute inset-0 overflow-hidden rounded-2xl bg-neutral-400 shadow-sm [backface-visibility:hidden] [transform:translateZ(0.1px)]">
        <img
          :src="product.image"
          :alt="product.name"
          class="absolute inset-0 size-full object-cover transition-transform duration-[600ms] ease-out group-hover/flip:scale-[1.06]"
        />
        <!-- top-right corner bracket -->
        <span class="absolute right-0 top-0 size-3 border-r-2 border-t-2 border-white/90"></span>
        <!-- name / price bar -->
        <div class="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[#31301c] px-2.5 py-1 text-white">
          <span class="text-[16px] font-medium leading-[26px]">{{ product.name }}</span>
          <span class="text-[18px] font-bold">{{ product.price }}</span>
        </div>
      </div>

      <!-- BACK -->
      <div
        class="absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl bg-coral-600 px-6 text-center text-white [backface-visibility:hidden] [transform:rotateY(180deg)]"
      >
        <span class="text-[13px] font-medium uppercase tracking-[0.2em] text-white/70">Print Place</span>
        <p class="text-[26px] font-bold leading-tight tracking-[-0.5px]">{{ product.name }}</p>
        <p class="text-[34px] font-bold text-white">{{ product.price }}</p>
        <span class="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[15px] font-bold text-coral-600">
          Order now
          <IconArrowRight class="size-4" />
        </span>
        <span class="pointer-events-none absolute -bottom-8 -right-6 size-28 rounded-full bg-white/10"></span>
        <span class="pointer-events-none absolute -top-6 -left-6 size-20 rounded-full bg-white/10"></span>
      </div>
    </div>
  </div>
</template>
