import { NgClass } from '@angular/common'
import { Component, ElementRef, HostListener, OnDestroy, computed, effect, input, output, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs'

export interface ComboboxItem {
	key: string | number
	value: string
}

@Component({
	selector: 'app-combobox',
	imports: [ReactiveFormsModule, NgClass],
	templateUrl: './combobox.html',
})
export class Combobox implements OnDestroy {
	// Inputs
	items = input<ComboboxItem[]>([])
	selectedKey = input<string | number | null>(null)
	label = input<string>('')
	placeholder = input<string>('Buscar...')
	createLabel = input<string>('Crear nueva categoría')

	// Outputs
	searchChanged = output<string>()
	itemSelected = output<string | number>()
	createRequested = output<string>()

	// Internal state
	protected searchControl = new FormControl('')
	protected isOpen = signal(false)
	protected activeIndex = signal(-1)
	protected _inputText = signal('')

	protected showCreate = computed(() => {
		const find = this.items().find(i => i.value.toLocaleLowerCase().includes(this._inputText().toLocaleLowerCase()))
		return this._inputText().trim().length > 0 && !find
	})

	filteredItems = computed(() => {
		return this.items().filter(i => i.value.toLocaleLowerCase().includes(this._inputText().toLocaleLowerCase()))
	})

	protected totalOptions = computed(() => {
		return this.filteredItems().length + (this.showCreate() ? 1 : 0)
	})

	private _destroy$ = new Subject<void>()

	constructor(private _el: ElementRef) {
		// Sync display text when selectedKey or items change (only when dropdown is closed)
		effect(() => {
			const key = this.selectedKey()
			const items = this.items()
			if (!this.isOpen()) {
				const item = items.find(i => i.key === key)
				this.searchControl.setValue(item?.value ?? '', { emitEvent: false })
			}
		})

		// Keep _inputText signal in sync with FormControl (for reactive computeds)
		this.searchControl.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(v => {
			this._inputText.set(v ?? '')
		})

		// Debounced emit for remote search
		this.searchControl.valueChanges
			.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this._destroy$))
			.subscribe(v => {
				this.searchChanged.emit(v ?? '')
			})
	}

	ngOnDestroy(): void {
		this._destroy$.next()
		this._destroy$.complete()
	}

	@HostListener('document:click', ['$event'])
	protected onDocumentClick(e: MouseEvent): void {
		if (!this._el.nativeElement.contains(e.target as Node)) {
			this._close()
		}
	}

	protected onInputFocus(): void {
		this.isOpen.set(true)
		this.activeIndex.set(-1)
		// Trigger initial load from parent
		this.searchChanged.emit(this._inputText())
	}

	protected onKeydown(e: KeyboardEvent): void {
		if (!this.isOpen()) {
			if (e.key === 'ArrowDown' || e.key === 'Enter') {
				e.preventDefault()
				this.isOpen.set(true)
			}
			return
		}

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault()
				this.activeIndex.update(i => Math.min(i + 1, this.totalOptions() - 1))
				break
			case 'ArrowUp':
				e.preventDefault()
				this.activeIndex.update(i => Math.max(i - 1, 0))
				break
			case 'Enter':
				e.preventDefault()
				this._selectByIndex(this.activeIndex())
				break
			case 'Escape':
				e.preventDefault()
				this._close()
				break
			case 'Tab':
				this._close()
				break
		}
	}

	protected selectItem(item: ComboboxItem): void {
		this.searchControl.setValue(item.value, { emitEvent: false })
		this._inputText.set(item.value)
		this.itemSelected.emit(item.key)
		this.isOpen.set(false)
		this.activeIndex.set(-1)
	}

	protected selectCreate(): void {
		const text = this._inputText().trim()
		if (!text) return
		this.createRequested.emit(text)
		this.isOpen.set(false)
		this.activeIndex.set(-1)
	}

	private _selectByIndex(idx: number): void {
		if (idx < 0) return
		const items = this.items()
		if (idx < items.length) {
			this.selectItem(items[idx])
		} else if (this.showCreate()) {
			this.selectCreate()
		}
	}

	private _close(): void {
		this.isOpen.set(false)
		this.activeIndex.set(-1)
		// Restore selected value display
		const key = this.selectedKey()
		const item = this.items().find(i => i.key === key)
		this.searchControl.setValue(item?.value ?? '', { emitEvent: false })
		this._inputText.set(item?.value ?? '')
	}
}
