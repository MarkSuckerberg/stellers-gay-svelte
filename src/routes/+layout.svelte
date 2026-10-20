<script lang="ts">
	import '../app.css';
	import jary from '#lib/assets/bluejarybeast.webp?w=564;236&format=avif;webp&as=picture';
	import construction from '#lib/assets/construction.webp';
	import mrk2 from '#lib/assets/mrk2.webp?h=512&w=512&fit=cover&format=png&as=img';
	import bg from '#lib/assets/win95setup-clear.webp';

	import quoteFile from '#lib/assets/quotes.json';
	const quotes = quoteFile.quotes;

	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { building } from '$app/env';
	import { goto } from '$app/navigation';

	let { children } = $props();

	let time: number | undefined = $state();

	let song: HTMLAudioElement | undefined = $state();
	let paused = $state(true);

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

	function exitButton() {
		if (confirm('Are you sure you want to exit?')) {
			close();
			let index;

			for (index = 0; index < quoteFile.exitText.length; index++) {
				const element = quoteFile.exitText[index];

				if (!confirm(element)) {
					return;
				}
			}

			while (++index && confirm(`You've confirmed this dialog box ${index} times.`)) {
				continue;
			}

			alert('FINALLY. thank goodness. Go do something productive now.');
		}
	}

	async function toggle() {
		if (!song) {
			return;
		}

		if (paused || song.ended) {
			await song.play();
		} else {
			song.pause();
		}
	}

	let songTime = $state('00:00/00:00');

	function getTime(seconds: number) {
		const min = Math.floor(seconds / 60)
			.toString()
			.padStart(2, '0');
		const sec = Math.floor(seconds % 60)
			.toString()
			.padStart(2, '0');

		return `${min}:${sec}`;
	}

	onMount(() => {
		if (!song) {
			return;
		}

		songTime = `00:00/${getTime(song.duration)}`;

		song.addEventListener('pause', () => {
			paused = true;
		});

		song.addEventListener('play', () => {
			paused = false;
		});

		song.addEventListener('ended', () => {
			paused = true;
		});

		song.addEventListener('timeupdate', () => {
			let target: HTMLAudioElement = song!;

			if (target.loop && target.currentTime > 71.5) {
				if (target['fastSeek']) {
					target.fastSeek(target.currentTime - 61.2);
				} else {
					target.currentTime -= 61.2;
				}
			}

			if (Number.isNaN(target.currentTime) || Number.isNaN(target.duration)) {
				return;
			}

			songTime = `${getTime(target.currentTime)}/${getTime(target.duration)}`;
		});
	});

	function onKeyDown(event: KeyboardEvent) {
		switch (event.key.toLowerCase()) {
			case 'h':
				goto(resolve('/'));
				break;
			case 'a':
				goto(resolve('/about'));
				break;
			case 'm':
				goto(resolve('/media'));
				break;
			case 'u':
				goto(resolve('/fun'));
				break;
			case 'b':
				goto(resolve('/blog'));
				break;
			case 'g':
				goto(resolve('/guestbook'));
				break;

			case 's':
				window.location.href = 'https://bsky.app/profile/did:plc:2p67fsbkpwet3rp5a33wgl5v';
				break;
			case 'd':
				window.location.href = 'https://discord.com/users/525509257102098442';
				break;
			case 'f':
				window.location.href = 'https://social.stellers.gay/';
				break;
			case 'i':
				window.location.href = 'https://github.com/marksuckerberg';
				break;
			case 'r':
				window.location.href = 'https://matrix.to/#/@mark:stellers.gay';
				break;
			case 't':
				window.location.href = 'https://tumblr.suckerberg.gay/';
				break;
			case 'x':
				window.location.href = 'xmpp:mark@stellers.gay';
				break;
			case 'e':
				window.location.href = 'mailto:mark@stellers.gay';
				break;
			case 'k':
				window.location.href = 'https://ko-fi.com/marksuckerberg';
				break;
			case 'l':
				window.location.href = 'https://auth.stellers.gay/';
				break;
		}
	}
