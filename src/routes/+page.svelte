<script>
	import pixelSafari from '$lib/assets/pixelsafari.webp';
	import linux from '$lib/assets/1linux2.webp';
	import shiptest from '$lib/assets/shiptest-button.webp';
	import css from '$lib/assets/css.webp';
	import yogstation from '$lib/assets/yogstation.gif';
	import htmx from '$lib/assets/HTMXstamp.webp';
	import mitLicense from '$lib/assets/mit-license.webp';
	import barbedWire from '$lib/assets/barbedwire.webp';
	import pokeOverworld from '$lib/assets/pokeoverworld.gif';
	import iLoveCrows from '$lib/assets/ilovecrows.webp';
</script>

<article>
	<section class="prose">
		<h2>Welcome to Steller's Gay!</h2>

		<hr class="rainbow-divider not-prose" />

		<p>
			My name is Mark Suckerberg, and I'm simply a coder who loves to do too many things at once. I
			work with many languages, such as C#, Dream Maker, JS, MySQL, PHP, and Python. I don't usually
			do any kind of contract/paid work unless it interests me personally. If you've got a good idea
			that you want done, feel free to float it by me by contacting me on Discord (@marksuckerberg)!
		</p>
	</section>

	<hr class="paperclip-divider" />

	<p class="center *:inline-block">
		<a target="_blank" href="https://pixelsafari.neocities.org" title="Awesome site!"
			><img
				src={pixelSafari}
				class="animated-button"
				alt="An animated button for the Pixel Safari, showing off various graphics they provide, such as Favicons and Dividers."
			/></a
		>

		<a target="_blank" href="https://archlinux.org" title="I use Arch Linux btw"
			><img
				src={linux}
				class="animated-button"
				alt="An animated button showing the windows logo being replaced with Tux the penguin, with the words, 'LinuX Now! 2.0' on the right."
			/></a
		>

		<a target="_blank" href="https://shiptest.net" title="Play Shiptest!"
			><img
				src={shiptest}
				class="animated-button"
				alt="A pixel-art button showing the shiptest logo (sillouhette of a ship in front of a planet eclipsing a star) next to the words 'Shiptest 13' and the BYOND logo."
			/></a
		>

		<a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS" title="Learn CSS!"
			><img
				src={css}
				class="animated-button"
				alt="Button that says 'Made with Cascading Style Sheets'"
			/></a
		>

		<a target="_blank" href="https://yogstation.net" title="YOGGERZ!!!"
			><img
				src={yogstation}
				class="animated-button"
				alt="A pixel-art button showing the Yogstation 13 logo."
			/></a
		>

		<a target="_blank" href="https://htmx.org" title="This site was PREVIOUSLY made with HTMX."
			><img
				src={htmx}
				class="animated-button"
				alt="The logo for the HTMX project, with text saying HTMX Now! 2.0 on the right side"
			/></a
		>

		<a
			target="_blank"
			rel="license"
			href="license.txt"
			title="This site's HTML and CSS is licensed under the MIT license."
			><img
				src={mitLicense}
				class="animated-button"
				alt="Button that says 'Some Rights Reserved,' along with the MIT logo to represent the MIT License."
			/></a
		>
	</p>

	<p class="center">
		<img
			src={barbedWire}
			loading="lazy"
			decoding="async"
			class="stamp"
			alt="A yellow warning stamp that reads, 'WARNING, MY DIET CONSISTS OF Barbed wire'"
		/>
		<img
			src={pokeOverworld}
			loading="lazy"
			decoding="async"
			class="stamp"
			alt="An animated stamp of the overworld from Pokemon Heartgold with the male trainer patting their Cyndaquil."
		/>
		<img
			src={iLoveCrows}
			class="stamp"
			alt="A stamp that has the sillouhette of a crow on the left, and a heart behind the word crows on the right."
		/>
	</p>
</article>
