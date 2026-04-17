<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<title>Tag Listing - Steller's Gay</title>
</svelte:head>

<p>
	<a href={resolve('/blog')}>Back to all posts</a>
</p>

<h2>Tag listing</h2>

<hr class="win" />

<table>
	<thead>
		<tr>
			<th>Tag</th>
			<th>Post count</th>
		</tr>
	</thead>

	<tbody>
		{#each data.tags as [tag, count] (tag)}
			<tr>
				<td><a href={resolve('/blog/tag/[tag]', { tag })}>{tag}</a></td>
				<td style:text-align="right">{count}</td>
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
