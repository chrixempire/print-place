# PrintPlace

Animated marketing site built with **Nuxt 4** and **Tailwind CSS v4**.

## Stack

- [Nuxt 4](https://nuxt.com) — Vue 3, file-based routing (`app/pages`)
- [Tailwind CSS v4](https://tailwindcss.com) — via the first-party `@tailwindcss/vite` plugin; design tokens live in `app/assets/css/main.css` under `@theme`
- Animation library — **TBD** (to be chosen once development starts)

## Structure

```
app/
  app.vue              # root — NuxtLayout + NuxtPage
  assets/css/main.css  # Tailwind entry + @theme design tokens
  components/          # reusable UI
  composables/         # shared logic (e.g. animation helpers)
  layouts/default.vue  # base page shell
  pages/index.vue      # home
nuxt.config.ts         # Tailwind vite plugin + global css
```

## Commands

```bash
npm install      # install dependencies
npm run dev      # dev server (http://localhost:3000)
npm run build    # production build
npm run generate # static generation
npm run preview  # preview a build
```

## Notes

- `prefers-reduced-motion` is respected globally in `main.css`.
- Replace placeholder tokens (colors, fonts) in `@theme` with real values from Figma.
