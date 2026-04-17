<script lang="ts">
	import { resolve } from '$app/paths';

	let { tags }: { tags: string[] } = $props();
</script>

{#each tags as tag (tag)}
	<a href={resolve('/blog/tag/[tag]', { tag })}>{tag}</a>&nbsp;
{/each}
