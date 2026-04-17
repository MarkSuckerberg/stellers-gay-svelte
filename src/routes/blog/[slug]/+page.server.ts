import { DISCORD_WEBHOOK } from '$env/static/private';
import { verifyCaptcha } from '$lib/captcha';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

const advertisingRegex = /http|www\./i;

export const actions = {
	default: async ({ request, fetch, url, params }) => {
		const captcha = await verifyCaptcha(request);

		if (!captcha.success) {
			return fail(429, 'Failed to validate captcha');
		}

		const data = await request.formData();
		const name = data.get('name')?.toString() || 'Anonymous';
		const message = data.get('message')?.toString();

		if (!message) {
			return fail(400, 'Empty message');
		}

		if (advertisingRegex.test(message) || advertisingRegex.test(name)) {
			return fail(400, 'Advertising is not allowed, please refrain from including URLs.');
		}

		if (name.length > 32 || message.length > 256) {
			return fail(400, 'Name or message too long');
		}

		const response = await fetch(DISCORD_WEBHOOK, {
			method: 'POST',
			body: JSON.stringify({
				username: "Steller's Gay",
				embeds: [
					{
						title: `New comment on "${params.slug}"`,
						description: `${name}: ${message}`,
						timestamp: new Date(Date.now()),
						url
					}
				]
			}),
			headers: { 'Content-Type': 'application/json' }
		});

		if (!response.ok) {
			return fail(response.status, response.statusText);
		}
	}
} satisfies Actions;
