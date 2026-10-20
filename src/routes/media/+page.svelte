<script lang="ts">
	import ref from '#lib/assets/mark_ref.webp?format=webp;avif;png&as=picture';
	import msp from '#lib/assets/mark_msp.webp?format=webp;avif;png&as=picture';
	import icon from '#lib/assets/mark_icon.webp?format=webp;avif;png&as=picture';
	import fall from '#lib/assets/mark_fall.png?format=webp;avif;png&as=picture';
	import cowbird from '#lib/assets/mark_cowbird.jpg?format=webp;avif;png&as=picture';
	import suited from '#lib/assets/mark_suit.jpg?format=webp;avif;png&as=picture';
	import fancy from '#lib/assets/mark_fancy.png?format=webp;avif;png&as=picture';
	import fragile from '#lib/assets/mark_fragile.png?format=webp;avif;png&as=picture';
	import mrk from '#lib/assets/mrk.webp?format=webp;avif;png&as=picture';
	import mrk2 from '#lib/assets/mrk2.webp?format=webp;avif;png&as=picture';
	import markrow from '#lib/assets/markrow.jpg?format=webp;avif;png&as=picture';
	import tired from '#lib/assets/tired.png?format=webp;avif;png&as=picture';
	import supermark from '#lib/assets/super_mark.png?format=webp;avif;png&as=picture';
	import jary from '#lib/assets/bluejarybeast.webp?format=webp;avif;png&as=picture';
	import flomnf from '#lib/assets/flomnf.png?format=webp;avif;png&as=picture';
	import flustered from '#lib/assets/flustered.png?format=webp;avif;png&as=picture';
	import pridebeak from '#lib/assets/pridebeak.png?format=webp;avif;png&as=picture';

	import enhanced_ref from '#lib/assets/mark_ref.webp?h=250&w=250&format=avif;webp;png&format=avif;webp;png&fit=outside&as=img';
	import enhanced_msp from '#lib/assets/mark_msp.webp?h=250&w=250&format=avif;webp;png&fit=outside&as=img';
	import enhanced_icon from '#lib/assets/mark_icon.webp?h=250&w=250&format=avif;webp;png&fit=outside&as=img';
	import enhanced_fall from '#lib/assets/mark_fall.png?h=250&w=250&format=avif;webp;png&fit=outside&as=img';
	import enhanced_cowbird from '#lib/assets/mark_cowbird.jpg?h=250&w=250&format=avif;webp;png&fit=outside&as=img';
	import enhanced_suited from '#lib/assets/mark_suit.jpg?h=250&w=250&format=avif;webp;png&fit=outside&as=img';
	import enhanced_fancy from '#lib/assets/mark_fancy.png?h=250&w=250&format=avif;webp;png&fit=outside&as=img';
	import enhanced_fragile from '#lib/assets/mark_fragile.png?h=250&w=250&format=avif;webp;png&fit=outside&as=img';
	//import enhanced_mrk from '#lib/assets/mrk.webp?h=250&w=250&format=avif;webp;png&fit=outside&as=img';
	import enhanced_mrk2 from '#lib/assets/mrk2.webp?h=250&w=250&format=avif;webp;png&fit=outside&as=img';
	import enhanced_markrow from '#lib/assets/markrow.jpg?h=250&w=250&format=avif;webp;png&fit=outside&as=img';
	import enhanced_tired from '#lib/assets/tired.png?h=250&w=250&format=avif;webp;png&fit=outside&as=img';
	import enhanced_supermark from '#lib/assets/super_mark.png?h=250&w=250&format=avif;webp;png&fit=outside&as=img';
	import enhanced_jary from '#lib/assets/bluejarybeast.webp?h=250&w=250&format=avif;webp;png&fit=outside&as=img';
	import enhanced_flomnf from '#lib/assets/flomnf.png?h=250&w=250&format=avif;webp;png&fit=outside&as=img';
	import enhanced_flustered from '#lib/assets/flustered.png?h=250&w=250&format=avif;webp;png&fit=outside&as=img';
	import enhanced_pridebeak from '#lib/assets/pridebeak.png?h=250&w=250&format=avif;webp;png&fit=outside&as=img';

	import GalleryButton from '#lib/components/gallery-button.svelte';
</script>

<svelte:head>
	<title>Media - Steller's Gay</title>
</svelte:head>

<h1>Media</h1>

<hr class="rainbow-divider" />

<div
	style="display:flex; justify-content: center; flex-wrap: wrap; flex-direction: row; padding: 0.5em 0"
