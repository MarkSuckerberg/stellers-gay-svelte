import { resolve } from '$app/paths';
import { DISCORD_WEBHOOK } from '$env/static/private';
import { verifyCaptcha } from '$lib/captcha';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const prerender = false;

interface GuestbookMessage {
	MessageId: number;
	MessageUser: string;
	MessageText: string;
	MessageTime: string;
}

export const load: PageServerLoad = async ({ platform }) => {
	const messages = await platform?.env.DB.prepare(
		'SELECT * FROM guestbook ORDER BY MessageTime DESC LIMIT 50'
	).run<GuestbookMessage>();

	if (!messages?.success) {
		return { messages: messages?.results || [] };
	}

	messages.results.forEach((message) => {
		//mistakes were made alright
		message.MessageTime = message.MessageTime + ' UTC';
	});

	return { messages: messages.results };
};

const advertisingRegex = /http|www\.|(?:[a-z0-9_-]+@[a-z0-9_-]+\.[a-z0-9_-]+)/i;

export const actions = {
	default: async ({ request, platform, fetch }) => {
		const captcha = await verifyCaptcha(request);

		if (!captcha.success) {
			return fail(429, 'Failed to validate captcha');
		}

		const rate_limit = await platform?.env.RATE_LIMITER.limit({ key: 'guestbook' });

		if (!rate_limit?.success) {
			return fail(429, 'Rate limit exceeded');
		}

		const data = await request.formData();
		const name = data.get('name')?.toString();
		const message = data.get('message')?.toString();

		if (!name || !message) {
			return fail(400, 'Invalid guestbook message');
		}

		if (advertisingRegex.test(message) || advertisingRegex.test(name)) {
			return fail(
				400,
				'Advertising is not allowed, please refrain from including URLs or email addresses.'
			);
		}

		if (name.length > 32 || message.length > 128) {
			return fail(400, 'Name or message too long');
		}

		const statement = platform?.env.DB.prepare(
			'INSERT INTO guestbook (MessageUser, MessageText, MessageTime) VALUES (?, ?, current_timestamp)'
		);

		const result = await statement?.bind(name, message).run();

		if (result?.success) {
			await fetch(DISCORD_WEBHOOK, {
				method: 'POST',
				body: JSON.stringify({
					username: "Steller's Gay",
					embeds: [
						{
							title: 'New guestbook entry!',
							description: `${name}: ${message}`,
							timestamp: new Date(Date.now()),
							url: 'https://stellers.gay' + resolve('/guestbook')
						}
					]
				}),
				headers: { 'Content-Type': 'application/json' }
			});

			return;
		}

		console.error(result?.error);

		return fail(500, 'Error saving guestbook entry');
	}
} satisfies Actions;
