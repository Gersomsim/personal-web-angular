import { Tag } from '@features/tags/models'

export interface ProjectChallenge {
	title: string
	solution: string
}

export interface ProjectResult {
	label: string
	value: string
	description?: string
}

export interface ProjectTechStack {
	category: string
	items: string[]
}

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

	// Case study detail
	solution?: string
	features?: string[]
	challenges?: ProjectChallenge[]
	results?: ProjectResult[]
	techStack?: ProjectTechStack[]
	gallery?: string[]
	duration?: string
	team?: string
	learnings?: string[]
}
