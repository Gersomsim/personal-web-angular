import { Component, signal } from '@angular/core'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'

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
	]

	toggleSidebar() {
		this.sidebarOpen.update(v => !v)
	}
}
