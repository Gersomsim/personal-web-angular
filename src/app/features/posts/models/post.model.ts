export interface Post {
	id: string
	title: string
	excerpt: string
	date: string
	readTime: string
	slug: string
	image?: string
	tags?: string[]
	category?: string
	featured?: boolean
	author: {
		name: string
		image: string
	}
}
