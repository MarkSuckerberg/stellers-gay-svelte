<script lang="ts">
	import type { Snippet } from 'svelte';
	import Window from './window.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { Picture } from '@sveltejs/enhanced-img';

	let {
		src,
		original,
		title,
		alt,
		children
	}: {
		src: {
			src: string;
			srcset?: string;
		};
		original: Picture[] | Picture;
		title: string;
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
		goto(resolve(`/media#${title}`));
	}}
	onClose={() => {
		goto(resolve(`/media`));
	}}
>
	<figure
		style="display: flex; align-items: center; flex-direction: column; padding: 0.5em; overflow: scroll;"
	>
		{#if !Array.isArray(original)}
			<div>
				<a href={original.img.src} title="View Original" rel="external" target="_blank">
					<picture>
						{#each Object.entries(original.sources) as [format, srcset] (srcset)}
							<source {srcset} type="image/{format}" />
						{/each}
						<img
							src={original.img.src}
							{alt}
							class="inset"
							loading="lazy"
							style="max-height: 80dvh; max-width: 80dvw; object-fit: contain;"
						/>
					</picture>
				</a>

				<menu
					style="list-style: none; display: flex; flex-direction: row; text-align: center;"
				>
					<li style="flex: 1;">
						<a
							href={original.img.src}
							rel="external"
							type="image/png"
							download="{title.replace(' ', '_').toLowerCase()}.png">PNG</a
						>
					</li>
					{#each Object.entries(original.sources) as [format, url] (url)}
						<li style="flex: 1;">
							<a
								href={url.split(' ')[0]}
								rel="external"
								type="image/{format}"
								download="{title.replace(' ', '_').toLowerCase()}.{format}"
								>{format.toUpperCase()}</a
							>
						</li>
					{/each}
				</menu>
			</div>
		{:else}
			<div style="display: flex; max-width: 80dvw; gap: 1em">
				{#each original as image, idx (image)}
					<div>
						<a
							href={image.img.src}
							title="View Original"
							rel="external"
							target="_blank"
						>
							<picture>
								{#each Object.entries(image.sources) as [format, srcset] (srcset)}
									<source {srcset} type="image/{format}" />
								{/each}
								<img
									src={image.img.src}
									{alt}
									class="inset"
									loading="lazy"
									style="max-height: 80dvh; object-fit: contain;"
								/>
							</picture>
						</a>
						<menu
							style="list-style: none; display: flex; flex-direction: row; text-align: center;"
						>
							<li style="flex: 1;">
								<a
									href={image.img.src}
									rel="external"
									type="image/png"
									download="{title.replace(' ', '_').toLowerCase()}_{idx + 1}.png"
									>Download PNG</a
								>
							</li>
							{#each Object.entries(image.sources) as [format, url] (url)}
								<li style="flex: 1;">
									<a
										href={url.split(' ')[0]}
										rel="external"
										type="image/{format}"
										download="{title.replace(' ', '_').toLowerCase()}_{idx +
											1}.{format}">Download {format.toUpperCase()}</a
									>
								</li>
							{/each}
						</menu>
					</div>
				{/each}
			</div>
		{/if}
		<figcaption style="padding: 1em;">
			{@render children?.()}
		</figcaption>
	</figure>
</Window>

<button {title} onclick={() => (open = true)} class="media-button">
	<img
		{alt}
		src={src.src}
		srcset={src.srcset}
		style="height: 220px; width: 220px"
		class="button-img"
	/>
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
