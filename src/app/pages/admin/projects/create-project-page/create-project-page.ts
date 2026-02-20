import { Component } from '@angular/core'

import { ProjectForm, ProjectFormValue } from '@features/projects/components/project-form/project-form'

@Component({
	selector: 'app-create-project-page',
	imports: [ProjectForm],
	templateUrl: './create-project-page.html',
	styles: ``,
})
export class CreateProjectPage {
	onSubmit(value: ProjectFormValue) {
		// TODO: llamar al servicio para crear el proyecto
		console.log('New project:', value)
	}
}
