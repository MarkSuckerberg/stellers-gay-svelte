<script lang="ts">
	import '../app.css';
	import jary from '$lib/assets/bluejarybeast.webp?enhanced';
	import construction from '$lib/assets/construction.webp';

	import quoteFile from '$lib/assets/quotes.json';
	const quotes = quoteFile.quotes;

	let { children } = $props();
</script>

<div class="gridcontainer" style:image-rendering="auto">
	<header id="header">
		<h1 class="text-3xl font-bold">Steller's Gay</h1>
	</header>

	<aside id="sidehead">
		<enhanced:img
			src={jary}
			alt="A large raptorlike bluejay-patterned creature laying down, asleep."
		/>
	</aside>

	<nav id="nav" class="navcontainer topcontainer">
		<a href="/" accesskey="h"><u>H</u>ome</a>
		<a href="/projects" accesskey="p"><u>P</u>rojects</a>
		<a href="/media" accesskey="m"><u>M</u>edia</a>
	</nav>

	<nav id="sidebar" class="navcontainer">
		<a
			target="_blank"
			rel="me"
			href="https://bsky.app/profile/marksuckerberg.bsky.social"
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
			rel="me"
			href="https://social.stellers.gay/"
			accesskey="f"
			title="I just think it's neat to have!">My <u>F</u>ediverse Instance</a
		>
		<a
			target="_blank"
			rel="me"
			href="https://github.com/marksuckerberg"
			accesskey="g"
			title="My favourite social media.">My <u>G</u>ithub</a
		>
		<a
			target="_blank"
			rel="me"
			href="https://tumblr.suckerberg.gay"
			accesskey="t"
			title="My most-used platform.">My <u>T</u>umblog</a
		>

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

	<main id="content">
		<p id="construction" class="bg-orange-400">
			<img
				src={construction}
				class="inline-block"
				alt="An animated diamond-shaped construction sign with a stick figure worker shoveling dirt."
			/>
			Warning! This page is under construction. Be sure to check back soon!
		</p>

		{@render children()}
	</main>

	<footer id="footer">
		<noscript>No javascript, no funny quote!</noscript>
		{quotes[Math.floor(Math.random() * quotes.length)]}
	</footer>
</div>

<style>
	.gridcontainer {
		display: grid;
		background-color: #c0c0c0;
		padding: 10px;

		max-width: 1000px;
		margin: 0 auto;

		gap: 10px;

		grid-template-columns: repeat(4, 1fr);
		grid-template-areas:
			'header header header sidehead'
			'nav nav nav nav'
			'sidebar content content content'
			'footer footer footer footer';
	}

	.gridcontainer > * {
		text-align: center;
		border: black 4px ridge;
		border-top: white 4px ridge;
		border-left: white 4px ridge;
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
		border: none;
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
	}

	.gridcontainer #content img {
		max-width: 100%;
		image-rendering: auto;
	}

	.gridcontainer #footer {
		grid-area: footer;
	}
</style>
