import type { BlogMeta } from '$lib/blog.js';
import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';

export const prerender = false;

export async function load({ params, data }) {
	try {
		const post: {
			default: Component;
			metadata: BlogMeta;
		} = await import(`../${params.slug}.md`);
		const content: Component = post.default;

		return {
			Content: content,
			...post.metadata,
			comments: data.comments
		};
	} catch {
		error(404);
	}
}
