<script lang="ts">
	import { resolve } from '$app/paths';
	import type { BlogMeta } from '$lib/blog';
	import BlogTags from './blog-tags.svelte';

	let { pages }: { pages: [string, BlogMeta][] } = $props();
</script>

<table style="width: 100%">
	<thead>
		<tr>
			<th>Title</th>
			<th>Date</th>
			<th>Author</th>
			<th><a href={resolve('/blog/tag')}>Tags</a></th>
		</tr>
	</thead>
	<tbody>
		{#each pages as [slug, meta] (meta.title)}
			<tr>
				<td>
					<a href={resolve('/blog/[slug]', { slug })} title={meta.summary || undefined}>
						{meta.title}
					</a>
				</td>
				<td>
					{#if meta.updated}
						<time
							datetime={meta.date}
							style="text-decoration: dotted black 1px underline; cursor: help;"
							title={`Updated ${new Date(meta.updated).toLocaleDateString()}`}
						>
							{new Date(meta.date).toLocaleDateString()}
						</time>
					{:else}
						<time datetime={meta.date}>{new Date(meta.date).toLocaleDateString()}</time>
					{/if}
				</td>
				<td>
					{#if meta.authors}
						{#each meta.authors as author (author.name)}
							<a href={author.url} rel="external">{author.name}</a>&nbsp;
						{/each}
					{:else}
						Mark Suckerbird
					{/if}
				</td>
				<td>
					{#if meta.tags}
						<BlogTags tags={meta.tags} />
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
	}

	td,
	th {
		padding-right: 0.5em;
	}

	tr:nth-child(even) {
		background-color: #c0c0c0;
	}
</style>
