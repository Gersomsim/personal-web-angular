import { Component, input } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Category } from '@features/categories/models'

@Component({
	selector: 'app-categories-list',
	imports: [RouterLink],
	templateUrl: './categories-list.html',
	styles: ``,
})
export class CategoriesList {
	categories = input<Category[]>()
}
