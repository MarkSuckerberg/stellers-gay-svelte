import { asset, resolve } from '$app/paths';
import { GetPosts } from '$lib/blog';
import { json } from '@sveltejs/kit';
import { render } from 'svelte/server';

import markPFP from '$lib/assets/mrk2.webp?w=512&h=512&?enhanced';
import jary from '$lib/assets/bluejarybeast.webp?w=512&h=512&?enhanced';
import stellersButton from '$lib/assets/stellersbutton.gif';

const posts = GetPosts();

const builtRFC822 = new Date(Date.now()).toUTCString();

const feed = {
	version: 'https://jsonfeed.org/version/1.1',
	title: "Steller's Gay Blog",
	description:
		"The RSS feed for Mark Suckerbird's personal blog. Expect rambling about computers, video games, technology, and the like.",
	home_page_url: 'https://stellers.gay/blog',
	feed_url: 'https://stellers.gay/feed',
	favicon: 'https://stellers.gay' + asset('/favicon.webp'),
	language: 'en-US',
	icon: 'https://stellers.gay' + jary,
	authors: [
		{
			name: 'Mark Suckerbird',
			url: 'https://stellers.gay/',
			avatar: 'https://stellers.gay' + markPFP
		}
	],
	items: Object.entries(posts).map(([slug, data]) => {
		const meta = data.metadata;
		const html = render(data.default).body;
		const text = html.replace(/<[^>]*>/g, '');

		return {
			id: slug,
			url: 'https://stellers.gay' + resolve('/blog/[slug]', { slug }),
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

const rssItems = feed.items.map(
	(post) => `  <item>
    <title>${post.title}</title>
    <link>${post.url}</link>
    <guid>${post.id}</guid>
    <description>${post.content_html}</description>
	<pubDate>${new Date(post.date_published).toUTCString()}</pubDate>
	<author>${post.authors?.map((author) => author.name).join(', ') || 'Mark Suckerbird'}</author>
  </item>`
);

const feedRSS = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">

<channel>
  <title>${feed.title}</title>
  <link>${feed.home_page_url}</link>
  <description>${feed.description}</description>
  <lastBuildDate>${builtRFC822}</lastBuildDate>
  <language>${feed.language}</language>
  <managingEditor>${feed.authors[0].name}</managingEditor>
  <webMaster>${feed.authors[0].name}</webMaster>
  <image>
    <url>${stellersButton}</url>
    <link>${feed.home_page_url}</link>
    <title>Steller's Gay Homepage</title>
  </image>
${rssItems.join('\n')}
</channel>

</rss>`;

const atomItems = feed.items.map(
	(post) => `  <entry>
    <title>${post.title}</title>
    <link href="${post.url}" />
    <id>${post.id}</id>
	<summary>${post.summary}</summary>
    <content>${post.content_html}</content>
	<published>${post.date_published}</published>
	<updated>${post.date_modified}</updated>
	${
		post.authors
			? `<author>
		<name>${post.authors?.map((author) => author.name).join(', ') || 'Mark Suckerbird'}</name>
	</author>`
			: ''
	}
	
  </entry>`
);

const feedATOM = `<?xml version="1.0" encoding="UTF-8" ?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${feed.title}</title>
  <link href="${feed.home_page_url}" />
  <link href="https://stellers.gay${resolve('/atom')}" rel="self" />
  <subtitle>${feed.description}</subtitle>
  <updated>${new Date(Date.now()).toISOString()}</updated>
  <language>${feed.language}</language>
  <author>
    <name>Mark Suckerbird</name>
    <email>mark@stellers.gay</email>
  </author>
${atomItems.join('\n')}
</feed>`;

let feedHash: string;

export enum FeedType {
	RSS,
	ATOM,
	JSON,
	ANY
}

async function GetHash() {
	return [
		...new Uint8Array(await crypto.subtle.digest('sha-1', new TextEncoder().encode(feedATOM)))
	]
		.map((value) => value.toString(16).padStart(2, '0'))
		.join('');
}

export async function getFeed(request: Request, type = FeedType.ANY) {
	feedHash ??= await GetHash();
	const noneMatch = request.headers.get('If-None-Match') == feedHash;
	const modSince = request.headers.get('If-Modified-Since') == builtRFC822;

	if (noneMatch && modSince) {
		return new Response(null, {
			status: 304,
			statusText: 'Not Modified',
			headers: { Vary: 'Accept' }
		});
	}

	switch (type) {
		case FeedType.RSS:
			return new Response(feedRSS, {
				headers: {
					'Content-Type': 'application/rss+xml',
					'Last-Modified': builtRFC822,
					Etag: feedHash
				}
			});
		case FeedType.ATOM:
			return new Response(feedATOM, {
				headers: {
					'Content-Type': 'application/atom+xml',
					'Last-Modified': builtRFC822,
					Etag: feedHash
				}
			});
		case FeedType.JSON:
			return json(feed, {
				headers: {
					'Content-Type': 'application/feed+json',
					'Last-Modified': builtRFC822,
					Etag: feedHash
				}
			});

		default:
			break;
	}

	const accept = request.headers.get('Accept');
	if (accept?.includes('application/feed+json')) {
		return json(feed, {
			headers: {
				'Content-Type': 'application/feed+json',
				'Last-Modified': builtRFC822,
				Vary: 'Accept',
				Etag: feedHash
			}
		});
	}

	if (accept?.includes('application/atom+xml')) {
		return new Response(feedATOM, {
			headers: {
				'Content-Type': 'application/atom+xml',
				'Last-Modified': builtRFC822,
				Vary: 'Accept',
				Etag: feedHash
			}
		});
	}

	return new Response(feedRSS, {
		headers: {
			'Content-Type': 'application/rss+xml',
			'Last-Modified': builtRFC822,
			Vary: 'Accept',
			Etag: feedHash
		}
	});
}
