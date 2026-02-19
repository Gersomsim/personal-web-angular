import { Injectable } from '@angular/core'

import { environment } from '@env/environment'
import { ApiResponse } from '@shared/models/api-response.model'
import { ListResponse } from 'src/app/interfaces/list-response.interface'

import { Post } from '../models'

@Injectable({
	providedIn: 'root',
})
export class PostService {
	private readonly apiUrl = `${environment.apiBaseUrl}/posts`

	async getAll(): Promise<ListResponse<Post>> {
		await new Promise(resolve => setTimeout(resolve, 2000))
		const response = await fetch(this.apiUrl)
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
}
