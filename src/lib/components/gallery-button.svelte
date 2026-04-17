<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import type { Snippet } from 'svelte';
	import Window from './window.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { pushState } from '$app/navigation';
	import { resolve } from '$app/paths';

	let {
		src,
		original,
		title = (typeof original == 'string' ? original : original[0])
			.split('/')
			.at(-1)
			?.split('.')
			.at(0) || 'title',
		alt,
		children
	}: {
		src: Picture;
		original: string[] | string;
		title?: string;
		alt?: string | null;
		children?: Snippet;
	} = $props();

	let open = $state(false);

	onMount(() => {
		if (decodeURI(page.url.hash.substring(1)) == title) {
			open = true;
		}
	});
</script>

<Window
	{title}
	bind:open
	onOpen={() => {
		pushState(resolve(`/media#${title}`), page.state);
	}}
	onClose={() => {
		pushState(resolve(`/media`), page.state);
	}}
>
	<figure style="display: flex; align-items: center; flex-direction: column; padding: 0.5em;">
		{#if typeof original == 'string'}
			<a href={original} title="View Original" rel="external" target="_blank">
				<enhanced:img
					{src}
					{alt}
					style="max-height: 80dvh; max-width: 80dvw; object-fit: contain;"
					class="inset"
					loading="lazy"
				>
				</enhanced:img>
				<!--<img
					src={original}
					{alt}
					style="max-height: 80dvh; max-width: 80dvw; object-fit: contain;"
					class="inset"
					loading="lazy"
				/>-->
			</a>
		{:else}
			<div style="display: flex; max-width: 80dvw; gap: 1em" class="inset">
				{#each original as image (image)}
					<a href={image} title="View Original" rel="external" target="_blank">
						<!--<enhanced:img
                            {src}
                            {alt}
                            style="max-height: 80dvh; object-fit: contain;"
                            loading="lazy"
                        >
                        </enhanced:img>-->
						<img src={image} {alt} style="max-height: 80dvh; object-fit: contain" loading="lazy" />
					</a>
				{/each}
			</div>
		{/if}
		<figcaption style="padding: 1em;">
			{@render children?.()}
		</figcaption>
	</figure>
</Window>

<button {title} onclick={() => (open = true)} class="media-button">
	<enhanced:img {src} {alt} {title} sizes="250px" width="220" height="220" class="button-img">
	</enhanced:img>
</button>

<style>
	figure {
		padding: 0;
		margin: 0;
	}

	.media-button {
		padding: 0;
		flex: 1 1 0px;
	}

	.button-img {
		object-fit: cover;
	}

	.button-img:hover {
		object-fit: contain;
	}
</style>
