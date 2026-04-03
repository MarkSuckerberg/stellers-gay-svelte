<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import { Color, Icon, Rank, type Card } from '$lib/solitaire';
	import type { Snippet } from 'svelte';

	let {
		card = $bindable(),
		disabled = false,
		onclick = $bindable(),
		children
	}: {
		card?: Card;
		disabled?: boolean | undefined;
		onclick?: MouseEventHandler<HTMLButtonElement>;
		children?: Snippet | undefined;
	} = $props();
</script>

{#if card}
	<button
		{onclick}
		style:background={Color(card.suit)}
		style:color={disabled ? 'gray' : 'white'}
		style:cursor={disabled ? 'default' : 'pointer'}
		class="card"
	>
		<div style="text-align: left;">{Icon(card.suit)}</div>
		{Rank[card.rank]}
		<div style="text-align: right;">{Icon(card.suit)}</div>
	</button>
{:else if children}
	<button
		{onclick}
		class="card"
		style="background-color: white;"
		style:color={disabled ? 'gray' : 'black'}
		style:cursor={disabled ? 'default' : 'pointer'}
	>
		{@render children()}
	</button>
{/if}

<style>
	.card {
		width: 100%;
		border: none;
		border-radius: 0.25rem;
		margin: 1px;
		padding: 0 4px;
	}
</style>
