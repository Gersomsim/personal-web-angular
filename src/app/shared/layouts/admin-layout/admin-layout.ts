import { Component, inject, signal } from '@angular/core'
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'

import { AuthFacade } from '@features/auth/facade'

import { Header } from '../../components/header/header'

interface AdminNavItem {
	label: string
	path: string
	icon: string
}

interface AdminNavGroup {
	tag: string
	items: AdminNavItem[]
}

@Component({
	selector: 'app-admin-layout',
	imports: [RouterOutlet, RouterLink, RouterLinkActive, Header],
	templateUrl: './admin-layout.html',
	styles: ``,
})
export class AdminLayout {
	private readonly authFacade = inject(AuthFacade)
	private readonly router = inject(Router)

	sidebarOpen = signal(true)

	navGroups: AdminNavGroup[] = [
		{
			tag: '// contenido',
			items: [{ label: 'Posts', path: '/admin/blog', icon: 'file-text' }],
		},
		{
			tag: '// portfolio',
			items: [
				{ label: 'Proyectos', path: '/admin/projects', icon: 'code' },
				{ label: 'Skills', path: '/admin/skills', icon: 'zap' },
			],
		},
		{
			tag: '// comunicación',
			items: [{ label: 'Contacto', path: '/admin/contacto', icon: 'mail' }],
		},
	]

	toggleSidebar() {
		this.sidebarOpen.update(v => !v)
	}

	logout(): void {
		this.authFacade.logout()
		this.router.navigate(['/admin/login'])
	}
}
