import { DOCUMENT } from '@angular/common'
import { Component, computed, inject, input, signal } from '@angular/core'

import { Post } from '@features/posts/models'

@Component({
	selector: 'app-widget-share-post',
	imports: [],
	templateUrl: './widget-share-post.html',
	styles: ``,
	host: { style: 'display: block' },
})
export class WidgetSharePost {
	private readonly doc = inject(DOCUMENT)

	post = input<Post>()
	loading = input<boolean>(true)
	copied = signal(false)

	private postUrl = computed(() => {
		const post = this.post()
		if (!post) return ''
		return `${this.doc.location.origin}/blog/${post.slug}`
	})

	shareOn(network: 'x' | 'linkedin' | 'whatsapp'): void {
		const post = this.post()
		if (!post) return

		const url = encodeURIComponent(this.postUrl())
		const title = encodeURIComponent(post.title)
		const excerpt = encodeURIComponent(post.excerpt)

		const urls: Record<typeof network, string> = {
			x: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
			linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${excerpt}`,
			whatsapp: `https://wa.me/?text=${title}%20%E2%86%92%20${url}`,
		}

		this.doc.defaultView?.open(urls[network], '_blank', 'width=620,height=520,noopener,noreferrer')
	}

	copyLink(): void {
		const url = this.postUrl()
		if (!url) return

		navigator.clipboard.writeText(url).then(() => {
			this.copied.set(true)
			setTimeout(() => this.copied.set(false), 2500)
		})
	}
}
