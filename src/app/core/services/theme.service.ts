import { Injectable, afterNextRender, signal } from '@angular/core'

type ThemePreference = 'dark' | 'light' | null

@Injectable({ providedIn: 'root' })
export class ThemeService {
	private readonly storageKey = 'color-theme'
	private mediaQuery!: any

	private _preference = signal<ThemePreference>(null)

	isDark = signal<boolean>(false)

	constructor() {
		afterNextRender(() => {
			this.apply()
			this.mediaQuery.addEventListener('change', this.onSystemChange)
			this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
			this._preference.set(localStorage.getItem(this.storageKey) as ThemePreference)
		})
	}

	toggle(): void {
		const next = this.isDark() ? 'light' : 'dark'
		this._preference.set(next)
		this.isDark.set(next === 'dark')
		localStorage.setItem(this.storageKey, next)
		this.apply()
	}

	apply(): void {
		if (this.isDark()) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}

	private onSystemChange = (): void => {
		if (this._preference() === null) {
			this.apply()
		}
	}
}
