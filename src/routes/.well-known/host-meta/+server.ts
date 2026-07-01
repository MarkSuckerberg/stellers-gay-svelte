import { text } from '@sveltejs/kit';

export const prerender = true;

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
	<Link rel="urn:xmpp:alt-connections:xbosh"
		href="https://xmpp.stellers.gay/bosh/" />
	<Link rel="urn:xmpp:alt-connections:websocket"
		href="wss://xmpp.stellers.gay:443/ws/" />
	<Link type="application/xrd+xml"
		template="https://stellers.gay/.well-known/webfinger?resource={uri}" rel="lrdd" />
</XRD>`;

export async function GET() {
	return text(xml, {
		headers: {
			'Content-Type': 'application/xrd+xml',
			'Access-Control-Allow-Origin': '*'
		}
	});
}
