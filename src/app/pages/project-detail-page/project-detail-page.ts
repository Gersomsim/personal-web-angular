import { Component, computed, effect, inject, resource } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, RouterLink } from '@angular/router'

import { SeoService } from '@core/services'
import { environment } from '@env/environment'
import { ProjectDetail } from '@features/projects/components/project-detail/project-detail'
import { Project } from '@features/projects/models'
import { ProjectService } from '@features/projects/services'
import { map } from 'rxjs'

@Component({
	selector: 'app-project-detail-page',
	imports: [ProjectDetail, RouterLink],
	templateUrl: './project-detail-page.html',
	styles: ``,
})
export class ProjectDetailPage {
	private readonly route = inject(ActivatedRoute)
	private readonly projectService = inject(ProjectService)
	private readonly seoService = inject(SeoService)

	private slug = toSignal(this.route.params.pipe(map(params => params['slug'])))

	projectRes = resource({
		loader: () => this.projectService.getOne(this.slug()),
	})
	project = computed(() => this.projectRes.value())

	constructor() {
		effect(() => {
			const project = this.project()
			if (project) {
				this.setTags(project)
			}
		})
	}
	setTags(project: Project) {
		this.seoService.AddTags({
			title: project.title,
			description: project.description,
			keywords: project.tags?.map(tag => tag.name) || [],
			type: 'article',
			url: `https://${environment.domain}/projects/${this.slug()}`,
			image: project.images[0].url,
		})
	}
}
