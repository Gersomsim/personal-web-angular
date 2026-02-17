import { Component, computed, signal } from '@angular/core'
import { RouterLink } from '@angular/router'

import { ExperimentList, ProjectCard } from '@features/projects/components'
import { ProjectsList } from '@features/projects/components/projects-list/projects-list'
import { Project } from '@features/projects/models'

import { SectionHeader } from '../../shared/components/section-header/section-header'

type CategoryFilter = 'all' | 'webapp' | 'mobile' | 'experiment'

interface FilterTab {
	id: CategoryFilter
	label: string
}

@Component({
	selector: 'app-portfolio',
	imports: [RouterLink, SectionHeader, ProjectsList, ExperimentList, ProjectCard],
	templateUrl: './portfolio.html',
	styles: `
		@keyframes blink {
			0%,
			50% {
				opacity: 1;
			}
			51%,
			100% {
				opacity: 0;
			}
		}
		.cursor {
			animation: blink 1s step-end infinite;
		}
	`,
})
export class Portfolio {
	activeFilter = signal<CategoryFilter>('all')

	filters: FilterTab[] = [
		{ id: 'all', label: 'Todos' },
		{ id: 'webapp', label: 'Web Apps' },
		{ id: 'mobile', label: 'Mobile' },
		{ id: 'experiment', label: 'Experimentos' },
	]

	projects = signal<Project[]>([
		{
			id: 'ecosuite',
			title: 'ERP ECO-Suite',
			subtitle: 'Gestión integral empresarial',
			description:
				'Sistema ERP modular para PyMEs con módulos de ventas, compras, inventario, finanzas y recursos humanos. Arquitectura multi-tenant.',
			image: '/assets/images/ecosuite.png',
			tags: [
				{ id: 'angular', name: 'Angular', slug: 'angular' },
				{ id: 'typescript', name: 'TypeScript', slug: 'typescript' },
				{ id: 'nestjs', name: 'NestJS', slug: 'nestjs' },
				{ id: 'postgresql', name: 'PostgreSQL', slug: 'postgresql' },
			],
			link: '/portfolio/ecosuite',
			metrics: '3 empresas activas',
			category: 'webapp',
			role: 'Frontend Architect',
			repoPrivate: true,
			featured: true,
		},
	])

	experiments = signal<Project[]>([
		{
			id: 'css-art-terminal',
			title: 'CSS Art: Terminal',
			description: 'Recreación de una terminal de código usando solo CSS.',
			tags: [
				{ id: 'css', name: 'CSS', slug: 'css' },
				{ id: 'html', name: 'HTML', slug: 'html' },
			],
			link: 'https://codepen.io/gersomsim/pen/terminal',
			category: 'experiment',
			repoPrivate: false,
			featured: false,
			image: '/assets/images/ecosuite.png',
			subtitle: 'Recreación de una terminal de código usando solo CSS.',
		},
	])

	featuredProject = computed(() => this.projects().find(p => p.featured) || this.projects()[0])

	filteredProjects = computed(() => {
		const filter = this.activeFilter()
		const featured = this.featuredProject()

		return this.projects()
			.filter(p => p !== featured)
			.filter(p => filter === 'all' || p.category === filter)
	})

	setFilter(filter: CategoryFilter) {
		this.activeFilter.set(filter)
	}
}
