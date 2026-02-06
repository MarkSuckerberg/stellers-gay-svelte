import { PUBLIC_AKKOMA_URL, PUBLIC_AUTH_ISSUER_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';

export async function GET({ url, fetch, request }) {
	if (!url.search) {
		return json({
			subject: null,
			links: [
				{
					rel: 'http://openid.net/specs/connect/1.0/issuer',
					href: PUBLIC_AUTH_ISSUER_URL
				}
			]
		});
	}

	const result = await fetch(PUBLIC_AKKOMA_URL + '.well-known/webfinger' + url.search, {
		...request
	});

	if (!result.ok) {
		return result;
	}

	try {
		const data: { aliases: string[]; links: { rel: string; href: string }[]; subject: string } =
			await result.json();

		data.links.push({
			rel: 'http://openid.net/specs/connect/1.0/issuer',
			href: PUBLIC_AUTH_ISSUER_URL
		});

		return json(data);
	} catch {
		return await fetch(PUBLIC_AKKOMA_URL + '.well-known/webfinger' + url.search);
	}
}
