<script lang="ts">
	import { Vec2 } from '$lib/vec2';

	const sizeX = 47;
	const sizeY = 30;
	const START = 4;

	type TileValue = 'X' | 'O' | '.' | 'v' | '<' | '>' | '^' | 'O';
	type Dir = 'N' | 'S' | 'E' | 'W';

	const snakeChar = 'O' satisfies TileValue;

	let delta: Vec2 = Vec2.east;
	let direction: Dir = 'E';

	let lost = $state(false);
	let started = $state(false);

	let grid: TileValue[][] = $state(
		new Array(sizeY).fill(null).map(() => new Array(sizeX).fill('.'))
	);

	let snake: Vec2[] = $state(new Array(START).fill(randomSpace()));

	let score = $derived(snake.length - START);

	let queuedDirection: Dir | null = null;

	const mouthDirections: { [key: string]: TileValue } = {
		N: '^',
		S: 'v',
		E: '>',
		W: '<'
	};

	const dirDirections: { [key: string]: Vec2 } = {
		N: Vec2.north,
		S: Vec2.south,
		E: Vec2.east,
		W: Vec2.west
	};

	const dirReverse: { [key: string]: Dir } = {
		N: 'S',
		S: 'N',
		E: 'W',
		W: 'E'
	};

	function handleKeyPress(event: KeyboardEvent) {
		switch (event.key) {
			case 'w':
			case 'ArrowUp':
			case 'Up':
				setDir('N');
				break;

			case 'a':
			case 'ArrowLeft':
			case 'Left':
				setDir('W');
				break;

			case 's':
			case 'ArrowDown':
			case 'Down':
				setDir('S');
				break;

			case 'd':
			case 'ArrowRight':
			case 'Right':
				setDir('E');
				break;
		}
	}

	function setDir(newDir: Dir | undefined) {
		if (!newDir) {
			return;
		}

		if ((newDir == direction || newDir == dirReverse[direction]) && started) {
			return;
		}

		queuedDirection = newDir;

		if (!started) {
			interval = setInterval(move, 250);
			started = true;
		}
	}

	function randomSpace() {
		const x = Math.floor(Math.random() * sizeX - 1);
		const y = Math.floor(Math.random() * sizeY - 1);

		return new Vec2(x, y);
	}

	function addFruit(depth: number = 0) {
		const loc = randomSpace();

		if (grid[loc.y][loc.x] !== '.' && depth < 10) {
			addFruit();
			return;
		}

		grid[loc.y][loc.x] = 'X';
	}

	function lose() {
		const head: Vec2 = snake[0];
		grid[head.y][head.x] = 'X';

		clearInterval(interval);
		lost = true;
	}

	function move() {
		dividerIndex = (dividerIndex + 1) % (sizeX * 2);

		if (queuedDirection) {
			direction = queuedDirection;
			delta = dirDirections[direction];
			queuedDirection = null;
		}

		const head: Vec2 = snake[0];
		const newPos: Vec2 = head.add(delta);

		if (newPos.x < 0 || newPos.x >= sizeX || newPos.y < 0 || newPos.y >= sizeY) {
			lose();
			return;
		}

		const newValue = grid[newPos.y][newPos.x];

		if (newValue == snakeChar) {
			lose();
			return;
		}

		snake.unshift(newPos);
		grid[head.y][head.x] = snakeChar;
		grid[newPos.y][newPos.x] = mouthDirections[direction];

		if (newValue == 'X') {
			addFruit();
			clearInterval(interval);
			interval = setInterval(move, 250 - score);
			return;
		}

		const last = snake.pop();
		if (!last) {
			return;
		}
		grid[last.y][last.x] = '.';
	}

	start();

	function start() {
		const startSpace = randomSpace();

		snake = new Array(START).fill(startSpace);

		grid = new Array(sizeY).fill(null).map(() => new Array(sizeX).fill('.'));
		grid[startSpace.y][startSpace.x] = 'O';
		addFruit();

		lost = false;
		started = false;
	}

	let interval: number | undefined;

	let dividerIndex = $state(sizeX);
</script>

<svelte:head>
	<title>Snake - Steller's Gay</title>
</svelte:head>

<div style="display: grid; float: right;">
	<button style="grid-column: 2;" onclick={() => setDir('N')}>N</button>
	<button style="grid-column: 2; grid-row: 3;" onclick={() => setDir('S')}>S</button>
	<button style="grid-row: 2;" onclick={() => setDir('W')}>W</button>
	<button style="grid-row: 2; grid-column: 3;" onclick={() => setDir('E')}>E</button>
</div>

<h1>Snake</h1>

<p>
	It's just snake. You're the snake (you start on the tile with an "O"). Eat the... apples. The
	"X"es. C'mon, you know the deal. Arrow keys don't seem to work for whatever reason.
</p>

{#if lost}
	<button onclick={() => start()} style="float: right;">Restart?</button>
{/if}

<p>Score: {score}</p>

<code style:color="#006000">
	{#each { length: sizeX * 2 }, rank}
		{#if rank % 2 == 0}
			{rank == dividerIndex ? '🬏' : '🬷'}
		{:else}
			{rank == dividerIndex ? '▘' : '🬨'}
		{/if}
	{/each}
</code>

<br />

<svelte:window on:keypress={handleKeyPress} />

<code>
	{#each grid as row, y (y)}
		<div>
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
			{#each row as _, x (x)}
				{grid[sizeY - y - 1][x]}&nbsp;
			{/each}
		</div>
	{/each}
</code>
