//const html = render(data.default).body;
import { render } from 'svelte/server';

import Codeblocks from '$lib/codeblocks.css?inline';
import type { Component } from 'svelte';
import type { BlogMeta } from '$lib/blog';

export const prerender = true;

export async function GET({ params }) {
	const post: {
		default: Component;
		metadata: BlogMeta;
	} = await import(`../../${params.slug}.md`);
	const html = render(post.default);

	const output = `<!doctype html><html lang="en"><head><title>${post.metadata.title}</title><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><style>${Codeblocks}</style>${html.head}</head><body><h1>${post.metadata.title}</h1><p>${post.metadata.date}</p>${html.body}</body></html>`;

	return new Response(output, {
		status: 200,
		headers: {
			'Content-Type': 'text/html; charset=utf-8'
		}
	});
}
