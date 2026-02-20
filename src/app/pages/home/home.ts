import { Component, computed, inject, resource, signal } from '@angular/core'
import { RouterLink } from '@angular/router'

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

	projectsRes = resource({
		loader: () => this.projectService.getAll({ limit: 3, featured: true }),
	})
	postsRes = resource({
		loader: () => this.postService.getAll({ limit: 2 }),
	})

	projects = computed(() => this.projectsRes.value()?.items ?? [])
	posts = computed(() => this.postsRes.value()?.items ?? [])

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
			quote: 'Gersom entregó un producto excepcional que superó nuestras expectativas. Su atención al detalle y capacidad para resolver problemas complejos fue impresionante.',
			author: 'María García',
			role: 'CTO',
			company: 'TechStartup',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
		},
		{
			quote: 'Trabajar con Gersom fue una experiencia increíble. Comunicación clara, entregas puntuales y código de alta calidad.',
			author: 'Carlos Rodríguez',
			role: 'Product Manager',
			company: 'FinanceApp',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
		},
		{
			quote: 'Su dominio de Angular y arquitectura frontend transformó completamente nuestra aplicación. Muy recomendado.',
			author: 'Ana Martínez',
			role: 'Engineering Lead',
			company: 'DataCorp',
			avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
		},
	])

	blogPosts = signal<Post[]>([])
}
