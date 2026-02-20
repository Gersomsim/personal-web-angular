import { NgClass } from '@angular/common'
import { Component, input, output, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { LoginFormData } from '@features/auth/dto'

@Component({
	selector: 'app-auth-form',
	imports: [ReactiveFormsModule, NgClass],
	templateUrl: './auth-form.html',
	styles: ``,
})
export class AuthForm {
	loading = input<boolean>(false)
	error = input<string | null>(null)

	loginSubmit = output<LoginFormData>()

	showPassword = signal(false)

	form = new FormGroup({
		email: new FormControl('', {
			validators: [Validators.required, Validators.email],
			nonNullable: true,
		}),
		password: new FormControl('', {
			validators: [Validators.required, Validators.minLength(6)],
			nonNullable: true,
		}),
	})

	get f() {
		return this.form.controls
	}

	get hasEmailError(): boolean {
		return this.f.email.invalid && this.f.email.touched
	}

	get emailError(): string | null {
		const e = this.f.email.errors
		if (!e) return null
		if (e['required']) return 'El email es requerido'
		if (e['email']) return 'Formato de email inválido'
		return 'Campo inválido'
	}

	get hasPasswordError(): boolean {
		return this.f.password.invalid && this.f.password.touched
	}

	get passwordError(): string | null {
		const e = this.f.password.errors
		if (!e) return null
		if (e['required']) return 'La contraseña es requerida'
		if (e['minlength']) return 'Mínimo 6 caracteres'
		return 'Campo inválido'
	}

	onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched()
			return
		}
		this.loginSubmit.emit(this.form.getRawValue())
	}
}
