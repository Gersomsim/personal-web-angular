import { Category } from '@features/categories/models'
import { FileModel } from '@features/files/models'
import { Tag } from '@features/tags/models'

export interface Post {
	id: string
	title: string
	slug: string
	excerpt: string
	readTime: string
	featured: boolean
	descriptionSeo: string
	keywordsSeo: string
	content: string
	image?: FileModel
	category: Category
	tags: Tag[]
	author: {
		name: string
		image: string
	}
	createdAt: Date
	updatedAt: Date
}
