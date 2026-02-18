import { NgClass } from '@angular/common'
import { Component, forwardRef, input, signal } from '@angular/core'
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
	selector: 'app-form-textarea',
	imports: [NgClass],
	templateUrl: './form-textarea.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FormTextarea),
			multi: true,
		},
	],
})
export class FormTextarea implements ControlValueAccessor {
	label = input.required<string>()
	placeholder = input<string>('')
	hint = input<string | null>(null)
	rows = input<number>(4)
	control = input<AbstractControl | null>(null)

	protected value = signal<string>('')
	protected isDisabled = signal(false)

	private _onChange: (v: string) => void = () => {}
	private _onTouched: () => void = () => {}

	writeValue(v: string | null): void {
		this.value.set(v ?? '')
	}

	registerOnChange(fn: (v: string) => void): void {
		this._onChange = fn
	}

	registerOnTouched(fn: () => void): void {
		this._onTouched = fn
	}

	setDisabledState(disabled: boolean): void {
		this.isDisabled.set(disabled)
	}

	protected onInput(event: Event): void {
		const v = (event.target as HTMLTextAreaElement).value
		this.value.set(v)
		this._onChange(v)
	}

	protected onBlur(): void {
		this._onTouched()
	}

	get hasError(): boolean {
		const c = this.control()
		return !!(c?.invalid && c?.touched)
	}

	get errorMessage(): string | null {
		const errors = this.control()?.errors
		if (!errors) return null
		if (errors['required']) return 'Este campo es requerido'
		if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`
		if (errors['maxlength']) return `Máximo ${errors['maxlength'].requiredLength} caracteres`
		return 'Campo inválido'
	}
}
