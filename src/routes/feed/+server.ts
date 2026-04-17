import { resolve } from '$app/paths';
import { SlugFromImport, type BlogMeta } from '$lib/blog';
import { json } from '@sveltejs/kit';
import type { Component } from 'svelte';
import { render } from 'svelte/server';

import markPFP from '$lib/assets/mrk2.webp?w=512&h=512&?enhanced';
import jary from '$lib/assets/bluejarybeast.webp?w=512&h=512&?enhanced';

const posts = import.meta.glob<{ default: Component; metadata: BlogMeta }>(
	'/src/routes/blog/*.md',
	{
		eager: true
	}
);

const feed = {
	version: 'https://jsonfeed.org/version/1.1',
	title: "Steller's Gay Blog",
	description:
		"The RSS feed for Mark Suckerbird's personal blog. Expect rambling about computers, video games, technology, and the like.",
	home_page_url: 'https://stellers.gay/',
	feed_url: 'https://stellers.gay/feed.json',
	language: 'en-US',
	icon: { jary },
	authors: [
		{
			name: 'Mark Suckerbird',
			url: 'https://stellers.gay/',
			avatar: { markPFP }
		}
	],
	items: Object.entries(posts).map(([importString, data]) => {
		const slug = SlugFromImport(importString);
		const meta = data.metadata;
		const html = render(data.default).body;
		const text = html.replace(/<[^>]*>/g, '');

		return {
			id: slug,
			url: resolve('/blog/[slug]', { slug }),
			title: meta.title,
			content_html: html,
			content_text: text,
			summary: meta.summary,
			date_published: new Date(meta.date).toISOString(),
			date_modified: meta.updated ? new Date(meta.updated).toISOString() : undefined,
			tags: meta.tags,
			authors: meta.authors
		};
	})
};

export async function GET() {
	return json(feed, {
		headers: {
			'content-type': 'application/feed+json'
		}
	});
}
