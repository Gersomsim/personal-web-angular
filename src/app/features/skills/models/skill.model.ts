import { Category } from '@features/categories/models'

export interface Skill {
	id: string
	name: string
	slug: string
	description: string
	image?: string
	category: Category
}
