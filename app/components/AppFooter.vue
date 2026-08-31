<script setup lang="ts">
// Site footer — matches Figma node 18491:463687 (pale-yellow, polaroid tee, links, socials).
const socials = [
  { icon: '/icons/instagram.svg', label: 'Instagram', href: 'https://www.instagram.com/printplaceng' },
  { icon: '/icons/youtube.svg', label: 'YouTube', href: 'https://youtube.com/@theprintplaceteam' },
  { icon: '/icons/tiktok.svg', label: 'TikTok', href: 'https://www.tiktok.com/@printplaceng' },
  { icon: '/icons/linkedin.svg', label: 'LinkedIn', href: 'https://www.linkedin.com/company/printplacengr/' },
  { icon: '/icons/x.svg', label: 'X', href: 'https://x.com/printplaceng_' },
]
</script>

<template>
  <footer class="relative overflow-hidden bg-yellow-50 px-5 pb-12 pt-14 md:px-6">
    <!-- Desktop CUSTOM/BRANDING — sit at the nav-links row, inset ~12.5% to line up
         with the content column edges. Hidden on mobile (rendered inline below). -->
    <span class="corner-label absolute z-20 hidden -translate-y-1/2 md:block md:left-[12.5%] md:top-[calc(100%-150px)]">CUSTOM</span>
    <span class="corner-label absolute z-20 hidden -translate-y-1/2 md:block md:right-[12.5%] md:top-[calc(100%-150px)]">BRANDING</span>
    <!-- Mobile CUSTOM/BRANDING — flank the polaroid, pinned to the footer edges.
         The polaroid is narrow on mobile so the labels never overlap it. -->
    <span class="corner-label absolute left-4 top-[132px] z-20 md:hidden">CUSTOM</span>
    <span class="corner-label absolute right-4 top-[132px] z-20 md:hidden">BRANDING</span>

    <div class="mx-auto flex w-full max-w-[1080px] flex-col items-center gap-6">
      <!-- Polaroid — centered in the column; the CUSTOM/BRANDING labels are pinned
           to the footer edges (above) at this vertical level. -->
      <div
        class="relative w-[132px] rounded-[2px] bg-white p-3 pb-8 shadow-[0px_14px_7px_0px_rgba(0,0,0,0.04),0px_9px_4px_0px_rgba(0,0,0,0.03),0px_5px_2px_0px_rgba(0,0,0,0.02)] md:w-[184px]"
      >
        <div class="aspect-[180/200] w-full overflow-hidden">
          <img src="/img/footer-tee.webp" alt="Printplace custom tee" loading="lazy" decoding="async" class="h-full w-full object-cover" />
        </div>
        <!-- tape -->
        <div class="absolute -top-4 left-1/2 flex w-[150px] -translate-x-1/2 -rotate-3 items-center justify-center">
          <img src="/img/footer-tape.webp" alt="" loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-fill" />
          <span
            class="relative py-1 text-[20px] font-medium leading-[26px] text-[#202020]"
            style="text-shadow: 2px 1px 0 rgba(0, 0, 0, 0.25)"
          >Printplace</span>
        </div>
      </div>

      <!-- Nav links -->
      <nav class="flex items-center gap-6 text-[16px] font-medium leading-5 text-neutral-500">
        <NuxtLink to="/" class="hover:text-coral-500">About</NuxtLink>
        <NuxtLink to="/built-for-you" class="hover:text-coral-500">Built for you</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-coral-500">Contact us</NuxtLink>
      </nav>

      <!-- Socials -->
      <div class="flex items-center gap-5">
        <a
          v-for="s in socials"
          :key="s.label"
          v-magnetic="0.5"
          :href="s.href"
          :aria-label="s.label"
          target="_blank"
          rel="noopener noreferrer"
          class="flex size-8 items-center justify-center rounded-full border border-neutral-50 transition-colors hover:border-neutral-300"
        >
          <img :src="s.icon" :alt="s.label" class="size-4" />
        </a>
      </div>

      <p class="text-[12px] leading-4 text-neutral-300">Copyrights © 2025. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.corner-label {
  /* All instances are absolutely positioned (mobile flanks the polaroid, desktop
     sits at the nav row). This is set on the base — a Tailwind `absolute` utility
     has the same specificity as this scoped rule and would lose the cascade. */
  position: absolute;
  padding: 3px 6px;
  /* 14px reads at the design's optical size (Aspekta runs a touch larger than the
     Figma's DM Sans at the same px), so 16px looked oversized. */
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.2px;
  white-space: nowrap;
  color: var(--color-coral-500);
}
/* corner brackets */
.corner-label::before,
.corner-label::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 6px;
  border-color: var(--color-coral-500);
  border-style: solid;
}
.corner-label::before {
  top: 0;
  left: 0;
  border-width: 1.5px 0 0 1.5px;
}
.corner-label::after {
  bottom: 0;
  right: 0;
  border-width: 0 1.5px 1.5px 0;
}
</style>
