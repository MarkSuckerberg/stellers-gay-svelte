export interface BlogMeta {
	title: string;
	date: string;
	draft?: boolean;
	updated?: string;
	tags?: string[];
	imageUrl?: string;
	summary?: string;
	externalUrl?: string;
	authors?: {
		name?: string;
		url?: string;
		avatar?: string;
	}[];
}

export function SlugFromImport(importString: string) {
	return importString.split('/').at(-1)!.replace('.md', '');
}

export function GetAllPosts(desc = true) {
	const pages = Object.entries(
		import.meta.glob<Partial<BlogMeta> | undefined>('../routes/blog/*.md', {
			eager: true,
			import: 'metadata'
		})
	);

	const filtered = pages.map(([title, meta]) => [
		SlugFromImport(title),
		{ ...meta, title: meta?.title || title, date: meta?.date || '2345-6-7' }
	]) as [string, BlogMeta][];

	if (desc) {
		filtered.sort((a, b) => {
			return (
				new Date(b[1].date).getTime() - new Date(a[1].date).getTime() || b[0].localeCompare(a[0])
			);
		});
	} else {
		filtered.sort((a, b) => {
			return (
				new Date(a[1].title).getTime() - new Date(b[1].date).getTime() || a[0].localeCompare(b[0])
			);
		});
	}

	const values = filtered.filter(([title, meta]) => !meta.draft);

	return values;
}

/*
export function SlugFromImport(importString: string): {
	route: '/blog/[slug]';
	params: { slug: string };
} {
	return {
		route: '/blog/[slug]',
		params: { slug: importString.split('/').at(-1)!.replace('.md', '') }
	};
}
    */
