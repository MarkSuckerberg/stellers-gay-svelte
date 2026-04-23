<script lang="ts">
	import { page } from '$app/state';
	import BlogTags from '$lib/components/blog-tags.svelte';

	import '$lib/codeblocks.css';
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	let published = $derived(new Date(data.date));
	let updated = $derived(data.updated ? new Date(data.updated) : undefined);
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
	<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

	<title>{data.title} - Steller's Gay</title>
</svelte:head>

<article class="blog-article">
	<nav>
		<a href={resolve('/blog')}>Back to all posts</a>
	</nav>

	<h1>{data.title}</h1>

	<p style="font-style: italic;">
		<span>
			Published: <time datetime={published.toISOString()} title={published.toLocaleString()}
				>{published.toLocaleDateString()}</time
			>
		</span>

		{#if updated}
			<br />
			<span>
				Updated: <time datetime={updated.toISOString()} title={updated.toLocaleString()}
					>{updated.toLocaleDateString()}</time
				>
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
		<details>
			<summary>Send Feedback</summary>

			<p>
				Currently just set up to send a message directly to me, but I might make a full-fledged
				comments system eventually!
			</p>

			{#if form}
				<p><b>Error submitting:</b> {form}</p>
			{/if}

			<form
				action=""
				method="POST"
				style="display: grid; gap: 0.5em; grid-template-columns: min-content auto;"
				use:enhance
			>
				<label for="name">Name:</label> <input type="text" name="name" id="name" maxlength="32" />

				<label for="message">Message:</label>
				<textarea name="message" id="message" maxlength="256" style="resize: vertical;"></textarea>

				<div
					class="cf-turnstile"
					data-sitekey="0x4AAAAAABtXmAIQt-jTsWC6"
					style="grid-column-end: span 2;"
				></div>

				<button type="submit" style="grid-column-end: span 2;">Submit</button>
			</form>
		</details>
	</aside>
</article>

<style>
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
