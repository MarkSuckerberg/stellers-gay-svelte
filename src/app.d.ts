// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: Env;
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties;
		}
	}

	declare module '*.md' {
		import type { Component } from 'svelte';

		export default class Comp extends Component {}

		export const metadata: Record<string, unknown>;
	}

	declare module '*as=img' {
		const img: {
			src: string;
			w: number;
			h: number;
			srcset?: string;
		};
		export default img;
	}

	declare module '*as=picture' {
		const img: {
			src: string;
			w: number;
			h: number;
		};
		const sources: Record<string, string>;

		export default {
			img,
			sources
		};
	}

	declare module '*as=meta' {
		interface OutputMetadata {
			src: string; // URL of the generated image
			width: number; // Width of the image
			height: number; // Height of the image
			format: string; // Format of the generated image

			// The following options are the same as sharps input options
			space: string; // Name of colour space interpretation
			channels: number; // Number of bands e.g. 3 for sRGB, 4 for CMYK
			density: number; //  Number of pixels per inch
			depth: string; // Name of pixel depth format
			hasAlpha: boolean; // presence of an alpha transparency channel
			hasProfile: boolean; // presence of an embedded ICC profile
			isProgressive: boolean; // indicating whether the image is interlaced using a progressive scan
		}

		const out: OutputMetadata;
		export default out;
	}

	declare module '*as=meta&multi' {
		export interface OutputMetadata {
			src: string; // URL of the generated image
			width: number; // Width of the image
			height: number; // Height of the image
			format: string; // Format of the generated image

			// The following options are the same as sharps input options
			space: string; // Name of colour space interpretation
			channels: number; // Number of bands e.g. 3 for sRGB, 4 for CMYK
			density: number; //  Number of pixels per inch
			depth: string; // Name of pixel depth format
			hasAlpha: boolean; // presence of an alpha transparency channel
			hasProfile: boolean; // presence of an embedded ICC profile
			isProgressive: boolean; // indicating whether the image is interlaced using a progressive scan
		}

		const out: OutputMetadata[];
		export default out;
	}

	declare module '*as=srcset' {
		const src: string;
		export default src;
	}

	declare module '*as=url' {
		const src: string;
		export default src;
	}

	declare module '*&multi' {
		const src: string[];
		export default src;
	}
}

export {};
