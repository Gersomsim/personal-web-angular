import { Routes } from '@angular/router'

import { authGuard } from '@core/guards'
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
				loadComponent: () =>
					import('./pages/project-detail-page/project-detail-page').then(m => m.ProjectDetailPage),
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
	// Login page — standalone, sin layout
	{
		path: 'admin/login',
		loadComponent: () => import('./pages/admin/login-page/login-page').then(m => m.LoginPage),
	},
	{
		path: 'admin',
		component: AdminLayout,
		canActivate: [authGuard],
		loadChildren: () => import('./pages/admin/admin.routes').then(m => m.AdminRoutes),
	},
	{
		path: '**',
		redirectTo: '',
	},
]
