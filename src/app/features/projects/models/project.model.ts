import { Category } from '@features/categories/models'
import { FileModel } from '@features/files/models'
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
	images: FileModel[]
	slug: string
	metrics?: string
	type: ProjectType
	category: Category //'webapp' | 'mobile' | 'experiment' | 'all'
	featured: boolean
	liveUrl?: string
	repoUrl?: string
	repoPrivate?: boolean
	role?: string
	tags?: Tag[]
	team?: string
	duration?: string
	developedAt: string

	// Case study detail
	solution?: string
	features?: string[]
	challenges?: ProjectChallenge[]
	results?: ProjectResult[]
	techStack?: ProjectTechStack[]
	learnings?: string[]
}

export enum ProjectType {
	PROJECT = 'project',
	EXPERIMENT = 'experiment',
}
