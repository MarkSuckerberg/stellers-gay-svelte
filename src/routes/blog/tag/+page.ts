import { GetPostMeta } from '$lib/blog';

const tags = GetPostMeta() // Get the posts
	.flatMap(([, data]) => data.tags || []) // Turn into an array of all tags
	.reduce((acc, current) => {
		acc.set(current, (acc.get(current) || 0) + 1);
		return acc;
	}, new Map<string, number>()) // Accumulate into a map of tag => tagCount
	.entries()
	.toArray() // Turn into a sortable array of tuples
	.sort((a, b) => b[1] - a[1]);

export async function load() {
	return { tags };
}
