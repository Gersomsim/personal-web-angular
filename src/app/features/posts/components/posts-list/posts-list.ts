import { Component, input } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Post } from '@features/posts/models'
import { TagsList } from '@features/tags/components/tags-list/tags-list'

@Component({
	selector: 'app-posts-list',
	imports: [RouterLink, TagsList],
	templateUrl: './posts-list.html',
	styles: ``,
})
export class PostsList {
	posts = input<Post[] | null | undefined>()
}
