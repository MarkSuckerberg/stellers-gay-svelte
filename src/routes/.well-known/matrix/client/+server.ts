import { MATRIX_URL } from '$app/env/public';

export const prerender = true;

export async function GET() {
	return Response.json(
		{
			'm.homeserver': { base_url: 'https://' + (MATRIX_URL || 'matrix.stellers.gay') },
			'org.matrix.msc2965.authentication': {
				issuer: 'https://auth.stellers.gay/application/o/matrix-server/',
				account: 'https://auth.stellers.gay/if/user/'
			},
			'org.matrix.msc4143.rtc_foci': [
				{
					type: 'livekit',
					livekit_service_url: 'https://matrixrtc.stellers.gay/livekit/jwt'
				}
			]
		},
		{
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		}
	);
}
