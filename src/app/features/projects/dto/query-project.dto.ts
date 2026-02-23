export interface QueryProjectDto {
	page?: number
	limit?: number
	search?: string
	category?: string
	tags?: string
	featured?: boolean
	type?: 'project' | 'experiment'
}
