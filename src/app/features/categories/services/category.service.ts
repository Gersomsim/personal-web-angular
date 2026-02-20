import { Injectable, inject } from '@angular/core'

import { environment } from '@env/environment'
import { AuthFacade } from '@features/auth/facade'
import { ApiResponse, ListResponse } from '@shared/dto'

import { CategoryFormData } from '../dto/category-form-data.dto'
import { QueryCategoryDto } from '../dto/query-category.dto'
import { Category } from '../models'

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	private readonly apiUrl: string = `${environment.apiBaseUrl}/categories`
	private readonly authFacade = inject(AuthFacade)

	async get(filters?: QueryCategoryDto): Promise<ListResponse<Category>> {
		const query = new URLSearchParams()

		Object.entries(filters ?? {}).forEach(([key, value]) => {
			if (value) {
				query.append(key, value.toString())
			}
		})

		const response = await fetch(`${this.apiUrl}?${query.toString()}`)
		const resp: ApiResponse<Category[]> = await response.json()
		return {
			items: resp.data,
			pagination: resp.meta.pagination!,
		}
	}

	async findOne(key: string): Promise<Category> {
		const response = await fetch(`${this.apiUrl}/${key}`)
		const resp: ApiResponse<Category> = await response.json()
		return resp.data
	}

	async create(payload: CategoryFormData): Promise<Category> {
		const response = await fetch(`${this.apiUrl}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.authFacade.token()}`,
			},
			body: JSON.stringify(payload),
		})
		const resp: ApiResponse<Category> = await response.json()
		return resp.data
	}

	async update(key: string, payload: CategoryFormData): Promise<Category> {
		const response = await fetch(`${this.apiUrl}/${key}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.authFacade.token()}`,
			},
			body: JSON.stringify(payload),
		})
		const resp: ApiResponse<Category> = await response.json()
		return resp.data
	}

	async delete(key: string): Promise<void> {
		await fetch(`${this.apiUrl}/${key}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${this.authFacade.token()}`,
			},
		})
	}
}
