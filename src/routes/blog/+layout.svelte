<script>
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<link rel="alternate" href={resolve('/feed')} type="application/feed+json" title="RSS" />
</svelte:head>

<slot />
