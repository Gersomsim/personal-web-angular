import { Skill } from '@features/skills/models/skill.model'

export interface Category {
	id: string
	name: string
	slug: string
	count?: number
	description?: string
	type: 'blog' | 'skill' | 'project'
	skills?: Skill[]
}
