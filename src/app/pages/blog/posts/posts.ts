import { Component, inject, resource, signal } from '@angular/core'

import {
	WidgetAuthor,
	WidgetAuthorSocial,
	WidgetCategories,
	WidgetNewsLetter,
	WidgetPopularPosts,
} from '@features/blog/components'
import { PostsList } from '@features/posts/components'
import { PostService } from '@features/posts/services'
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
	private readonly postsService = inject(PostService)
	categories = signal<any[]>([
		{ name: 'Tutoriales', slug: 'tutoriales', count: 5 },
		{ name: 'Arquitectura', slug: 'arquitectura', count: 3 },
		{ name: 'Performance', slug: 'performance', count: 4 },
		{ name: 'Notas de Proyectos', slug: 'notas-proyectos', count: 8 },
		{ name: 'Opinión', slug: 'opinion', count: 2 },
	])

	featuredPosts = signal<any[]>([])
	posts = signal<any[]>([])

	postRes = resource({
		loader: () => this.postsService.getAll(),
	})
}
