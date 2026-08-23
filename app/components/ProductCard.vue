<script setup lang="ts">
export interface Product {
  image: string
  name: string
  price: string
}
defineProps<{ product: Product }>()
</script>

<template>
  <div class="group relative aspect-[352/521] w-full overflow-hidden rounded-2xl bg-neutral-400 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl">
    <img
      :src="product.image"
      :alt="product.name"
      class="absolute inset-0 size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
    />

    <!-- top-right corner bracket -->
    <span class="absolute right-0 top-0 size-3 border-r-2 border-t-2 border-white/90 transition-all duration-300 group-hover:size-4 group-hover:border-coral-500"></span>

    <!-- name / price bar -->
    <div
      class="absolute inset-x-0 bottom-0 flex translate-y-0 items-center justify-between bg-[#31301c] px-2.5 py-1 text-white transition-colors duration-300 group-hover:bg-coral-600"
    >
      <span class="text-[16px] font-medium leading-[26px]">{{ product.name }}</span>
      <span class="text-[18px] font-bold">{{ product.price }}</span>
    </div>
  </div>
</template>
