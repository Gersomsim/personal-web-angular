import { effect, inject, resource, signal } from '@angular/core'

import { Category } from '@features/categories/models'
import { CategoryService } from '@features/categories/services/category.service'
import { ProjectFormData } from '@features/projects/dto'
import { Project } from '@features/projects/models'
import { ProjectService } from '@features/projects/services'
import { Tag } from '@features/tags/models'
import { TagService } from '@features/tags/services/tag.service'
import { ComboboxItem } from '@shared/components'

export class ManageProjectVM {
	private readonly tagService = inject(TagService)
	private readonly categoryService = inject(CategoryService)
	private readonly projectService = inject(ProjectService)

	categoriesRes = resource({
		loader: () => this.categoryService.get({ type: 'project' }),
	})
	tagsRes = resource({
		loader: () => this.tagService.getAll({ type: 'project' }),
	})

	categoryOptions = signal<ComboboxItem[]>([])
	tagOptions = signal<ComboboxItem[]>([])
	isLoading = signal(false)
	categoryId = signal<string | null>(null)
	tagId = signal<string | null>(null)

	constructor() {
		effect(() => {
			const categories = this.categoriesRes.value()?.items ?? []
			this.addCategories(categories)
		})

		effect(() => {
			const tags = this.tagsRes.value()?.items ?? []
			this.addTags(tags)
		})
	}
	async loadProject(id: string) {
		this.isLoading.set(true)
		try {
			const project = await this.projectService.getOne(id)
			this.addTagFromProject(project)
			this.addCategories([project.category])
			return project
		} finally {
			this.isLoading.set(false)
		}
	}

	addTagFromProject(project: Project) {
		const tags = project.tags
		if (tags && tags.length > 0) {
			this.addTags(tags)
		}
	}
	addTags(tags: Tag[]) {
		const items = tags.map(t => ({ key: t.id, value: t.name }))
		this.tagOptions.update(list => {
			const newItems = items.filter(item => !list.some(l => l.key === item.key))
			return [...list, ...newItems]
		})
	}
	addCategories(categories: Category[]) {
		const items = categories.map(c => ({ key: c.id, value: c.name }))
		this.categoryOptions.update(list => {
			const newItems = items.filter(item => !list.some(l => l.key === item.key))
			return [...list, ...newItems]
		})
	}

	async createProject(payload: ProjectFormData) {
		this.isLoading.set(true)
		try {
			return await this.projectService.create(payload)
		} finally {
			this.isLoading.set(false)
		}
	}

	async updateProject(id: string, payload: ProjectFormData) {
		this.isLoading.set(true)
		try {
			return await this.projectService.update(id, payload)
		} finally {
			this.isLoading.set(false)
		}
	}
	async createCategory(name: string) {
		const category = await this.categoryService.create({ name, type: 'project' })
		this.categoryOptions.update(list => [...list, { key: category.id, value: category.name }])
		this.categoryId.set(category.id)
	}

	async createTag(name: string) {
		const tag = await this.tagService.create({ name, type: 'project' })
		this.tagOptions.update(list => [...list, { key: tag.id, value: tag.name }])
		this.tagId.set(tag.id)
	}
}
