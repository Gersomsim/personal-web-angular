import { Component, computed, input } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Project } from '@features/projects/models'
import { TagsList } from '@features/tags/components'
import { ErrorCard } from '@shared/components'

@Component({
	selector: 'app-project-detail',
	imports: [RouterLink, TagsList, ErrorCard],
	templateUrl: './project-detail.html',
	styles: ``,
})
export class ProjectDetail {
	project = input<Project>()
	loading = input<boolean>()

	mainImage = computed(() => this.project()?.images[0].url ?? '')
	galleryImages = computed(
		() =>
			this.project()
				?.images.slice(1)
				.map(i => i.url) ?? [],
	)
}
