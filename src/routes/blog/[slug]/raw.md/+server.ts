export const prerender = true;

export async function GET({ params }) {
	const post = await import(`../../${params.slug}.md?raw`);

	return new Response(post.default, {
		status: 200,
		headers: {
			'Content-Type': 'text/markdown'
		}
	});
}
