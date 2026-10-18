import { error } from '@sveltejs/kit';
import { AKKOMA_URL, PDS_URL } from '$app/env/public';

export async function GET({ url, fetch, params, request }) {
	const requested = params.requested;

	if (requested === 'nodeinfo') {
		return await fetch(AKKOMA_URL + '.well-known/' + requested + url.search, {
			...request
		});
	}

	if (requested === 'atproto-did') {
		return await fetch(PDS_URL + '.well-known/' + requested + url.search, {
			...request
		});
	}

	return error(404);
}
