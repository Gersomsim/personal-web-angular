import { Component, signal } from '@angular/core'

import {
	WidgetAuthor,
	WidgetAuthorSocial,
	WidgetCategories,
	WidgetNewsLetter,
	WidgetPopularPosts,
} from '@features/blog/components'
import { CategoryCard } from '@features/categories/components'
import { PostsList } from '@features/posts/components'
import { Post } from '@features/posts/models'
import { SearchBox } from '@shared/components'

@Component({
	selector: 'app-posts-filter',
	imports: [
		PostsList,
		WidgetAuthor,
		WidgetCategories,
		WidgetNewsLetter,
		WidgetPopularPosts,
		WidgetAuthorSocial,
		SearchBox,
		CategoryCard,
	],
	templateUrl: './posts-filter.html',
	styles: ``,
})
export class PostsFilter {
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

	posts = signal<Post[]>([])
}
