import { json } from '@sveltejs/kit';

export const prerender = true;

export async function GET() {
	const data = {
		links: [
			{
				rel: 'urn:xmpp:alt-connections:xbosh',
				href: 'https://xmpp.stellers.gay/bosh/'
			},
			{
				rel: 'urn:xmpp:alt-connections:websocket',
				href: 'wss://xmpp.stellers.gay:443/ws/'
			},
			{
				rel: 'lrdd',
				type: 'application/xrd+xml',
				template: 'https://stellers.gay/.well-known/webfinger?resource={uri}'
			}
		]
	};

	return json(data, {
		headers: {
			'Content-Type': 'application/xrd+json',
			'Access-Control-Allow-Origin': '*'
		}
	});
}
