import { Component, computed, inject, resource, signal } from '@angular/core'
import { RouterLink } from '@angular/router'

import { SeoService } from '@core/services'
import { environment } from '@env/environment'
import { PostCard } from '@features/posts/components'
import { Post } from '@features/posts/models'
import { PostService } from '@features/posts/services'
import { ProjectCard } from '@features/projects/components'
import { ProjectService } from '@features/projects/services'

import { SectionHeader } from '../../shared/components/section-header/section-header'
import { Testimonial, TestimonialCard } from '../../shared/components/testimonial-card/testimonial-card'

interface TechItem {
	name: string
	icon: string
	img: string
}

@Component({
	selector: 'app-home',
	imports: [RouterLink, SectionHeader, ProjectCard, TestimonialCard, PostCard],
	templateUrl: './home.html',
	styles: ``,
})
export class Home {
	private readonly projectService = inject(ProjectService)
	private readonly postService = inject(PostService)
	private readonly seoService = inject(SeoService)

	constructor() {
		this.seoService.AddTags({
			title: 'Gersom | Senior Frontend Engineer & Tech Lead - Angular Expert',
			description:
				'Ingeniero de Software con +10 años de experiencia. Especialista en arquitectura Angular y liderazgo técnico. Soluciones escalables para aplicaciones empresariales complejas.',
			keywords: [
				'Senior Frontend Engineer',
				'Angular Expert',
				'Software Architecture',
				'TypeScript',
				'Desarrollo Web Escalable',
				'Tech Lead México',
			],
			type: 'website',
			url: `https://${environment.domain}`,
		})
	}

	projectsRes = resource({
		loader: () => this.projectService.getAll({ limit: 3, featured: true }),
	})
	postsRes = resource({
		loader: () => this.postService.getAll({ limit: 2 }),
	})

	projects = computed(() => this.projectsRes.value()?.items ?? [])
	posts = computed(() => this.postsRes.value()?.items ?? [])

	testimonialGridCols = computed(() =>
		this.testimonials().length <= 2
			? 'grid gap-8 sm:grid-cols-2'
			: 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3'
	)

	techStack = signal<TechItem[]>([
		{ name: 'Angular', icon: 'angular', img: '/icons/angular.svg' },
		{ name: 'TypeScript', icon: 'typescript', img: '/icons/typescript.svg' },
		{ name: 'Laravel', icon: 'laravel', img: '/icons/laravel.svg' },
		{ name: 'PHP', icon: 'php', img: '/icons/php.svg' },
		{ name: 'NestJS', icon: 'nestjs', img: '/icons/nestjs.svg' },
		{ name: 'Node.js', icon: 'nodejs', img: '/icons/nodejs.svg' },
		{ name: 'PostgreSQL', icon: 'postgresql', img: '/icons/postgresql.svg' },
	])

	testimonials = signal<Testimonial[]>([
		{
			quote: 'Durante el tiempo que formó parte de nuestra organización, se distinguió por su profesionalismo y compromiso, cumpliendo de manera responsable con las funciones y objetivos asignados a su cargo.',
			author: 'Antonio López Hernandez',
			role: 'Director General',
			company: 'Aclara Tratamiento de agua',
		},
		{
			quote: 'Gersom es un colaborador excepcional que ha demostrado con creces su experiencia técnica. Destaca por su capacidad para comprender requerimientos complejos, entregando siempre en tiempo y forma con una calidad de trabajo sobresaliente y una actitud que facilita la cohesión del equipo',
			author: 'Héctor Manuel Gutierrez Gómez',
			role: 'Project Manager',
			company: 'Amentum',
		},
	])

	blogPosts = signal<Post[]>([])
}
