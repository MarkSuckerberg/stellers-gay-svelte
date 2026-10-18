enum Direction {
	NW,
	N,
	NE,
	W,
	// self
	E,
	SW,
	S,
	SE
}

export interface Coords {
	x: number;
	y: number;
}

export interface Dimensions {
	width: number;
	height: number;
}

export type Pixel = Coords & {
	color: number;
};

export function get1DPosition2D(x: number, y: number, width: number) {
	return (x % width) + y * width;
}

export function getBit(bit: number, byte: number) {
	return Boolean((byte & getByteMask(bit)) >> bit);
}

export function getByteMask(bit: number) {
	return 1 << (bit % 8);
}

export function getByte64Mask(bit: number) {
	return 1 << (bit % 64);
}

export function getByte64MaskInv(bit: number) {
	return 0xffffffff ^ (1 << (bit % 64));
}

export class BinGrid {
	readonly array: Uint8Array;
	readonly data: ArrayBuffer;
	readonly size: Dimensions;
	readonly width: number;
	readonly height: number;

	public constructor({ width, height }: Dimensions, array: Uint8Array | undefined = undefined) {
		this.size = { width, height };
		this.width = width;
		this.height = height;

		this.data = new ArrayBuffer(Math.ceil((width * height) / 8));
		this.array = new Uint8Array(this.data);
	}

	public get({ x, y }: Coords) {
		const bitPos = get1DPosition2D(x, y, this.width);
		const bytePos = Math.floor(x / 8);

		return getBit(bitPos, this.array[bytePos]);
	}

	public getCell({ x, y }: Coords) {}

	public set({ x, y }: Coords) {}

	public clear({ x, y }: Coords) {}
}

export class NeighMap {
	readonly data: ArrayBuffer;
	readonly array: Int8Array;

	readonly neighData: ArrayBuffer;
	readonly neighArray: Int8Array;

	readonly size: Dimensions;
	readonly width: number;
	readonly height: number;

	public constructor({ width, height }: Dimensions) {
		this.size = { width, height };
		this.width = width;
		this.height = height;

		this.data = new ArrayBuffer(width * height);
		this.array = new Int8Array(this.data);

		this.neighData = new ArrayBuffer(width * height);
		this.neighArray = new Int8Array(this.neighData);
	}

	public set({ x, y }: Coords) {
		if (0 > x || x > this.width || 0 > y || y > this.height) {
			throw Error('Invalid pixel position!');
		}
		const position = get1DPosition2D(x, y, this.width);

		this.array[position] = 1;


	}

	public getValue({ x, y }: Coords) {
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
		const neighbors = 0;

		if (y != 0) {
			const above = this.getRow(y - 1, x - 1, 3);
			above.
		}
	}
}

export class ArrayGrid {
	readonly data: ArrayBuffer;
	readonly array: Int8Array;
	readonly size: Dimensions;
	readonly width: number;
	readonly height: number;

	public constructor({ width, height }: Dimensions, array: Int8Array | undefined = undefined) {
		this.size = { width, height };
		this.width = width;
		this.height = height;

		this.array = array || new Int8Array(width * height);
	}

	public set({ x, y }: Coords, value: number) {
		if (0 > x || x > this.width || 0 > y || y > this.height) {
			throw Error('Invalid pixel position!');
		}
		//this.grid[y][x] = color;

		const position = get1DPosition2D(x, y, this.width);

		this.array[position] = value;
	}

	public get({ x, y }: Coords) {
		if (0 > x || x > this.width || 0 > y || y > this.height) {
			throw Error('Invalid pixel position!');
		}
		//return this.grid[y][x]

		const position = get1DPosition2D(x, y, this.width);

		return this.array[position];
	}

	public getRow(row: number, skip: number, count: number) {
		const rowPos = row * this.width;
		const length = Math.max(Math.min(this.width - skip, count), 0);

		return this.array.subarray(rowPos + skip, length);
	}

	public neighbors({ x, y }: Coords) {
		const neighbors = 0;

		if (y != 0) {
			const above = this.getRow(y - 1, x - 1, 3);
			above.
		}
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
		array: Uint8Array,
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

		this.array = new ArrayGrid({ width, height }, array);

		this.setData(array);
	}

	public get rect() {
		this._rect = this._rect ?? this.canvas.getBoundingClientRect();

		return this._rect;
	}

	public invalidateRect() {
		this._rect = undefined;
	}

	public setPixel(pixel: Coords) {
		const { x, y } = pixel;

		this.array.set(pixel);

		this.context.fillRect(x, y, 1, 1);
	}

	public setPixels(pixels: Coords[]) {
		Array.prototype.forEach.call(pixels, (pixel) => this.setPixel(pixel));
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

	public setAtScreen(screenCoords: Coords, color: number) {
		const { x, y } = this.fromScreen(screenCoords);
		this.setPixel({ x, y, color });
	}

	public setData(rawMap: Uint8Array) {
		const map = new Uint8Array(rawMap);
		const result = new Uint32Array(map.length);

		map.forEach((value, idx) => {
			result[idx] = colorsBackwards[value];
		});

		const data = new ImageData(new Uint8ClampedArray(result.buffer), this.width, this.height);
		this.context.putImageData(data, 0, 0);
	}

	public getPixel({ x, y }: Coords) {
		return this.array.get(x, y);
	}
}
