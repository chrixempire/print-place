<script setup lang="ts">
// Sticky top navigation — logo + CTA pills. Matches Figma node 18491:463837.
// On the home page the hero is dark (bg-neutral-500), so the nav takes the same
// dark colour and the logo is rendered white to stay legible; every other page
// keeps the light (white) nav.
const route = useRoute()
const onDark = computed(() => route.path === '/')
</script>

<template>
  <header
    v-anim:down.now
    data-anim
    class="sticky top-0 z-50 w-full transition-colors duration-300"
    :class="onDark ? 'bg-neutral-500' : 'bg-white'"
  >
    <div class="mx-auto flex h-[64px] max-w-[1080px] items-center justify-between px-5 md:h-[81px] md:px-6">
      <NuxtLink to="/" aria-label="Printplaceng home" class="block">
        <img
          src="/img/logo.webp"
          alt="Printplaceng"
          class="h-[34px] w-auto md:h-[38px]"
          :class="onDark ? '[filter:brightness(0)_invert(1)]' : ''"
        />
      </NuxtLink>

      <nav class="flex items-center gap-3">
        <!-- Mobile shows a single CTA (Contact us); the second pill appears from md up. -->
        <AppButton
          to="/built-for-you"
          variant="primary"
          class="!hidden !px-5 !py-2 !text-sm md:!inline-flex"
        >
          Built for you
        </AppButton>
        <AppButton
          to="/contact"
          variant="secondary"
          class="!px-5 !py-2 !text-sm ring-1 ring-inset ring-stone-500"
        >
          Contact us
        </AppButton>
      </nav>
    </div>
  </header>
</template>
