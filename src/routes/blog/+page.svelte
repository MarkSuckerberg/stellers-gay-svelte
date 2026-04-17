<script lang="ts">
	import { resolve } from '$app/paths';
	import BlogListing from '$lib/components/blog-listing.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Blog - Steller's Gay</title>
</svelte:head>

<h2>Blog pages</h2>

<hr class="win" />

<BlogListing pages={data.pages} />

<p>
	Subscribe to my <a href={resolve('/rss')} rel="alternate" type="application/rss+xml">RSS</a>/<a
		href={resolve('/atom')}
		rel="alternate"
		type="application/atom+xml">ATOM</a
	>/<a href={resolve('/feed.json')} rel="alternate" type="application/feed+json">JSON</a> Feed!
</p>
