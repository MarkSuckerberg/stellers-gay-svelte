<script lang="ts">
	import { page } from '$app/state';
	import BlogTags from '$lib/components/blog-tags.svelte';

	import '$lib/codeblocks.css';
	import { resolve } from '$app/paths';

	let { data } = $props();

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

	<title>{data.title} - Steller's Gay</title>
</svelte:head>

<article>
	<p>
		<a href={resolve('/blog')}>Back to all posts</a>
	</p>

	<h2>{data.title}</h2>

	<p style="font-style: italic;">
		<span>
			Published: <time datetime={published.toISOString()} title={published.toLocaleString()}
				>{published.toLocaleDateString()}</time
			>
		</span>

		{#if updated}
			<br />
			<span>
				Updated: <time datetime={updated.toISOString()}>{updated.toLocaleDateString()}</time>
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
</article>
