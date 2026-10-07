<script lang="ts">
	import { page } from '$app/state';
	import BlogTags from '$lib/components/blog-tags.svelte';

	import '$lib/codeblocks.css';
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';
	import RelativeTimestamp from '$lib/components/relative-timestamp.svelte';
	import { PUBLIC_TURNSTILE_SITEKEY } from '$env/static/public';
	import SimpleUserMarkdown from '$lib/components/simple-user-markdown.svelte';

	let { data, form } = $props();

	let published = $derived(new Date(data.date));
	let updated = $derived(data.updated ? new Date(data.updated) : undefined);

	let replyingTo: number | undefined = $state();
</script>

<svelte:head>
	<meta name="keywords" content={data.tags?.join(', ')} />

	<meta name="description" content={data.summary} />

	<meta property="og:title" content={data.title} />
	<meta property="og:description" content={data.summary} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://stellers.gay{page.url.pathname}" />
	<meta property="og:image" content={data.imageUrl} />
	<meta property="og:article:published_time" content={published.toISOString()} />
	<meta property="og:article:modified_time" content={updated?.toISOString()} />

	{#each data.tags as tag (tag)}
		<meta property="og:article:tag" content={tag} />
	{/each}

	{#if data.authors}
		{#each data.authors as author (author.name)}
			<meta name="author" content={author.name} />
			<meta property="og:article:author:username" content={author.name} />
		{/each}
	{:else}
		<meta name="author" content="Mark Suckerbird" />
		<meta property="og:article:author:username" content="Mark Suckerbird" />
	{/if}

	<link
		rel="alternate"
		type="application/json+oembed"
		href={resolve(`/blog/oembed?format=json&url=${page.url}`)}
		title="oEmbed"
	/>
	<link
		rel="alternate"
		type="text/markdown"
		href={resolve(`/blog/[slug]/raw.md`, { slug: page.params.slug || '' })}
		title="raw markdown"
	/>
	<link
		rel="alternate"
		type="text/html"
		href={resolve(`/blog/[slug]/simple`, { slug: page.params.slug || '' })}
		title="reader"
	/>
	<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

	<title>{data.title} - Steller's Gay</title>
</svelte:head>

<article class="blog-article">
	<nav>
		<a href={resolve('/blog')}>Back to all posts</a> |
		<a href={resolve(`/blog/[slug]/raw.md`, { slug: page.params.slug || '' })}>Raw markdown</a>
		|
		<a href={resolve(`/blog/[slug]/simple`, { slug: page.params.slug || '' })}>Simple HTML</a>
	</nav>

	<h1 id={data.title.toLowerCase().replaceAll(' ', '-')}>{data.title}</h1>

	<p style="font-style: italic;">
		<span>
			Published: <RelativeTimestamp datetime={published}></RelativeTimestamp>
		</span>

		{#if updated}
			<br />
			<span>
				Updated: <RelativeTimestamp datetime={updated}></RelativeTimestamp>
			</span>
		{/if}
	</p>

	{#if data.authors}
		<address>
			<span>
				Author{data.authors.length > 1 ? 's' : ''}:
				{#each data.authors as author, i (i)}
					<a href={author.url} rel="external">
						{#if author.avatar}
							<img src={author.url} alt={`Avatar of ${author.name}`} />
						{/if}
						{author.name || 'Unknown Author'}
					</a>
				{/each}
			</span>
		</address>
	{/if}

	{#if data.externalUrl}
		<br />
		<a href={data.externalUrl} rel="external">External Link</a>
	{/if}

	<data.Content />

	{#if data.tags}
		<p>
			Tags:
			<BlogTags tags={data.tags} />
		</p>
	{/if}

	<aside>
		<hr class="win" />

		<h2 id="comments">Comments</h2>

		<hr class="win" />

		<details open={!!replyingTo}>
			<summary>Post Comment</summary>

			<hr class="win" />

			{#if form}
				<p><b>Error submitting:</b> {form}</p>
			{/if}

			<form
				action=""
				method="POST"
				style="display: grid; gap: 0.5em; grid-template-columns: min-content auto;"
				use:enhance
			>
				{#if replyingTo}
					<label for="reply" style="align-self: center;">Replying:</label>
					<div style="display: flex">
						<a style="align-self: center;" href={`#comment-${replyingTo}`}>
							Comment #{replyingTo}
						</a>
						<input name="reply" id="reply" type="hidden" value={replyingTo} />
						<button type="button" onclick={() => (replyingTo = undefined)}>X</button>
					</div>
				{/if}

				<label for="name">Name:</label>
				<input type="text" name="name" id="name" maxlength="32" />

				<label for="message">Message:</label>
				<textarea name="message" id="message" maxlength="256" style="resize: vertical;"
				></textarea>

				<label
					for="private"
					style="align-self: center; text-decoration: dotted black 1px underline; cursor: help;"
					title="Send this comment to a webhook ONLY, don't post it on the site"
					>Private:
				</label>
				<div style="display: flex; gap: 0.5em">
					<input type="checkbox" name="private" id="private" />

					<button type="submit" style="flex: 1">Submit</button>
				</div>

				<div
					class="cf-turnstile"
					data-sitekey={PUBLIC_TURNSTILE_SITEKEY}
					style="grid-column-end: span 2;"
				></div>
			</form>
		</details>

		<hr class="win" />

		{#each data.comments as comment (comment.CommentId)}
			<article class="outset" id={`comment-${comment.CommentId}`}>
				<div
					style="padding: 0 1em;"
					style:border={page.url.hash == `#comment-${comment.CommentId}`
						? '2px black dotted'
						: '2px transparent solid'}
				>
					<div style="float: right; padding-top: 16px">
						<a href={`#comment-${comment.CommentId}`}>#{comment.CommentId}</a>
						<button
							type="button"
							onclick={() => {
								replyingTo = comment.CommentId;
							}}
						>
							Reply
						</button>
					</div>

					<h3 style="font-weight: normal; font-size: medium;">
						<span style="font-weight: bold">{comment.CommentUser}</span>,
						<RelativeTimestamp datetime={comment.CommentTime}></RelativeTimestamp>:
						{#if comment.CommentReply}
							<span style="font-style: italic;">
								(Replying to <a href={`#comment-${comment.CommentReply}`}>
									{data.comments.find(
										(otherComment) =>
											otherComment.CommentId == comment.CommentReply
									)?.CommentUser || 'comment'}
									#{comment.CommentReply}
								</a>)
							</span>
						{/if}
					</h3>
					<SimpleUserMarkdown message={comment.CommentText} />
				</div>
			</article>
		{/each}
	</aside>
</article>

<style>
	:global(.blog-article video),
	:global(.blog-article img) {
		max-width: 100%;
	}

	:global(.blog-article blockquote) {
		border: black 4px ridge;
		border-top: white 4px ridge;
		border-left: white 4px ridge;
		background-color: #c0c0c0;

		font-style: italic;

		margin: 0;
		padding: 0 0.5em;
	}
</style>
