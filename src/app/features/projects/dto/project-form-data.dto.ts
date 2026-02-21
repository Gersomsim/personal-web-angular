import { ProjectType } from '../models'

export interface ProjectFormData {
	title: string
	subtitle: string
	description: string
	problem: string
	solution: string
	image: string
	tagsId: string[]
	slug: string
	metrics: string
	type: ProjectType
	categoryId: string
	featured: boolean
	liveUrl: string
	repoUrl: string
	repoPrivate: boolean
	role: string
	duration: string
	team: string
	developedAt: Date
	learnings: string[]
	features: string[]
	gallery: string[]
}
