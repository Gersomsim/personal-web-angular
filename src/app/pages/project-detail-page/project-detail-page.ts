import { Component, computed, inject, resource } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router'

import { ProjectDetail } from '@features/projects/components/project-detail/project-detail'
import { ProjectService } from '@features/projects/services'
import { map } from 'rxjs'

@Component({
	selector: 'app-project-detail-page',
	imports: [ProjectDetail],
	templateUrl: './project-detail-page.html',
	styles: ``,
})
export class ProjectDetailPage {
	private readonly route = inject(ActivatedRoute)
	private readonly projectService = inject(ProjectService)

	private slug = toSignal(this.route.params.pipe(map(params => params['slug'])))

	projectRes = resource({
		loader: () => this.projectService.getOne(this.slug()),
	})
	project = computed(() => this.projectRes.value())
}
