import { Component, input } from '@angular/core'

import { Project } from '@features/projects/models'
import { TagsList } from '@features/tags/components'

@Component({
	selector: 'app-experiment-list',
	imports: [TagsList],
	templateUrl: './experiment-list.html',
	styles: ``,
})
export class ExperimentList {
	experiments = input<Project[]>()
}
