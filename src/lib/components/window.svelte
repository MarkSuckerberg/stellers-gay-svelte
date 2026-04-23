<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	let {
		title,
		children,
		open = $bindable(false),
		onOpen,
		onClose
	}: {
		title: string;
		children: Snippet;
		open: boolean;
		onOpen?: () => void;
		onClose?: () => void;
	} = $props();

	let dialog = $state<HTMLDialogElement>();

	onMount(() => {
		if (open) {
			dialog?.showModal();
		}
	});

	$effect(() => {
		if (open) {
			dialog?.showModal();
			onOpen?.();
		}
	});
</script>

<dialog
	class="window"
	bind:this={dialog}
	onclose={() => (open = false)}
	onclick={(e) => {
		if (e.target === dialog) {
			dialog.close();
			onClose?.();
		}
	}}
>
	<nav
		style="background-color: #000080; display: flex; justify-content: space-between; color: white;"
	>
		<h3 style="margin: 0 3px; padding: 0; font-weight: bold; align-content: center">{title}</h3>
		<button
			onclick={() => {
				dialog?.close();
				onClose?.();
			}}>X</button
		>
	</nav>

	{@render children()}
</dialog>

<style>
	.window {
		background-color: #c0c0c0;
		margin: auto;
		padding: 0;

		border: 2px outset black;

		border: black 4px ridge;
		border-top: white 4px ridge;
		border-left: white 4px ridge;
		text-decoration: none;
		color: unset;

		max-width: 100dvw;
		max-height: 100dvh;
	}

	button {
		border: black 4px ridge;
		border-top: white 4px ridge;
		border-left: white 4px ridge;
		text-decoration: none;
		background-color: #c0c0c0;
		color: black;
		margin: 3px;
		font-weight: bolder;
	}

	button:active {
		border: white 4px groove;
		border-top: black 4px groove;
		border-left: black 4px groove;
		background-color: #b0b0b0;
		text-decoration: none;
	}
</style>
