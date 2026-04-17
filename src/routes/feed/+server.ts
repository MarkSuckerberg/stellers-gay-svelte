import { getFeed } from '$lib/feed.js';

export async function GET({ request }) {
	return getFeed(request);
}
