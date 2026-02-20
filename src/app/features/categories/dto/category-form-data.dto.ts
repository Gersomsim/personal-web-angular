export interface CategoryFormData {
	name: string
	type: 'blog' | 'skill' | 'project'
	description?: string
}
