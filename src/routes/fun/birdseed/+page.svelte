<script lang="ts">
	import { birds, BirdSeedState, Upgrades } from '$lib/birdseed.svelte';
	import { onMount } from 'svelte';

	let game = $state(new BirdSeedState());

	function CleanupTimers() {
		var killId = setTimeout(function () {
			for (var i = killId; i > 0; i--) clearInterval(i);

			game.Start();
		}, 1000);
	}

	onMount(() => {
		game.Load();
		CleanupTimers();
	});
</script>

<h1>Birdseed Clicker</h1>

Absolutely zero time has been spent balancing this. Enjoy at your own risk. Progress saves every
second, and on tab close.

<hr />

<p>
	Seeds thrown: {game.thrown}
	{#if game.autoDispense > 0}
		<span>({game.autoDispense}/s)</span>
	{/if}
</p>

<p>
	Money: ${game.money.toFixed(2)}
	{#if game.totalPerSecond > 0}
		<span
			title="+${game.totalPerSecond.toFixed(3)}, -${(game.autoBuy * game.buyCost).toFixed(3)}"
			>(${(game.totalPerSecond - game.autoBuy * game.buyCost).toFixed(3)}/s)</span
		>
	{/if}
</p>

<button
	onclick={() => game.throwSeeds()}
	oncontextmenu={(event) => {
		event.preventDefault();
		game.throwSeeds();
	}}
>
	Throw {game.clickValue > 1 ? game.clickValue : ''} birdseed ({game.seeds} remaining)
</button>

<button onclick={() => game.buySeed()} title="${game.buyCost.toFixed(3)} per seed">
	Buy birdseed x{Math.min(Math.floor(game.money / game.buyCost), game.buyAmount)}
	{#if game.autoBuy > 0}
		<span>({game.autoBuy}/s)</span>
	{/if}
</button>

<div style="display: flex; gap: 2px;">
	<ol style="list-style: none; padding: 0; flex: 1" class="inset">
		{#each birds as bird, idx (bird.name)}
			{#if idx < game.nextBird}
				{let owned = $derived(game.boughtBirds[idx])}
				<li>
					<button
						title={`${bird.desc}\n$${game.perSecond[idx]}/s`}
						onclick={() => game.buyBird(idx)}
						disabled={game.thrown < game.scale(bird.cost, owned)}
					>
						{bird.name} x{owned} - {game.scale(bird.cost, owned)} seeds
					</button>
				</li>
			{/if}
		{/each}
		{#if game.nextBird < birds.length}
			<li>
				<button disabled title="Unlocks at {birds[game.nextBird].cost} seeds">???</button>
			</li>
		{/if}
	</ol>

	<ul style="list-style: none; padding: 0; flex: 1" class="inset">
		{#each Upgrades as upgrade, idx (idx)}
			{let owned = $derived(game.boughtUpgrades[idx])}
			<li>
				<button
					title={upgrade.desc}
					onclick={() => game.buyUpgrade(idx)}
					disabled={game.money < game.scale(upgrade.cost, owned)}
				>
					{upgrade.name} x{owned} - ${owned == upgrade.max
						? '(max)'
						: game.scale(upgrade.cost, owned)}
				</button>
			</li>
		{/each}
	</ul>
</div>

<ol style="list-style: none; padding: 0">
	{#each game.messages as message, idx (idx)}
		<li>{message}</li>
	{/each}
</ol>

<menu style="list-style: none; padding: 0; display: flex; gap: 1em">
	<li><button onclick={() => game.Save()}>Save</button></li>
	<li><button onclick={() => game.Load()}>Load</button></li>
	<li><button onclick={() => game.Reset()}>Reset</button></li>
</menu>

<h2>Some of my favourite incremental/clicker games</h2>
<ul>
	<li>
		<a href="https://cookieclicker.com/" rel="external">Cookie Clicker</a> - The long-loved favourite.
		If you don't know what this is... have you lived under a rock?
	</li>
	<li>
		<a href="https://adarkroom.doublespeakgames.com/" rel="external">A Dark Room</a> - A clicker-roguelike
		game that I honestly thought was super popular, but, apparently not. Really neat concept and not
		excessively long. No need to prestige or anything, just the way I like it!
	</li>
	<li>
		<a href="https://www.decisionproblem.com/paperclips/index2.html" rel="external"
			>Universal Paperclips</a
		> - A masterpiece of a clicker game with all sorts of bells and whistles to keep you interested,
		with a healthy smattering of existential dread.
	</li>
	<li>
		<a href="https://www.kongregate.com/en/games/tukkun/anti-idle-the-game" rel="external"
			>Anti-Idle</a
		> - Absolutely ludicrous. But there's something fun about it, at least for a little while. Very
		2010. It's a flash game, so you'll need to deal with that somehow.
	</li>
	<li>
		<a href="https://en.wikipedia.org/wiki/Make_It_Rain:_The_Love_of_Money">Make It Rain</a> - Probably
		the first "app" I ever downloaded on a smart device. I haven't touched it in years but it was
		fun at the time.
	</li>
	<li>
		<a href="https://en.wikipedia.org/wiki/Egg,_Inc.">Egg, Inc.</a> - A fairly straightforward game
		with not a lot to it besides number go up. I really liked the graphics, and the progression was
		lovely and silly to me.
	</li>
	<li>
		<a href="https://www.kongregate.com/en/games/armorgames/upgrade-complete"
			>Upgrade Complete</a
		> - Definitely not an idle game, but probably one of my favourite takes on the incremental genre.
		It's not aged super well but I still think it's fun.
	</li>
	<li>
		<a href="https://birbplay.com/">Birb</a> - A game I discovered after trying to find links for
		all these other games. I'll admit I got hooked. plus. birb.
	</li>
</ul>