</script>

<svelte:head>
	<link rel="preload" href={bg} as="image" />

	<meta property="og:image" content={'https://stellers.gay' + mrk2.src} />
	<meta property="og:image:height" content={mrk2.h.toString()} />
	<meta property="og:image:width" content={mrk2.w.toString()} />
	<meta property="og:image:type" content="image/png" />
	<meta
		property="og:image:alt"
		content="A portrait of an exceptionally fluffy and softly rendered anthropomorphic blue jay with their eyes happily shut."
	/>

	<link
		rel="alternate"
		href={resolve('feed.json')}
		type="application/feed+json"
		title="JSON Feed"
	/>
	<link rel="alternate" href={resolve('rss')} type="application/rss+xml" title="RSS Feed" />
	<link rel="alternate" href={resolve('atom')} type="application/atom+xml" title="ATOM Feed" />

	<link rel="canonical" href="https://stellers.gay{page.url.pathname}" />
</svelte:head>

<div class="outset fakewindow">
	<div
		style="background-color: #000080; grid-area: topbar; color: white; display: flex; flex-direction: row; font-weight: bolder; justify-content: space-between"
	>
		<p style="margin: 0 3px; padding: 0; font-weight: bold; align-content: center">Welcome!</p>

		<div>
			<button disabled style="width: 2.25em;">_</button>
			<button style="width: 2.25em;" onclick={() => exitButton()}>X</button>
		</div>
	</div>

	<div class="gridcontainer" style:image-rendering="auto">
		<header id="header">
			<h2 class="text-3xl font-bold" style="font-size: 2em">Steller's Gay!</h2>
		</header>

		<aside id="sidehead">
			<picture>
				{#each Object.entries(jary.sources) as [format, srcset] (srcset)}
					<source
						type="image/{format}"
						{srcset}
						sizes="(max-width: 600px) 564px, 236px"
					/>
				{/each}
				<img
					src={jary.img.src}
					sizes="(max-width: 600px) 564px, 236px"
					alt="A large raptorlike bluejay-patterned creature laying down, asleep."
					style="width: 100%; height: 100%; object-fit: contain;"
				/>
			</picture>
		</aside>

		<nav id="nav" class="navcontainer topcontainer">
			<a href={resolve('/')}><u>H</u>ome</a>
			<a href={resolve('/about')}><u>A</u>bout</a>
			<a href={resolve('/media')}><u>M</u>edia</a>
			<a href={resolve('/fun')}>F<u>u</u>n stuff</a>
		</nav>

		<nav id="sidebar" class="navcontainer">
			<a href={resolve('/blog')} title="See if I've remembered it exists!">
				My <u>B</u>log
			</a>

			<a href={resolve('/guestbook')} title="Sign my guestbook!">
				<u>G</u>uestbook
			</a>

			<hr class="win" />

			<a
				rel="me"
				href="https://bsky.app/profile/did:plc:2p67fsbkpwet3rp5a33wgl5v"
				title="I don't use this much!">My Blue<u>s</u>ky</a
			>
			<link rel="me" href="https://bsky.app/profile/stellers.gay" />
			<a
				rel="me nofollow"
				href="https://discord.com/users/525509257102098442"
				title="The IM that we all use.">My <u>D</u>iscord</a
			>
			<a rel="me" href="https://social.stellers.gay/" title="I just think it's neat to have!"
				>My <u>F</u>ediverse Instance</a
			>
			<a rel="me" href="https://github.com/marksuckerberg" title="My favourite social media."
				>My G<u>i</u>thub</a
			>
			<a
				rel="me nofollow"
				href="https://matrix.to/#/@mark:stellers.gay"
				title="The IM I wish we all used.">My Mat<u>r</u>ix account</a
			>
			<a
				rel="me"
				href="https://tumblr.suckerberg.gay"
				title="I'm occasionally active here, too.">My <u>T</u>umblog</a
			>
			<a
				rel="me"
				href="xmpp:mark@stellers.gay"
				title="Another IM service that I am indifferent about.">My <u>X</u>MPP account</a
			>

			<hr class="win" />

			<a
				href="https://hits.stellers.gay/"
				class="black-background"
				title="Watch the hits roll in!"
			>
				<img
					src="https://hits.stellers.gay/unique/ticker.webp"
					class="hit-counter"
					alt="A hitcounter in the style of a seven-segment display."
				/>
			</a>

			<a href="mailto:mark@stellers.gay" title="No spam, plz!"><u>E</u>-mail me!</a>

			<a
				target="_blank"
				rel="me"
				href="https://ko-fi.com/marksuckerberg"
				title="EXTREMELY appreciated!">Buy me a <u>K</u>o-Fi!</a
			>

			<hr class="win" />

			<a
				target="_blank"
				href="https://auth.stellers.gay"
				title="Log-in to my suite of services."
				>Steller's Gay <u>L</u>ogin
			</a>

			<label style="color: #7f7f7f; text-shadow: 1px 1px 0 white;" class="small-inset">
				Enable keyboard shortcuts
				<input
					type="checkbox"
					onchange={(ev) => {
						if (ev.currentTarget.checked) window.onkeydown = onKeyDown;
						else window.onkeydown = null;
					}}
				/>
			</label>
		</nav>

		<main id="content" class="inset">
			<aside
				id="construction"
				class="bg-orange-400"
				style="background-color: #f70; margin: 1em 0"
			>
				<img
					src={construction}
					class="inline-block"
					alt="An animated diamond-shaped construction sign with a stick figure worker shoveling dirt."
				/>
				Warning! This page is under construction. Be sure to check back soon!
			</aside>

			{@render children()}
		</main>
	</div>

	<footer
		id="footer"
		style="display: flex; width: 100%; gap: 2px; height: 2em; align-items: center;"
	>
		<button
			style="font-weight: bolder; margin: 0;"
			style:color={paused ? 'green' : 'red'}
			onclick={() => toggle()}
		>
			{paused ? '⏵︎' : '⏸︎'}
		</button>

		<!-- svelte-ignore a11y_distracting_elements -->
		<marquee width="76" scrollamount="3" class="small-inset" style="padding: 2px;">
			<audio loop volume="0.5" bind:this={song} preload="metadata">
				<source src="https://f.stellers.gay/u/happy-chiptune.m4a" type="audio/mp4" />
				<source src="https://f.stellers.gay/u/happy-chiptune.ogg" type="audio/ogg" />
				<source src="https://f.stellers.gay/u/happy-chiptune.webm" type="audio/webm" />
				UNABLE TO LOAD -
			</audio>
			Happy Chiptune - Soniau - {songTime}
		</marquee>

		<div
			class="small-inset"
			style="flex: 1; padding: 2px; text-overflow: ellipsis; overflow: hidden; text-wrap-mode: nowrap;"
		>
			{#if building}
				&nbsp;<noscript>No javascript, no funny quote!</noscript>
			{:else}
				{quotes[Math.floor(Math.random() * quotes.length)]}
			{/if}
		</div>

		<div class="small-inset" style="padding: 2px; width: 6em">
			{#if time && !building}
				{new Date(time).toLocaleTimeString()}
			{:else}
				&nbsp;<noscript>Time for JS.</noscript>
			{/if}
		</div>
	</footer>
</div>

<style>
	.fakewindow {
		width: min(1024px, calc(100vw - 8px));
		min-width: min(1024px, calc(100vw - 8px));
		max-width: calc(100vw - 8px);
		margin: 1em auto 0 auto;

		overflow: auto;
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
		display: grid;
		grid-template-columns: subgrid;
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

	@media only screen and (max-width: 600px) {
		.fakewindow {
			resize: none;
			margin: 0;
		}

		.gridcontainer {
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas:
				'header'
				'sidehead'
				'nav'
				'content'
				'sidebar';
		}
		.topcontainer {
			flex-direction: column;
		}

		.gridcontainer #content {
			max-height: unset;
		}
	}
</style>
