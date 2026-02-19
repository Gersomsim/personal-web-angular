import { Component, ViewEncapsulation, computed, inject, input } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

import { marked } from 'marked'

function slugify(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^\w\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-')
}

function stripTags(html: string): string {
	return html.replace(/<[^>]+>/g, '')
}

@Component({
	selector: 'app-markdown',
	template: `<div class="md-prose" [innerHTML]="safeHtml()" (click)="onProseClick($event)"></div>`,
	styleUrl: './markdown.css',
	encapsulation: ViewEncapsulation.None,
})
export class MarkdownRenderer {
	private sanitizer = inject(DomSanitizer)

	content = input<string | null>(null)

	// Raw code blocks stored for copy-on-click, rebuilt on each content change
	private codeBlocks: string[] = []

	safeHtml = computed(() => {
		const md = this.content()
		if (!md) return ''

		this.codeBlocks = []

		// 1. Parse markdown → raw HTML (GFM enabled)
		let html = marked.parse(md, { gfm: true }) as string

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
				const index = this.codeBlocks.length
				this.codeBlocks.push(rawCode)
				return (
					`<div class="md-code-block">` +
					`<div class="md-code-header">` +
					`<span class="md-code-lang">${language} </span><button class="md-code-copy cursor-pointer" data-index="${index}">Copiar </button>` +
					`</div>` +
					`<pre><code>${escapedCode}</code></pre>` +
					`</div>`
				)
			},
		)
		return this.sanitizer.bypassSecurityTrustHtml(html) ?? ''
	})

	onProseClick(event: Event): void {
		const target = event.target as HTMLElement
		const btn = target.closest('.md-code-copy') as HTMLElement | null
		if (!btn) return

		const index = Number(btn.dataset['index'])
		const code = this.codeBlocks[index]

		if (code === undefined) return

		navigator.clipboard.writeText(code).then(() => {
			btn.textContent = '✓ Copiado'
			btn.classList.add('md-code-copy--copied')
			setTimeout(() => {
				btn.textContent = 'Copiar'
				btn.classList.remove('md-code-copy--copied')
			}, 2000)
		})
	}
}
