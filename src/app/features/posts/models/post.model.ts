import { Tag } from '@features/tags/models'

export interface Post {
	id: string
	title: string
	excerpt: string
	date: string
	readTime: string
	slug: string
	image?: string
	tags?: Tag[]
	category?: string
	featured?: boolean
	author: {
		name: string
		image: string
	}
}
