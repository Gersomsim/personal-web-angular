import { Routes } from '@angular/router'

import { AdminLayout, BlogLayout, MainLayout } from '@shared/layouts'

export const routes: Routes = [
	{
		path: '',
		component: MainLayout,
		children: [
			{
				path: '',
				loadComponent: () => import('./pages/home/home').then(m => m.Home),
			},
			{
				path: 'about-me',
				loadComponent: () => import('./pages/about-me/about-me').then(m => m.AboutMe),
			},
			{
				path: 'portfolio',
				loadComponent: () => import('./pages/portfolio/portfolio').then(m => m.Portfolio),
			},
			{
				path: 'portfolio/:slug',
				loadComponent: () => import('./pages/project-detail/project-detail').then(m => m.ProjectDetail),
			},
			{
				path: 'contact',
				loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),
			},
		],
	},
	{
		path: 'blog',
		component: BlogLayout,
		loadChildren: () => import('./pages/blog/blog.router').then(m => m.BlogRoutes),
	},
	{
		path: 'admin',
		component: AdminLayout,
		loadChildren: () => import('./pages/admin/admin.routes').then(m => m.AdminRoutes),
	},
	{
		path: '**',
		redirectTo: '',
	},
]
