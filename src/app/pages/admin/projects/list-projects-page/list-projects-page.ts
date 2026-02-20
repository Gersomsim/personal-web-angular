import { Component, OnInit, inject, signal } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Project } from '@features/projects/models/project.model'
import { ProjectService } from '@features/projects/services/project.service'

@Component({
	selector: 'app-list-projects-page',
	imports: [RouterLink],
	templateUrl: './list-projects-page.html',
	styles: ``,
})
export class ListProjectsPage implements OnInit {
	private projectService = inject(ProjectService)

	projects = signal<Project[]>([])
	loading = signal(true)
	error = signal<string | null>(null)

	async ngOnInit() {
		try {
			const response = await this.projectService.getAll()
			this.projects.set(response.items)
		} catch {
			this.error.set('No se pudieron cargar los proyectos.')
		} finally {
			this.loading.set(false)
		}
	}

	onDelete(project: Project) {
		// TODO: abrir modal de confirmación
		console.log('Delete project:', project.id)
	}
}
