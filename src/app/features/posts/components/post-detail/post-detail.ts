import { Component, input, signal } from '@angular/core'

import { Post } from '@features/posts/models'
import { TagsList } from '@features/tags/components/tags-list/tags-list'

@Component({
	selector: 'app-post-detail',
	imports: [TagsList],
	templateUrl: './post-detail.html',
	styles: ``,
})
export class PostDetail {
	copied = signal(false)
	post = input<Post>()

	copyCode(code: string) {
		navigator.clipboard.writeText(code)
		this.copied.set(true)
		setTimeout(() => this.copied.set(false), 2000)
	}
}
