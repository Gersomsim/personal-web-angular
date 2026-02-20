import { Injectable, inject } from '@angular/core'

import { environment } from '@env/environment'
import { AuthFacade } from '@features/auth/facade'
import { ApiResponse } from '@shared/dto/api-response.dto'
import { ListResponse } from '@shared/dto/list-response.dto'

import { PostFormData } from '../dto'
import { QueryPostDto } from '../dto/query-post.dto'
import { Post } from '../models'

@Injectable({
	providedIn: 'root',
})
export class PostService {
	private readonly authFacade = inject(AuthFacade)
	private readonly apiUrl = `${environment.apiBaseUrl}/posts`

	async getAll(filters?: QueryPostDto): Promise<ListResponse<Post>> {
		const params = new URLSearchParams()

		Object.entries(filters ?? {}).forEach(([key, value]) => {
			if (value) {
				params.append(key, value.toString())
			}
		})

		const response = await fetch(`${this.apiUrl}?${params.toString()}`)
		const res: ApiResponse<Post[]> = await response.json()
		return {
			items: res.data,
			pagination: res.meta.pagination!,
		}
	}

	async getBySlug(slug: string): Promise<Post> {
		await new Promise(resolve => setTimeout(resolve, 2000))
		const response = await fetch(`${this.apiUrl}/${slug}`)
		const res: ApiResponse<Post> = await response.json()
		return res.data
	}

	async create(payload: PostFormData): Promise<Post> {
		const response = await fetch(`${this.apiUrl}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.authFacade.token()}`,
			},
			body: JSON.stringify(payload),
		})
		const res: ApiResponse<Post> = await response.json()
		return res.data
	}

	async update(id: string, payload: PostFormData): Promise<Post> {
		const response = await fetch(`${this.apiUrl}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.authFacade.token()}`,
			},
			body: JSON.stringify(payload),
		})
		const res: ApiResponse<Post> = await response.json()
		return res.data
	}

	async delete(id: string): Promise<Post> {
		const response = await fetch(`${this.apiUrl}/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.authFacade.token()}`,
			},
		})
		const res: ApiResponse<Post> = await response.json()
		return res.data
	}
}
