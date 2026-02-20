import { Component, DestroyRef, OnInit, computed, inject, output, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { Category } from '@features/categories/models'
import { CategoryService } from '@features/categories/services/category.service'
import { Tag } from '@features/tags/models'
import { TagService } from '@features/tags/services/tag.service'
import { Editor, FormInput, FormSelect, FormTagsPicker, FormTextarea, FormToggle } from '@shared/components'

export interface PostFormValue {
	title: string
	slug: string
	excerpt: string
	content: string | null
	image: string | null
	category: string | null
	tags: Tag[]
	date: string
	readTime: string
	author: {
		name: string
		image: string
	}
	featured: boolean
}

@Component({
	selector: 'app-post-form',
	imports: [ReactiveFormsModule, Editor, FormInput, FormTextarea, FormSelect, FormToggle, FormTagsPicker],
	templateUrl: './post-form.html',
	styles: ``,
})
export class PostForm implements OnInit {
	private categoryService = inject(CategoryService)
	private tagService = inject(TagService)
	private destroyRef = inject(DestroyRef)

	formSubmit = output<PostFormValue>()

	categories = signal<Category[]>([])
	tags = signal<Tag[]>([])
	private slugEdited = signal(false)

	form = new FormGroup({
		title: new FormControl('', {
			validators: [Validators.required, Validators.minLength(3)],
			nonNullable: true,
		}),
		slug: new FormControl('', {
			validators: [Validators.required],
			nonNullable: true,
		}),
		excerpt: new FormControl('', {
			validators: [Validators.required, Validators.minLength(50)],
			nonNullable: true,
		}),
		content: new FormControl<string | null>(null),
		image: new FormControl<string | null>(null),
		category: new FormControl<string | null>(null),
		tags: new FormControl<Tag[]>([], { nonNullable: true }),
		date: new FormControl('', {
			validators: [Validators.required],
			nonNullable: true,
		}),
		readTime: new FormControl('', {
			validators: [Validators.required],
			nonNullable: true,
		}),
		author: new FormGroup({
			name: new FormControl('', {
				validators: [Validators.required],
				nonNullable: true,
			}),
			image: new FormControl('', {
				validators: [Validators.required],
				nonNullable: true,
			}),
		}),
		featured: new FormControl(false, { nonNullable: true }),
	})

	get f() {
		return this.form.controls
	}

	categoryOptions = computed(() => this.categories().map(c => ({ value: c.id, label: c.name })))

	async ngOnInit() {
		try {
			const [cats, tags] = await Promise.all([this.categoryService.get(), this.tagService.get()])
			this.categories.set(cats.items ?? [])
			this.tags.set(tags.items ?? [])
		} catch {
			// Services not available — form still works with empty options
		}

		// Auto-generate slug from title unless manually edited
		this.f.title.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(title => {
			if (!this.slugEdited()) {
				this.f.slug.setValue(this.toSlug(title), { emitEvent: false })
			}
		})

		// Track manual slug edits
		this.f.slug.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.slugEdited.set(true)
		})
	}

	resetSlug(): void {
		this.slugEdited.set(false)
		this.f.slug.setValue(this.toSlug(this.f.title.value), { emitEvent: false })
	}

	onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched()
			return
		}
		const v = this.form.getRawValue()
		this.formSubmit.emit({
			title: v.title,
			slug: v.slug,
			excerpt: v.excerpt,
			content: v.content,
			image: v.image,
			category: v.category,
			tags: v.tags,
			date: v.date,
			readTime: v.readTime,
			author: { name: v.author.name, image: v.author.image },
			featured: v.featured,
		})
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
