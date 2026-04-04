import { TURNSTILE } from '$env/static/private';

interface TurnstileResponse {
	action: string;
	cdata: string;
	challenge_ts: string;
	'error-codes': number[];
	hostname: string;
	metadata: {
		has_pat: boolean;
		interactive: boolean;
	};
	success: boolean;
}

export async function verifyCaptcha(request: Request) {
	const code = (await request.clone().formData()).get('cf-turnstile-response')?.toString();
	const remoteip = request.headers.get('CF-Connecting-IP');

	if (!code) {
		return { success: false, 'error-codes': [500] };
	}

	const formData = new FormData();
	formData.set('secret', TURNSTILE);
	formData.set('response', code);
	if (remoteip) {
		formData.set('remoteip', remoteip);
	}
	const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		body: formData
	});

	const evaluation: TurnstileResponse = await response.json();

	return evaluation;
}
