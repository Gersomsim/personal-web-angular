import { NgClass } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, RouterLink } from '@angular/router'

import { WidgetAuthor, WidgetSharePost, WidgetToc } from '@features/blog/components'
import { PostDetail } from '@features/posts/components'
import { Post } from '@features/posts/models'
import { PostService } from '@features/posts/services'
import { map } from 'rxjs'

@Component({
	selector: 'app-post',
	imports: [RouterLink, PostDetail, WidgetToc, WidgetSharePost, WidgetAuthor, NgClass],
	templateUrl: './post.html',
	styles: ``,
})
export class PostPage {
	private readonly postService = inject(PostService)
	private readonly route = inject(ActivatedRoute)
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
		} catch (error) {
			this.isLoading.set(false)
		}
	}

	copied = signal(false)

	copyCode(code: string) {
		navigator.clipboard.writeText(code)
		this.copied.set(true)
		setTimeout(() => this.copied.set(false), 2000)
	}
}
