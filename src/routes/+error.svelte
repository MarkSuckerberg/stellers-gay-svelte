<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Error {page.status} - Steller's Gay</title>
</svelte:head>

<h1>Error {page.status} - {page.error?.message}</h1>
<img src="https://http.cat/{page.status}" alt="Decorative cat representing error {page.status}" />
