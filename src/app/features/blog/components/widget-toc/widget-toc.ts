import { CommonModule } from '@angular/common'
import { Component, OnDestroy, effect, input, signal } from '@angular/core'

import { Post } from '@features/posts/models'

interface TocItem {
	id: string
	text: string
	level: string
}

@Component({
	selector: 'app-widget-toc',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './widget-toc.html',
	host: {
		class: 'block',
	},
})
export class WidgetToc implements OnDestroy {
	post = input<Post>()
	loading = input<boolean>(true)
	activeSection = signal<string>('')

	items = signal<TocItem[]>([])

	private observer?: IntersectionObserver

	constructor() {
		effect(() => {
			const md = this.post()?.content
			if (md) {
				this.extractHeadersFromMarkdown(md)
			}
		})
	}

	private extractHeadersFromMarkdown(md: string) {
		// 1. Limpiar bloques de código para evitar falsos positivos
		// Esta regex elimina todo desde ``` hasta el siguiente ```
		const cleanMd = md.replace(/```[\s\S]*?```/g, '')

		// 2. Ahora buscamos los encabezados solo en el contenido real
		const headerRegex = /^(#{2,3})\s+(.*)$/gm
		const newItems: TocItem[] = []
		let match

		while ((match = headerRegex.exec(cleanMd)) !== null) {
			const level = match[1].length
			const text = match[2].trim()

			// Generar ID (slugify)
			const id = this.slugify(text)

			newItems.push({
				id,
				text,
				level: `H${level}`,
			})
		}

		this.items.set(newItems)
		setTimeout(() => this.setupIntersectionObserver(), 300)
	}

	// Extraemos la lógica de slugify para que sea más limpia
	private slugify(text: string): string {
		return text
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/--+/g, '-')
			.trim()
	}

	private setupIntersectionObserver() {
		if (this.observer) this.observer.disconnect()

		this.observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
						this.activeSection.set(entry.target.id)
					}
				})
			},
			{ rootMargin: '-80px 0px -80% 0px', threshold: 0.5 },
		)

		this.items().forEach(item => {
			const el = document.getElementById(item.id)
			if (el) this.observer?.observe(el)
		})
	}

	scrollTo(event: Event, id: string) {
		event.preventDefault()
		const element = document.getElementById(id)
		if (element) {
			// Offset opcional si tienes un header fijo
			const yOffset = -100
			const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
			window.scrollTo({ top: y, behavior: 'smooth' })

			window.history.pushState({}, '', `#${id}`)
			this.activeSection.set(id)
		}
	}

	ngOnDestroy() {
		this.observer?.disconnect()
	}
}
