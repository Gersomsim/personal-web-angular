import { Component } from '@angular/core'

import { PostForm, PostFormValue } from '@features/posts/components/post-form/post-form'

@Component({
	selector: 'app-create-post-page',
	imports: [PostForm],
	templateUrl: './create-post-page.html',
	styles: ``,
})
export class CreatePostPage {
	onSubmit(value: PostFormValue) {
		// TODO: llamar al servicio para crear el post
		console.log('New post:', value)
	}
}
