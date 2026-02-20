import { Injectable } from '@angular/core'

import { environment } from '@env/environment'
import { ApiResponse, ListResponse } from '@shared/dto'

import { QueryCategoryDto } from '../dto/query-category.dto'
import { Category } from '../models'

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	private readonly apiUrl: string = `${environment.apiBaseUrl}/categories`

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

	async findOne(key: string) {
		const response = await fetch(`${this.apiUrl}/${key}`)
		return response.json()
	}
}
