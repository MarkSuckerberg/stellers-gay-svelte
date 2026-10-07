<script lang="ts">
	import {
		MarkdownComponents,
		MarkdownTokens,
		type MarkdownOptions,
		type Renderers
	} from '@magidoc/plugin-svelte-marked';

	import { marked } from 'marked';

	let { message }: { message: string } = $props();

	const renderers: Renderers = {
		//heading: MarkdownComponents.MarkdownHeading,
		blockquote: MarkdownComponents.MarkdownBlockquote,
		//list: MarkdownComponents.MarkdownList,
		//list_item: MarkdownComponents.MarkdownListItem,
		br: MarkdownComponents.MarkdownBr,
		code: MarkdownComponents.MarkdownCode,
		codespan: MarkdownComponents.MarkdownCodeSpan,
		//table: MarkdownComponents.MarkdownTable,
		//html: MarkdownComponents.MarkdownHtml,
		paragraph: MarkdownComponents.MarkdownParagraph,
		//link: MarkdownComponents.MarkdownLink,
		text: MarkdownComponents.MarkdownText,
		def: MarkdownComponents.MarkdownDfn,
		del: MarkdownComponents.MarkdownDel,
		em: MarkdownComponents.MarkdownEm,
		hr: MarkdownComponents.MarkdownHr,
		strong: MarkdownComponents.MarkdownStrong,
		//image: MarkdownComponents.MarkdownImage,
		space: MarkdownComponents.MarkdownSpace,
		escape: MarkdownComponents.MarkdownSpace
	};

	const options = { baseUrl: '/' } as unknown as MarkdownOptions;
</script>

<p>
	<MarkdownTokens {renderers} {options} tokens={marked.Lexer.lexInline(message)} />
</p>
