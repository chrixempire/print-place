<script setup lang="ts">
// Sticky top navigation — logo + CTA pills. Matches Figma node 18491:463837.
</script>

<template>
  <header v-anim:down.now data-anim class="sticky top-0 z-50 w-full bg-white">
    <div class="mx-auto flex h-[64px] max-w-[1080px] items-center justify-between px-5 md:h-[81px] md:px-6">
      <NuxtLink to="/" aria-label="Printplaceng home" class="block">
        <img src="/img/logo.png" alt="Printplaceng" class="h-[34px] w-auto md:h-[38px]" />
      </NuxtLink>

      <nav class="flex items-center gap-3">
        <AppButton
          to="/built-for-you"
          variant="primary"
          class="!px-5 !py-2 !text-sm"
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
