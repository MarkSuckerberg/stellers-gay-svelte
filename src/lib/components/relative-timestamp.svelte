<script lang="ts">
	import { MONTH, relativeDate } from '$lib/time.js';

	let {
		datetime,
		title,
		style = 'cursor: help;',
		maxTime = MONTH
	}: {
		datetime: string | number | Date;
		title?: string;
		style?: string;
		maxTime?: number;
	} = $props();

	let dateValue = $derived(new Date(datetime));
	let since = $derived(Date.now() - dateValue.valueOf());

	let actualTitle = $derived(title || dateValue.toLocaleString());
</script>

{#if since > maxTime}
	<time datetime={dateValue.toISOString()} title={actualTitle} {style}>
		{relativeDate(dateValue, maxTime)}
	</time>
{:else}
	<time datetime={dateValue.toISOString()} title={actualTitle} {style}>
		{relativeDate(dateValue, maxTime)}
	</time>
{/if}
