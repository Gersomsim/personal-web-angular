import { Component, effect, inject, input, output } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { ProjectChallenge } from '@features/projects/models'
import { FormInput, FormTextarea } from '@shared/components'

@Component({
	selector: 'app-project-challenges-form',
	imports: [ReactiveFormsModule, FormInput, FormTextarea],
	templateUrl: './project-challenges-form.html',
})
export class ProjectChallengesForm {
	private readonly fb = inject(FormBuilder)

	value = input<ProjectChallenge[]>([])
	isLoading = input<boolean>(false)

	save = output<ProjectChallenge[]>()

	form = this.fb.nonNullable.group({
		challenges: this.fb.array<FormGroup>([]),
	})

	get challengeArray(): FormArray<FormGroup> {
		return this.form.controls.challenges
	}

	get challengeGroups(): FormGroup[] {
		return this.challengeArray.controls
	}

	constructor() {
		effect(() => {
			const v = this.value()
			this._patch(v)
		})
	}

	add(): void {
		this.challengeArray.push(this._group())
	}

	remove(i: number): void {
		this.challengeArray.removeAt(i)
	}

	onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched()
			return
		}
		const challenges: ProjectChallenge[] = this.challengeArray.controls.map(g => ({
			title: g.get('title')!.value as string,
			solution: g.get('solution')!.value as string,
		}))
		this.save.emit(challenges)
	}

	private _patch(challenges: ProjectChallenge[]): void {
		this.challengeArray.clear({ emitEvent: false })
		challenges.forEach(c => this.challengeArray.push(this._group(c), { emitEvent: false }))
	}

	private _group(data?: ProjectChallenge): FormGroup {
		return this.fb.nonNullable.group({
			title: [data?.title ?? '', Validators.required],
			solution: [data?.solution ?? '', Validators.required],
		})
	}
}
