import { GetPostMeta } from '#lib/blog.ts';

const pages = GetPostMeta();

export async function load() {
	return { pages };
}
