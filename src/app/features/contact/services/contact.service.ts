import { Injectable, inject } from '@angular/core'

import { environment } from '@env/environment'
import { AuthFacade } from '@features/auth/facade'
import { ApiResponse, ListResponse } from '@shared/dto'

import { ContactFormData } from '../dto'
import { ContactMessage } from '../models'

@Injectable({
	providedIn: 'root',
})
export class ContactService {
	private readonly url = `${environment.apiBaseUrl}/contact`
	private readonly authFacade = inject(AuthFacade)

	async sendContactForm(data: ContactFormData): Promise<void> {
		const request = await fetch(this.url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})

		if (!request.ok) throw new Error('Error al enviar el mensaje')
	}

	async getMessages(): Promise<ListResponse<ContactMessage>> {
		const request = await fetch(`${this.url}`, {
			headers: { Authorization: `Bearer ${this.authFacade.token()}` },
		})

		const response: ApiResponse<ContactMessage[]> = await request.json()
		return {
			items: response.data,
			pagination: response.meta.pagination!,
		}
	}

	async getMessageById(id: string): Promise<ContactMessage> {
		const request = await fetch(`${this.url}/${id}`, {
			headers: { Authorization: `Bearer ${this.authFacade.token()}` },
		})

		const response: ApiResponse<ContactMessage> = await request.json()
		return response.data
	}

	async markAsRead(id: string): Promise<void> {
		const request = await fetch(`${this.url}/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.authFacade.token()}`,
			},
		})

		const response: ApiResponse<ContactMessage> = await request.json()
	}

	async deleteMessage(id: string): Promise<void> {
		await fetch(`${this.url}/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${this.authFacade.token()}` },
		})
	}
}
