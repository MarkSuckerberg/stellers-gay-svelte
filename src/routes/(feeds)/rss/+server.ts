import { FeedType, getFeed } from '$lib/feed';

export const prerender = true;

export async function GET({ request }) {
	return getFeed(request, FeedType.RSS);
}
