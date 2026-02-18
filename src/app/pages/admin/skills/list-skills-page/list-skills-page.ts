import { Component, inject, OnInit, signal } from '@angular/core'

import { Skill } from '@features/skills/models/skill.model'
import { SkillService } from '@features/skills/services/skill.service'

@Component({
	selector: 'app-list-skills-page',
	imports: [],
	templateUrl: './list-skills-page.html',
	styles: ``,
})
export class ListSkillsPage implements OnInit {
	private skillService = inject(SkillService)

	skills = signal<Skill[]>([])
	loading = signal(true)
	error = signal<string | null>(null)

	async ngOnInit() {
		try {
			const response = await this.skillService.getAll()
			this.skills.set(response.data ?? response)
		} catch {
			this.error.set('No se pudieron cargar las skills.')
		} finally {
			this.loading.set(false)
		}
	}

	onEdit(skill: Skill) {
		// TODO: abrir modal de edición
		console.log('Edit skill:', skill.slug)
	}

	onDelete(skill: Skill) {
		// TODO: abrir modal de confirmación
		console.log('Delete skill:', skill.slug)
	}
}
