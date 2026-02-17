import { Injectable, signal } from '@angular/core'

import { IMenuItem } from '../interfaces'

@Injectable({
	providedIn: 'root',
})
export class MenuService {
	menu = signal<IMenuItem[]>([
		{
			label: 'Home',
			path: '/',
		},
		{
			label: 'About',
			path: '/about-me',
		},
		{
			label: 'Projects',
			path: '/portfolio',
		},
		{
			label: 'Blog',
			path: '/blog',
		},
		{
			label: 'Contact',
			path: '/contact',
		},
	])
}
