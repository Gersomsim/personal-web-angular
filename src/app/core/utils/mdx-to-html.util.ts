import { marked } from 'marked'

import { slugify } from './slugify.util'

export const mdxToHtml = async (mdxContent: string) => {
	// 1. Parse markdown → raw HTML (GFM enabled)
	let html = marked.parse(mdxContent, { gfm: true }) as string

	// 2. Add IDs to headings for future TOC support
	html = html.replace(/<h([1-6])>(.*?)<\/h\1>/gi, (_, depth, inner) => {
		const id = slugify(stripTags(inner))
		return `<h${depth} id="${id}">${inner}</h${depth}>`
	})

	// 3. Wrap <pre><code> blocks in our custom terminal UI with copy button
	html = html.replace(
		/<pre><code(?:\s+class="language-([^"]*)")?>([\s\S]*?)<\/code><\/pre>/g,
		(_, lang: string | undefined, escapedCode: string) => {
			const language = lang ?? 'code'
			const rawCode = escapedCode
				.replace(/&amp;/g, '&')
				.replace(/&lt;/g, '<')
				.replace(/&gt;/g, '>')
				.replace(/&quot;/g, '"')
				.replace(/&#39;/g, "'")

			return (
				`<div class="md-code-block">` +
				`<div class="md-code-header">` +
				`<span class="md-code-lang">${language} </span><button class="md-code-copy cursor-pointer">Copiar </button>` +
				`</div>` +
				`<pre><code>${escapedCode}</code></pre>` +
				`</div>`
			)
		},
	)
}

function stripTags(html: string): string {
	return html.replace(/<[^>]+>/g, '')
}
