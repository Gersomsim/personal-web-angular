import { Injectable } from '@angular/core'

import { environment } from '@env/environment'

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	private readonly url = `${environment.apiBaseUrl}/projects`

	async getAll() {
		const response = await fetch(this.url)
		const data = await response.json()
		return data
	}

	async getOne(id: string) {
		const response = await fetch(`${this.url}/${id}`)
		const data = await response.json()
		return data
	}
}
