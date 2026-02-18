import { NgClass } from '@angular/common'
import { Component, forwardRef, input, signal } from '@angular/core'
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

export interface SelectOption {
	value: string
	label: string
}

@Component({
	selector: 'app-form-select',
	imports: [NgClass],
	templateUrl: './form-select.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FormSelect),
			multi: true,
		},
	],
})
export class FormSelect implements ControlValueAccessor {
	label = input.required<string>()
	options = input.required<SelectOption[]>()
	placeholder = input<string>('Seleccionar...')
	control = input<AbstractControl | null>(null)

	protected value = signal<string | null>(null)
	protected isDisabled = signal(false)

	private _onChange: (v: string | null) => void = () => {}
	private _onTouched: () => void = () => {}

	writeValue(v: string | null): void {
		this.value.set(v ?? null)
	}

	registerOnChange(fn: (v: string | null) => void): void {
		this._onChange = fn
	}

	registerOnTouched(fn: () => void): void {
		this._onTouched = fn
	}

	setDisabledState(disabled: boolean): void {
		this.isDisabled.set(disabled)
	}

	protected onChange(event: Event): void {
		const v = (event.target as HTMLSelectElement).value
		const emitted = v === '' ? null : v
		this.value.set(emitted)
		this._onChange(emitted)
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
		return 'Campo inválido'
	}
}
