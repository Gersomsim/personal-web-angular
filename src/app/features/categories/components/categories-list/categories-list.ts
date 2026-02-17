import { Component, input } from '@angular/core'

import { Category } from '@features/categories/models'

@Component({
	selector: 'app-categories-list',
	imports: [],
	templateUrl: './categories-list.html',
	styles: ``,
})
export class CategoriesList {
	categories = input<Category[]>()
}
