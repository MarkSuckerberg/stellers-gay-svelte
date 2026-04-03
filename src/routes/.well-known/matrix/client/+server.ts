import { PUBLIC_MATRIX_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';

export async function GET() {
	return json(
		{
			'm.homeserver': { base_url: 'https://' + (PUBLIC_MATRIX_URL || 'matrix.stellers.gay') },
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
