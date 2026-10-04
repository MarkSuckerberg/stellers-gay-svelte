import { DISCORD_WEBHOOK } from '$env/static/private';
import { verifyCaptcha } from '$lib/captcha.server';
import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Comment } from '$lib/blog';

export const prerender = false;

export const load: PageServerLoad = async ({ params, platform }) => {
	try {
		const comments = await platform?.env.DB.prepare(
			'SELECT * FROM comments WHERE PostSlug = ? ORDER BY CommentTime DESC LIMIT 50'
		)
			.bind(params.slug)
			.run<Comment>();

		if (!comments?.success) {
			return { comments: (comments?.results || []) as Comment[] };
		}

		comments.results.forEach((comment: Comment) => {
			//mistakes were made alright
			comment.CommentTime = comment.CommentTime + ' UTC';
		});

		return { comments: comments.results as Comment[] };
	} catch {
		error(404);
	}
};

const advertisingRegex = /http|www\./i;

export const actions = {
	default: async ({ request, fetch, url, params, platform }) => {
		const captcha = await verifyCaptcha(request);
		url.hash = '';

		if (!captcha.success) {
			return fail(429, 'Failed to validate captcha');
		}

		const data = await request.formData();
		const name = data.get('name')?.toString() || 'Anonymous';
		const message = data.get('message')?.toString();

		if (!message) {
			return fail(400, 'Empty message');
		}

		if (!params.slug) {
			return fail(404, 'Invalid blog post');
		}

		if (advertisingRegex.test(message) || advertisingRegex.test(name)) {
			return fail(400, 'Advertising is not allowed, please refrain from including URLs.');
		}

		if (name.length > 32 || message.length > 256) {
			return fail(400, 'Name or message too long');
		}

		const replyTo = data.get('reply')?.toString();
		const replyToNum = replyTo ? Number.parseInt(replyTo) : null;

		if (replyToNum) {
			if (Number.isNaN(replyToNum)) {
				return fail(400, 'Specified reply comment is invalid');
			}

			const checkValidReplyStatement = platform?.env.DB.prepare(
				'SELECT * FROM comments WHERE CommentId = ? AND PostSlug = ?'
			);

			const isValid = await checkValidReplyStatement?.bind(replyToNum, params.slug).run();

			if (!isValid?.success || isValid.results.length < 1) {
				return fail(400, 'Specified reply comment does not exist or is invalid');
			}
		}

		// Don't save it to DB if private
		if (!data.get('private')) {
			const statement = platform?.env.DB.prepare(
				'INSERT INTO comments (PostSlug, CommentUser, CommentText, CommentReply, CommentTime) VALUES (?, ?, ?, ?, current_timestamp)'
			);

			const result = await statement?.bind(params.slug, name, message, replyToNum).run();

			if (result?.success) {
				url.hash = `comment-${result.meta.last_row_id}`;
			} else {
				console.error(result?.error);
				return fail(500, 'Unable to save comment');
			}
		}

		const response = await fetch(DISCORD_WEBHOOK, {
			method: 'POST',
			body: JSON.stringify({
				username: "Steller's Gay",
				embeds: [
					{
						title: `New comment on "${params.slug}"`,
						description: `${name}${replyTo ? ` (replying to ${replyToNum})` : ''}: ${message}`,
						timestamp: new Date(Date.now()),
						url
					}
				]
			}),
			headers: { 'Content-Type': 'application/json' }
		});

		if (!response.ok) {
			console.error(await response.text());
			return fail(response.status, response.statusText);
		}

		return redirect(303, url);
	}
} satisfies Actions;
