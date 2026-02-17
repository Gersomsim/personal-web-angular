import { Component, input } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Project } from '@features/projects/models'
import { TagsList } from '@features/tags/components'

@Component({
	selector: 'app-projects-list',
	imports: [RouterLink, TagsList],
	templateUrl: './projects-list.html',
	styles: ``,
})
export class ProjectsList {
	projects = input<Project[]>()
}
