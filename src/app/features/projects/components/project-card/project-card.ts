import { Component, computed, input } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Project } from '@features/projects/models'
import { TagsList } from '@features/tags/components'

@Component({
	selector: 'app-project-card',
	imports: [RouterLink, TagsList],
	templateUrl: './project-card.html',
	styles: ``,
})
export class ProjectCard {
	project = input.required<Project>()
	loading = input(true)
	mainImage = computed(() => this.project().images[0].url)
}
