export class Vec2 {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(v: Vec2): Vec2 {
		return new Vec2(this.x + v.x, this.y + v.y);
	}

	equals(v: Vec2): boolean {
		return this.x === v.x && this.y === v.y;
	}

	static north: Vec2 = new Vec2(0, 1);
	static south: Vec2 = new Vec2(0, -1);
	static east: Vec2 = new Vec2(1, 0);
	static west: Vec2 = new Vec2(-1, 0);
}
