import { Injectable } from '@angular/core'

import { environment } from '@env/environment'

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	private readonly apiUrl: string = `${environment.apiBaseUrl}/categories`

	async get() {
		const response = await fetch(this.apiUrl)
		return response.json()
	}

	async findOne(key: string) {
		const response = await fetch(`${this.apiUrl}/${key}`)
		return response.json()
	}
}
