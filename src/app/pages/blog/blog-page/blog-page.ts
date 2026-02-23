import { Component, computed, inject, resource } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { SeoService } from '@core/services'
import { environment } from '@env/environment'
import { WidgetAuthor, WidgetAuthorSocial, WidgetCategories, WidgetPopularPosts } from '@features/blog/components'
import { CategoryService } from '@features/categories/services/category.service'
import { PostService } from '@features/posts/services'
import { SearchBox } from '@shared/components'

@Component({
	selector: 'app-blog-page',
	imports: [WidgetAuthor, WidgetPopularPosts, WidgetAuthorSocial, WidgetCategories, SearchBox, RouterOutlet],
	templateUrl: './blog-page.html',
	styles: ``,
})
export class BlogPage {
	private readonly postsService = inject(PostService)
	private readonly seoService = inject(SeoService)
	private readonly categoriesService = inject(CategoryService)

	categoryRes = resource({
		loader: () => this.categoriesService.get({ type: 'blog' }),
	})
	postsMostReadRes = resource({
		loader: () => this.postsService.getAll({ mostRead: true, limit: 5 }),
	})

	featuredPosts = computed(() => {
		return this.postsMostReadRes.value()?.items
	})

	categories = computed(() => {
		return this.categoryRes.value()?.items
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
