import { DatePipe } from '@angular/common'
import { Component, input, output } from '@angular/core'

import { ContactMessage } from '../../models'

@Component({
	selector: 'app-contact-detail',
	imports: [DatePipe],
	templateUrl: './contact-detail.html',
	host: { class: 'block' },
})
export class ContactDetail {
	message = input<ContactMessage | null>(null)
	loading = input<boolean>(false)

	markReadRequested = output<void>()
	deleteRequested = output<void>()
}
