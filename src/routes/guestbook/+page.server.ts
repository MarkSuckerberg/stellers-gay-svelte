import { verifyCaptcha } from '$lib/captcha';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

interface GuestbookMessage {
	MessageId: number;
	MessageUser: string;
	MessageText: string;
	MessageTime: Date;
}

export const load: PageServerLoad = async ({ platform }) => {
	const messages = await platform?.env.DB.prepare(
		'SELECT * FROM guestbook ORDER BY MessageTime DESC LIMIT 50'
	).run<GuestbookMessage>();

	if (!messages?.success) {
		return { messages: messages?.results };
	}

	return { messages: messages.results };
};

export const actions = {
	default: async ({ request, platform }) => {
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

		if (name.length > 32 || message.length > 128) {
			return fail(400, 'Name or message too long');
		}

		const statement = platform?.env.DB.prepare(
			'INSERT INTO guestbook (MessageUser, MessageText, MessageTime) VALUES (?, ?, current_timestamp)'
		);

		const result = await statement?.bind(name, message).run();

		if (result?.success) {
			return;
		}

		return { error: result?.error };
	}
} satisfies Actions;
