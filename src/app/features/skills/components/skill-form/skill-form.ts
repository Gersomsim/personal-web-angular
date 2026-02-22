import { Component, DestroyRef, OnInit, computed, effect, inject, input, output, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { slugify } from '@core/utils'
import { Category } from '@features/categories/models'
import { SkillFormData } from '@features/skills/dto'
import { Skill } from '@features/skills/models/skill.model'
import { Combobox, ComboboxItem, FormInput, FormTextarea } from '@shared/components'

@Component({
	selector: 'app-skill-form',
	imports: [ReactiveFormsModule, FormInput, FormTextarea, Combobox],
	templateUrl: './skill-form.html',
	styles: ``,
})
export class SkillForm implements OnInit {
	private readonly destroyRef = inject(DestroyRef)
	private readonly fb = inject(FormBuilder)

	skill = input<Skill | null>(null)
	categories = input<ComboboxItem[]>([])
	categoryCreated = input<Category | null>(null)
	reset = input<boolean>()

	formSubmit = output<SkillFormData>()
	createCategoryRequested = output<string>()

	private slugEdited = signal(false)

	form = this.fb.nonNullable.group({
		name: ['', [Validators.required, Validators.minLength(2)]],
		slug: ['', [Validators.required]],
		categoryId: ['', [Validators.required]],
		image: [''],
		description: [''],
	})

	protected categoryError = computed(() => {
		const c = this.f.categoryId
		if (!c.invalid || !c.touched) return null
		return 'Este campo es requerido'
	})

	constructor() {
		effect(() => {
			const r = this.reset()
			if (r) {
				this.resetForm()
			}
		})

		effect(() => {
			const s = this.skill()
			if (s) {
				this.patchForm(s)
			} else {
				this.form.reset()
				this.slugEdited.set(false)
			}
		})

		effect(() => {
			const cat = this.categoryCreated()
			if (cat) {
				this.f.categoryId.setValue(cat.id)
			}
		})
	}

	get f() {
		return this.form.controls
	}

	async ngOnInit() {
		this.f.name.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(name => {
			if (!this.slugEdited()) {
				this.f.slug.setValue(slugify(name), { emitEvent: false })
			}
		})

		this.f.slug.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.slugEdited.set(true)
		})
	}

	resetSlug(): void {
		this.slugEdited.set(false)
		this.f.slug.setValue(slugify(this.f.name.value), { emitEvent: false })
	}

	setCategory(key: string | number): void {
		this.f.categoryId.setValue(key.toString())
	}

	onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched()
			return
		}
		const v = this.form.getRawValue()
		const data: SkillFormData = {
			name: v.name,
			slug: v.slug,
			categoryId: v.categoryId,
			...(v.image && { image: v.image }),
			...(v.description && { description: v.description }),
		}
		this.formSubmit.emit(data)
	}

	private patchForm(skill: Skill): void {
		this.slugEdited.set(true)
		this.form.patchValue({
			name: skill.name,
			slug: skill.slug,
			categoryId: skill.category.id,
			image: skill.image ?? '',
			description: skill.description ?? '',
		})
	}
	resetForm(): void {
		this.form.reset()
		this.slugEdited.set(false)
	}
}
