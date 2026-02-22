import { Component, OnInit, computed, inject, signal } from '@angular/core'

import { Category } from '@features/categories/models'
import { CategoryService } from '@features/categories/services/category.service'
import { SkillForm } from '@features/skills/components/skill-form/skill-form'
import { SkillFormData } from '@features/skills/dto'
import { Skill } from '@features/skills/models/skill.model'
import { SkillService } from '@features/skills/services/skill.service'
import { ComboboxItem, Modal, ModalFooter } from '@shared/components'

@Component({
	selector: 'app-list-skills-page',
	imports: [Modal, ModalFooter, SkillForm],
	templateUrl: './list-skills-page.html',
	styles: ``,
})
export class ListSkillsPage implements OnInit {
	private skillService = inject(SkillService)
	private categoryService = inject(CategoryService)

	skills = signal<Skill[]>([])
	loading = signal(true)
	error = signal<string | null>(null)
	resetForm = signal(false)

	// ── Modal state ────────────────────────────────────────────────────
	modalOpen = signal(false)
	editingSkill = signal<Skill | null>(null)
	submitting = signal(false)
	submitError = signal<string | null>(null)

	// ── Categories ─────────────────────────────────────────────────────
	categories = signal<Category[]>([])
	categoryCreated = signal<Category | null>(null)

	categoryItems = computed<ComboboxItem[]>(() => this.categories().map(c => ({ key: c.id, value: c.name })))

	modalTitle = computed(() => (this.editingSkill() ? 'Editar skill' : 'Nueva skill'))
	submitLabel = computed(() => {
		if (this.submitting()) return 'Guardando...'
		return this.editingSkill() ? 'Guardar cambios' : 'Crear skill'
	})

	async ngOnInit() {
		try {
			const [skillsRes, catsRes] = await Promise.all([
				this.skillService.getAll(),
				this.categoryService.get({ type: 'skill', limit: 100 }),
			])
			this.skills.set(skillsRes.items)
			this.categories.set(catsRes.items)
		} catch {
			this.error.set('No se pudieron cargar las skills.')
		} finally {
			this.loading.set(false)
		}
	}

	// ── Modal actions ──────────────────────────────────────────────────

	onNew(): void {
		this.editingSkill.set(null)
		this.categoryCreated.set(null)
		this.submitError.set(null)
		this.modalOpen.set(true)
	}

	onEdit(skill: Skill): void {
		this.editingSkill.set(skill)
		this.categoryCreated.set(null)
		this.submitError.set(null)
		this.modalOpen.set(true)
	}

	closeModal(): void {
		this.modalOpen.set(false)
		this.editingSkill.set(null)
	}

	async onFormSubmit(data: SkillFormData): Promise<void> {
		this.submitting.set(true)
		this.submitError.set(null)
		try {
			const editing = this.editingSkill()
			if (editing) {
				const updated = await this.skillService.update(editing.id, data)
				this.skills.update(list => list.map(s => (s.id === updated.id ? updated : s)))
			} else {
				const created = await this.skillService.create(data)
				this.skills.update(list => [created, ...list])
			}
			this.closeModal()
		} catch {
			this.submitError.set('Error al guardar la skill. Inténtalo de nuevo.')
		} finally {
			this.submitting.set(false)
			this.toggleResetForm()
		}
	}

	async onDelete(skill: Skill): Promise<void> {
		try {
			await this.skillService.delete(skill.id)
			this.skills.update(list => list.filter(s => s.id !== skill.id))
		} catch {
			// silent fail — could improve with a toast
		}
	}

	async onCreateCategory(name: string): Promise<void> {
		try {
			const created = await this.categoryService.create({ name, type: 'skill' })
			this.categories.update(list => [...list, created])
			this.categoryCreated.set(created)
		} catch {
			// silent fail
		}
	}
	toggleResetForm(): void {
		this.resetForm.set(!this.resetForm())
		setTimeout(() => {
			this.resetForm.set(!this.resetForm())
		}, 0)
	}
}
