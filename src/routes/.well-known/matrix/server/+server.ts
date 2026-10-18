import { MATRIX_URL } from '$app/env/public';

export const prerender = true;

export async function GET() {
	return Response.json({ 'm.server': (MATRIX_URL || 'matrix.stellers.gay') + ':443' });
}
