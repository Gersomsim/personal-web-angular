import {
	AfterViewInit,
	Component,
	ElementRef,
	OnDestroy,
	ViewChild,
	ViewEncapsulation,
	forwardRef,
	input,
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import type EasyMDEType from 'easymde'

@Component({
	selector: 'app-editor',
	imports: [],
	templateUrl: './editor.html',
	styleUrl: './editor.css',
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => Editor),
			multi: true,
		},
	],
})
export class Editor implements ControlValueAccessor, AfterViewInit, OnDestroy {
	@ViewChild('editorTextarea') textareaRef!: ElementRef<HTMLTextAreaElement>

	placeholder = input<string>('Escribe el contenido aquí...')

	private easyMDE: EasyMDEType | null = null
	private pendingValue: string | null = null
	private isDisabled = false

	private _onChange: (v: string | null) => void = () => {}
	private _onTouched: () => void = () => {}

	async ngAfterViewInit() {
		const { default: EasyMDE } = await import('easymde')

		this.easyMDE = new EasyMDE({
			element: this.textareaRef.nativeElement,
			placeholder: this.placeholder(),
			initialValue: this.pendingValue ?? '',
			autosave: { enabled: false, uniqueId: '' },
			spellChecker: false,
			nativeSpellcheck: false,
			status: false,
			toolbar: [
				'heading-1',
				'heading-2',
				'heading-3',
				'|',
				'bold',
				'italic',
				'strikethrough',
				'|',
				'quote',
				'unordered-list',
				'ordered-list',
				'|',
				'link',
				'image',
				'table',
				'|',
				'code',
				'horizontal-rule',
				'|',
				'preview',
				'side-by-side',
				'fullscreen',
				'|',
				'guide',
			],
		})

		if (this.isDisabled) {
			this.easyMDE.codemirror.setOption('readOnly', 'nocursor')
		}

		this.easyMDE.codemirror.on('change', () => {
			const value = this.easyMDE!.value()
			this._onChange(value || null)
			this._onTouched()
		})

		this.pendingValue = null
	}

	ngOnDestroy() {
		if (this.easyMDE) {
			this.easyMDE.toTextArea()
			this.easyMDE = null
		}
	}

	writeValue(v: string | null): void {
		if (!this.easyMDE) {
			this.pendingValue = v
			return
		}
		this.easyMDE.value(v ?? '')
	}

	registerOnChange(fn: (v: string | null) => void): void {
		this._onChange = fn
	}

	registerOnTouched(fn: () => void): void {
		this._onTouched = fn
	}

	setDisabledState(disabled: boolean): void {
		this.isDisabled = disabled
		if (this.easyMDE) {
			this.easyMDE.codemirror.setOption('readOnly', disabled ? 'nocursor' : false)
		}
	}
}
