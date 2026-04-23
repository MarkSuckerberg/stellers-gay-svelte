import type { BlogMeta } from '$lib/blog.js';
import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';

export const prerender = false;

export async function load({ params }) {
	try {
		const post: {
			default: Component;
			metadata: BlogMeta;
		} = await import(`../${params.slug}.md`);
		const content: Component = post.default;

		return {
			Content: content,
			...post.metadata
		};
	} catch {
		error(404);
	}
}
