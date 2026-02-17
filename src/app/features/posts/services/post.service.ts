import { Injectable } from '@angular/core'

import { environment } from '@env/environment'

@Injectable({
	providedIn: 'root',
})
export class PostService {
	private readonly apiUrl = `${environment.apiBaseUrl}/posts`

	async getAll() {
		await new Promise(resolve => setTimeout(resolve, 2000))
		const response = await fetch(this.apiUrl)
		return response.json()
	}
}
