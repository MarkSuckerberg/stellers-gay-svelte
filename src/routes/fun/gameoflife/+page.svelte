<script lang="ts">
	import { PixelCanvas } from '$lib/gameoflife.svelte';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement | undefined = $state();

	let width = 64;
	let height = 64;

	let pixelCanv: PixelCanvas | undefined = $state();

	let survives = $state('23');
	let births = $state('3');

	let playing = $state(false);
	let intervalId: number | undefined;
	let interval = $state(250);

	onMount(() => {
		if (canvas) {
			pixelCanv = new PixelCanvas(canvas, { width, height });
			AddRandom();
		}
	});

	function TogglePlay() {
		if (playing) {
			clearInterval(intervalId);
			playing = false;
			return;
		}

		playing = true;
		intervalId = setInterval(() => {
			pixelCanv?.simulate(births, survives);
		}, interval);
	}

	function AddRandom(size = 16) {
		const cornerX = width / 2 - size / 2;
		const cornerY = height / 2 - size / 2;
		for (let x = cornerX; x < cornerX + size; x++) {
			for (let y = cornerY; y < cornerY + size; y++) {
				if (Math.random() > 0.5) {
					pixelCanv?.setPixel({ x, y });
				}
			}
		}
	}
</script>

<h1>Conway's Game of Life</h1>

<p>
	Real nerd stuff. Is this a game? I always considered this more of a toy or simulation than a
	game. I think it's super cool, regardless. Forgive the rather bare bones implementation.
</p>

<p>
	<label title="Neighbours needed for cell to be born"
		>B<input type="text" bind:value={births} /></label
	>/<label title="Neighbours needed for cell to stay alive"
		>S<input type="text" bind:value={survives} /></label
	>
	| Simulation interval <input type="number" bind:value={interval} disabled={playing} />
</p>

<button onclick={() => TogglePlay()}>{playing ? 'Stop' : 'Play'}</button>
<button onclick={() => pixelCanv?.simulate(births, survives)}>Simulate</button>
<button onclick={() => pixelCanv?.simulate('', '')}>Clear</button>
<button onclick={() => AddRandom()}>Random</button>

<hr />
<canvas
	bind:this={canvas}
	{width}
	{height}
	class="inset"
	style="width: 400px; height: 400px; image-rendering: crisp-edges; background-color: white;"
></canvas>
