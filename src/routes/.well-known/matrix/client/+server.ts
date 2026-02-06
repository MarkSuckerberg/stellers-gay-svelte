import { PUBLIC_MATRIX_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';

export async function GET() {
	return json({
		'm.homeserver': { base_url: 'https://' + (PUBLIC_MATRIX_URL || 'matrix.stellers.gay') }
	});
}
