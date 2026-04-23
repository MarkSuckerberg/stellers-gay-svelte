<script>
	import pixelSafari from '$lib/assets/pixelsafari.webp';
	import linux from '$lib/assets/1linux2.webp';
	import shiptest from '$lib/assets/shiptest-button.webp';
	import css from '$lib/assets/css.webp';
	import yogstation from '$lib/assets/yogstation.gif';
	import snapps from '$lib/assets/snapps.gif';
	import honk from '$lib/assets/honk.webp';
	import htmlbutton from '$lib/assets/htmlbutton.png';
	import guestbook from '$lib/assets/signguest.gif';
	import mitLicense from '$lib/assets/mit-license.webp';
	import barbedWire from '$lib/assets/barbedwire.webp';
	import pokeOverworld from '$lib/assets/pokeoverworld.gif';
	import iLoveCrows from '$lib/assets/ilovecrows.webp';
	import btn17776 from '$lib/assets/17776.gif';
	import stellers from '$lib/assets/stellersbutton.webp';
	import btn88x31 from '$lib/assets/88x31.gif';
	import canineTools from '$lib/assets/caninetools.png';
	import bigrat from '$lib/assets/bigratdotmonster.png';
	import gay from '$lib/assets/gay.gif';
	import crouton from '$lib/assets/crouton.png';
	import ia from '$lib/assets/ia.webp';

	import { asset, resolve } from '$app/paths';

	import fontlicense from '$lib/assets/fonts/license.txt';
</script>

<svelte:head>
	<title>Steller's Gay</title>
</svelte:head>

