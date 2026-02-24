import { Component, OnInit, inject, signal } from '@angular/core'

import { ContactList } from '@features/contact/components'
import { ContactMessage } from '@features/contact/models'
import { ContactService } from '@features/contact/services'

@Component({
	selector: 'app-list-contacts-page',
	imports: [ContactList],
	templateUrl: './list-contacts-page.html',
	styles: ``,
})
export class ListContactsPage implements OnInit {
	private readonly contactService = inject(ContactService)

	messages = signal<ContactMessage[]>([])
	loading = signal(true)
	error = signal<string | null>(null)

	async ngOnInit() {
		try {
			const response = await this.contactService.getMessages()
			this.messages.set(response.items ?? [])
		} catch {
			this.error.set('No se pudieron cargar los mensajes.')
		} finally {
			this.loading.set(false)
		}
	}

	async onDelete(msg: ContactMessage) {
		await this.contactService.deleteMessage(msg.id)
		this.messages.set(this.messages().filter(m => m.id !== msg.id))
	}

	get unreadCount(): number {
		return this.messages().filter(m => !m.read).length
	}
}
