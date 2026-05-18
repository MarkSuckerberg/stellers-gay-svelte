<script>
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Fun Stuff - Steller's Gay</title>
</svelte:head>

<article>
	<h1>Fun Stuff!</h1>

	<hr class="chain-divider" />

	<p style="font-style: italic">
		Amounts of "Fun" may vary based on time of day, relative position of Alpha Centauri, user
		taste, perception of the colour green, and the amount (and species distribution) of birds
		within 10km.
	</p>

	<p>Not (really) mobile-friendly. Oh no.</p>

	<ul>
		<li>
			<a href={resolve('/snake')}>Snake!</a> - It's snake. Real cutting edge Nokia 6110 type stuff.
		</li>
		<li>
			<a href={resolve('/solitaire')}>Solitaire</a> - I think it's specifically called Klondike
			or something. Kinda breaks when you exhaust the talon. Save system does work, at least.
		</li>
		<li>
			<a href="https://draw.stellers.gay" target="_blank">Drawpile Server</a> - Pretty sure I have
			anonymous hosting disabled, but feel free to ask for a room!
		</li>
		<li>
			<a href="https://fortuna.stellers.gay" target="_blank">Fortuna Character Creator</a> - A
			character creator based on the one from the webcomic
			<a href="https://cosmosdex.com/fortuna/p/0" rel="external" target="_blank">Fortuna</a>!
			Also a super simple SVG
			<a href="https://cosmosdex.com/cosmosdex/species/aftik" rel="external" target="_blank"
				>Aftik</a
			> avatar creator.
		</li>
		<li>
			<a href="https://chat.stellers.gay" target="_blank">Chat Client</a> - A self-hosted
			instance of
			<a href="https://github.com/cinnyapp/cinny" rel="external" target="_blank">Cinny</a>
			for my <a href="https://matrix.stellers.gay" target="_blank">Matrix Instance</a>
		</li>
		<li>
			<a href="https://git.stellers.gay" target="_blank">Git Web UI</a> - Really stretching the
			definition of "fun" here.
		</li>
	</ul>
</article>
