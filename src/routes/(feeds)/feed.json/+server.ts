import { FeedType, getFeed } from '#lib/feed.ts';

export const prerender = true;

export async function GET({ request }) {
	return getFeed(request, FeedType.JSON);
}
