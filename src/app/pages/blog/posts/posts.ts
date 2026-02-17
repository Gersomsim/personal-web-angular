import { Component, computed, signal } from '@angular/core'

import {
	WidgetAuthor,
	WidgetAuthorSocial,
	WidgetCategories,
	WidgetNewsLetter,
	WidgetPopularPosts,
} from '@features/blog/components'
import { PostsList } from '@features/posts/components'
import { Post } from '@features/posts/models'
import { SearchBox } from '@shared/components'

@Component({
	selector: 'app-posts',
	imports: [
		PostsList,
		WidgetAuthor,
		WidgetPopularPosts,
		WidgetAuthorSocial,
		WidgetCategories,
		WidgetNewsLetter,
		SearchBox,
	],
	templateUrl: './posts.html',
	styles: ``,
})
export class Posts {
	searchQuery = signal('')

	categories = signal<any[]>([
		{ name: 'Tutoriales', slug: 'tutoriales', count: 5 },
		{ name: 'Arquitectura', slug: 'arquitectura', count: 3 },
		{ name: 'Performance', slug: 'performance', count: 4 },
		{ name: 'Notas de Proyectos', slug: 'notas-proyectos', count: 8 },
		{ name: 'Opinión', slug: 'opinion', count: 2 },
	])

	featuredPosts = signal<any[]>([
		{ title: 'Arquitectura de Componentes en Angular 17+', slug: 'arquitectura-componentes-angular' },
		{ title: 'Cómo optimicé una consulta SQL de 10s a 200ms', slug: 'optimizacion-sql' },
		{ title: 'Clean Architecture en Frontend: Guía Práctica', slug: 'clean-architecture-frontend' },
	])

	posts = signal<Post[]>([
		{
			id: '1',
			title: 'Cómo optimicé una consulta SQL de 10s a 200ms',
			excerpt:
				'Historia real de cómo identificamos un cuello de botella en producción y las técnicas que usamos para resolverlo sin cambiar la infraestructura.',
			date: 'Feb 14, 2025',
			readTime: '8 min',
			slug: 'optimizacion-sql',
			image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=450&fit=crop',
			tags: [
				{ id: '1', name: 'SQL', slug: 'sql' },
				{ id: '2', name: 'Performance', slug: 'performance' },
				{ id: '3', name: 'PostgreSQL', slug: 'postgresql' },
				{ id: '4', name: 'Optimización', slug: 'optimizacion' },
			],
			category: 'performance',
			featured: true,
			author: {
				name: 'Gersom Hernández',
				image: '/assets/images/38233407.jpg',
			},
		},
	])

	filteredPosts = computed(() => {
		const query = this.searchQuery().toLowerCase().trim()
		if (!query) return this.posts()

		return this.posts().filter(
			post =>
				post.title.toLowerCase().includes(query) ||
				post.excerpt.toLowerCase().includes(query) ||
				post.tags?.some(tag => tag.name.toLowerCase().includes(query)),
		)
	})

	updateSearch(event: Event) {
		const input = event.target as HTMLInputElement
		this.searchQuery.set(input.value)
	}
}
