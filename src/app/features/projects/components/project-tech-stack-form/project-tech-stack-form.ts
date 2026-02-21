import { Component, effect, inject, input, output } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { ProjectTechStack } from '@features/projects/models'
import { FormInput } from '@shared/components'

@Component({
	selector: 'app-project-tech-stack-form',
	imports: [ReactiveFormsModule, FormInput],
	templateUrl: './project-tech-stack-form.html',
})
export class ProjectTechStackForm {
	private readonly fb = inject(FormBuilder)

	value = input<ProjectTechStack[]>([])
	isLoading = input<boolean>(false)

	save = output<ProjectTechStack[]>()

	form = this.fb.nonNullable.group({
		techStack: this.fb.array<FormGroup>([]),
	})

	get stackArray(): FormArray<FormGroup> {
		return this.form.controls.techStack
	}

	get stackGroups(): FormGroup[] {
		return this.stackArray.controls
	}

	constructor() {
		effect(() => {
			const v = this.value()
			this._patch(v)
		})
	}

	add(): void {
		this.stackArray.push(this._group())
	}

	remove(i: number): void {
		this.stackArray.removeAt(i)
	}

	onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched()
			return
		}
		const techStack: ProjectTechStack[] = this.stackArray.controls.map(g => ({
			category: g.get('category')!.value as string,
			items: (g.get('items')!.value as string)
				.split(',')
				.map((s: string) => s.trim())
				.filter(Boolean),
		}))
		this.save.emit(techStack)
	}

	private _patch(techStack: ProjectTechStack[]): void {
		console.log('techStack', techStack)
		this.stackArray.clear({ emitEvent: false })
		techStack.forEach(ts => this.stackArray.push(this._group(ts), { emitEvent: false }))
	}

	private _group(data?: ProjectTechStack): FormGroup {
		return this.fb.nonNullable.group({
			category: [data?.category ?? '', Validators.required],
			items: [data?.items?.join(', ') ?? '', Validators.required],
		})
	}
}
