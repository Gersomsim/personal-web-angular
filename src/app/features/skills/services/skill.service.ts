import { Injectable } from '@angular/core'

import { environment } from '@env/environment'

@Injectable({
	providedIn: 'root',
})
export class SkillService {
	private url = `${environment.apiBaseUrl}/skills`

	async getAll() {
		const response = await fetch(this.url)
		return response.json()
	}

	async getOne(id: string) {
		const response = await fetch(`${this.url}/${id}`)
		return response.json()
	}
}
