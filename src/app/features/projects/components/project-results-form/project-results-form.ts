import { Component, effect, inject, input, output } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { ProjectResult } from '@features/projects/models'
import { FormInput } from '@shared/components'

@Component({
	selector: 'app-project-results-form',
	imports: [ReactiveFormsModule, FormInput],
	templateUrl: './project-results-form.html',
})
export class ProjectResultsForm {
	private readonly fb = inject(FormBuilder)

	value = input<ProjectResult[]>([])
	isLoading = input<boolean>(false)

	save = output<ProjectResult[]>()

	form = this.fb.nonNullable.group({
		results: this.fb.array<FormGroup>([]),
	})

	get resultArray(): FormArray<FormGroup> {
		return this.form.controls.results
	}

	get resultGroups(): FormGroup[] {
		return this.resultArray.controls
	}

	constructor() {
		effect(() => {
			const v = this.value()
			this._patch(v)
		})
	}

	add(): void {
		this.resultArray.push(this._group())
	}

	remove(i: number): void {
		this.resultArray.removeAt(i)
	}

	onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched()
			return
		}
		const results: ProjectResult[] = this.resultArray.controls.map(g => ({
			value: g.get('value')!.value as string,
			label: g.get('label')!.value as string,
			description: (g.get('description')!.value as string) || undefined,
		}))
		this.save.emit(results)
	}

	private _patch(results: ProjectResult[]): void {
		this.resultArray.clear({ emitEvent: false })
		results.forEach(r => this.resultArray.push(this._group(r), { emitEvent: false }))
	}

	private _group(data?: ProjectResult): FormGroup {
		return this.fb.nonNullable.group({
			value: [data?.value ?? '', Validators.required],
			label: [data?.label ?? '', Validators.required],
			description: [data?.description ?? ''],
		})
	}
}
