import { Injectable, computed, inject, signal } from '@angular/core'

import { User } from '@features/users/models'

import { LoginFormData } from '../dto'
import { AuthService } from '../services'

@Injectable({
	providedIn: 'root',
})
export class AuthFacade {
	private readonly authService = inject(AuthService)

	private readonly _isLoading = signal<boolean>(false)
	private readonly _error = signal<string | null>(null)
	private readonly _token = signal<string | null>(null)
	private readonly _user = signal<User | null>(null)

	readonly isLoading = this._isLoading.asReadonly()
	readonly error = this._error.asReadonly()
	readonly token = this._token.asReadonly()
	readonly user = this._user.asReadonly()

	readonly isAuthenticated = computed(() => !!this._token())

	constructor() {
		this.loadToken()
		this.loadUser()
	}

	async login(credentials: LoginFormData): Promise<void> {
		this._isLoading.set(true)
		this._error.set(null)

		try {
			const { token, user } = await this.authService.login(credentials)
			this.saveToken(token)
			this.saveUser(user)
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : 'Error al iniciar sesión'
			this._error.set(message)
		} finally {
			this._isLoading.set(false)
		}
	}

	logout(): void {
		localStorage.removeItem('admin_token')
		localStorage.removeItem('admin_user')
		this._token.set(null)
		this._user.set(null)
	}

	private saveToken(token: string): void {
		localStorage.setItem('admin_token', token)
		this._token.set(token)
	}

	private saveUser(user: User): void {
		localStorage.setItem('admin_user', JSON.stringify(user))
		this._user.set(user)
	}

	private loadToken(): void {
		const token = localStorage.getItem('admin_token')
		this._token.set(token)
	}

	private loadUser(): void {
		const user = localStorage.getItem('admin_user')
		this._user.set(user ? JSON.parse(user) : null)
	}
}
