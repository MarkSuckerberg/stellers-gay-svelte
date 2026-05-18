<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import BlogListing from '$lib/components/blog-listing.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Posts tagged {page.params.tag} - Steller's Gay</title>
</svelte:head>

<p>
	<a href={resolve('/blog')}>Back to all posts</a>
</p>
<p>
	<a href={resolve('/blog/tag')}>Back to all tags</a>
</p>

<h1>Tagged: {page.params.tag}</h1>

<hr class="win" />

<BlogListing pages={data.pages} />
