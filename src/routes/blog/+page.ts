import { GetAllPosts } from '$lib/blog';

export async function load() {
	const pages = GetAllPosts();

	return { pages };
}
