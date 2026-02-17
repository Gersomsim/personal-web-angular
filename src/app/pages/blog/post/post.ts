import { Component, signal } from '@angular/core'
import { RouterLink } from '@angular/router'

import { PostDetail } from '@features/posts/components'
import { Post as PostModel } from '@features/posts/models'

interface TableOfContentsItem {
	id: string
	title: string
	level: number
}

@Component({
	selector: 'app-post',
	imports: [RouterLink, PostDetail],
	templateUrl: './post.html',
	styles: ``,
})
export class Post {
	copied = signal(false)
	activeSection = signal('el-problema')

	post = signal<PostModel>({
		id: 'como-optimice-una-consulta-sql-de-10s-a-200ms',
		title: 'Cómo optimicé una consulta SQL de 10s a 200ms',
		excerpt:
			'Historia real de cómo identificamos un cuello de botella en producción y las técnicas que usamos para resolverlo.',
		date: 'Feb 14, 2025',
		readTime: '8 min',
		author: {
			name: 'Gersom Hernández',
			image: '/assets/images/38233407.jpg',
		},
		category: 'Performance',
		tags: [
			{ id: '1', name: 'SQL', slug: 'sql' },
			{ id: '2', name: 'Performance', slug: 'performance' },
			{ id: '3', name: 'PostgreSQL', slug: 'postgresql' },
			{ id: '4', name: 'Optimización', slug: 'optimizacion' },
		],
		image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&h=600&fit=crop',
		featured: true,
		slug: 'como-optimice-una-consulta-sql-de-10s-a-200ms',
	})

	tableOfContents = signal<TableOfContentsItem[]>([
		{ id: 'el-problema', title: 'El Problema', level: 2 },
		{ id: 'diagnostico', title: 'Diagnóstico', level: 2 },
		{ id: 'identificando-cuello', title: 'Identificando el cuello de botella', level: 3 },
		{ id: 'solucion', title: 'La Solución', level: 2 },
		{ id: 'indices', title: 'Añadiendo índices correctos', level: 3 },
		{ id: 'refactorizando', title: 'Refactorizando la consulta', level: 3 },
		{ id: 'resultados', title: 'Resultados', level: 2 },
		{ id: 'conclusiones', title: 'Conclusiones', level: 2 },
	])

	scrollToSection(id: string) {
		this.activeSection.set(id)
		const element = document.getElementById(id)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}

	copyCode(code: string) {
		navigator.clipboard.writeText(code)
		this.copied.set(true)
		setTimeout(() => this.copied.set(false), 2000)
	}
}
