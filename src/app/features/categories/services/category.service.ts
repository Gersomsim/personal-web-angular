import { Injectable } from '@angular/core'

import { environment } from '@env/environment'

import { QueryCategoryDto } from '../dto/query-category.dto'

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	private readonly apiUrl: string = `${environment.apiBaseUrl}/categories`

	async get(filters?: QueryCategoryDto) {
		const query = new URLSearchParams()

		Object.entries(filters ?? {}).forEach(([key, value]) => {
			if (value) {
				query.append(key, value.toString())
			}
		})

		const response = await fetch(`${this.apiUrl}?${query.toString()}`)
		return response.json()
	}

	async findOne(key: string) {
		const response = await fetch(`${this.apiUrl}/${key}`)
		return response.json()
	}
}
