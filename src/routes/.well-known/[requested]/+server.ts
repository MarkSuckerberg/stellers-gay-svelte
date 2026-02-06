import { PUBLIC_AKKOMA_URL, PUBLIC_PDS_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export async function GET({ url, fetch, params, request }) {
	const requested = params.requested;

	if (requested === 'nodeinfo' || requested === 'host-meta') {
		return await fetch(PUBLIC_AKKOMA_URL + '.well-known/' + requested + url.search, {
			...request
		});
	}

	if (requested === 'atproto-did') {
		return await fetch(PUBLIC_PDS_URL + '.well-known/' + requested + url.search, {
			...request
		});
	}

	return error(404);
}
