import { Component, computed, inject, linkedSignal, resource, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'

import { Category } from '@features/categories/models'
import { CategoryService } from '@features/categories/services/category.service'
import { PostForm } from '@features/posts/components'
import { PostFormData } from '@features/posts/dto'
import { PostService } from '@features/posts/services'
import { TagService } from '@features/tags/services/tag.service'
import { ErrorCard } from '@shared/components'
import { map } from 'rxjs'

@Component({
	selector: 'app-edit-post-page',
	imports: [PostForm, ErrorCard],
	templateUrl: './edit-post-page.html',
	styles: ``,
})
export class EditPostPage {
	private route = inject(ActivatedRoute)
	private router = inject(Router)
	private postService = inject(PostService)
	private tagService = inject(TagService)
	private categoryService = inject(CategoryService)

	blogId = toSignal(this.route.params.pipe(map(params => params['id'])))

	postRes = resource({
		loader: () => this.postService.getBySlug(this.blogId()),
	})

	loading = signal(false)
	reset = signal(false)
	category = signal<Category | null>(null)

	post = computed(() => {
		return this.postRes.value()
	})

	tagsRes = resource({
		loader: () => this.tagService.getAll({ type: 'blog' }),
	})
	categoriesRes = resource({
		loader: () => this.categoryService.get({ type: 'blog' }),
	})
	tags = linkedSignal(() => {
		return this.tagsRes.value()?.items ?? []
	})
	categories = linkedSignal(() => {
		return this.categoriesRes.value()?.items ?? []
	})

	async onSubmit(value: PostFormData) {
		console.log(value)

		this.toggleLoading()
		try {
			await this.postService.update(this.blogId()!, value)
			this.router.navigate(['/admin/blog'])
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
