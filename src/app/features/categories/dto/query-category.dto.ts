export interface QueryCategoryDto {
	type?: 'blog' | 'skill' | 'project'
	search?: string
	page?: number
	limit?: number
}
