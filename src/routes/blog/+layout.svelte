<script>
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<link
		rel="alternate"
		href={resolve('/feed.json')}
		type="application/feed+json"
		title="JSON Feed"
	/>
	<link rel="alternate" href={resolve('/rss')} type="application/rss+xml" title="RSS Feed" />
	<link rel="alternate" href={resolve('/atom')} type="application/atom+xml" title="ATOM Feed" />
</svelte:head>

<slot />
