import { Injectable, computed, inject, signal } from '@angular/core'

import { AuthFacade } from '@features/auth/facade'

import { IMenuItem } from '../interfaces'

@Injectable({
	providedIn: 'root',
})
export class MenuService {
	authFacade = inject(AuthFacade)

	menuGuest = signal<IMenuItem[]>([
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
	menuAuth = signal<IMenuItem[]>([
		{
			label: 'Admin',
			path: '/admin',
		},
	])
	menu = computed(() => {
		if (this.authFacade.isAuthenticated()) {
			return [...this.menuGuest(), ...this.menuAuth()]
		}
		return this.menuGuest()
	})
}
