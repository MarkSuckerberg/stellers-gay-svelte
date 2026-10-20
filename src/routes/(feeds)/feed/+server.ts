import { getFeed } from '#lib/feed.ts';

export const prerender = false;

export async function GET({ request }) {
	return getFeed(request);
}
