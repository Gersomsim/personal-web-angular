import { Component, computed, input } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Project } from '@features/projects/models'
import { TagsList } from '@features/tags/components'

@Component({
	selector: 'app-project-featured',
	imports: [TagsList, RouterLink],
	templateUrl: './project-featured.html',
	styles: ``,
})
export class ProjectFeatured {
	project = input<Project>()
	mainImage = computed(() => this.project()?.images[0].url)
}
