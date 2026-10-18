export interface Coords {
	x: number;
	y: number;
}

export interface Dimensions {
	width: number;
	height: number;
}

export function get1DPosition2D(x: number, y: number, width: number) {
	return (x % width) + y * width;
}

export class ArrayGrid {
	readonly array: Uint8Array;
	readonly size: Dimensions;
	readonly width: number;
	readonly height: number;

	public constructor({ width, height }: Dimensions, array: Uint8Array | undefined = undefined) {
		this.size = { width, height };
		this.width = width;
		this.height = height;

		this.array = array || new Uint8Array(width * height);
	}

	public set({ x, y }: Coords, value: number) {
		if (0 > x || x > this.width || 0 > y || y > this.height) {
			throw Error('Invalid pixel position!');
		}

		const position = get1DPosition2D(x, y, this.width);

		this.array[position] = value;
	}

	public get({ x, y }: Coords) {
		if (0 > x || x > this.width || 0 > y || y > this.height) {
			throw Error('Invalid pixel position!');
		}

		const position = get1DPosition2D(x, y, this.width);

		return this.array[position];
	}

	public getRow(row: number, skip: number, count: number) {
		const rowPos = row * this.width;
		const length = Math.max(Math.min(this.width - skip, count), 0);

		return this.array.subarray(rowPos + skip, length);
	}

	public neighbors({ x, y }: Coords) {
		let neigh = 0;

		for (let neighX = x - 1; neighX <= x + 1; neighX++) {
			if (neighX < 0 || neighX >= this.width) {
				continue;
			}

			for (let neighY = y - 1; neighY <= y + 1; neighY++) {
				if (neighY < 0 || neighY >= this.width) {
					continue;
				}

				if (neighY == y && neighX == x) {
					continue;
				}

				neigh += this.get({ x: neighX, y: neighY });
			}
		}

		return neigh;
	}
}

export class PixelCanvas {
	public readonly canvas: HTMLCanvasElement;
	public readonly context: CanvasRenderingContext2D;
	public readonly array: ArrayGrid;

	public readonly width: number = $state(64);
	public readonly height: number = $state(64);
	public readonly size: Dimensions = $state({ width: 64, height: 64 });

	private _rect: DOMRect | undefined;

	public constructor(
		canvas: HTMLCanvasElement,
		{ width, height }: Dimensions,
		options: CanvasRenderingContext2DSettings | undefined = undefined
	) {
		this.width = width;
		this.height = height;
		this.size = { width, height };

		canvas.width = width;
		canvas.height = height;

		this.canvas = canvas;
		const getContext = canvas.getContext('2d', options);

		if (!getContext) {
			throw Error('Unable to get canvas context!');
		}

		this.context = getContext;
		this.context.imageSmoothingEnabled = false;

		this._rect = $state(this.canvas.getBoundingClientRect());

		this.array = new ArrayGrid({ width, height });

		this.canvas.onmousedown = this.onMouseDown;
		this.canvas.onpointerdown = this.onMouseDown;
		this.canvas.onmousemove = this.onMouseMove;
		this.canvas.onpointermove = this.onMouseMove;
	}

	onMouseDown = (ev: MouseEvent) => {
		if (!(ev.buttons & 1)) {
			return;
		}

		const coords = this.fromScreenEvent(ev);

		if (this.getPixel(coords)) {
			this.clearPixel(coords);
		} else {
			this.setPixel(coords);
		}

		ev.preventDefault();
	};

	onMouseMove = (ev: MouseEvent) => {
		if (!(ev.buttons & 1)) {
			return;
		}

		this.setAtScreen({ x: ev.clientX, y: ev.clientY });

		ev.preventDefault();
	};

	public get rect() {
		this._rect = this._rect ?? this.canvas.getBoundingClientRect();

		return this._rect;
	}

	public invalidateRect() {
		this._rect = undefined;
	}

	public setPixel(pixel: Coords) {
		const { x, y } = pixel;

		this.array.set(pixel, 1);

		this.context.fillRect(x, y, 1, 1);
	}

	public clearPixel(pixel: Coords) {
		const { x, y } = pixel;

		this.array.set(pixel, 0);

		this.context.clearRect(x, y, 1, 1);
	}

	public fromScreenEvent(
		event: MouseEvent | PointerEvent,
		bounds: DOMRect = this.rect,
		floored = true
	) {
		return this.fromScreen({ x: event.clientX, y: event.clientY }, bounds, floored);
	}

	public fromScreen({ x, y }: Coords, bounds: DOMRect = this.rect, floored = true): Coords {
		const boardX = (x - bounds.left) / (bounds.width / this.width);
		const boardY = (y - bounds.top) / (bounds.height / this.height);

		return {
			x: floored ? Math.floor(boardX) : boardX,
			y: floored ? Math.floor(boardY) : boardY
		};
	}

	public toScreen(
		boardX: number,
		boardY: number,
		offset: { x: number; y: number },
		scale: number
	) {
		if (scale < 0) {
			boardX -= this.width - 1;
			boardY -= this.height - 1;
		}
		return {
			x: (boardX + offset.x - (this.width - window.innerWidth / scale) / 2) * scale,
			y: (boardY + offset.y - (this.height - window.innerHeight / scale) / 2) * scale
		};
	}

	public setAtScreen(screenCoords: Coords) {
		const { x, y } = this.fromScreen(screenCoords);
		this.setPixel({ x, y });
	}

	public getPixel({ x, y }: Coords) {
		return this.array.get({ x, y });
	}

	public simulate(birthString = '3', surviveString = '23') {
		const copy = new ArrayGrid(this.size, Uint8Array.from(this.array.array));

		const births = birthString.split('').map((char) => Number.parseInt(char));
		const survives = surviveString.split('').map((char) => Number.parseInt(char));

		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.width; y++) {
				const value = copy.get({ x, y });

				const neigh = copy.neighbors({ x, y });

				if (!value && births.includes(neigh)) {
					this.array.set({ x, y }, 1);
					this.setPixel({ x, y });
					continue;
				}

				if (value && !survives.includes(neigh)) {
					this.array.set({ x, y }, 0);
					this.clearPixel({ x, y });
				}
			}
		}
	}
}
