<script lang="ts">
	import { relativeDate } from '$lib/time.js';

	let {
		datetime,
		title,
		style = 'cursor: help;'
	}: { datetime: string | number | Date; title?: string; style?: string } = $props();

	let dateValue = $derived(new Date(datetime));
	let actualTitle = $derived(title || dateValue.toLocaleString());
</script>

{#if dateValue}
	<time datetime={dateValue.toISOString()} title={actualTitle} {style}>
		{relativeDate(dateValue)}
	</time>
{/if}
