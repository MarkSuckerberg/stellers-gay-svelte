<script lang="ts">
	import { onMount } from 'svelte';

	const width = 400;
	const height = 300;

	let canvas: HTMLCanvasElement | undefined = $state();

	const ball = {
		x: 20,
		y: 20,
		radius: 5,
		color: 'blue',
		draw(ctx: CanvasRenderingContext2D) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	};

	function Draw(ctx: CanvasRenderingContext2D) {
		ctx.clearRect(0, 0, width, height);

		ball.draw(ctx);
	}

	function Physics() {
		ball.x += ball.vx;
		ball.y += ball.vy;
	}

	onMount(() => {
		const ctx = canvas?.getContext('2d');

		if (!ctx) return;
	});
</script>

<canvas bind:this={canvas}></canvas>
