import { DatePipe } from '@angular/common'
import { Component, input } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Post } from '@features/posts/models'
import { TagsList } from '@features/tags/components/tags-list/tags-list'
import { MarkdownRenderer } from '@shared/components'

@Component({
	selector: 'app-post-detail',
	imports: [TagsList, DatePipe, RouterLink, MarkdownRenderer],
	templateUrl: './post-detail.html',
	styles: ``,
	host: {
		style: 'display: block',
	},
})
export class PostDetail {
	post = input<Post>()
	loading = input<boolean>(true)
}
