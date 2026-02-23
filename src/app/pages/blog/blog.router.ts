import { Routes } from '@angular/router'

export const BlogRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./blog-page/blog-page').then(m => m.BlogPage),
		children: [
			{
				path: '',
				loadComponent: () => import('./posts/posts').then(m => m.Posts),
			},
			{
				path: ':type/:slug',
				loadComponent: () => import('./posts-filter/posts-filter').then(m => m.PostsFilter),
			},
		],
	},
	{
		path: ':slug',
		loadComponent: () => import('./post/post').then(m => m.PostPage),
	},
]
