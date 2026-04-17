import { GetPostMeta } from '$lib/blog';
import { error } from '@sveltejs/kit';

const pages = GetPostMeta();

export async function load({ params }) {
	const filtered = pages.filter(([, meta]) => !meta.draft && meta.tags?.includes(params.tag));

	if (filtered.length < 1) {
		error(404, `No posts tagged with "${params.tag}"`);
	}

	return { pages: filtered };
}
