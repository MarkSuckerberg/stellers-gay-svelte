import { getFeed } from '$lib/feed.js';

export const prerender = true;

export async function GET({ request }) {
	return getFeed(request);
}
