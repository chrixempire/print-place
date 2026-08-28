interface SeoOptions {
  /** Full document title (shown in the tab and as og/twitter title). */
  title: string
  /** ~150–160 char meta description. */
  description: string
  /** Path to an OG image under /public (defaults to the site OG image). */
  image?: string
  /** og:type — 'website' (default) or 'article'. */
  type?: 'website' | 'article'
}

/**
 * Per-page SEO: sets title, description, canonical, Open Graph and Twitter tags
 * with absolute URLs derived from the current route and the configured siteUrl.
 */
export function useSeo(opts: SeoOptions) {
  const { public: { siteUrl } } = useRuntimeConfig()
  const route = useRoute()
  const url = `${siteUrl}${route.path}`
  const image = `${siteUrl}${opts.image ?? '/og-image.jpg'}`

  useSeoMeta({
    title: opts.title,
    description: opts.description,
    ogTitle: opts.title,
    ogDescription: opts.description,
    ogType: opts.type ?? 'website',
    ogUrl: url,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: opts.title,
    twitterTitle: opts.title,
    twitterDescription: opts.description,
    twitterImage: image,
    twitterImageAlt: opts.title,
  })

  useHead({
    link: [{ rel: 'canonical', href: url }],
  })
}