>
	<GalleryButton
		src={enhanced_ref}
		original={ref}
		title="Original Ref"
		alt="A reference sheet for an anthropomorphic blue jay with dull blue feathers everywhere but the off-white of his face, chest, belly, and inner thighs and the thin grey border between the two colours."
	>
		My original ref by <a href="https://honkbird.tumblr.com" title="Creator link">Honkbird</a>!
	</GalleryButton>
	<GalleryButton
		src={enhanced_msp}
		original={msp}
		title="A bird in the hand"
		alt="An anthropomorphic blue jay standing with one talon-hand on their hip as as a Northern Cardinal, a red bird, perches on their other. The blue jay is saying I just think they're neat, while the cardinal is going Chorp."
	>
		<a href="https://www.furaffinity.net/view/54899236/" title="Art link"
			>Wonderful MSPaint art</a
		>
		by
		<a href="https://furaffinity.net/user/returnaddress" title="Creator link">ReturnAddress</a>!
	</GalleryButton>
	<GalleryButton
		src={enhanced_mrk2}
		original={[mrk2, mrk]}
		alt="A portrait of an exceptionally fluffy and softly rendered anthropomorphic blue jay with their eyes happily shut."
		title="Floofy Jay"
	>
		An absolutely beautiful portrait by
		<a href="https://furaffinity.net/user/returnaddress" title="Creator link">ReturnAddress</a>!
	</GalleryButton>
	<GalleryButton src={enhanced_icon} original={icon} title="Fluffy as hell">
		Incredible fluffy icon by <a href="https://twitter.com/BeelziebubArts" title="Creator link">
			Beelziebub
		</a>!
	</GalleryButton>
	<GalleryButton
		src={enhanced_flomnf}
		original={flomnf}
		title="The magnificent Jarybeast"
		alt="A large raptorlike bluejay-patterned creature sprawled out towards the camera, asleep, drooling slightly."
	>
		A beautiful rendition of the (hopefully) beloved bluejary beast sprawled out even more
		majestically than ever before, by the ever-wonderful friend of mine, <a
			href="https://bsky.app/profile/gryphonthegryphon.bsky.social"
			title="Creator link">GryphonTheGryphon</a
		>!
	</GalleryButton>
	<GalleryButton
		src={enhanced_flustered}
		original={flustered}
		title="Nervous Mark"
		alt="Headshot of an anthropomorphic blue jay with tiny round glasses looking quite flustered."
	>
		A lovely headshot of me looking rather characteristically sheepish about something with a
		lovely pair of spectacles, by <a href="https://shlimaz.com/" title="Creator link">
			Shlimaz
		</a>!
	</GalleryButton>
	<GalleryButton
		src={enhanced_fall}
		original={fall}
		title="Mark guy death pose"
		alt="An anthropomorphic blue jay crumpled to the ground in a familiar pose, set against a version of the default windows XP wallpaper, Bliss."
	>
		A very typical Mark sighting, by Ashturi
	</GalleryButton>
	<GalleryButton
		src={enhanced_jary}
		original={jary}
		title="The Jarybeast"
		alt="A large raptorlike bluejay-patterned creature laying down, asleep."
	>
		The blue jay raptor gryphon snaggle-toothed creature thing that's the mascot of pretty much
		everything me. The bluejary beast, by <a
			href="https://honkbird.tumblr.com"
			title="Creator link">Honkbird</a
		>!
	</GalleryButton>
	<GalleryButton
		src={enhanced_cowbird}
		original={cowbird}
		title="Cowbird"
		alt="An anthropomorphic blue jay dressed in cowboy fashion, including leather chaps, spurs, a vest, a button-up shirt, a pistol in a belt holster, and a green cloak. They're standing ready to draw their weapon, as if in a duel."
		>Yee-caw! (By Orcrest)</GalleryButton
	>
	<GalleryButton
		src={enhanced_suited}
		original={suited}
		title="Dapper jay"
		alt="An anthropomorphic blue jay dressed formally, including a dark necktie, an off-white button-up, a grey vest, black slacks, dark loafers, and a leather longcoat. They're sitting on a bench with one leg crossed over the other."
	>
		Well-dressed bird, by the expert in such, <a
			href="https://bsky.app/profile/genericcrowart.bsky.social"
			title="Creator link">GenericCrow</a
		>
	</GalleryButton>
	<GalleryButton
		src={enhanced_pridebeak}
		original={pridebeak}
		title="Pride Beak"
		alt="Headshot of a chubby blue jay with a beak painted to be the gay man pride flag."
	>
		Showing my pride with some wonderful beak paint, by <a
			href="https://marcyyorsa.com/"
			title="Creator link">Marcy Yorsa</a
		>!
	</GalleryButton>
	<GalleryButton
		src={enhanced_fancy}
		original={fancy}
		title="Bow-tied up"
		alt="A sketch of a fancily dressed anthrpomorphic blue jay dressed in a suit coat fastened at the neck with a bow tie. He also wears small round spectacles atop his beak."
	>
		Dapper (if shamefully bowtied) Mark by <a
			href="https://bsky.app/profile/friedkrisp.bsky.social"
			title="Creator link">FriedKrisp</a
		>!
	</GalleryButton>
	<GalleryButton
		src={enhanced_fragile}
		original={fragile}
		title="Emotionally fragile"
		alt="A little blue jay wearing a green ribbon bow tie tearing up with the words &quot;Emotionally Fragile Bird&quot; superimposed."
	>
		Please, handle with caw-tion. Adorable meme drawover by <a
			href="https://bsky.app/profile/lampent51.bsky.social"
			title="Creator link">Lampent51</a
		>!
	</GalleryButton>
	<GalleryButton
		src={enhanced_markrow}
		original={markrow}
		title="Front facing Mark"
		alt="An angry looking front-facing blue jay staring deeply at the viewer."
	>
		Stares into your soul and says gwah over and over. A very accurate drawover by
		Chubbygummibear.
	</GalleryButton>
	<GalleryButton
		src={enhanced_tired}
		original={tired}
		title="Tired"
		alt="Anthropomorphic northern cardinal wearing a sleeveless hoodie and puce-coloured tie and striped thigh highs sitting on a comfy chair on the moon"
	>
		You know how it is sometimes. Rare northern cardinal mark by <a
			href="https://honkbird.tumblr.com"
			title="Creator link">Honkbird</a
		>.
	</GalleryButton>
	<GalleryButton
		src={enhanced_supermark}
		original={supermark}
		title="Super Mark"
		alt="Super animal royale-esque blue jay wielding a sword and green cape, with a brown bandolier and boots"
	>
		The very first drawing of my bird from ages ago, by <a
			href="https://honkbird.tumblr.com"
			title="Creator link">Honkbird</a
		>!
	</GalleryButton>
</div>
