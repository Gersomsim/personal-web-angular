import { Component, DestroyRef, OnInit, computed, effect, inject, input, output, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { slugify } from '@core/utils'
import { Category } from '@features/categories/models'
import { PostFormData } from '@features/posts/dto'
import { Post } from '@features/posts/models'
import { Tag } from '@features/tags/models'
import { Combobox, ComboboxItem, ComboboxMulti, Editor, FormInput, FormTextarea, FormToggle } from '@shared/components'

@Component({
	selector: 'app-post-form',
	imports: [ReactiveFormsModule, Editor, FormInput, FormTextarea, FormToggle, ComboboxMulti, Combobox],
	templateUrl: './post-form.html',
	styles: ``,
})
export class PostForm implements OnInit {
	private destroyRef = inject(DestroyRef)
	private fb = inject(FormBuilder)

	post = input<Post>()
	categories = input<Category[]>()
	categoryCreated = input<Category | null>(null)
	reset = input<boolean>(false)

	tags = input<Tag[]>()
	tagCreated = input<Tag | null>(null)
	loading = input<boolean>(false)

	formSubmit = output<PostFormData>()
	createCategoryRequested = output<string>()
	createTagRequested = output<string>()

	categoryOptions = computed<ComboboxItem[]>(() => this.categories()?.map(c => ({ value: c.name, key: c.id })) ?? [])
	tagOptions = computed<ComboboxItem[]>(() => this.tags()?.map(t => ({ key: t.id, value: t.name })) ?? [])
	readonly errorCategory = computed(() => {
		const errors = this.f.categoryId!.errors // Suponiendo que pasas el control como input
		if (!errors) return null

		const errorKeys = Object.keys(errors)
		const messages: Record<string, string> = {
			required: 'Este campo es obligatorio.',
		}

		return messages[errorKeys[0]] || 'Campo inválido'
	})

	private slugEdited = signal(false)

	form = this.fb.nonNullable.group({
		title: ['', [Validators.required, Validators.minLength(3)]],
		slug: ['', [Validators.required]],
		excerpt: ['', [Validators.required, Validators.minLength(50)]],
		descriptionSeo: ['', [Validators.required, Validators.minLength(50)]],
		keywordsSeo: ['', [Validators.required, Validators.minLength(10)]],
		content: ['', [Validators.required]],
		image: [''],
		categoryId: ['', [Validators.required]],
		tagsId: [[] as string[], [Validators.required]],
		readTime: ['', [Validators.required]],
		featured: [false],
	})

	constructor() {
		effect(() => {
			if (this.post()) {
				this.setForm()
			}
		})
		effect(() => {
			if (this.categoryCreated()) {
				this.form.patchValue({ categoryId: this.categoryCreated()!.id })
			}
		})
		effect(() => {
			if (this.reset()) {
				this.form.reset()
			}
		})
		effect(() => {
			if (this.tagCreated()) {
				const tagsId = this.form.value.tagsId ?? []
				this.form.patchValue({ tagsId: [...tagsId, this.tagCreated()!.id] })
			}
		})
	}

	get f() {
		return this.form.controls
	}

	async ngOnInit() {
		// Auto-generate slug from title unless manually edited
		this.f.title.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(title => {
			if (!this.slugEdited()) {
				this.f.slug.setValue(slugify(title), { emitEvent: false })
			}
		})

		// Track manual slug edits
		this.f.slug.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.slugEdited.set(true)
		})
	}

	setForm() {
		const post = this.post()
		if (post) {
			this.form.patchValue(post)
			this.form.patchValue({ tagsId: post.tags.map(t => t.id) })
			this.form.patchValue({ categoryId: post.category.id })
		}
	}

	resetSlug(): void {
		this.slugEdited.set(false)
		this.f.slug.setValue(slugify(this.f.title.value), { emitEvent: false })
	}

	onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched()
			return
		}
		const v = this.form.getRawValue()
		const data: PostFormData = {
			...v,
		}
		this.formSubmit.emit(data)
	}
	createCategory(name: string) {
		this.createCategoryRequested.emit(name)
	}
	loadCategory(id: string | number) {
		this.form.patchValue({ categoryId: id.toString() })
	}
	createTag(name: string) {
		this.createTagRequested.emit(name)
	}
	loadTag(ids: (string | number)[]) {
		this.form.patchValue({ tagsId: ids.map(id => id.toString()) })
	}
}
