import { NgClass } from '@angular/common'
import { Component, ElementRef, HostListener, OnDestroy, computed, effect, input, output, signal, untracked } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs'

import { ComboboxItem } from '../combobox/combobox'

@Component({
	selector: 'app-combobox-multi',
	imports: [ReactiveFormsModule, NgClass],
	templateUrl: './combobox-multi.html',
})
export class ComboboxMulti implements OnDestroy {
	// Inputs
	items = input<ComboboxItem[]>([])
	selectedKeys = input<(string | number)[]>([])
	label = input<string>('')
	placeholder = input<string>('Buscar tags...')
	createLabel = input<string>('Crear nuevo tag')

	// Outputs
	searchChanged = output<string>()
	selectionChanged = output<(string | number)[]>()
	createRequested = output<string>()

	// Internal state
	protected searchControl = new FormControl('')
	protected isOpen = signal(false)
	protected activeIndex = signal(-1)
	protected _inputText = signal('')
	protected _selectedItems = signal<ComboboxItem[]>([])

	// Items filtered by search text (parent provides; we filter locally too for UX)
	protected filteredItems = computed(() => {
		const text = this._inputText().trim().toLowerCase()
		if (!text) return this.items()
		return this.items().filter(i => i.value.toLowerCase().includes(text))
	})

	// Show create when typed text has no match in the full items list
	protected showCreate = computed(() => {
		const text = this._inputText().trim()
		if (!text) return false
		return !this.items().some(i => i.value.toLowerCase().includes(text.toLowerCase()))
	})

	protected totalOptions = computed(() => {
		return this.filteredItems().length + (this.showCreate() ? 1 : 0)
	})

	// Adjust placeholder when chips exist
	protected effectivePlaceholder = computed(() => {
		return this._selectedItems().length > 0 ? 'Agregar más...' : this.placeholder()
	})

	// Ref to track last emitted keys to avoid overriding local state with same data
	private _lastEmittedKeys = ''
	private _destroy$ = new Subject<void>()

	constructor(private _el: ElementRef) {
		// Sync _selectedItems when selectedKeys changes externally
		effect(() => {
			const keys = this.selectedKeys()
			const currentItems = this.items()
			const incomingStr = JSON.stringify(keys)

			// Skip if this is an echo of our own emit
			if (incomingStr === this._lastEmittedKeys) return

			const cache = untracked(() => this._selectedItems())
			this._selectedItems.set(
				keys.map(k => {
					const fromItems = currentItems.find(i => i.key === k)
					const fromCache = cache.find(i => i.key === k)
					return fromItems ?? fromCache ?? { key: k, value: String(k) }
				}),
			)
		})

		// Refresh cached item names when items list updates (e.g., after remote search clears)
		effect(() => {
			const currentItems = this.items()
			untracked(() => {
				this._selectedItems.update(selected =>
					selected.map(s => currentItems.find(i => i.key === s.key) ?? s),
				)
			})
		})

		// Track input text as signal for reactive computeds
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
		this.searchChanged.emit(this._inputText())
	}

	protected isSelected(key: string | number): boolean {
		return this._selectedItems().some(i => i.key === key)
	}

	protected onKeydown(e: KeyboardEvent): void {
		// Backspace on empty input removes last chip
		if (e.key === 'Backspace' && !this._inputText() && this._selectedItems().length > 0) {
			const last = this._selectedItems().at(-1)!
			this._removeItem(last.key)
			return
		}

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

	protected toggleItem(item: ComboboxItem): void {
		if (this.isSelected(item.key)) {
			this._removeItem(item.key)
		} else {
			this._addItem(item)
		}
		// Clear input, keep dropdown open for adding more
		this.searchControl.setValue('', { emitEvent: false })
		this._inputText.set('')
		this.activeIndex.set(-1)
	}

	protected removeChip(key: string | number, e: MouseEvent): void {
		e.stopPropagation()
		this._removeItem(key)
	}

	protected selectCreate(): void {
		const text = this._inputText().trim()
		if (!text) return
		this.createRequested.emit(text)
		this.searchControl.setValue('', { emitEvent: false })
		this._inputText.set('')
		this.activeIndex.set(-1)
	}

	private _addItem(item: ComboboxItem): void {
		this._selectedItems.update(s => [...s, item])
		this._emit()
	}

	private _removeItem(key: string | number): void {
		this._selectedItems.update(s => s.filter(i => i.key !== key))
		this._emit()
	}

	private _emit(): void {
		const keys = this._selectedItems().map(i => i.key)
		this._lastEmittedKeys = JSON.stringify(keys)
		this.selectionChanged.emit(keys)
	}

	private _selectByIndex(idx: number): void {
		if (idx < 0) return
		const filtered = this.filteredItems()
		if (idx < filtered.length) {
			this.toggleItem(filtered[idx])
		} else if (this.showCreate()) {
			this.selectCreate()
		}
	}

	private _close(): void {
		this.isOpen.set(false)
		this.activeIndex.set(-1)
		this.searchControl.setValue('', { emitEvent: false })
		this._inputText.set('')
	}
}
