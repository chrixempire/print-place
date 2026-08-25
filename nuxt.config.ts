import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Global stylesheet — Tailwind v4 entrypoint lives here
  css: ['~/assets/css/main.css'],

  // Absolute site origin — used for canonical URLs, Open Graph, sitemap & JSON-LD.
  // Override in production with NUXT_PUBLIC_SITE_URL if the domain ever changes.
  runtimeConfig: {
    public: {
      siteUrl: 'https://printplace.ng',
    },
  },

  // Tailwind CSS v4 integrates through its first-party Vite plugin
  vite: {
    plugins: [tailwindcss()],
  },

  // Ensure the sitemap is emitted even for fully static (`nuxt generate`) builds
  nitro: {
    prerender: { routes: ['/sitemap.xml'] },
  },

  app: {
    // Smooth fade/slide between routes (disabled under reduced-motion via CSS)
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      // Site-wide default title; pages override via useSeo()
      title: 'Printplaceng — Custom Merch & Branding Partner in Lagos',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#ff4f29' },
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
        { name: 'author', content: 'Printplaceng' },
        { name: 'format-detection', content: 'telephone=no' },
        // Static Open Graph / Twitter defaults (dynamic bits set per page)
        { property: 'og:site_name', content: 'Printplaceng' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_NG' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@printplaceng_' },
        { name: 'twitter:creator', content: '@printplaceng_' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
})
