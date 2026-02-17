import { Category } from '@features/categories/models'

export interface Skill {
	id: string
	name: string
	slug: string
	content?: string
	image?: string
	certificate?: string
	certificateUrl?: string
	category: Category
}
