import { Tag } from '@features/tags/models'

export interface Project {
	id: string
	title: string
	subtitle?: string
	description: string
	problem?: string
	image: string
	tags: Tag[]
	link: string
	metrics?: string
	category: 'webapp' | 'mobile' | 'experiment' | 'all'
	featured?: boolean
	liveUrl?: string
	repoUrl?: string
	repoPrivate?: boolean
	role?: string
}
