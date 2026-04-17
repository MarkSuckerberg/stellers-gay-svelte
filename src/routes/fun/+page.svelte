<script>
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Fun Stuff - Steller's Gay</title>
</svelte:head>

<article>
	<section id="fun">
		<h2>Fun Stuff!</h2>

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
				<a href={resolve('/solitaire')}>Solitaire</a> - I think it's specifically called Klondike or something.
				Kinda breaks when you exhaust the talon. Save system does work, at least.
			</li>
		</ul>
	</section>
</article>
