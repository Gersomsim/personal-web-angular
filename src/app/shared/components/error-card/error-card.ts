import { Component, computed, input } from '@angular/core'
import { RouterLink } from '@angular/router'

import pluralize from 'pluralize'

@Component({
	selector: 'app-error-card',
	imports: [RouterLink],
	templateUrl: './error-card.html',
	styles: ``,
})
export class ErrorCard {
	section = input<string>('projects')
	message = input<string>('No se encontró el item')
	link = input<string>('../')
	linkText = input<string>('volver')
	error = input<string>('NotFoundError')

	singular = computed(() => {
		const word = this.section()

		return pluralize.singular(word)
	})
}
