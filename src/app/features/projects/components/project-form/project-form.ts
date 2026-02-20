import { Component, DestroyRef, OnInit, effect, inject, input, output, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { Project } from '@features/projects/models'
import { Tag } from '@features/tags/models'
import { TagService } from '@features/tags/services/tag.service'
import { FormInput, FormSelect, FormTagsPicker, FormTextarea, FormToggle } from '@shared/components'

export interface ProjectFormValue {
	title: string
	subtitle: string
	category: 'webapp' | 'mobile' | 'experiment' | 'all'
	role: string
	duration: string
	team: string
	description: string
	problem: string
	solution: string
	image: string
	gallery: string[]
	link: string
	liveUrl: string
	repoUrl: string
	repoPrivate: boolean
	metrics: string
	featured: boolean
	tags: Tag[]
	features: string[]
	learnings: string[]
	challenges: { title: string; solution: string }[]
	results: { label: string; value: string; description: string }[]
	techStack: { category: string; items: string[] }[]
}

@Component({
	selector: 'app-project-form',
	imports: [ReactiveFormsModule, FormInput, FormTextarea, FormSelect, FormToggle, FormTagsPicker],
	templateUrl: './project-form.html',
	styles: ``,
})
export class ProjectForm implements OnInit {
	private readonly tagService = inject(TagService)
	private readonly destroyRef = inject(DestroyRef)

	initialValue = input<Project | null>(null)
	formSubmit = output<ProjectFormValue>()

	tags = signal<Tag[]>([])
	private linkEdited = signal(false)

	readonly categoryOptions = [
		{ value: 'webapp', label: 'Web App' },
		{ value: 'mobile', label: 'Mobile' },
		{ value: 'experiment', label: 'Experimento' },
		{ value: 'all', label: 'All' },
	]

	form = new FormGroup({
		// Básico
		title: new FormControl('', {
			validators: [Validators.required, Validators.minLength(3)],
			nonNullable: true,
		}),
		subtitle: new FormControl('', { nonNullable: true }),
		category: new FormControl<string>('', { nonNullable: true }),
		role: new FormControl('', { nonNullable: true }),
		duration: new FormControl('', { nonNullable: true }),
		team: new FormControl('', { nonNullable: true }),
		metrics: new FormControl('', { nonNullable: true }),

		// Descripción
		description: new FormControl('', {
			validators: [Validators.required],
			nonNullable: true,
		}),
		problem: new FormControl('', { nonNullable: true }),
		solution: new FormControl('', { nonNullable: true }),

		// Media
		image: new FormControl('', {
			validators: [Validators.required],
			nonNullable: true,
		}),
		gallery: new FormArray<FormControl<string>>([]),

		// Enlace
		link: new FormControl('', {
			validators: [Validators.required],
			nonNullable: true,
		}),
		liveUrl: new FormControl('', { nonNullable: true }),
		repoUrl: new FormControl('', { nonNullable: true }),
		repoPrivate: new FormControl(false, { nonNullable: true }),

		// Clasificación
		tags: new FormControl<Tag[]>([], { nonNullable: true }),
		featured: new FormControl(false, { nonNullable: true }),

		// Case study
		features: new FormArray<FormControl<string>>([]),
		challenges: new FormArray<FormGroup<{ title: FormControl<string>; solution: FormControl<string> }>>([]),
		results: new FormArray<
			FormGroup<{
				label: FormControl<string>
				value: FormControl<string>
				description: FormControl<string>
			}>
		>([]),
		techStack: new FormArray<FormGroup<{ category: FormControl<string>; items: FormControl<string> }>>([]),
		learnings: new FormArray<FormControl<string>>([]),
	})

	get f() {
		return this.form.controls
	}
	get galleryControls() {
		return this.f.gallery.controls
	}
	get featureControls() {
		return this.f.features.controls
	}
	get learningControls() {
		return this.f.learnings.controls
	}
	get challengeGroups() {
		return this.f.challenges.controls
	}
	get resultGroups() {
		return this.f.results.controls
	}
	get techStackGroups() {
		return this.f.techStack.controls
	}

	constructor() {
		effect(() => {
			const p = this.initialValue()
			if (p) this.patchForm(p)
		})
	}

	async ngOnInit() {
		try {
			const res = await this.tagService.get()
			this.tags.set(res.data ?? res)
		} catch {
			// form works without tags
		}

		this.f.title.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(title => {
			if (!this.linkEdited()) {
				this.f.link.setValue(this.toSlug(title), { emitEvent: false })
			}
		})

		this.f.link.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.linkEdited.set(true)
		})
	}

	resetLink(): void {
		this.linkEdited.set(false)
		this.f.link.setValue(this.toSlug(this.f.title.value), { emitEvent: false })
	}

	// ── Gallery ────────────────────────────────────────────────────────────
	addGallery(): void {
		this.f.gallery.push(this.str())
	}
	removeGallery(i: number): void {
		this.f.gallery.removeAt(i)
	}

	// ── Features ───────────────────────────────────────────────────────────
	addFeature(): void {
		this.f.features.push(this.str())
	}
	removeFeature(i: number): void {
		this.f.features.removeAt(i)
	}

	// ── Challenges ─────────────────────────────────────────────────────────
	addChallenge(): void {
		this.f.challenges.push(this.challengeGroup())
	}
	removeChallenge(i: number): void {
		this.f.challenges.removeAt(i)
	}

	// ── Results ────────────────────────────────────────────────────────────
	addResult(): void {
		this.f.results.push(this.resultGroup())
	}
	removeResult(i: number): void {
		this.f.results.removeAt(i)
	}

	// ── Tech Stack ─────────────────────────────────────────────────────────
	addTechStack(): void {
		this.f.techStack.push(this.techStackGroup())
	}
	removeTechStack(i: number): void {
		this.f.techStack.removeAt(i)
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
		const v = this.form.getRawValue()
	}

	// ── Private helpers ────────────────────────────────────────────────────

	private str(value = ''): FormControl<string> {
		return new FormControl(value, { nonNullable: true })
	}

	private challengeGroup(title = '', solution = '') {
		return new FormGroup({ title: this.str(title), solution: this.str(solution) })
	}

	private resultGroup(label = '', value = '', description = '') {
		return new FormGroup({
			label: this.str(label),
			value: this.str(value),
			description: this.str(description),
		})
	}

	private techStackGroup(category = '', items = '') {
		return new FormGroup({ category: this.str(category), items: this.str(items) })
	}

	private patchForm(p: Project): void {
		this.linkEdited.set(true)
		this.form.patchValue({
			title: p.title,
			subtitle: p.subtitle ?? '',
			category: p.category.id,
			role: p.role ?? '',
			duration: p.duration ?? '',
			team: p.team ?? '',
			metrics: p.metrics ?? '',
			description: p.description,
			problem: p.problem ?? '',
			solution: p.solution ?? '',
			image: p.image,
			link: p.slug,
			liveUrl: p.liveUrl ?? '',
			repoUrl: p.repoUrl ?? '',
			repoPrivate: p.repoPrivate ?? false,
			tags: p.tags,
			featured: p.featured ?? false,
		})

		this.f.gallery.clear()
		p.gallery?.forEach(url => this.f.gallery.push(this.str(url)))

		this.f.features.clear()
		p.features?.forEach(feat => this.f.features.push(this.str(feat)))

		this.f.learnings.clear()
		p.learnings?.forEach(l => this.f.learnings.push(this.str(l)))

		this.f.challenges.clear()
		p.challenges?.forEach(c => this.f.challenges.push(this.challengeGroup(c.title, c.solution)))

		this.f.results.clear()
		p.results?.forEach(r => this.f.results.push(this.resultGroup(r.label, r.value, r.description ?? '')))

		this.f.techStack.clear()
	}

	private toSlug(text: string): string {
		return text
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-z0-9\s-]/g, '')
			.trim()
			.replace(/\s+/g, '-')
	}
}
