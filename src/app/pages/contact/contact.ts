import { Component, inject, signal } from '@angular/core'

import { SeoService } from '@core/services'
import { environment } from '@env/environment'
import { ContactForm } from '@features/contact/components'
import { ContactFormData } from '@features/contact/dto'
import { ContactService } from '@features/contact/services'

import { SectionHeader } from '../../shared/components/section-header/section-header'

@Component({
	selector: 'app-contact',
	imports: [SectionHeader, ContactForm],
	templateUrl: './contact.html',
	styleUrl: './contact.css',
})
export class Contact {
	private readonly seoService = inject(SeoService)
	private readonly contactService = inject(ContactService)
	loading = signal(false)
	sent = signal(false)

	constructor() {
		this.seoService.AddTags({
			title: 'Contacto - Gersom',
			description:
				'Contactame para hablar sobre proyectos, freelance, full-time, consultoría técnica, colaboración o cualquier otra cosa.',
			keywords: ['contacto', 'Gersom'],
			type: 'article',
			url: `https://${environment.domain}/contact`,
		})
	}

	async onSubmitForm(form: ContactFormData) {
		this.loading.set(true)
		this.sent.set(false)
		try {
			await this.contactService.sendContactForm(form)
			this.sent.set(true)
		} catch (error) {
			console.error(error)
		} finally {
			this.loading.set(false)
		}
	}
}
