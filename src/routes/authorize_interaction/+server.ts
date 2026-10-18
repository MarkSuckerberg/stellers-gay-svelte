import { AKKOMA_URL } from '$app/env/public';
import { redirect } from '@sveltejs/kit';

export async function GET({ url }) {
	return redirect(301, `${AKKOMA_URL}/ostatus_subscribe?acct=${url.searchParams.get('uri')}`);
}
