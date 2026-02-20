import { Injectable } from '@angular/core'

import { environment } from '@env/environment'
import { ApiResponse } from '@shared/models/api-response.model'
import { ListResponse } from 'src/app/interfaces/list-response.interface'

import { QueryProjectDto } from '../dto/query-project.dto'
import { Project } from '../models'

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	private readonly url = `${environment.apiBaseUrl}/projects`

	async getAll(query?: QueryProjectDto): Promise<ListResponse<Project>> {
		const params = new URLSearchParams()
		Object.entries(query || {}).forEach(([key, value]) => {
			if (value) {
				params.append(key, value.toString())
			}
		})

		const response = await fetch(`${this.url}?${params.toString()}`)
		const resp: ApiResponse<Project[]> = await response.json()
		return {
			items: resp.data,
			pagination: resp.meta.pagination!,
		}
	}

	async getOne(id: string): Promise<Project> {
		const response = await fetch(`${this.url}/${id}`)
		const resp: ApiResponse<Project> = await response.json()
		return resp.data
	}
}
