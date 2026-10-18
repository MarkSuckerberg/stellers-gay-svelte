interface Bird {
	name: string;
	desc?: string;
	buyMessage?: string;
	cost: number;
	generated: number;
}

interface SaveData {
	money: number;
	seeds: number;
	thrown: number;
	boughtBirds: number[];
	boughtUpgrades: number[];
	messages: string[];
	nextBird: number;
}

export const birds: Bird[] = [
	{
		name: 'Sparrow',
		buyMessage:
			'A sparrow happily hops over and pecks at the small pile of seeds. They drop a tiny coin in the process.',
		cost: 5,
		generated: 0.002
	},
	{
		name: 'Finch',
		cost: 25,
		generated: 0.008
	},
	{
		name: 'Duck',
		cost: 100,
		buyMessage:
			"The ducks now seek a kind of bread that's only spiritually unhealthy for them.",
		generated: 0.02
	},
	{
		name: 'Chickadee',
		cost: 500,
		buyMessage: '',
		generated: 0.08
	},
	{
		name: 'Dove',
		cost: 1200,
		buyMessage:
			'The alleged messenger of peace swoops down and immediately starts slapping the other birds away. They seem to bear a hefty collection of trinkets, at least.',
		generated: 0.25
	},
	{
		name: 'Jay',
		cost: 3000,
		buyMessage:
			'A strangely familiar bird, the jay screams loudly and startles the small feathery moneymaking operation around you. But they seem to have a keen eye for shinies.',
		generated: 0.75
	},
	{
		name: 'Woodpecker',
		cost: 5000,
		buyMessage:
			'You hear a rattling of bark being drummed, and then a flash of bright red swoops down to collect some seeds.',
		generated: 1
	},
	{
		name: 'Crow',
		cost: 10000,
		buyMessage:
			'Masters of the shiny, the crows finally deem you a worthy trading partner. They somehow seem to have realized you appreciate paper bills the most.',
		generated: 2
	},
	{
		name: 'Osprey',
		cost: 15000,
		buyMessage:
			'Fish pellets are not exactly seeds, but you bought them anyways. Two wide-open eyes ponder you for a moment before a distant squeaking draws them back again.',
		generated: 5
	},
	{
		name: 'Hawk',
		cost: 30000,
		generated: 15
	},
	{
		name: 'Owl',
		cost: 50000,
		generated: 40
	},
	{
		name: 'Raven',
		cost: 75000,
		generated: 90
	}
];

interface Upgrade {
	name: string;
	desc: string;
	cost: number;
	max?: number;
	onBuy(game: BirdSeedState, amt?: number): void;
}

export const Upgrades: Upgrade[] = [
	{
		name: 'Bird feeder',
		desc: "Dispenses seed so you don't have to.",
		cost: 0.5,
		onBuy(game: BirdSeedState, amt = 1) {
			game.autoDispense += amt;
		}
	},
	{
		name: 'Bigger scoop',
		desc: 'Throw more seeds at once!',
		cost: 0.5,
		onBuy(game: BirdSeedState, amt = 1) {
			game.clickValue += amt;
		}
	},
	{
		name: 'Bigger bags',
		desc: 'Increase the amount of seeds you can buy in one order.',
		cost: 1,
		onBuy(game: BirdSeedState, amt = 1) {
			game.buyAmount += amt * 10;
		}
	},
	{
		name: 'Auto-delivery',
		desc: 'Automatically buy seeds when you have the money available.',
		cost: 2.5,
		onBuy(game: BirdSeedState, amt = 1) {
			game.autoBuy += amt;
		}
	},
	{
		name: 'Bulk Seed Discount',
		desc: 'Get a slight discount on the price of each seed by buying in bulk.',
		cost: 10,
		max: 5,
		onBuy(game: BirdSeedState, amt = 1) {
			game.buyCost -= amt * 0.001;
		}
	},
	{
		name: 'Better quality seed',
		desc: '(does nothing, ignore my ideas here) Reduces the cost scaling for additional birds ??? Allows you to buy more birds ??? allows you to buy more birds of a single type',
		cost: 10000000000,
		max: 1,
		onBuy(game: BirdSeedState, amt = 1) {
			if (!amt) return;
			game.messages.unshift('Why did you buy this?? And how??');
			game.messages.unshift('Uhh, I dunno, the birds seem to enjoy the seed 10% more.');
		}
	},
	{
		name: 'Binoculars',
		desc: 'See the next unlocked bird earlier.',
		cost: 1,
		onBuy(game: BirdSeedState, amt = 1) {
			game.nextBird += amt;
		}
	}
];

export class BirdSeedState {
	public seeds = $state(10);
	public thrown = $state(0);
	public money = $state(0);

	public allSeeds = $derived(this.seeds + this.thrown);

	public clickValue = $state(1);

	public autoDispense = $state(0);
	public autoBuy = $state(0);

	public buyCost = $state(0.01);
	public buyAmount = $state(10);

	public messages: string[] = $state([
		'You sit on a park bench with a small handful of seeds. You know what to do.'
	]);

	public boughtBirds = $state(new Array<number>(birds.length).fill(0));
	public boughtUpgrades = $state(new Array<number>(Upgrades.length).fill(0));

