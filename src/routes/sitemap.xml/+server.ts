import { resolve } from '$app/paths';
import type { RouteId } from '$app/types';
import { GetPostMeta, SlugFromImport } from '$lib/blog';

const pages = Object.entries({
	'/': 1,
	'/media': 0.7,
	'/projects': 0.6,
	'/guestbook': 0.5,
	'/blog': 0.5,
	'/fun': 0.4,
	'/snake': 0.2,
	'/solitaire': 0.2,
	'/atom': 0.2,
	'/rss': 0.2,
	'/feed.json': 0.2
} as Record<RouteId, number>) as [RouteId, number][];

const subdomains = Object.entries({
	'https://social.stellers.gay/': 0.5,
	'https://social.stellers.gay/mark': 0.3,
	'https://chat.stellers.gay/': 0.3,
	'https://auth.stellers.gay/': 0.2,
	'https://hits.stellers.gay/': 0.2,
	'https://git.stellers.gay/': 0.2,
	'https://draw.stellers.gay/': 0.1
});

const posts = GetPostMeta();

const lastMod = new Date(Date.now()).toISOString();

const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  ${pages
		.map(
			([page, priority]) => `
  <url>
    <loc>https://stellers.gay${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
	<lastmod>${lastMod}</lastmod>
  </url>
  `
		)
		.join('')}
  ${subdomains
		.map(
			([page, priority]) => `
  <url>
    <loc>${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
	<lastmod>${lastMod}</lastmod>
  </url>
  `
		)
		.join('')}
  ${posts
		.map(
			([page, meta]) => `
  <url>
    <loc>https://stellers.gay${resolve('/blog/[slug]', { slug: SlugFromImport(page) })}</loc>
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
