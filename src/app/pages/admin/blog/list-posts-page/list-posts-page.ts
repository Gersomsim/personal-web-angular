import { DatePipe } from '@angular/common'
import { Component, OnInit, inject, signal } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Post } from '@features/posts/models/post.model'
import { PostService } from '@features/posts/services/post.service'

@Component({
	selector: 'app-list-posts-page',
	imports: [RouterLink, DatePipe],
	templateUrl: './list-posts-page.html',
	styles: ``,
})
export class ListPostsPage implements OnInit {
	private postService = inject(PostService)

	posts = signal<Post[]>([])
	loading = signal(true)
	error = signal<string | null>(null)

	async ngOnInit() {
		try {
			const response = await this.postService.getAll()
			this.posts.set(response.items ?? [])
		} catch {
			this.error.set('No se pudieron cargar los posts.')
		} finally {
			this.loading.set(false)
		}
	}

	onDelete(post: Post) {
		// TODO: implementar eliminación con confirmación
		console.log('Delete post:', post.slug)
	}
}
