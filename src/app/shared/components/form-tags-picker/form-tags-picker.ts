import { Component, forwardRef, input, signal } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

import { Tag } from '@features/tags/models'

@Component({
	selector: 'app-form-tags-picker',
	imports: [],
	templateUrl: './form-tags-picker.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FormTagsPicker),
			multi: true,
		},
	],
})
export class FormTagsPicker implements ControlValueAccessor {
	label = input.required<string>()
	options = input<Tag[]>([])

	protected selected = signal<Tag[]>([])
	protected isDisabled = signal(false)

	private _onChange: (v: Tag[]) => void = () => {}
	private _onTouched: () => void = () => {}

	writeValue(v: Tag[] | null): void {
		this.selected.set(v ?? [])
	}

	registerOnChange(fn: (v: Tag[]) => void): void {
		this._onChange = fn
	}

	registerOnTouched(fn: () => void): void {
		this._onTouched = fn
	}

	setDisabledState(disabled: boolean): void {
		this.isDisabled.set(disabled)
	}

	protected toggle(tag: Tag): void {
		if (this.isDisabled()) return
		const current = this.selected()
		const idx = current.findIndex(t => t.id === tag.id)
		const next = idx >= 0 ? current.filter(t => t.id !== tag.id) : [...current, tag]
		this.selected.set(next)
		this._onChange(next)
		this._onTouched()
	}

	protected isSelected(tag: Tag): boolean {
		return this.selected().some(t => t.id === tag.id)
	}
}
