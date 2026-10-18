import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeImageToolkit from 'rehype-image-toolkit';
import remarkToc from 'remark-toc';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit({
			alias: { $lib: 'src/lib' },
			preprocess: [
				mdsvex({
					extensions: ['.md', '.svx'],
					remarkPlugins: [remarkToc],
					rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeImageToolkit]
				}),
				vitePreprocess()
			],
			adapter: adapter({
				platformProxy: {
					configPath: undefined,
					environment: undefined,
					persist: undefined
				},
				fallback: 'plaintext',
				routes: {
					include: ['/*'],
					exclude: ['<all>']
				}
			}),
			extensions: ['.svelte', '.svx', '.md']
		})
	],
	build: {
		assetsInlineLimit(filePath, content) {
			return filePath.includes('88x31') ? false : null;
		}
	}
});
