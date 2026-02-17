import { Injectable } from '@angular/core'

import { environment } from '@env/environment'

@Injectable({
	providedIn: 'root',
})
export class TagService {
	private readonly apiUrl: string = `${environment.apiBaseUrl}/tags`

	async get() {
		const response = await fetch(this.apiUrl)
		return response.json()
	}

	async findOne(key: string) {
		const response = await fetch(`${this.apiUrl}/${key}`)
		return response.json()
	}
}
