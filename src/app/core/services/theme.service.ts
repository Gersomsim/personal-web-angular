import { Injectable, OnDestroy, computed, signal } from '@angular/core'

type ThemePreference = 'dark' | 'light' | null

@Injectable({ providedIn: 'root' })
export class ThemeService implements OnDestroy {
	private readonly storageKey = 'color-theme'
	private readonly mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

	private _preference = signal<ThemePreference>(
		localStorage.getItem(this.storageKey) as ThemePreference,
	)

	isDark = computed(() => {
		const pref = this._preference()
		if (pref !== null) return pref === 'dark'
		return this.mediaQuery.matches
	})

	constructor() {
		this.apply()
		this.mediaQuery.addEventListener('change', this.onSystemChange)
	}

	toggle(): void {
		const next = this.isDark() ? 'light' : 'dark'
		this._preference.set(next)
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

	ngOnDestroy(): void {
		this.mediaQuery.removeEventListener('change', this.onSystemChange)
	}
}
