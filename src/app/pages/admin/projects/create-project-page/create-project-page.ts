import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'

import { ProjectForm } from '@features/projects/components/project-form/project-form'
import { ProjectFormData } from '@features/projects/dto'

import { ManageProjectVM } from '../view-models/manage-project.vm'

@Component({
	selector: 'app-create-project-page',
	imports: [ProjectForm],
	templateUrl: './create-project-page.html',
	providers: [ManageProjectVM],
	styles: ``,
})
export class CreateProjectPage {
	private readonly router = inject(Router)
	vm = inject(ManageProjectVM)

	async onSubmit(value: ProjectFormData) {
		const project = await this.vm.createProject(value)
		this.router.navigate(['/admin/projects/manage', project.slug])
	}
}
