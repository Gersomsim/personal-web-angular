import { NgClass } from '@angular/common'
import { Component, DestroyRef, inject, signal } from '@angular/core'
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, RouterLink } from '@angular/router'

import { SeoService } from '@core/services'
import { environment } from '@env/environment'
import { WidgetAuthor, WidgetSharePost, WidgetToc } from '@features/blog/components'
import { PostDetail } from '@features/posts/components'
import { Post } from '@features/posts/models'
import { PostService } from '@features/posts/services'
import { map, timer } from 'rxjs'

@Component({
	selector: 'app-post',
	imports: [RouterLink, PostDetail, WidgetToc, WidgetSharePost, WidgetAuthor, NgClass],
	templateUrl: './post.html',
	styles: ``,
})
export class PostPage {
	private readonly postService = inject(PostService)
	private readonly route = inject(ActivatedRoute)
	private readonly seoService = inject(SeoService)
	private readonly destroyRef = inject(DestroyRef)

	withSideBar = ''
	isLoading = signal(true)
	post = signal<Post | undefined>(undefined)

	slug = toSignal(this.route.params.pipe(map(params => params['slug'])))
	ngOnInit() {
		this.getPost()
	}

	async getPost() {
		try {
			const post = await this.postService.getBySlug(this.slug())
			this.isLoading.set(false)
			this.post.set(post)
			this.setTags()
			this.autoRead()
		} catch (error) {
			this.isLoading.set(false)
		}
	}

	autoRead() {
		const SEG = 10000
		timer(SEG)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.markAsRead()
			})
	}

	markAsRead() {
		this.postService.markAsReaded(this.post()!.id!)
	}

	copied = signal(false)

	copyCode(code: string) {
		navigator.clipboard.writeText(code)
		this.copied.set(true)
		setTimeout(() => this.copied.set(false), 2000)
	}
	setTags() {
		const post = this.post()
		if (!post) return
		this.seoService.AddTags({
			title: post.title,
			description: post.descriptionSeo,
			keywords: post.keywordsSeo.split(','),
			type: 'article',
			url: `https://${environment.domain}/blog/${this.slug()}`,
			image: post.image,
		})
	}
}
