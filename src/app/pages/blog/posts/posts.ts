import { Component, inject, resource } from '@angular/core'

import { PostsList } from '@features/posts/components'
import { PostService } from '@features/posts/services'

@Component({
	selector: 'app-posts',
	imports: [PostsList],
	templateUrl: './posts.html',
	styles: ``,
})
export class Posts {
	private readonly postsService = inject(PostService)

	postRes = resource({
		loader: () => this.postsService.getAll(),
	})
}
