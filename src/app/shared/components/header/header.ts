import { Component, HostListener, inject, signal } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'

import { MenuService } from '@core/services/menu.service'
import { ThemeService } from '@core/services/theme.service'

@Component({
	selector: 'app-header',
	imports: [RouterLink, RouterLinkActive],
	templateUrl: './header.html',
	styles: ``,
})
export class Header {
	private menuService = inject(MenuService)
	protected theme = inject(ThemeService)

	menu = this.menuService.menu
	isScrolled = signal(false)
	mobileMenuOpen = signal(false)

	@HostListener('window:scroll')
	onScroll() {
		this.isScrolled.set(window.scrollY > 20)
	}

	toggleMobileMenu() {
		this.mobileMenuOpen.update(v => !v)
	}

	closeMobileMenu() {
		this.mobileMenuOpen.set(false)
	}
}
