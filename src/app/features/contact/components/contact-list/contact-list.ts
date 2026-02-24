import { DatePipe } from '@angular/common'
import { Component, input, output } from '@angular/core'
import { RouterLink } from '@angular/router'

import { ContactMessage } from '../../models'

@Component({
	selector: 'app-contact-list',
	imports: [RouterLink, DatePipe],
	templateUrl: './contact-list.html',
	host: { class: 'block' },
})
export class ContactList {
	messages = input<ContactMessage[]>([])
	loading = input<boolean>(false)
	error = input<string | null>(null)

	deleteRequested = output<ContactMessage>()
}
