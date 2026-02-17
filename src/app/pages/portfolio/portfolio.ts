import { Component, computed, signal } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Project } from '../../shared/components/project-card/project-card'
import { SectionHeader } from '../../shared/components/section-header/section-header'

type CategoryFilter = 'all' | 'webapp' | 'mobile' | 'experiment'

interface FilterTab {
	id: CategoryFilter
	label: string
}

interface Experiment {
	title: string
	description: string
	tags: string[]
	link: string
}

@Component({
	selector: 'app-portfolio',
	imports: [RouterLink, SectionHeader],
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
			title: 'ERP ECO-Suite',
			subtitle: 'Gestión integral empresarial',
			description:
				'Sistema ERP modular para PyMEs con módulos de ventas, compras, inventario, finanzas y recursos humanos. Arquitectura multi-tenant.',
			image: '/assets/images/ecosuite.png',
			tags: ['Angular', 'TypeScript', 'NestJS', 'PostgreSQL'],
			link: '/portfolio/ecosuite',
			metrics: '3 empresas activas',
			category: 'webapp',
			role: 'Frontend Architect',
			repoPrivate: true,
			featured: true,
		},
		{
			title: 'ERP Aquos',
			subtitle: 'Sistema de gestión para renta de filtros',
			description:
				'Sistema ERP completo para empresa de renta de filtros de agua con gestión de suscripciones, clientes, inventario y reportes financieros.',
			problem: 'La empresa manejaba todo en Excel, perdiendo el control de suscripciones y renovaciones.',
			image: '/assets/images/aquos.png',
			tags: ['Livewire', 'Laravel', 'MySQL', 'Stripe'],
			link: '/portfolio/aquos',
			metrics: '+200% eficiencia operativa',
			category: 'webapp',
			role: 'Full Stack Developer',
			liveUrl: 'https://aquos.example.com',
			repoPrivate: true,
		},
		{
			title: 'CRM Aclara',
			subtitle: 'Gestión de prospectos y cotizaciones',
			description:
				'CRM especializado para empresa de plantas de tratamiento de agua. Seguimiento de prospectos, proyectos y generación automática de cotizaciones.',
			image: '/assets/images/crm.png',
			tags: ['Livewire', 'Laravel', 'MySQL', 'PDF Generation'],
			link: '/portfolio/crm-aclara',
			metrics: '+45% conversión de ventas',
			category: 'webapp',
			role: 'Lead Developer',
			repoPrivate: true,
		},

		{
			title: 'Dashboard Analytics',
			subtitle: 'Visualización de métricas en tiempo real',
			description:
				'Dashboard interactivo para visualización de KPIs de negocio con gráficos en tiempo real y exportación de reportes.',
			image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
			tags: ['Angular', 'D3.js', 'WebSockets', 'ChartJS'],
			link: '/portfolio/dashboard',
			metrics: '-60% tiempo de análisis',
			category: 'webapp',
			role: 'Frontend Developer',
			repoPrivate: true,
		},
		{
			title: 'Finance Tracker',
			subtitle: 'App de finanzas personales',
			description:
				'Aplicación móvil para control de gastos personales con categorización automática y metas de ahorro.',
			image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop',
			tags: ['React Native', 'TypeScript', 'Firebase'],
			link: '/portfolio/finance-tracker',
			category: 'mobile',
			role: 'Mobile Developer',
			repoUrl: 'https://github.com/gersomsim/finance-tracker',
		},
	])

	experiments = signal<Experiment[]>([
		{
			title: 'CSS Art: Terminal',
			description: 'Recreación de una terminal de código usando solo CSS.',
			tags: ['CSS', 'HTML'],
			link: 'https://codepen.io/gersomsim/pen/terminal',
		},
		{
			title: 'Angular Signals Lab',
			description: 'Exploración de patrones reactivos con Angular Signals.',
			tags: ['Angular', 'Signals'],
			link: 'https://github.com/gersomsim/signals-lab',
		},
		{
			title: 'Micro Animations',
			description: 'Colección de micro-interacciones para UI.',
			tags: ['CSS', 'GSAP'],
			link: 'https://codepen.io/gersomsim/pen/micro',
		},
		{
			title: 'CLI Task Manager',
			description: 'Gestor de tareas desde la terminal con Node.js.',
			tags: ['Node.js', 'CLI'],
			link: 'https://github.com/gersomsim/cli-tasks',
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
