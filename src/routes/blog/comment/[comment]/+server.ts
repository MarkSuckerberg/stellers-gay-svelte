import { error, redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import type { Comment } from '$lib/blog.js';

export async function GET({ platform, params }) {
	const commentNumber = Number.parseInt(params.comment);

	if (Number.isNaN(commentNumber)) {
		return error(404, 'Invalid comment number');
	}

	const comments = await platform?.env.DB.prepare(
		'SELECT * FROM comments WHERE CommentId = ? LIMIT 1'
	);

	const result = await comments.bind(commentNumber).run();

	if (!result.success) {
		return error(500, 'Error finding comment');
	}

	if (result.results.length < 1) {
		return error(404, 'Comment not found');
	}

	const comment = result.results[0] as Comment;

	return redirect(308, resolve(`/blog/${comment.PostSlug}#comment-${comment.CommentId}`));
}
