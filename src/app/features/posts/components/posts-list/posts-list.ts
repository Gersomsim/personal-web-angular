import { Component, input } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Post } from '@features/posts/models'

@Component({
	selector: 'app-posts-list',
	imports: [RouterLink],
	templateUrl: './posts-list.html',
	styles: ``,
})
export class PostsList {
	posts = input<Post[] | null | undefined>()
}
