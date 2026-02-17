import { Component, input } from '@angular/core'

import { Post } from '@features/posts/models'

@Component({
	selector: 'app-widget-popular-posts',
	imports: [],
	templateUrl: './widget-popular-posts.html',
	styles: ``,
	host: {
		style: 'display: block',
	},
})
export class WidgetPopularPosts {
	posts = input<Post[]>()
}
