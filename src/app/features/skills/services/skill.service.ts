import { Injectable, inject } from '@angular/core'

import { environment } from '@env/environment'
import { AuthFacade } from '@features/auth/facade'
import { ApiResponse } from '@shared/dto/api-response.dto'
import { ListResponse } from '@shared/dto/list-response.dto'

import { SkillFormData } from '../dto'
import { Skill } from '../models/skill.model'

@Injectable({
	providedIn: 'root',
})
export class SkillService {
	private readonly url = `${environment.apiBaseUrl}/skills`
	private readonly authFacade = inject(AuthFacade)

	async getAll(): Promise<ListResponse<Skill>> {
		const response = await fetch(this.url)
		const res: ApiResponse<Skill[]> = await response.json()
		return {
			items: res.data,
			pagination: res.meta.pagination!,
		}
	}

	async getOne(id: string): Promise<Skill> {
		const response = await fetch(`${this.url}/${id}`)
		const res: ApiResponse<Skill> = await response.json()
		return res.data
	}

	async create(payload: SkillFormData): Promise<Skill> {
		const response = await fetch(this.url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.authFacade.token()}`,
			},
			body: JSON.stringify(payload),
		})
		const res: ApiResponse<Skill> = await response.json()
		return res.data
	}

	async update(id: string, payload: SkillFormData): Promise<Skill> {
		const response = await fetch(`${this.url}/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.authFacade.token()}`,
			},
			body: JSON.stringify(payload),
		})
		const res: ApiResponse<Skill> = await response.json()
		return res.data
	}

	async delete(id: string): Promise<void> {
		await fetch(`${this.url}/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${this.authFacade.token()}`,
			},
		})
	}
}
