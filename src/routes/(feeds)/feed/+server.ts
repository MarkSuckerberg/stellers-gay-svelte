import { getFeed } from '$lib/feed.js';

export const prerender = false;

export async function GET({ request }) {
	return getFeed(request);
}
