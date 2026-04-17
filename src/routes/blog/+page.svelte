<script lang="ts">
	import BlogListing from '$lib/components/blog-listing.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Blog - Steller's Gay</title>
</svelte:head>

<h2>Blog pages</h2>

<hr class="win" />

<BlogListing pages={data.pages} />
