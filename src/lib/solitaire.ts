export enum Suit {
	Spades = 'Spades',
	Hearts = 'Hearts',
	Diamonds = 'Diamonds',
	Clubs = 'Clubs'
}

export const SuitReverse: Record<string, Suit> = {
	Spades: Suit.Spades,
	Hearts: Suit.Hearts,
	Diamonds: Suit.Diamonds,
	Clubs: Suit.Clubs
};

export enum Rank {
	Ace,
	Two,
	Three,
	Four,
	Five,
	Six,
	Seven,
	Eight,
	Nine,
	Ten,
	Jack,
	Queen,
	King
}

export function Icon(suit: Suit) {
	switch (suit) {
		case Suit.Spades:
			return '♠';
		case Suit.Hearts:
			return '♥';
		case Suit.Diamonds:
			return '♦';
		case Suit.Clubs:
			return '♣';
	}
}

export function Color(suit: Suit) {
	switch (suit) {
		case Suit.Spades:
		case Suit.Clubs:
			return 'black';

		case Suit.Hearts:
		case Suit.Diamonds:
			return 'red';
	}
}

export function canMoveOnto(mover: Card, base: Card) {
	if (base.rank - mover.rank != 1) {
		return false;
	}

	if (Color(mover.suit) == Color(base.suit)) {
		return false;
	}

	return true;
}

export function canMoveOntoFinal(mover: Card, base: Card) {
	if (mover.suit != base.suit) {
		return false;
	}

	if (mover.rank - base.rank != 1) {
		return false;
	}

	return true;
}

export interface Card {
	suit: Suit;
	rank: number;
	revealed: boolean;
}

export function Setup() {
	let deck: Card[] = [];

	for (const suit in Suit) {
		for (let rank = 0; rank < 13; rank++) {
			deck.push({ suit: suit as Suit, rank: rank, revealed: true });
		}
	}

	deck = deck.sort(() => Math.random() - 0.5);

	const columns: Card[][] = new Array(7);

	for (let i = 0; i < columns.length; i++) {
		columns[i] = [];
		for (let j = 0; j < i + 1; j++) {
			const card = deck.pop()!;
			if (j != i) {
				card.revealed = false;
			}
			columns[i].push(card);
		}
	}

	return { deck, columns };
}
