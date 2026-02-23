import { Component, computed, inject, resource, signal } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Category } from '@features/categories/models'
import { CategoryService } from '@features/categories/services/category.service'
import { SkillsList } from '@features/skills/components/skills-list/skills-list'
import { Skill } from '@features/skills/models/skill.model'

import { SectionHeader } from '../../shared/components/section-header/section-header'

interface TimelineItem {
	period: string
	title: string
	subtitle: string
	description: string
	type: 'past' | 'present' | 'future'
}

interface WorkStyle {
	icon: string
	title: string
	description: string
}

interface SkillCategory {
	name: string
	skills: Skill[]
}

interface Hobby {
	icon: string
	name: string
	insight: string
}

@Component({
	selector: 'app-about-me',
	imports: [RouterLink, SectionHeader, SkillsList],
	templateUrl: './about-me.html',
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
export class AboutMe {
	private readonly categoryService = inject(CategoryService)
	categoryRes = resource({
		loader: () => this.categoryService.get({ type: 'skill' }),
	})
	Categories = computed<Category[]>(() => this.categoryRes.value()?.items ?? [])

	timeline = signal<TimelineItem[]>([
		{
			period: '2014 - 2018',
			title: 'Fundamentos y Visión de Negocio',
			subtitle: 'Web Developer & SEO Specialist (Área de Marketing)',
			description:
				'Inicié mi carrera profesional construyendo la presencia digital de la compañía. Aquí aprendí que el código debe ser eficiente tanto para el usuario como para los motores de búsqueda, especializándome en la optimización de rendimiento y estructura web.',
			type: 'past',
		},
		{
			period: '2018 - 2020',
			title: 'Especialización en Aplicaciones Complejas',
			subtitle: 'Software Developer (Sistemas Internos)',
			description:
				'Lideré el desarrollo y mantenimiento de un CRM personalizado. Fue mi transición definitiva al ecosistema de Angular, donde comencé a implementar arquitecturas escalables para resolver flujos de trabajo internos de alta complejidad.',
			type: 'past',
		},
		{
			period: '2020 - 2025',
			title: 'Liderazgo Técnico y Arquitectura',
			subtitle: 'Tech Lead / Gerente de Desarrollo (Hands-on)',
			description:
				'Asumí la dirección del equipo técnico sin alejarme de la implementación. Durante este periodo, lideré el ciclo de vida completo de un ERP empresarial de gran escala (desde el diseño de base de datos en 2019 hasta su ejecución final en 2024/25). Fui responsable de la toma de decisiones técnicas, definición de mappers/DTOs y la mentoría del equipo, garantizando un código limpio y mantenible.',
			type: 'past',
		},
		{
			period: '2025 - Presente',
			title: 'Ingeniería Frontend Senior',
			subtitle: 'Especialista en Arquitectura de Interfaces',
			description:
				'Enfocado en aplicar mi experiencia de liderazgo en la creación de productos de alto impacto. Combino mi visión de arquitectura fullstack (Laravel/NestJS) con una ejecución experta en Angular, buscando roles donde la complejidad técnica sea el motor del proyecto.',
			type: 'present',
		},
		{
			period: 'El Futuro',
			title: 'Arquitecto de Soluciones Frontend',
			subtitle: '',
			description:
				'Mi meta es consolidarme como el referente técnico que une los objetivos de negocio con la excelencia en el frontend, ayudando a escalar tanto productos como equipos de desarrollo.',
			type: 'future',
		},
	])

	workStyles = signal<WorkStyle[]>([
		{
			icon: 'communication',
			title: 'Comunicación Visual y Técnica',
			description:
				'Mi lenguaje puente son los diagramas de flujo. Aprendí que la claridad nace de lo visual; por eso, acompaño cada definición técnica con esquemas que aseguran que desarrolladores, diseñadores y stakeholders visualicen la misma solución antes de ejecutarla.',
		},
		{
			icon: 'problem-solving',
			title: 'Pensamiento Sistémico (El fin de los "parches")',
			description:
				'Priorizo la creación de funcionalidades sobre los parches temporales. Un ejemplo: ante la petición de "un campo extra" para seguros en finanzas, diseñé un módulo integral de gestión de obras. Mi enfoque es entender la entidad de negocio para construir módulos robustos que evitan la deuda técnica y escalan con la empresa.',
		},
		{
			icon: 'learning',
			title: 'Mentoring y Cultura de Equipo',
			description:
				'Creo en el crecimiento colectivo. Implementé dinámicas de transferencia de conocimiento semanal y sesiones de Live Coding / Code Review para nivelar las habilidades del equipo. No solo resuelvo el problema, sino que aprovecho cada desafío técnico como una oportunidad de mentoría para fortalecer la autonomía del equipo.',
		},
		{
			icon: 'quality',
			title: 'Calidad Basada en Estándares',
			description:
				'Mi experiencia como Gerente y Tech Lead me ha enseñado que la rapidez sin calidad es un costo a futuro. Mantengo un compromiso firme con el Código Limpio y la Documentación, asegurando que el producto final sea un activo fácil de mantener y evolucionar.',
		},
	])

	hobbies = signal<Hobby[]>([
		{
			icon: 'chess',
			name: 'Gastronomía',
			insight:
				'Más que cocinar, soy un entusiasta de la buena mesa. Disfruto descubrir nuevos sabores y experiencias culinarias; para mí, la comida es la mejor forma de conectar con las personas y entender las culturas locales.',
		},
		{
			icon: 'reading',
			name: 'Curiosidad Técnica',
			insight:
				'Mi lectura no está en las novelas, sino en la red. Me apasiona consumir documentación técnica, artículos de arquitectura y posts de colegas de la industria. Es mi manera de mantenerme actualizado y encontrar soluciones reales a problemas del día a día.',
		},
		{
			icon: 'gaming',
			name: 'Videojuegos',
			insight:
				'Me inclino por títulos que exigen estrategia y resolución de problemas bajo presión. Es una forma divertida de mantener activa la mente analítica fuera de la terminal.',
		},
		{
			icon: 'music',
			name: 'Música | Ritmo y Concentración',
			insight:
				'Es el motor de mi Deep Work. Tocar o escuchar música me ayuda a encontrar el "flow" necesario para abordar tareas que requieren máxima concentración y creatividad.',
		},
	])
}
