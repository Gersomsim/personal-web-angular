import { Component, inject, linkedSignal, resource, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router'

import { Category } from '@features/categories/models'
import { CategoryService } from '@features/categories/services/category.service'
import { PostForm } from '@features/posts/components/post-form/post-form'
import { PostFormData } from '@features/posts/dto'
import { PostService } from '@features/posts/services'
import { TagService } from '@features/tags/services/tag.service'
import { map } from 'rxjs'

@Component({
	selector: 'app-create-post-page',
	imports: [PostForm],
	templateUrl: './create-post-page.html',
	styles: ``,
})
export class CreatePostPage {
	private route = inject(ActivatedRoute)
	private postService = inject(PostService)
	private tagService = inject(TagService)
	private categoryService = inject(CategoryService)
	loading = signal(false)
	reset = signal(false)
	category = signal<Category | null>(null)

	tagSearch = toSignal(this.route.queryParams.pipe(map(params => params['tag-search'] || '')))
	categorySearch = toSignal(this.route.queryParams.pipe(map(params => params['category-search'] || '')))

	tagsRes = resource({
		loader: () => this.tagService.getAll({ type: 'blog', search: this.tagSearch() }),
	})
	categoriesRes = resource({
		loader: () => this.categoryService.get({ type: 'blog', search: this.categorySearch() }),
	})
	tags = linkedSignal(() => {
		return this.tagsRes.value()?.items ?? []
	})
	categories = linkedSignal(() => {
		return this.categoriesRes.value()?.items ?? []
	})

	async onSubmit(value: PostFormData) {
		this.toggleLoading()
		try {
			await this.postService.create(value)
			this.reset.set(true)
			setTimeout(() => {
				this.reset.set(false)
			}, 100)
			this.toggleLoading()
		} catch (error) {
			this.toggleLoading()
		}
	}
	toggleLoading() {
		this.loading.update(v => !v)
	}
	async createCategory(name: string) {
		const category = await this.categoryService.create({ name, type: 'blog' })
		this.category.set(category)
		this.categories.set([...this.categories(), category])
	}
	async createTag(name: string) {
		const tag = await this.tagService.create({ name, type: 'blog' })
		this.tags.set([...this.tags(), tag])
	}
}
