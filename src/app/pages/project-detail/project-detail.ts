import { Component, signal } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Project } from '@features/projects/models'
import { TagsList } from '@features/tags/components'

@Component({
	selector: 'app-project-detail',
	imports: [RouterLink, TagsList],
	templateUrl: './project-detail.html',
	styles: ``,
})
export class ProjectDetail {
	project = signal<Project>({
		id: 'ecosuite',
		title: 'ERP ECO-Suite',
		subtitle: 'Gestión integral empresarial',
		description:
			'Sistema ERP modular para PyMEs con módulos de ventas, compras, inventario, finanzas y recursos humanos. Arquitectura multi-tenant con soporte para múltiples organizaciones.',
		problem:
			'Las PyMEs en Latinoamérica dependen de hojas de cálculo o sistemas ERP costosos y rígidos que no se adaptan a sus procesos. Necesitaban una solución modular, accesible y que pudiera escalar con el negocio sin requerir infraestructura compleja.',
		solution:
			'Diseñé una arquitectura multi-tenant donde cada organización tiene su espacio aislado pero comparte la infraestructura base. Los módulos son independientes y se activan según las necesidades del cliente, permitiendo un onboarding gradual sin abrumar al usuario.',
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
		duration: '8 meses',
		team: '4 desarrolladores',
		features: [
			'Multi-tenant con aislamiento de datos por organización',
			'Módulos de ventas, compras, inventario y finanzas',
			'Dashboard en tiempo real con métricas del negocio',
			'Sistema de permisos granular por rol y módulo',
			'Generación automática de reportes PDF y Excel',
			'API RESTful documentada con Swagger',
		],
		techStack: [
			{ category: 'Frontend', items: ['Angular 17', 'TypeScript', 'Tailwind CSS', 'NgRx Signals'] },
			{ category: 'Backend', items: ['NestJS', 'TypeORM', 'PostgreSQL', 'Redis'] },
			{ category: 'Infraestructura', items: ['Docker', 'GitHub Actions', 'AWS EC2', 'CloudFront'] },
			{ category: 'Herramientas', items: ['Figma', 'Swagger', 'Jest', 'Cypress'] },
		],
		challenges: [
			{
				title: 'Aislamiento de datos multi-tenant',
				solution:
					'Implementé un middleware en NestJS que intercepta cada request, identifica el tenant por subdomain y aplica un filtro global a nivel de TypeORM. Cada query se ejecuta dentro del contexto del tenant sin que el desarrollador tenga que pensar en ello.',
			},
			{
				title: 'Performance con volúmenes grandes de inventario',
				solution:
					'Optimicé las consultas críticas con índices compuestos, implementé paginación con cursor-based pagination en lugar de offset, y agregué una capa de caché con Redis para las consultas más frecuentes del dashboard.',
			},
			{
				title: 'Módulos independientes sin acoplamiento',
				solution:
					'Diseñé una arquitectura basada en eventos donde los módulos se comunican a través de un event bus interno. Cada módulo expone una API pública y escucha eventos sin conocer la implementación de los demás.',
			},
		],
		results: [
			{ label: 'Empresas activas', value: '3', description: 'Organizaciones usando el sistema en producción' },
			{
				label: 'Tiempo de carga',
				value: '<2s',
				description: 'First contentful paint en conexiones estándar',
			},
			{
				label: 'Reducción de errores',
				value: '60%',
				description: 'Menos errores de inventario vs proceso manual',
			},
			{
				label: 'Tiempo de onboarding',
				value: '3 días',
				description: 'Para que un nuevo cliente esté operativo',
			},
		],
		learnings: [
			'Multi-tenant no es solo un filtro en la base de datos — es una decisión arquitectónica que afecta autenticación, caché, migraciones y hasta el CI/CD.',
			'Los módulos verdaderamente independientes requieren disciplina: si un import cruza fronteras, el acoplamiento ya comenzó.',
			'La paginación basada en cursor es significativamente más eficiente que offset para datasets que cambian frecuentemente.',
		],
	})
}
