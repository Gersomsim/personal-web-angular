import { Component, inject, resource, signal } from '@angular/core'

import { SeoService } from '@core/services'
import { environment } from '@env/environment'
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
	private readonly seoService = inject(SeoService)
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

	constructor() {
		this.seoService.AddTags({
			title: 'Blog de Ingeniería de Software | Insights de Angular y Arquitectura',
			description:
				'Artículos técnicos sobre desarrollo frontend, retos de arquitectura y liderazgo de equipos. Documentando el aprendizaje de 10 años en la industria.',
			keywords: [
				'Blog Desarrollo Web',
				'Tutoriales Angular Avanzado',
				'Decisiones de Arquitectura',
				'Liderazgo Técnico Blog',
				'Mejores Prácticas Software',
			],
			type: 'website',
			url: `https://${environment.domain}/blog`,
		})
	}
}
