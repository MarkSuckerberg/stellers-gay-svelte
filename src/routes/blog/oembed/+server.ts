import { error, json } from '@sveltejs/kit';
import { render } from 'svelte/server';
import markPFP from '$lib/assets/mrk2.webp?w=512&h=512&?enhanced';
import { GetPosts } from '$lib/blog.js';

const posts = GetPosts();

export async function GET({ url }) {
	//let slug = url.searchParams.get('slug');
	const postUrl = url.searchParams.get('url');
	const format = url.searchParams.get('format');

	if (format && format != 'json') {
		return error(501);
	}

	if (!postUrl) {
		return error(400);
	}

	const slug = postUrl.split('/').at(-1)!;

	if (!(slug in posts)) {
		return error(404);
	}

	const details = posts[slug];

	const embed = {
		version: '1.0',
		type: 'rich',
		width: 400,
		height: 200,
		html: render(details.default).body,
		author_name:
			details.metadata.authors?.map((author) => author.name)?.join(', ') || 'Mark Suckerbird',
		author_url:
			details.metadata.authors?.map((author) => author.url)?.join(', ') || 'https://stellers.gay',
		provider_name: "Steller's Gay",
		provider_url: 'https://stellers.gay',
		title: details.metadata.title,
		thumbnail_url: 'https://stellers.gay' + markPFP,
		thumbnail_height: 512,
		thumbnail_width: 512
	};

	return json(embed);
}
