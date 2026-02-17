import { Component, input } from '@angular/core'

import { Skill } from '@features/skills/models/skill.model'

@Component({
	selector: 'app-skills-list',
	imports: [],
	templateUrl: './skills-list.html',
	styles: ``,
})
export class SkillsList {
	skills = input<Skill[]>()
}
