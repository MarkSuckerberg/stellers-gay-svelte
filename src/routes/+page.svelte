<script>
	import pixelSafari from '$lib/assets/pixelsafari.webp';
	import linux from '$lib/assets/1linux2.webp';
	import shiptest from '$lib/assets/shiptest-button.webp';
	import css from '$lib/assets/css.webp';
	import yogstation from '$lib/assets/yogstation.gif';
	import mitLicense from '$lib/assets/mit-license.webp';
	import barbedWire from '$lib/assets/barbedwire.webp';
	import pokeOverworld from '$lib/assets/pokeoverworld.gif';
	import iLoveCrows from '$lib/assets/ilovecrows.webp';
	import stellers from '$lib/assets/stellersbutton.webp';
	import { asset, resolve } from '$app/paths';

	import fontlicense from '$lib/assets/fonts/license.txt';
</script>

<article>
	<section>
		<h2>Welcome to Steller's Gay!</h2>

		<hr class="rainbow-divider" />

		<p>
			My name is Mark Suckerberg, and I'm simply a coder who loves to do too many things at once. I
			work with many languages, such as C#, Dream Maker, JS, MySQL, PHP, and Python. I don't usually
			do any kind of contract/paid work unless it interests me personally. If you've got a good idea
			that you want done, feel free to float it by me by contacting me on Discord (@marksuckerberg)!
		</p>

		<p>
			<b>Update 2/9/26:</b> At long last, I deployed the update to my site that I created about
			eight months ago. The hitcounter should actually work properly now, and I updated the
			<a href={resolve('/media')}>media</a> tab with some more art, too! Apologies if there's any new
			bugs.
		</p>

		<p>
			<b>Update 4/3/26:</b> Threw some old janky projects of mine onto the
			<a href={resolve('/fun')}>fun tab</a>, and redid the
			<a href={resolve('/media')}>media gallery</a>. Been meaning to add more content. Maybe I'll
			bring my blog back at some point? Also switched to using the Ari-W9500 font (<a
				href={fontlicense}>license</a
			>) to emulate the proper Win95 feel. Sadly, there's no way to disable font anti-aliasing with
			CSS, so we'll all have to suffer with gross pixel smears.
		</p>

		<p>
			<b>Update 4/4/26:</b> GUH, okay, so, updated the font a bit, added a
			<a href={resolve('/guestbook')}>guestbook</a> too, and also actually set the bsky link to the right
			one. I don't know how long it's been like that but I guess forever. I am NOT marksuckerberg.bsky.social
			anymore.
		</p>
	</section>

	<hr class="paperclip-divider" />

	<p class="center">
		<a href={resolve('/')} title="Button for this site, lovingly sprited by Ryerice!">
			<img
				src={stellers}
				class="animated-button"
				alt="An animated button showing a pixelated sleeping blue jay raptor-creatre. Credit to Rylie/RyeRice!"
			/>
		</a>

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

		<a
			target="_blank"
			rel="license"
			href={asset('/license.txt')}
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
			title="Don't feed after midnight."
		/>
		<img
			src={pokeOverworld}
			loading="lazy"
			decoding="async"
			class="stamp"
			alt="An animated stamp of the overworld from Pokemon Heartgold with the male trainer patting their Cyndaquil."
			title="I still have my pokewalker!"
		/>
		<img
			src={iLoveCrows}
			class="stamp"
			alt="A stamp that has the sillouhette of a crow on the left, and a heart behind the word crows on the right."
			title="cro :>"
		/>
	</p>
</article>

<style>
	.center {
		text-align: center;
	}

	.animated-button {
		height: 31px;
		width: 88px;
	}
</style>
