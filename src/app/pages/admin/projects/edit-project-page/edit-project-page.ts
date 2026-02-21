import { Component, inject, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'

import { ProjectForm } from '@features/projects/components/project-form/project-form'
import { ProjectFormData } from '@features/projects/dto'
import { Project } from '@features/projects/models'
import { map } from 'rxjs'

import { ManageProjectVM } from '../view-models/manage-project.vm'

@Component({
	selector: 'app-edit-project-page',
	imports: [ProjectForm],
	providers: [ManageProjectVM],
	templateUrl: './edit-project-page.html',
	styles: ``,
})
export class EditProjectPage {
	private readonly route = inject(ActivatedRoute)
	private readonly router = inject(Router)
	vm = inject(ManageProjectVM)

	projectId = toSignal(this.route.params.pipe(map(p => p['slug'])))
	project = signal<Project | null>(null)

	ngOnInit() {
		this.loadProject()
	}

	async loadProject() {
		const project = await this.vm.loadProject(this.projectId())
		this.project.set(project)
	}

	async onSubmit(value: ProjectFormData) {
		const project = await this.vm.updateProject(this.projectId(), value)
		this.router.navigate(['/admin/projects/manage', project.slug])
	}
}
