import { Component, input } from '@angular/core'

import { CategoriesList } from '@features/categories/components'
import { Category } from '@features/categories/models'

@Component({
	selector: 'app-widget-categories',
	imports: [CategoriesList],
	templateUrl: './widget-categories.html',
	styles: ``,
	host: {
		style: 'display: block',
	},
})
export class WidgetCategories {
	categories = input<Category[]>()
}
