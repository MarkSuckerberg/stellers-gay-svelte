import { resolve } from '$app/paths';
import { SlugFromImport, type BlogMeta } from '$lib/blog';

const pages: Record<string, number | undefined> = {
	'': 1,
	media: 0.7,
	projects: 0.6,
	guestbook: 0.5,
	blog: 0.5,
	fun: 0.4,
	snake: 0.2,
	solitaire: 0.2
};

const posts = import.meta.glob<BlogMeta>('/src/routes/blog/*.md', {
	eager: true,
	import: 'metadata'
});

const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  ${Object.entries(pages)
		.map(
			([page, priority]) => `
  <url>
    <loc>${resolve('/')}${page}</loc>
    <changefreq>daily</changefreq>
    <priority>${priority || 0.2}</priority>
  </url>
  `
		)
		.join('')}
  ${Object.entries(posts)
		.map(
			([page, meta]) => `
  <url>
    <loc>${resolve('/blog/[slug]', { slug: SlugFromImport(page) })}</loc>
    <changefreq>monthly</changefreq>
    <lastmod>${new Date(meta.updated || meta.date).toISOString()}</lastmod>
    <priority>0.2</priority>
  </url>
  `
		)
		.join('')}
</urlset>`;

export async function GET() {
	return new Response(sitemap, {
		headers: {
			'content-type': 'application/xml'
		}
	});
}
