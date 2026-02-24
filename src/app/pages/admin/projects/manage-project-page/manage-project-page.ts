import { Component, computed, inject, linkedSignal, resource } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, RouterLink } from '@angular/router'

import { ProjectChallengesForm, ProjectResultsForm, ProjectTechStackForm } from '@features/projects/components'
import { ProjectChallenge, ProjectResult, ProjectTechStack } from '@features/projects/models'
import { ProjectService } from '@features/projects/services'
import { map } from 'rxjs'

@Component({
	selector: 'app-manage-project-page',
	imports: [RouterLink, ProjectChallengesForm, ProjectResultsForm, ProjectTechStackForm],

	templateUrl: './manage-project-page.html',
})
export class ManageProjectPage {
	private readonly projectService = inject(ProjectService)
	private readonly route = inject(ActivatedRoute)

	projectSlug = toSignal(this.route.params.pipe(map(p => p['slug'] as string)))
	projectResource = resource({ loader: () => this.projectService.getOne(this.projectSlug()!) })

	Project = computed(() => this.projectResource.value())
	TechStack = linkedSignal(() => this.projectResource.value()?.techStack ?? [])
	Challenges = linkedSignal(() => this.projectResource.value()?.challenges ?? [])
	Results = linkedSignal(() => this.projectResource.value()?.results ?? [])
	mainImage = linkedSignal(() => this.projectResource.value()?.images[0].url)

	async onSaveChallenges(challenges: ProjectChallenge[]): Promise<void> {
		const challengesSync = await this.projectService.syncChallenges(this.Project()!.id, challenges)
		this.Challenges.set(challengesSync)
	}

	async onSaveResults(results: ProjectResult[]): Promise<void> {
		const resultsSync = await this.projectService.syncResults(this.Project()!.id, results)
		this.Results.set(resultsSync)
	}

	async onSaveTechStack(techStack: ProjectTechStack[]): Promise<void> {
		const techStackSync = await this.projectService.syncTechStack(this.Project()!.id, techStack)
		this.TechStack.set(techStackSync)
	}
}
