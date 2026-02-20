import { Routes } from '@angular/router'

export const AdminRoutes: Routes = [
	{
		path: 'projects',
		children: [
			{
				path: '',

				loadComponent: () =>
					import('./projects/list-projects-page/list-projects-page').then(m => m.ListProjectsPage),
			},
			{
				path: 'new',
				loadComponent: () =>
					import('./projects/create-project-page/create-project-page').then(m => m.CreateProjectPage),
			},
			{
				path: 'edit/:slug',
				loadComponent: () =>
					import('./projects/edit-project-page/edit-project-page').then(m => m.EditProjectPage),
			},
		],
	},
	{
		path: 'skills',
		children: [
			{
				path: '',
				loadComponent: () => import('./skills/list-skills-page/list-skills-page').then(m => m.ListSkillsPage),
			},
			{
				path: 'new',
				loadComponent: () =>
					import('./skills/create-skill-page/create-skill-page').then(m => m.CreateSkillPage),
			},
		],
	},
	{
		path: 'blog',
		children: [
			{
				path: '',

				loadComponent: () => import('./blog/list-posts-page/list-posts-page').then(m => m.ListPostsPage),
			},
			{
				path: 'new',
				loadComponent: () => import('./blog/create-post-page/create-post-page').then(m => m.CreatePostPage),
			},
			{
				path: 'edit/:slug',
				loadComponent: () => import('./blog/edit-post-page/edit-post-page').then(m => m.EditPostPage),
			},
		],
	},
	{
		path: '',
		redirectTo: 'blog',
		pathMatch: 'full',
	},
]
