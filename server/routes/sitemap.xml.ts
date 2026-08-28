// Dynamic sitemap generated from the site's routes, using the configured siteUrl.
export default defineEventHandler((event) => {
  const { public: { siteUrl } } = useRuntimeConfig(event)

  const routes: { path: string; priority: string; changefreq: string }[] = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/built-for-you', priority: '0.8', changefreq: 'weekly' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  ]

  const urls = routes
    .map(
      (r) =>
        `  <url>\n    <loc>${siteUrl}${r.path === '/' ? '/' : r.path}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
