import { Injectable, inject } from '@angular/core'

import { environment } from '@env/environment'
import { AuthFacade } from '@features/auth/facade'
import { ApiResponse } from '@shared/dto'

import { FileModel } from '../models'

@Injectable({
	providedIn: 'root',
})
export class FileService {
	private readonly API_URL = `${environment.apiBaseUrl}/files`
	private readonly authFacade = inject(AuthFacade)

	async uploadFile(file: File): Promise<FileModel> {
		const formData = new FormData()
		formData.append('file', file)
		const request = await fetch(`${this.API_URL}/upload`, {
			method: 'POST',
			body: formData,
			headers: {
				Authorization: `Bearer ${this.authFacade.token()}`,
			},
		})
		const resp: ApiResponse<FileModel> = await request.json()
		return resp.data
	}

	async deleteFile(id: string): Promise<void> {
		const request = await fetch(`${this.API_URL}/delete/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.authFacade.token()}`,
			},
		})
		const resp: ApiResponse<void> = await request.json()
		return resp.data
	}
}
