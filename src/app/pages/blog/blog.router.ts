import { Routes } from '@angular/router'

export const BlogRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./posts/posts').then(m => m.Posts),
	},
	{
		path: ':slug',
		loadComponent: () => import('./post/post').then(m => m.PostPage),
	},
	{
		path: ':type/:slug',
		loadComponent: () => import('./posts-filter/posts-filter').then(m => m.PostsFilter),
	},
]
