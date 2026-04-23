<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import CardButton from '$lib/components/card.svelte';
	import { canMoveOnto, Rank, Suit, SuitReverse, type Card, Setup } from '$lib/solitaire';
	import { onMount } from 'svelte';

	let deck: Card[] = $state([]);
	let columns: Card[][] = $state([]);

	let moves = $state(0);

	function takeCards(fromColumn: number, cardIndex: number) {
		const cards = columns[fromColumn].splice(cardIndex);
		if (columns[fromColumn].length > 0) {
			columns[fromColumn][cardIndex - 1].revealed = true;
		}

		return cards;
	}

	function moveCards(toColumn: number, cards: Card[]) {
		columns[toColumn] = columns[toColumn].concat(cards);
	}

	let selected: Card | undefined = $state();

	let onSelectedMoved: () => Card[];

	function setSelected(card: Card, onMoved: () => Card[]) {
		selected = card;
		onSelectedMoved = onMoved;
	}

	function clickCard(clickedCol: number, clickedIndex: number) {
		if (selected == undefined) {
			setSelected(columns[clickedCol][clickedIndex], () => {
				return takeCards(clickedCol, clickedIndex);
			});

			return;
		}

		const clicked = columns[clickedCol][clickedIndex];

		if (!canMoveOnto(selected, clicked)) {
			selected = undefined;
			return;
		}

		const cards = onSelectedMoved();
		moveCards(clickedCol, cards);

		selected = undefined;
		moves++;

		saveGame();
	}

	let deckIndex = $state(0);
	let deckCard = $derived(deck.at(deckIndex));

	function nextCard() {
		selected = undefined;

		if (deck.length == 0) {
			deckIndex = 0;
			deckCard = undefined;
			return;
		}

		deckIndex = (deckIndex + 1) % deck.length;

		moves++;
	}

	function clickDeck() {
		if (deckCard == undefined) {
			return;
		}

		if (selected != undefined) {
			selected = undefined;
			return;
		}

		selected = deckCard;
		onSelectedMoved = () => {
			if (deckCard == undefined) {
				return [];
			}

			const thisCard = deckCard;

			const front = deck.slice(0, deckIndex);
			const back = deck.slice(deckIndex + 1);

			deck = front.concat(back);

			if (deck.length == 0) {
				deckIndex = 0;
				deckCard = undefined;
				return [thisCard];
			}

			deckIndex = (deckIndex - 1) % deck.length;

			return [thisCard];
		};
	}

	function clickEmpty(clickedCol: number) {
		if (selected?.rank == Rank.King) {
			const cards = onSelectedMoved();
			moveCards(clickedCol, cards);
			selected = undefined;

			moves++;

			saveGame();
		}
	}

	function clickFinal(suit: Suit) {
		if (selected) {
			if (!canMoveOntoFinal(selected)) {
				selected = undefined;
				return;
			}

			final[suit] = final[suit].concat(onSelectedMoved());
			selected = undefined;

			moves++;

			saveGame();
		} else if (final[suit].length > 0) {
			selected = final[suit][final[suit].length - 1];

			onSelectedMoved = () => {
				return final[suit].splice(-1, 1);
			};
		}
	}

	let final: {
		[K in Suit]: Card[];
	} = $state({
		[Suit.Clubs]: [],
		[Suit.Diamonds]: [],
		[Suit.Hearts]: [],
		[Suit.Spades]: []
	});

	let finalTop: {
		[K in Suit]: Card | undefined;
	} = $derived({
		[Suit.Clubs]: final[Suit.Clubs].at(-1),
		[Suit.Diamonds]: final[Suit.Diamonds].at(-1),
		[Suit.Hearts]: final[Suit.Hearts].at(-1),
		[Suit.Spades]: final[Suit.Spades].at(-1)
	});

	type SaveData = {
		deck: typeof deck;
		deckIndex: typeof deckIndex;
		columns: typeof columns;
		final: typeof final;
		moves: typeof moves;
	};

	function loadGame() {
		const save: SaveData | undefined = JSON.parse(
			localStorage.getItem('solitaireSave') || '{}'
		) as SaveData;
		if (save == undefined) {
			return;
		}

		deck = save.deck;
		deckIndex = save.deckIndex;
		columns = save.columns;
		final = save.final;
		moves = save.moves;
	}

	function saveGame() {
		const newSave: SaveData = {
			deck,
			deckIndex,
			columns,
			final,
			moves
		};

		localStorage.setItem('solitaireSave', JSON.stringify(newSave));
	}

	function newGame() {
		const values = Setup();

		deck = values.deck;
		deckIndex = 0;
		columns = values.columns;
		final = {
			[Suit.Clubs]: [],
			[Suit.Diamonds]: [],
			[Suit.Hearts]: [],
			[Suit.Spades]: []
		};
		moves = 0;
	}

	beforeNavigate(() => {
		saveGame();
	});

	onMount(() => {
		if (localStorage.getItem('solitaireSave') != null) {
			loadGame();
		} else {
			newGame();
		}
	});

	function canMoveOntoFinal(card: Card) {
		const top = finalTop[card.suit];
		if (top == undefined) {
			return card.rank == Rank.Ace;
		}

		return top.rank + 1 == card.rank;
	}

	function checkDeck() {
		if (deckCard == undefined) {
			return;
		}

		if (deck.length == 0) {
			return;
		}

		if (finalTop[deckCard.suit] == undefined) {
			if (deckCard.rank == Rank.Ace) {
				clickDeck();
				clickFinal(deckCard.suit);
				return true;
			}
			return;
		}

		if (canMoveOntoFinal(deckCard)) {
			clickDeck();
			clickFinal(deckCard.suit);
			return true;
		}

		for (let i = 0; i < columns.length; i++) {
			if (columns[i].length == 0) {
				if (deckCard.rank == Rank.King) {
					clickDeck();
					clickEmpty(i);
					return true;
				}
				continue;
			}

			if (canMoveOnto(deckCard, columns[i][columns[i].length - 1])) {
				clickDeck();
				clickCard(i, columns[i].length - 1);
				return true;
			}
		}
	}

	function checkLowest() {
		for (let i = 0; i < columns.length; i++) {
			const column = columns[i];

			if (column.length == 0) {
				continue;
			}

			const card = column[column.length - 1];
			const top = finalTop[card.suit];

			if (top == undefined) {
				if (card.rank == Rank.Ace) {
					clickCard(i, column.length - 1);
					clickFinal(card.suit);
					return true;
				}
			} else if (canMoveOntoFinal(card)) {
				clickCard(i, column.length - 1);
				clickFinal(card.suit);
				return true;
			}
		}
	}

	function checkHighest() {
		for (let colNum = 0; colNum < columns.length; colNum++) {
			const column = columns[colNum];

			if (column.length == 0) {
				continue;
			}

			const highest = getHighestCard(column);
			const card = column[highest];

			if (card.rank == Rank.King && highest == 0) {
				continue;
			}

			for (let i = 0; i < columns.length; i++) {
				if (colNum == i) {
					continue;
				}

				const otherColumn = columns[i];

				if (otherColumn.length == 0) {
					if (card.rank == Rank.King) {
						clickCard(colNum, highest);
						clickEmpty(i);
						return true;
					}
					continue;
				}

				const otherCard = otherColumn[otherColumn.length - 1];

				if (canMoveOnto(card, otherCard)) {
					clickCard(colNum, highest);
					clickCard(i, otherColumn.length - 1);
					return true;
				}
			}
		}
	}

	function getHighestCard(column: Card[]) {
		for (let row = 0; row < column.length; row++) {
			const card = column[row];

			if (card.revealed) {
				return row;
			}
		}
		return column.length - 1;
	}

	function autoMove() {
		if (checkHighest()) {
			return;
		}
		if (checkLowest()) {
			return;
		}
		if (checkDeck()) {
			return;
		}
		nextCard();
	}
