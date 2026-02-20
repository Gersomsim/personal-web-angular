import { Injectable, inject } from '@angular/core'

import { environment } from '@env/environment'
import { AuthFacade } from '@features/auth/facade'
import { PostFormData } from '@features/posts/dto'
import { ApiResponse, ListResponse } from '@shared/dto'

import { QueryTagDto } from '../dto/query-tag.dto'
import { TagFormData } from '../dto/tag-form-data.dto'
import { Tag } from '../models'

@Injectable({
	providedIn: 'root',
})
export class TagService {
	private readonly authFacade = inject(AuthFacade)
	private readonly apiUrl: string = `${environment.apiBaseUrl}/tags`

	async getAll(query?: QueryTagDto): Promise<ListResponse<Tag>> {
		const params = new URLSearchParams()

		Object.entries(query ?? {}).forEach(([key, value]) => {
			if (value) {
				params.append(key, value.toString())
			}
		})

		const response = await fetch(`${this.apiUrl}?${params.toString()}`)
		const resp: ApiResponse<Tag[]> = await response.json()
		return {
			items: resp.data,
			pagination: resp.meta.pagination!,
		}
	}

	async findOne(key: string): Promise<Tag> {
		const response = await fetch(`${this.apiUrl}/${key}`)
		const resp: ApiResponse<Tag> = await response.json()
		return resp.data
	}
	async create(payload: TagFormData): Promise<Tag> {
		const response = await fetch(this.apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.authFacade.token()}`,
			},
			body: JSON.stringify(payload),
		})
		const resp: ApiResponse<Tag> = await response.json()
		return resp.data
	}

	async update(key: string, payload: PostFormData): Promise<Tag> {
		const response = await fetch(`${this.apiUrl}/${key}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.authFacade.token()}`,
			},
			body: JSON.stringify(payload),
		})
		const resp: ApiResponse<Tag> = await response.json()
		return resp.data
	}

	async remove(key: string): Promise<Tag> {
		const response = await fetch(`${this.apiUrl}/${key}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${this.authFacade.token()}`,
			},
		})
		const resp: ApiResponse<Tag> = await response.json()
		return resp.data
	}
}
