import { Injectable, inject } from '@angular/core'

import { environment } from '@env/environment'
import { AuthFacade } from '@features/auth/facade'
import { ApiResponse } from '@shared/dto/api-response.dto'
import { ListResponse } from '@shared/dto/list-response.dto'

import { ProjectFormData } from '../dto'
import { QueryProjectDto } from '../dto/query-project.dto'
import { Project } from '../models'

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	private readonly authFacade = inject(AuthFacade)
	private readonly url = `${environment.apiBaseUrl}/projects`

	async getAll(query?: QueryProjectDto): Promise<ListResponse<Project>> {
		const params = new URLSearchParams()
		Object.entries(query || {}).forEach(([key, value]) => {
			if (value) {
				params.append(key, value.toString())
			}
		})

		const response = await fetch(`${this.url}?${params.toString()}`)
		const resp: ApiResponse<Project[]> = await response.json()
		return {
			items: resp.data,
			pagination: resp.meta.pagination!,
		}
	}

	async getOne(id: string): Promise<Project> {
		const response = await fetch(`${this.url}/${id}`)
		const resp: ApiResponse<Project> = await response.json()
		return resp.data
	}
	async create(data: ProjectFormData): Promise<Project> {
		const response = await fetch(this.url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.authFacade.token()}`,
			},
			body: JSON.stringify(data),
		})
		const resp: ApiResponse<Project> = await response.json()
		return resp.data
	}
	async update(id: string, data: ProjectFormData): Promise<Project> {
		const response = await fetch(`${this.url}/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.authFacade.token()}`,
			},
			body: JSON.stringify(data),
		})
		const resp: ApiResponse<Project> = await response.json()
		return resp.data
	}
	async delete(id: string): Promise<void> {
		const response = await fetch(`${this.url}/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${this.authFacade.token()}`,
			},
		})
		if (!response.ok) {
			throw new Error('Failed to delete project')
		}
	}
}
