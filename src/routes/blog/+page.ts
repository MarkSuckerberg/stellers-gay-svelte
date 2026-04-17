import { GetPostMeta } from '$lib/blog';

const pages = GetPostMeta();

export async function load() {
	return { pages };
}
