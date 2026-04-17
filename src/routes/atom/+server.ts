import { FeedType, getFeed } from '$lib/feed';

export async function GET({ request }) {
	return getFeed(request, FeedType.ATOM);
}
