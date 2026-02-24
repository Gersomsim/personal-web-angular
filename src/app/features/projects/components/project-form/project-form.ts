import { Component, DestroyRef, OnInit, effect, inject, input, output, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'

import { slugify } from '@core/utils'
import { FileModel } from '@features/files/models'
import { ProjectFormData } from '@features/projects/dto'
import { Project, ProjectType } from '@features/projects/models'
import {
	Combobox,
	ComboboxItem,
	ComboboxMulti,
	FormInput,
	FormSelect,
	FormTextarea,
	FormToggle,
	ImageUpload,
} from '@shared/components'

@Component({
	selector: 'app-project-form',
	imports: [
		ReactiveFormsModule,
		FormInput,
		FormTextarea,
		FormSelect,
		FormToggle,
		Combobox,
		ComboboxMulti,
		ImageUpload,
	],
	templateUrl: './project-form.html',
	styles: ``,
})
export class ProjectForm implements OnInit {
	private readonly destroyRef = inject(DestroyRef)
	private readonly fb = inject(FormBuilder)

	isLoading = input<boolean>(false)
	initialValue = input<Project | null>(null)
	categories = input<ComboboxItem[]>([])
	tags = input<ComboboxItem[]>([])
	categoryId = input<string | null>(null)
	tagId = input<string | null>(null)

	formSubmit = output<ProjectFormData>()
	createCategoryRequest = output<string>()
	createTagRequest = output<string>()

	private linkEdited = signal(false)

	readonly typeOptions = [
		{ value: ProjectType.PROJECT, label: 'Proyecto' },
		{ value: ProjectType.EXPERIMENT, label: 'Experimento' },
	]

	form = this.fb.nonNullable.group({
		// Básico
		title: ['', [Validators.required, Validators.minLength(3)]],
		subtitle: ['', [Validators.required]],
		type: [ProjectType.PROJECT, [Validators.required]],
		categoryId: ['', [Validators.required]],
		role: ['', [Validators.required]],
		duration: ['', [Validators.required]],
		team: ['', [Validators.required]],
		metrics: ['', [Validators.required]],
		developedAt: ['', [Validators.required]],

		// Descripción
		description: ['', [Validators.required]],
		problem: ['', [Validators.required]],
		solution: ['', [Validators.required]],

		// Media
		images: new FormControl<FileModel[]>([], { nonNullable: true }),

		// Enlace
		slug: ['', [Validators.required]],
		liveUrl: [''],
		repoUrl: [''],
		repoPrivate: [false, [Validators.required]],

		// Clasificación
		tagsId: [[] as string[]],
		featured: [false],

		// Case study
		features: new FormArray<FormControl<string>>([]),
		learnings: new FormArray<FormControl<string>>([]),
	})

	get f() {
		return this.form.controls
	}
	get featureControls() {
		return this.f.features.controls
	}
	get learningControls() {
		return this.f.learnings.controls
	}

	constructor() {
		effect(() => {
			const p = this.initialValue()
			if (p) {
				this.patchForm(p)
			}
		})
		effect(() => {
			const c = this.categoryId()
			if (c) {
				this.f.categoryId.setValue(c)
			}
		})
		effect(() => {
			const t = this.tagId()
			if (t) {
				const currentTags = this.f.tagsId.value
				this.f.tagsId.setValue([...currentTags, t])
			}
		})
	}

	async ngOnInit() {
		this.f.title.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(title => {
			if (!this.linkEdited()) {
				this.f.slug.setValue(slugify(title), { emitEvent: false })
			}
		})

		this.f.slug.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.linkEdited.set(true)
		})
	}

	resetLink(): void {
		this.linkEdited.set(false)
		this.f.slug.setValue(slugify(this.f.title.value), { emitEvent: false })
	}

	// ── Features ───────────────────────────────────────────────────────────
	addFeature(): void {
		this.f.features.push(this.str())
	}
	removeFeature(i: number): void {
		this.f.features.removeAt(i)
	}

	// ── Learnings ──────────────────────────────────────────────────────────
	addLearning(): void {
		this.f.learnings.push(this.str())
	}
	removeLearning(i: number): void {
		this.f.learnings.removeAt(i)
	}

	onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched()
			return
		}
		const { images, ...v } = this.form.getRawValue()
		const data: ProjectFormData = {
			...v,
			images: images.map(i => i.id),
			features: v.features.filter(f => f),
			learnings: v.learnings.filter(l => l),
			developedAt: new Date(v.developedAt),
		}
		this.formSubmit.emit(data)
	}

	setCategory(category: string | number): void {
		this.f.categoryId.setValue(category.toString())
	}
	setTag(tag: (string | number)[]): void {
		this.f.tagsId.setValue(tag.map(t => t.toString()))
	}

	// ── Private helpers ────────────────────────────────────────────────────

	private str(value = ''): FormControl<string> {
		return new FormControl(value, { nonNullable: true })
	}

	private patchForm(p: Project): void {
		this.linkEdited.set(true)
		this.form.patchValue({
			title: p.title,
			subtitle: p.subtitle ?? '',
			categoryId: p.category.id,
			role: p.role ?? '',
			duration: p.duration ?? '',
			team: p.team ?? '',
			metrics: p.metrics ?? '',
			description: p.description,
			problem: p.problem ?? '',
			solution: p.solution ?? '',
			slug: p.slug,
			liveUrl: p.liveUrl ?? '',
			repoUrl: p.repoUrl ?? '',
			repoPrivate: p.repoPrivate ?? false,
			tagsId: p.tags?.map(t => t.id) ?? [],
			featured: p.featured ?? false,
			developedAt: p.developedAt ?? '',
			type: p.type ?? '',
		})

		this.f.images.setValue(p.images ?? [])

		this.f.features.clear()
		p.features?.forEach(feat => this.f.features.push(this.str(feat)))

		this.f.learnings.clear()
		p.learnings?.forEach(l => this.f.learnings.push(this.str(l)))
	}
}
