import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'

import { ContactDetail } from '@features/contact/components'
import { ContactMessage } from '@features/contact/models'
import { ContactService } from '@features/contact/services'
import { timer } from 'rxjs'

@Component({
	selector: 'app-view-contact-page',
	imports: [ContactDetail, RouterLink],
	templateUrl: './view-contact-page.html',
	styles: ``,
})
export class ViewContactPage implements OnInit {
	private destroyRef = inject(DestroyRef)
	private readonly contactService = inject(ContactService)
	private readonly route = inject(ActivatedRoute)
	private readonly router = inject(Router)

	message = signal<ContactMessage | null>(null)
	loading = signal(true)
	error = signal<string | null>(null)

	async ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id')!
		try {
			const msg = await this.contactService.getMessageById(id)
			this.message.set(msg)
			if (!msg.read) {
				this.autoRead()
			}
		} catch {
			this.error.set('No se pudo cargar el mensaje.')
		} finally {
			this.loading.set(false)
		}
	}
	autoRead() {
		const SEG = 5000
		timer(SEG)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.onMarkRead()
			})
	}

	async onMarkRead() {
		const msg = this.message()
		if (!msg) return
		try {
			const updated = await this.contactService.markAsRead(msg.id)
		} catch {
			// Silent — not critical
		}
	}

	async onDelete() {
		const msg = this.message()
		if (!msg) return
		await this.contactService.deleteMessage(msg.id)
		this.router.navigate(['/admin/contacto'])
	}
}
