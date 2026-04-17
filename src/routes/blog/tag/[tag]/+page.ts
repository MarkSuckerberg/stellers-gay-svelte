import { GetAllPosts } from '$lib/blog';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const pages = GetAllPosts();

	const filtered = pages.filter(([_, meta]) => !meta.draft && meta.tags?.includes(params.tag));

	if (filtered.length < 1) {
		error(404, `No posts tagged with "${params.tag}"`);
	}

	return { pages: filtered };
}
