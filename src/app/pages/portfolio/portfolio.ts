import { Component, computed, inject, resource, signal } from '@angular/core'
import { RouterLink } from '@angular/router'

import { SeoService } from '@core/services'
import { environment } from '@env/environment'
import { ExperimentList } from '@features/projects/components'
import { ProjectFeatured } from '@features/projects/components/project-featured/project-featured'
import { ProjectsList } from '@features/projects/components/projects-list/projects-list'
import { ProjectService } from '@features/projects/services'

import { SectionHeader } from '../../shared/components/section-header/section-header'

type CategoryFilter = 'all' | 'webapp' | 'mobile' | 'experiment'

interface FilterTab {
	id: CategoryFilter
	label: string
}

@Component({
	selector: 'app-portfolio',
	imports: [RouterLink, SectionHeader, ProjectsList, ExperimentList, ProjectFeatured],
	templateUrl: './portfolio.html',
	styles: ``,
})
export class Portfolio {
	private readonly projectService = inject(ProjectService)
	private readonly seoService = inject(SeoService)

	projectsRes = resource({
		loader: () => this.projectService.getAll(),
	})
	experimentsRes = resource({
		loader: () => this.projectService.getAll({ type: 'experiment' }),
	})

	activeFilter = signal<CategoryFilter>('all')

	filters: FilterTab[] = [
		{ id: 'all', label: 'Todos' },
		{ id: 'webapp', label: 'Web Apps' },
		{ id: 'mobile', label: 'Mobile' },
		{ id: 'experiment', label: 'Experimentos' },
	]

	experiments = computed(() => this.experimentsRes.value()?.items ?? [])
	projects = computed(() => this.projectsRes.value()?.items ?? [])
	featuredProject = computed(() => this.projects().find(p => p.featured))
	Projects = computed(() => this.projects())

	constructor() {
		this.seoService.AddTags({
			title: 'Portfolio de Ingeniería | Proyectos Angular y Fullstack de Gersom',
			description:
				'Casos de éxito y soluciones reales: desde el desarrollo de ERPs complejos hasta arquitecturas de alto rendimiento con Angular, NestJS y Laravel.',
			keywords: [
				'Portfolio Angular',
				'Desarrollo de ERP',
				'Casos de estudio Software',
				'Arquitectura Fullstack',
				'Soluciones de software empresarial',
				'Aplicaciones escalables',
			],
			type: 'website',
			url: `https://${environment.domain}/portfolio`,
		})
	}

	setFilter(filter: CategoryFilter) {
		this.activeFilter.set(filter)
	}
}
