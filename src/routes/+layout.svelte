<script lang="ts">
	import '../app.css';
	import jary from '$lib/assets/bluejarybeast.webp?h=100&?enhanced';
	import construction from '$lib/assets/construction.webp';
	import mrk2 from '$lib/assets/mrk2.webp?h=512&w=512&fit=cover&as=picture&format=png&?enhanced';
	import bg from '$lib/assets/win95setup.webp';

	import quoteFile from '$lib/assets/quotes.json';
	const quotes = quoteFile.quotes;

	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	let { children } = $props();

	let time: number | undefined = $state();

	onMount(() => {
		time = Date.now();

		setTimeout(
			() =>
				setInterval(() => {
					time = Date.now();
				}, 1000),
			1000 - (Date.now() % 1000)
		);
	});
</script>

<svelte:head>
	<link rel="preload" href={bg} as="image" />

	<meta property="og:image" content={mrk2.img.src} />
	<meta property="og:image:height" content={mrk2.img.h.toString()} />
	<meta property="og:image:width" content={mrk2.img.w.toString()} />
	<meta property="og:image:type" content="image/png" />
	<meta
		property="og:image:alt"
		content="A portrait of an exceptionally fluffy and softly rendered anthropomorphic blue jay with their eyes happily shut."
	/>

	<link rel="canonical" href="https://stellers.gay{page.route.id}" />
</svelte:head>

