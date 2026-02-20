import { Component, inject, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router'
import { map } from 'rxjs'

import { ProjectForm, ProjectFormValue } from '@features/projects/components/project-form/project-form'
import { Project } from '@features/projects/models'
import { ProjectService } from '@features/projects/services'

@Component({
	selector: 'app-edit-project-page',
	imports: [ProjectForm],
	templateUrl: './edit-project-page.html',
	styles: ``,
})
export class EditProjectPage {
	private readonly projectService = inject(ProjectService)
	private readonly route = inject(ActivatedRoute)

	slug = toSignal(this.route.params.pipe(map(p => p['slug'])))
	project = signal<Project | null>(null)
	isLoading = signal(true)

	ngOnInit() {
		this.loadProject()
	}

	async loadProject() {
		try {
			const data = await this.projectService.getOne(this.slug())
			this.project.set(data)
		} finally {
			this.isLoading.set(false)
		}
	}

	onSubmit(value: ProjectFormValue) {
		// TODO: llamar al servicio para actualizar el proyecto
		console.log('Update project:', value)
	}
}
