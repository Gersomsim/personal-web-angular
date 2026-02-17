import { Component, input } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Project } from '@features/projects/models'
import { TagsList } from '@features/tags/components'

@Component({
	selector: 'app-project-card',
	imports: [TagsList, RouterLink],
	templateUrl: './project-card.html',
	styles: ``,
})
export class ProjectCard {
	project = input<Project>()
}