<article>
	<section>
		<h1>Welcome to Steller's Gay!</h1>

		<hr class="rainbow-divider" />

		<p>
			My name is Mark Suckerberg, and I'm simply a coder who loves to do too many things at once. I
			work with many languages, such as C#, Dream Maker, JS, MySQL, PHP, and Python. I don't usually
			do any kind of contract/paid work unless it interests me personally. If you've got a good idea
			that you want done, feel free to float it by me by contacting me on Discord (<a
				href="https://discord.com/users/525509257102098442"
				rel="external"
				target="_blank">@marksuckerberg</a
			>)!
		</p>

		<p>
			<b>Update 2/9/26:</b> At long last, I deployed the update to my site that I created about
			eight months ago. The hit counter should actually work properly now, and I updated the
			<a href={resolve('/media')}>media</a> tab with some more art, too! Apologies if there's any new
			bugs.
		</p>

		<p>
			<b>Update 4/3/26:</b> Threw some old janky projects of mine onto the
			<a href={resolve('/fun')}>fun tab</a>, and redid the
			<a href={resolve('/media')}>media gallery</a>. Been meaning to add more content. Maybe I'll
			bring my blog back at some point? Also switched to using the Ari-W9500 font (<a
				href={fontlicense}
				target="_blank">license</a
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
				alt="An animated button showing a pixelated sleeping blue jay raptor-creature. Credit to Rylie/RyeRice!"
			/>
		</a>

		<a target="_blank" href="https://shiptest.net" title="Play Shiptest!" rel="external"
			><img
				src={shiptest}
				class="animated-button"
				alt="A pixel-art button showing the shiptest logo (sillouhette of a ship in front of a planet eclipsing a star) next to the words &quot;Shiptest 13&quot; and the BYOND logo."
			/>
		</a>

		<a target="_blank" href="https://yogstation.net" title="YOGGERZ!!!" rel="external"
			><img
				src={yogstation}
				class="animated-button"
				alt="A pixel-art button showing the Yogstation 13 logo."
			/>
		</a>

		<a
			target="_blank"
			href="https://snapps.dev"
			title="Snakes? For free? Where do I sign up?"
			rel="external"
			><img
				src={snapps}
				class="animated-button"
				alt="An animated pixel-art button showing the words &quot;snapps.dev&quot; with the letters in dev coloured cyan magenta and yellow respectively."
			/>
		</a>

		<a
			target="_blank"
			href="https://honkbird.neocities.org/"
			title="Wonderfully birdy fellow, you should go read all his comics IMMEDIATELY"
			rel="external"
			><img
				src={honk}
				class="animated-button"
				alt="A flashing graphic advertising comics on Honkbird's site"
			/>
		</a>

		<a target="_blank" href="https://pixelsafari.neocities.org" title="Awesome site!" rel="external"
			><img
				src={pixelSafari}
				class="animated-button"
				alt="An animated button for the Pixel Safari, showing off various graphics they provide, such as Favicons and Dividers."
			/>
		</a>

		<a target="_blank" href="https://archlinux.org" title="I use Arch Linux btw" rel="external"
			><img
				src={linux}
				class="animated-button"
				alt="An animated button showing the windows logo being replaced with Tux the penguin, with the words, &quot;LinuX Now! 2.0&quot; on the right."
			/>
		</a>

		<a
			target="_blank"
			rel="license"
			href={asset('/license.txt')}
			title="This site's HTML and CSS is licensed under the MIT license."
			><img
				src={mitLicense}
				class="animated-button"
				alt="Button that says &quot;Some Rights Reserved,&quot; along with the MIT logo to represent the MIT License."
			/>
		</a>

		<a
			target="_blank"
			href="https://developer.mozilla.org/en-US/docs/Web/CSS"
			title="Learn CSS!"
			rel="external"
			><img
				src={css}
				class="animated-button"
				alt="Button that says &quot;Made with Cascading Style Sheets&quot;"
			/>
		</a>

		<a
			target="_blank"
			href="https://developer.mozilla.org/en-US/docs/Web/HTML"
			title="Also learn HTML so you can actually put the CSS you learned to good use."
			rel="external"
			><img
				src={htmlbutton}
				class="animated-button"
				alt="Button that says &quot;<HTML>, learn it today!&quot;"
			/>
		</a>

		<a href={resolve('/guestbook')} title="Come say hi!"
			><img
				src={guestbook}
				class="animated-button"
				alt="Button that says &quot;Sign my GUEST BOOK&quot; next to a book."
			/>
		</a>

		<a
			href="https://eightyeightthirty.one/#stellers.gay"
			title="world wide web of cool people"
			rel="external"
			target="_blank"
		>
			<img
				src={btn88x31}
				class="animated-button"
				alt="Italic text on a button that reads &quot;88x31&quot;"
			/>
		</a>

		<a
			href="https://canine.tools"
			title="Lots of cool tools here. I use the searxng instance."
			rel="external"
			target="_blank"
		>
			<img
				src={canineTools}
				class="animated-button"
				alt="canine.tools badge, which has a paw icon above text that has the domain name"
			/>
		</a>

		<a
			href="https://lgbtqia.wiki/wiki/Aegosexual"
			title="Technically I'm aegosexual/homoromantic, and that's just part of the description, but c'mon. The button looks cool."
			rel="external"
			target="_blank"
		>
			<img src={gay} class="animated-button" alt="" />
		</a>

		<a href="https://bigrat.monster" title="big rat dot monster" rel="external" target="_blank">
			<img
				src={bigrat}
				class="animated-button"
				alt="A wonderfully large rat perched gracefully atop a denim-clad leg"
			/>
		</a>

		<a href="https://crouton.net" title="crouton" rel="external" target="_blank">
			<img src={crouton} class="animated-button" alt="A crouton" />
		</a>

		<a
			href="https://www.sbnation.com/a/17776-football"
			title="Something is very wrong."
			rel="external"
			target="_blank"
		>
			<img
				src={btn17776}
				class="animated-button"
				alt="Button with the text &quot;1776&quot; with the green, red, and yellow silouhettes of three satellites around it."
			/>
		</a>

		<a
			href="https://archive.org"
			title="The internet deserves to be preserved"
			rel="external"
			target="_blank"
		>
			<img
				src={ia}
				alt="Button with the internet archive logo, the text &quot;Preserve&quot; followed by animated text listing out content preserved by the Internet Archive."
			/>
		</a>
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

	.stamp {
		height: 56px;
		width: 99px;
	}
</style>
