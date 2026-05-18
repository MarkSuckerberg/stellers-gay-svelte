import { PUBLIC_AKKOMA_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export async function GET({ url }) {
	return redirect(
		301,
		`${PUBLIC_AKKOMA_URL}/ostatus_subscribe?acct=${url.searchParams.get('uri')}`
	);
}