	public perSecond = $state(new Array<number>(birds.length).fill(0));

	public totalPerSecond = $state(0);

	public nextBird = $state(1);

	public scale = (initialCost: number, level: number) => initialCost * Math.pow(2, level);

	public buySeed(amount = this.buyAmount) {
		const toBuy = Math.min(Math.floor(this.money / this.buyCost), amount);

		this.seeds += toBuy;
		this.money -= toBuy * this.buyCost;

		if (this.allSeeds >= birds[this.nextBird].cost) {
			this.nextBird++;
		}
	}

	private ticker: NodeJS.Timeout | undefined = $state();
	private tickCount = 0;

	public Start() {
		if (this.ticker != undefined) return;

		window.onbeforeunload = () => this.Save();
		document.onvisibilitychange = () => this.Save();

		this.ticker = setInterval(() => {
			this.tickCount++;
			this.money += this.totalPerSecond / 10;

			if (this.tickCount % 10 == 0) {
				const dispensed = Math.floor(Math.min(this.autoDispense, this.seeds));
				if (dispensed > 0) this.throwSeeds(dispensed);

				const bought = Math.floor(Math.min(this.autoBuy, this.money / this.buyCost));
				if (bought > 0) {
					this.buySeed(bought);
				}

				this.Save();
			}
		}, 100);
	}

	public Pause() {
		clearInterval(this.ticker);
		this.ticker = undefined;
	}

	public buyBird(idx: number) {
		const bird = birds[idx];
		const owned = this.boughtBirds[idx];
		const cost = this.scale(bird.cost, owned);

		if (this.thrown < cost) return;

		if (owned == 0 && bird.buyMessage) {
			this.messages.unshift(bird.buyMessage);
		}

		this.thrown -= cost;
		this.boughtBirds[idx] = owned + 1;
		this.perSecond[idx] = bird.generated * (owned + 1);

		this.totalPerSecond = this.perSecond.reduce((prev, curr) => prev + curr);
	}

	public buyUpgrade(idx: number) {
		const upgrade = Upgrades[idx];
		const owned = this.boughtUpgrades[idx];
		const cost = this.scale(upgrade.cost, owned);

		if (upgrade.max && owned >= upgrade.max) return;
		if (this.thrown < cost) return;

		this.money -= cost;
		upgrade.onBuy(this);
		this.boughtUpgrades[idx] = owned + 1;
	}

	public throwSeeds(amount = this.clickValue) {
		const toThrow = Math.min(this.seeds, amount);

		if (toThrow == 0) return;

		this.seeds -= toThrow;
		this.thrown += toThrow;
	}

	public Save() {
		const data: SaveData = {
			money: this.money,
			seeds: this.seeds,
			thrown: this.thrown,
			boughtBirds: this.boughtBirds,
			messages: this.messages.slice(0, 10),
			boughtUpgrades: this.boughtUpgrades,
			nextBird: this.nextBird
		};

		localStorage.setItem('birdClickerSave', JSON.stringify(data));
	}

	public Load() {
		const loaded = localStorage.getItem('birdClickerSave');

		if (!loaded) return;

		const data = JSON.parse(loaded) as Partial<SaveData>;

		this.money = data.money || 0;
		this.seeds = data.seeds || 0;
		this.thrown = data.thrown || 0;

		this.boughtBirds = new Array<number>(birds.length).fill(0);
		this.perSecond = new Array<number>(birds.length).fill(0);
		this.totalPerSecond = 0;

		data.boughtBirds?.forEach((bought, idx) => {
			if (idx >= birds.length) return;

			const bird = birds[idx];
			this.boughtBirds[idx] = bought;
			this.perSecond[idx] = bird.generated * bought;
			this.totalPerSecond += bird.generated * bought;
		});

		this.messages = data.messages || [];

		this.boughtUpgrades = new Array<number>(Upgrades.length).fill(0);
		data.boughtUpgrades?.forEach((bought, idx) => {
			if (idx >= Upgrades.length) return;

			const upgrade = Upgrades[idx];
			this.boughtUpgrades[idx] = bought;
			upgrade.onBuy(this, bought);
		});

		this.nextBird = data.nextBird || 1;
	}

	public Reset() {
		if (!confirm('Are you sure you want to reset?')) return;

		this.Pause();

		const backup = localStorage.getItem('birdClickerSave');
		if (backup) {
			localStorage.removeItem('birdClickerSave');
			localStorage.setItem('backupBirdClicker', backup);
		}

		this.money = 0;
		this.seeds = 10;
		this.thrown = 0;
		this.boughtBirds = new Array<number>(birds.length).fill(0);
		this.perSecond = new Array<number>(birds.length).fill(0);
		this.boughtUpgrades = new Array<number>(Upgrades.length).fill(0);
		this.totalPerSecond = 0;
		this.nextBird = 1;
		this.autoBuy = 0;

		this.autoDispense = 0;
		this.buyAmount = 10;
		this.clickValue = 1;
		this.buyCost = 0.01;

		this.messages = [
			'You sit on a park bench with a small handful of seeds. You know what to do.'
		];

		this.Start();
	}
}
