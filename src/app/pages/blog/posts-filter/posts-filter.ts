import { Component, computed, effect, inject, resource } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router'

import { CategoryCard } from '@features/categories/components'
import { CategoryService } from '@features/categories/services/category.service'
import { PostsList } from '@features/posts/components'
import { PostService } from '@features/posts/services'
import { map } from 'rxjs'

@Component({
	selector: 'app-posts-filter',
	imports: [PostsList, CategoryCard],
	templateUrl: './posts-filter.html',
	styles: ``,
})
export class PostsFilter {
	private readonly postsService = inject(PostService)
	private readonly categoryService = inject(CategoryService)
	private readonly route = inject(ActivatedRoute)

	slug = toSignal(this.route.params.pipe(map(params => params['slug'])))
	type = toSignal(this.route.params.pipe(map(params => params['type'])))

	filter = computed(() => {
		if (this.type() === 'categories') {
			return { category: this.slug() }
		}
		return { tag: this.slug() }
	})

	categoryRes = resource({
		loader: () => this.categoryService.findOne(this.slug()),
	})

	postsRes = resource({
		loader: () => this.postsService.getAll(this.filter()),
	})

	posts = computed(() => {
		return this.postsRes.value()?.items
	})

	category = computed(() => {
		return this.categoryRes.value()
	})
	constructor() {
		effect(() => {
			const type = this.type()
			if (type) {
				this.reloadData()
			}
		})

		effect(() => {
			const slug = this.slug()
			if (slug) {
				this.reloadData()
			}
		})
	}
	reloadData() {
		this.getPosts()
		this.getCategory()
	}
	getPosts() {
		this.postsRes.reload()
	}
	getCategory() {
		this.categoryRes.reload()
	}
}
