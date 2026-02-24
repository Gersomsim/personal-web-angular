import { Component, inject, input, output } from '@angular/core'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'

import { ContactFormData } from '@features/contact/dto'
import { FormInput, FormSelect, FormTextarea } from '@shared/components'

interface SubjectOption {
	value: string
	label: string
}

@Component({
	selector: 'app-contact-form',
	imports: [FormsModule, FormTextarea, FormInput, FormSelect, ReactiveFormsModule],
	templateUrl: './contact-form.html',
})
export class ContactForm {
	private readonly fb = inject(FormBuilder)

	contactForm = this.fb.nonNullable.group({
		name: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		subject: ['', Validators.required],
		message: ['', Validators.required],
		hpField: [''],
	})

	sending = input(false)
	sent = input(false)
	onSubmit = output<ContactFormData>()

	subjects: SubjectOption[] = [
		{ value: 'proyecto', label: 'Tengo un proyecto' },
		{ value: 'freelance', label: 'Trabajo freelance' },
		{ value: 'fulltime', label: 'Oportunidad full-time' },
		{ value: 'consultoria', label: 'Consultoría técnica' },
		{ value: 'colaboracion', label: 'Colaboración / Open Source' },
		{ value: 'otro', label: 'Otro' },
	]

	async onSubmitForm() {
		if (this.contactForm.invalid) {
			this.contactForm.markAllAsTouched()
			return
		}

		const formData = this.contactForm.getRawValue()
		this.onSubmit.emit(formData)
	}
}
