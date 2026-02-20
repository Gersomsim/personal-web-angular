import { Component, inject, signal } from '@angular/core'
import { Router, RouterLink } from '@angular/router'

import { AuthForm } from '@features/auth/components/auth-form/auth-form'
import { LoginFormData } from '@features/auth/dto'
import { AuthFacade } from '@features/auth/facade'

@Component({
	selector: 'app-login-page',
	imports: [RouterLink, AuthForm],
	templateUrl: './login-page.html',
	styles: ``,
})
export class LoginPage {
	private readonly facade = inject(AuthFacade)
	private readonly router = inject(Router)

	isLoading = signal(false)
	error = signal<string | null>(null)

	async onLogin(credentials: LoginFormData) {
		this.isLoading.set(true)
		this.error.set(null)

		try {
			await this.facade.login(credentials)
			this.router.navigate(['/admin'])
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : 'Error al iniciar sesión'
			this.error.set(message)
		} finally {
			this.isLoading.set(false)
		}
	}
}
