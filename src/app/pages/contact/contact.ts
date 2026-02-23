import { Component, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { SeoService } from '@core/services'
import { environment } from '@env/environment'

import { SectionHeader } from '../../shared/components/section-header/section-header'

interface SubjectOption {
	value: string
	label: string
}

@Component({
	selector: 'app-contact',
	imports: [FormsModule, SectionHeader],
	templateUrl: './contact.html',
	styleUrl: './contact.css',
})
export class Contact {
	private readonly seoService = inject(SeoService)

	name = signal('')
	email = signal('')
	subject = signal('')
	message = signal('')
	dropdownOpen = signal(false)
	sending = signal(false)
	sent = signal(false)

	subjectTrigger = viewChild<ElementRef>('subjectTrigger')

	subjects: SubjectOption[] = [
		{ value: 'proyecto', label: 'Tengo un proyecto' },
		{ value: 'freelance', label: 'Trabajo freelance' },
		{ value: 'fulltime', label: 'Oportunidad full-time' },
		{ value: 'consultoria', label: 'Consultoría técnica' },
		{ value: 'colaboracion', label: 'Colaboración / Open Source' },
		{ value: 'otro', label: 'Otro' },
	]

	get selectedLabel(): string {
		const found = this.subjects.find(s => s.value === this.subject())
		return found ? found.label : ''
	}

	toggleDropdown() {
		this.dropdownOpen.update(v => !v)
	}

	selectSubject(option: SubjectOption) {
		this.subject.set(option.value)
		this.dropdownOpen.set(false)
	}

	@HostListener('document:click', ['$event'])
	onDocumentClick(event: Event) {
		const trigger = this.subjectTrigger()
		if (trigger && !trigger.nativeElement.parentElement.contains(event.target as Node)) {
			this.dropdownOpen.set(false)
		}
	}

	async onSubmit() {
		if (!this.name() || !this.email() || !this.subject() || !this.message()) return

		this.sending.set(true)

		// Simulate send — replace with actual API call
		await new Promise(resolve => setTimeout(resolve, 1500))

		this.sending.set(false)
		this.sent.set(true)

		// Reset after showing success
		setTimeout(() => {
			this.name.set('')
			this.email.set('')
			this.subject.set('')
			this.message.set('')
			this.sent.set(false)
		}, 4000)
	}

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
}
