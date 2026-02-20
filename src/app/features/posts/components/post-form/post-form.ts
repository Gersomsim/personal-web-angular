import { Component, DestroyRef, OnInit, inject, input, output, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { slugify } from '@core/utils'
import { PostFormData } from '@features/posts/dto'
import { Post } from '@features/posts/models'
import { Editor, FormInput, FormSelect, FormTagsPicker, FormTextarea, FormToggle } from '@shared/components'

@Component({
	selector: 'app-post-form',
	imports: [ReactiveFormsModule, Editor, FormInput, FormTextarea, FormSelect, FormToggle, FormTagsPicker],
	templateUrl: './post-form.html',
	styles: ``,
})
export class PostForm implements OnInit {
	private destroyRef = inject(DestroyRef)
	private fb = inject(FormBuilder)

	post = input<Post>()
	loading = input<boolean>(false)
	formSubmit = output<PostFormData>()

	private slugEdited = signal(false)

	form = this.fb.nonNullable.group({
		title: ['', [Validators.required, Validators.minLength(3)]],
		slug: ['', [Validators.required]],
		excerpt: ['', [Validators.required, Validators.minLength(50)]],
		descriptionSeo: ['', [Validators.required, Validators.minLength(50)]],
		keywordsSeo: ['', [Validators.required, Validators.minLength(50)]],
		content: ['', [Validators.required, Validators.minLength(50)]],
		image: ['', [Validators.required, Validators.minLength(50)]],
		categoryId: ['', [Validators.required, Validators.minLength(50)]],
		tagsId: ['', [Validators.required, Validators.minLength(50)]],
		date: ['', [Validators.required]],
		readTime: ['', [Validators.required]],
		featured: [false],
	})

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
			tagsId: v.tagsId.split(',').map(tag => tag.trim()),
		}
		this.formSubmit.emit(data)
	}
}
