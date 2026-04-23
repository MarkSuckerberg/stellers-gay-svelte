import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export async function GET() {
	return redirect(301, resolve('/about#projects'));
}
