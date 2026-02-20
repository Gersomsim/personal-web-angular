import { Injectable } from '@angular/core'

import { environment } from '@env/environment'
import { User } from '@features/users/models'
import { ApiResponse } from '@shared/dto/api-response.dto'

import { LoginFormData, LoginResponseDto } from '../dto'

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly url = `${environment.apiBaseUrl}/auth`

	async login(credentials: LoginFormData): Promise<{ token: string; user: User }> {
		const response = await fetch(`${this.url}/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(credentials),
		})

		if (!response.ok) {
			const body = await response.json().catch(() => ({}))
			throw new Error(body.message ?? 'Credenciales incorrectas')
		}

		const resp: ApiResponse<LoginResponseDto> = await response.json()
		const { token, user } = resp.data
		return { token, user }
	}
}