<div class="outset fakewindow">
	<div
		style="background-color: #000080; grid-area: topbar; color: white; display: flex; flex-direction: row; font-weight: bolder; justify-content: space-between"
	>
		<p style="margin: 0 3px; padding: 0; font-weight: bold; align-content: center">Welcome!</p>

		<div>
			<button disabled style="width: 2.25em;">_</button>
			<button
				style="width: 2.25em;"
				onclick={() => {
					if (confirm('Are you sure you want to exit?')) {
						close();
						if (confirm('Really really sure?')) {
							alert(
								'Okay then, close the tab or something, jeez. Javascript nor HTML can actually close normally opened windows.'
							);
						}
					}
				}}>X</button
			>
		</div>
	</div>

	<div class="gridcontainer" style:image-rendering="auto">
		<header id="header">
			<h1 class="text-3xl font-bold">Steller's Gay!</h1>
		</header>

		<aside id="sidehead">
			<enhanced:img
				src={jary}
				alt="A large raptorlike bluejay-patterned creature laying down, asleep."
				style="width: 100%; height: 100%; object-fit: contain;"
			/>
		</aside>

		<nav id="nav" class="navcontainer topcontainer">
			<a href={resolve('/')} accesskey="h"><u>H</u>ome</a>
			<a href={resolve('/projects')} accesskey="p"><u>P</u>rojects</a>
			<a href={resolve('/media')} accesskey="m"><u>M</u>edia</a>
			<a href={resolve('/fun')} accesskey="u">F<u>u</u>n stuff</a>
		</nav>

		<nav id="sidebar" class="navcontainer">
			<a
				target="_blank"
				rel="me"
				href="https://bsky.app/profile/stellers.gay"
				accesskey="b"
				title="I don't use this much!">My <u>B</u>luesky</a
			>
			<a
				target="_blank"
				rel="me nofollow"
				href="https://discord.com/users/525509257102098442"
				accesskey="d">My <u>D</u>iscord</a
			>
			<a
				target="_blank"
				rel="me nofollow"
				href="https://matrix.to/#/@mark:stellers.gay"
				accesskey="r">My Mat<u>r</u>ix account</a
			>
			<a
				target="_blank"
				rel="me"
				href="https://social.stellers.gay/"
				accesskey="f"
				title="I just think it's neat to have!">My <u>F</u>ediverse Instance</a
			>
			<a
				target="_blank"
				rel="me"
				href="https://github.com/marksuckerberg"
				accesskey="i"
				title="My favourite social media.">My G<u>i</u>thub</a
			>
			<a
				target="_blank"
				rel="me"
				href="https://tumblr.suckerberg.gay"
				accesskey="t"
				title="My most-used platform.">My <u>T</u>umblog</a
			>

			<hr class="win" />

			<a href={resolve('/guestbook')} accesskey="g" title="Sign my guestbook!">
				<b>(New!)</b> <u>G</u>uestbook
			</a>
			<a
				target="_blank"
				href="https://hits.stellers.gay/"
				class="black-background"
				title="Watch the hits roll in!"
				><img
					src="https://hits.stellers.gay/unique/ticker.webp"
					class="hit-counter"
					alt="A hitcounter in the style of a seven-segment display."
				/>
			</a>

			<a href="mailto:mark@stellers.gay" accesskey="e" title="No spam, plz!"><u>E</u>-mail me!</a>
			<a
				target="_blank"
				rel="me"
				href="https://ko-fi.com/marksuckerberg"
				accesskey="k"
				title="EXTREMELY appreciated!">Buy me a <u>K</u>o-Fi!</a
			>
		</nav>

		<main id="content" class="inset">
			<p id="construction" class="bg-orange-400" style="background-color: #f70;">
				<img
					src={construction}
					class="inline-block"
					alt="An animated diamond-shaped construction sign with a stick figure worker shoveling dirt."
				/>
				Warning! This page is under construction. Be sure to check back soon!
			</p>

			{@render children()}
		</main>
	</div>

	<footer
		id="footer"
		style="display: flex; width: 100%; gap: 2px; height: 2em; align-items: center;"
	>
		<div class="small-inset" style="flex: 1; padding: 2px;">
			{quotes[Math.floor(Math.random() * quotes.length)]}
		</div>

		<noscript class="small-inset" style="padding: 2px; width: 8em">Time to get Javascript.</noscript
		>

		{#if time}
			<div class="small-inset" style="padding: 2px; width: 8em">
				{new Date(time).toLocaleTimeString()}
			</div>
		{/if}
	</footer>
</div>

<style>
	.fakewindow {
		width: min(1024px, 100vw);
		min-width: min(1024px, 100vw);
		max-width: 100%;
		margin: 0 auto;

		overflow: scroll;
		resize: both;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.gridcontainer {
		display: grid;
		background-color: #c0c0c0;
		padding: 10px;

		flex: 1;

		gap: 10px;

		grid-template-columns: repeat(4, 1fr);
		grid-template-areas:
			'header header header sidehead'
			'nav nav nav nav'
			'sidebar content content content';
	}

	.gridcontainer > * {
		text-align: center;
	}

	.gridcontainer #header {
		grid-area: header;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.gridcontainer #sidehead {
		grid-area: sidehead;
		border: white 4px groove;
		border-top: black 4px groove;
		border-left: black 4px groove;
		background-color: #b0b0b0;
	}

	.gridcontainer #nav {
		grid-area: nav;
	}

	.navcontainer {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.navcontainer a {
		border: black 4px ridge;
		border-top: white 4px ridge;
		border-left: white 4px ridge;
		line-height: 200%;
		text-decoration: none;
		color: unset;
	}

	.navcontainer a:active {
		border: white 4px groove;
		border-top: black 4px groove;
		border-left: black 4px groove;
		background-color: #b0b0b0;
		text-decoration: none;
	}

	.topcontainer {
		flex-direction: row;
		justify-content: space-around;
		height: min-content;
	}

	.topcontainer a {
		flex-grow: 1;
	}

	.gridcontainer #sidebar {
		grid-area: sidebar;
	}

	.gridcontainer #content {
		grid-area: content;
		text-align: left;
		padding: 5px;
		overflow-y: auto;
		max-height: 70vh;
	}

	.gridcontainer #content img {
		max-width: 100%;
		image-rendering: auto;
	}

	footer {
		grid-area: footer;
		text-align: center;
	}

	.black-background {
		background-color: black;
		height: 32px;
	}
</style>