</script>

<svelte:head>
	<title>Solitaire - Steller's Gay</title>
</svelte:head>

<h1>Solitaire</h1>

<p>
	I was very tempted to make the suits bird species. Or maybe the ranks. An egg (ace) of blue jays.
</p>

<div style="background-color: #008000; padding: 1em; color: white" class="inset">
	<button class="cardbtn outset" onclick={() => newGame()}>New Game</button>
	<button class="cardbtn outset" onclick={() => loadGame()}>Load Game</button>
	<button class="cardbtn outset" onclick={() => saveGame()}>Save Game</button>
	|
	<button class="cardbtn outset" onclick={() => localStorage.removeItem('solitaireSave')}
		>Clear Save</button
	>
	<br />
	<button class="cardbtn outset" onclick={() => autoMove()}>Auto Move</button>
	<button class="cardbtn outset" onclick={() => (selected = undefined)}>Deselect</button>
	|
	<span>Moves: {moves}</span>

	<hr class="my-2" />

	<div style="display: flex; justify-content: space-between;">
		<div style="width: 50%; display: flex; gap: 1em">
			<div style="width: 25%">
				{#if deckCard != undefined}
					<CardButton card={deckCard} disabled={false} onclick={() => clickDeck()}></CardButton>
				{/if}
			</div>
			<button
				class="cardbtn"
				style="width: 25%"
				onclick={() => nextCard()}
				disabled={deck.length == 0 || deckCard == undefined || selected != undefined}
			>
				Next ({deckIndex + 1} / {deck.length})
			</button>
		</div>

		<div style="display: flex; width: 50%">
			{#each Object.keys(final).map((suit) => SuitReverse[suit]) as suit (suit)}
				{#if finalTop[suit] != undefined}
					<CardButton
						card={finalTop[suit]}
						disabled={selected && !(canMoveOntoFinal(selected) && selected.suit == suit)}
						onclick={() => clickFinal(suit)}
					/>
				{:else}
					<CardButton
						onclick={() => clickFinal(suit)}
						disabled={!(selected && selected.rank == Rank.Ace && selected.suit == suit)}
					>
						Empty ({suit})
					</CardButton>
				{/if}
			{/each}
		</div>
	</div>

	<hr style="margin-block: 2rem" />

	<div
		style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; width: 100%; gap: 1em;"
	>
		{#each columns as column, col (col)}
			<div>
				{#if column.length == 0}
					<CardButton disabled={true} onclick={() => clickEmpty(col)}>- Empty -</CardButton>
				{/if}
				{#each column as card, pos (pos)}
					{#if card.revealed}
						{#if selected == card}
							<CardButton {card} disabled={false} onclick={() => clickCard(col, pos)}></CardButton>
						{:else if selected && (!canMoveOnto(selected, card) || pos != column.length - 1)}
							<CardButton {card} disabled={true} onclick={() => clickCard(col, pos)}></CardButton>
						{:else}
							<CardButton {card} disabled={false} onclick={() => clickCard(col, pos)}></CardButton>
						{/if}
					{:else}
						<CardButton disabled>Card</CardButton>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.cardbtn {
		cursor: pointer;
		padding: 0.25rem;
	}

	.cardbtn:hover {
		background-color: white;
		color: black;
		border-color: black;
	}
</style>
