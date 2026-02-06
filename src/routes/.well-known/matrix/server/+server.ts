import { PUBLIC_MATRIX_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';

export async function GET() {
	return json({ 'm.server': (PUBLIC_MATRIX_URL || 'matrix.stellers.gay') + ':443' });
}
