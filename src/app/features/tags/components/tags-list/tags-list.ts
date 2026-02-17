import { Component, input } from '@angular/core'

import { Tag } from '@features/tags/models'

@Component({
	selector: 'app-tags-list',
	imports: [],
	templateUrl: './tags-list.html',
	styles: ``,
})
export class TagsList {
	tags = input<Tag[]>()
}
