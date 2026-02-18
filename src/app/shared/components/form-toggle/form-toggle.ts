import { Component, forwardRef, input, signal } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
	selector: 'app-form-toggle',
	imports: [],
	templateUrl: './form-toggle.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FormToggle),
			multi: true,
		},
	],
})
export class FormToggle implements ControlValueAccessor {
	label = input.required<string>()
	description = input<string | null>(null)

	protected value = signal(false)
	protected isDisabled = signal(false)

	private _onChange: (v: boolean) => void = () => {}
	private _onTouched: () => void = () => {}

	writeValue(v: boolean | null): void {
		this.value.set(v ?? false)
	}

	registerOnChange(fn: (v: boolean) => void): void {
		this._onChange = fn
	}

	registerOnTouched(fn: () => void): void {
		this._onTouched = fn
	}

	setDisabledState(disabled: boolean): void {
		this.isDisabled.set(disabled)
	}

	protected toggle(): void {
		if (this.isDisabled()) return
		const next = !this.value()
		this.value.set(next)
		this._onChange(next)
		this._onTouched()
	}
}
