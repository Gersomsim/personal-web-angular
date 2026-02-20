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
			title: 'Los Inicios',
			description:
				'Estudié Ingeniería en Sistemas Computacionales. Descubrí mi pasión por el desarrollo web mientras construía mis primeros proyectos con PHP y JavaScript.',
			type: 'past',
		},
		{
			period: '2018 - 2020',
			title: 'Desarrollo Web',
			description:
				'Me especialicé en Angular y TypeScript, liderando el desarrollo de aplicaciones empresariales complejas. Domino arquitecturas escalables y patrones de diseño.',
			type: 'past',
		},
		{
			period: '2020 - 2025',
			title: 'Gerencia Técnica y Liderazgo',
			description:
				'Dirijí equipos de desarrollo, implementando metodologías ágiles y herramientas de gestión. Fomenté un ambiente de aprendizaje continuo y colaboración efectiva.',
			type: 'past',
		},
		{
			period: '2025 - Presente',
			title: 'Especialización Frontend',
			description:
				'Enfocado en Angular y TypeScript, me especialicé en arquitectura de aplicaciones web escalables y de alta calidad. Desarrollo soluciones innovadoras que resuelven problemas reales con tecnología.',
			type: 'present',
		},
		{
			period: 'El Futuro',
			title: 'Arquitecto Frontend',
			description:
				'Busco roles donde pueda combinar desarrollo hands-on con mentoría de equipos. Me interesan proyectos que resuelvan problemas reales con tecnología.',
			type: 'future',
		},
	])

	workStyles = signal<WorkStyle[]>([
		{
			icon: 'communication',
			title: 'Comunicación Clara',
			description:
				'Traduzco requerimientos técnicos a lenguaje de negocio y viceversa. Facilito la colaboración entre desarrolladores, diseñadores y stakeholders.',
		},
		{
			icon: 'problem-solving',
			title: 'Resolución de Raíz',
			description:
				'No parcheo síntomas, ataco la causa. Analizo el problema completo antes de escribir código, ahorrando tiempo y deuda técnica.',
		},
		{
			icon: 'learning',
			title: 'Aprendizaje Continuo',
			description:
				'Autodidacta por naturaleza. Me mantengo actualizado con las últimas tendencias y comparto conocimiento con la comunidad.',
		},
		{
			icon: 'quality',
			title: 'Obsesión por la Calidad',
			description:
				'Código limpio, tests, documentación. No entrego hasta que esté orgulloso del resultado. El detalle marca la diferencia.',
		},
	])

	hobbies = signal<Hobby[]>([
		{
			icon: 'chess',
			name: 'Cocina',
			insight: 'Creatividad y disfrute',
		},
		{
			icon: 'reading',
			name: 'Lectura',
			insight: 'Aprendizaje constante',
		},
		{
			icon: 'gaming',
			name: 'Videojuegos',
			insight: 'Resolución de puzzles',
		},
		{
			icon: 'music',
			name: 'Música',
			insight: 'Creatividad y flow',
		},
	])
}
