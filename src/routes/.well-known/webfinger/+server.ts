import { AKKOMA_URL, AUTH_ISSUER_URL } from '$app/env/public';

export async function GET({ url, fetch, request }) {
	const resource = url.searchParams.get('resource');

	if (!resource) {
		return Response.json({
			subject: null,
			links: [
				{
					rel: 'http://openid.net/specs/connect/1.0/issuer',
					href: AUTH_ISSUER_URL
				}
			]
		});
	}

	const result = await fetch(AKKOMA_URL + '.well-known/webfinger' + url.search, {
		...request
	});

	if (!result.ok) {
		return result;
	}

	try {
		const data: { aliases: string[]; links: { rel: string; href: string }[]; subject: string } =
			await result.json();

		if (resource)
			data.links.push({
				rel: 'http://openid.net/specs/connect/1.0/issuer',
				href: AUTH_ISSUER_URL
			});

		const headers = new Headers(result.headers);

		headers.delete('Content-Encoding');
		headers.delete('Content-Length');

		return Response.json(data, { headers });
	} catch {
		return await fetch(AKKOMA_URL + '.well-known/webfinger' + url.search);
	}
}
