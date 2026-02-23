import { Injectable, PLATFORM_ID, afterNextRender, inject, signal } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

type ThemePreference = 'dark' | 'light' | null

@Injectable({ providedIn: 'root' })
export class ThemeService {
	private readonly storageKey = 'color-theme'
	private platformId = inject(PLATFORM_ID)
	private mediaQuery: MediaQueryList | null = null

	private _preference = signal<ThemePreference>(null)

	isDark = signal<boolean>(false)

	constructor() {
		afterNextRender(() => {
			this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
			const saved = localStorage.getItem(this.storageKey) as ThemePreference
			this._preference.set(saved)

			if (saved !== null) {
				this.isDark.set(saved === 'dark')
			} else {
				this.isDark.set(this.mediaQuery.matches)
			}

			this.apply()
			this.mediaQuery.addEventListener('change', this.onSystemChange)
		})
	}

	toggle(): void {
		const next = this.isDark() ? 'light' : 'dark'
		this._preference.set(next)
		this.isDark.set(next === 'dark')
		if (isPlatformBrowser(this.platformId)) {
			localStorage.setItem(this.storageKey, next)
		}
		this.apply()
	}

	apply(): void {
		if (!isPlatformBrowser(this.platformId)) return
		if (this.isDark()) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}

	private onSystemChange = (): void => {
		if (this._preference() === null && this.mediaQuery) {
			this.isDark.set(this.mediaQuery.matches)
			this.apply()
		}
	}
}
