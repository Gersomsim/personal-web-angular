import { Component, signal } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Post } from '@features/posts/models'

import { PostCard } from '../../features/posts/components/post-card/post-card'
import { Project, ProjectCard } from '../../shared/components/project-card/project-card'
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
export class Home {
	techStack = signal<TechItem[]>([
		{ name: 'Angular', icon: 'angular', img: '/icons/angular.svg' },
		{ name: 'TypeScript', icon: 'typescript', img: '/icons/typescript.svg' },
		{ name: 'Laravel', icon: 'laravel', img: '/icons/laravel.svg' },
		{ name: 'PHP', icon: 'php', img: '/icons/php.svg' },
		{ name: 'NestJS', icon: 'nestjs', img: '/icons/nestjs.svg' },
		{ name: 'Node.js', icon: 'nodejs', img: '/icons/nodejs.svg' },
		{ name: 'PostgreSQL', icon: 'postgresql', img: '/icons/postgresql.svg' },
	])

	featuredProjects = signal<Project[]>([
		{
			title: 'ERP: Aquos',
			description:
				'Sistema ERP para renta de filtros de agua, con gestión de clientes, productos, ventas, compras, inventario y reportes.',
			image: '/assets/images/aquos.png',
			tags: ['Livewire', 'Laravel', 'MySQL', 'Stripe'],
			link: '/portfolio/aquos',
			metrics: 'Gestión con suscripciones',
			category: 'webapp',
		},
		{
			title: 'CRM Aclara',
			description:
				'CRM para gestión de prospectos, seguimiento de proyectos y cotizaciones de plantas de tratamiento de agua.',
			image: '/assets/images/crm.png',
			tags: ['Livewire', 'Laravel', 'MySQL'],
			link: '/portfolio/crm-aclara',
			metrics: 'Gestión de ventas',
			category: 'webapp',
		},
		{
			title: 'ERP ECO-Suite',
			description:
				'Sistema ERP para gestión integral de empresas, con gestión de clientes, productos, ventas, finanzas, compras, inventario y reportes.',
			image: '/assets/images/ecosuite.png',
			tags: ['Angular', 'TypeScript', 'PostgreSQL', 'Laravel'],
			link: '/portfolio/ecosuite',
			metrics: 'Gestión integral de empresas',
			category: 'webapp',
		},
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

	blogPosts = signal<Post[]>([
		{
			id: '1',
			title: 'Arquitectura de Componentes en Angular 17+',
			excerpt:
				'Exploramos las mejores prácticas para diseñar componentes escalables y mantenibles usando signals y standalone components.',
			date: 'Feb 10, 2024',
			readTime: '8 min',
			slug: 'arquitectura-componentes-angular',
			author: {
				name: 'Gersom Hernández',
				image: '/assets/images/38233407.jpg',
			},
			category: 'Performance',
			tags: [{ id: '1', name: 'Angular', slug: 'angular' }],
		},
		{
			id: '2',
			title: 'Optimización de Performance en SPAs',
			excerpt:
				'Técnicas avanzadas para mejorar el tiempo de carga y la experiencia de usuario en aplicaciones de página única.',
			date: 'Ene 28, 2024',
			readTime: '6 min',
			slug: 'optimizacion-performance-spa',
			author: {
				name: 'Gersom Hernández',
				image: '/assets/images/38233407.jpg',
			},
			category: 'Performance',
			tags: [
				{ id: '2', name: 'TypeScript', slug: 'typescript' },
				{ id: '3', name: 'Performance', slug: 'performance' },
			],
		},
	])
}
