import { Component, input } from '@angular/core'

import { Project } from '@features/projects/models'

@Component({
	selector: 'app-related-project',
	imports: [],
	templateUrl: './related-project.html',
	styles: ``,
})
export class RelatedProject {
	project = input<Project>()
}
