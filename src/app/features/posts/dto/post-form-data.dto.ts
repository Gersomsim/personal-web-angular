export interface PostFormData {
	title: string
	slug: string
	excerpt: string
	readTime: string
	featured: boolean
	descriptionSeo: string
	keywordsSeo: string
	content: string
	image?: string
	categoryId: string
	tagsId: string[]
}
