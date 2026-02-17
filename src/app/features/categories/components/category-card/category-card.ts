import { Component, input } from '@angular/core'

import { Category } from '@features/categories/models'

@Component({
	selector: 'app-category-card',
	imports: [],
	templateUrl: './category-card.html',
	styles: ``,
})
export class CategoryCard {
	category = input<Category>()
}
