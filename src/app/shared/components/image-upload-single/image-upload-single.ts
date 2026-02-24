import { Component, computed, forwardRef, inject, input, signal } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

import { FileService } from '@features/files/serices/file.service'

@Component({
	selector: 'app-image-upload-single',
	templateUrl: './image-upload-single.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ImageUploadSingle),
			multi: true,
		},
	],
})
export class ImageUploadSingle implements ControlValueAccessor {
	private readonly fileService = inject(FileService)

	label = input<string>('')
	hint = input<string>('')
	/** URL of the existing image — pass post.image.url in edit mode for display */
	previewUrl = input<string | null>(null)

	protected uploadedUrl = signal<string | null>(null)
	protected localPreview = signal<string | null>(null)
	protected uploading = signal(false)
	protected isDragging = signal(false)
	protected isDisabled = signal(false)

	protected displayUrl = computed(
		() => this.localPreview() ?? this.uploadedUrl() ?? this.previewUrl(),
	)
	protected hasImage = computed(() => !!this.displayUrl())

	protected dropZoneClasses = computed(() => {
		const base = 'rounded-md border border-dashed transition-colors '
		if (this.isDragging()) {
			return base + 'border-emerald-500/50 bg-emerald-500/5 cursor-copy'
		}
		return (
			base +
			'border-slate-200/50 dark:border-slate-800/50 cursor-pointer ' +
			'hover:border-slate-200 dark:hover:border-slate-800 ' +
			'hover:bg-slate-50/50 dark:hover:bg-slate-900/30'
		)
	})

	private onChange: (value: string) => void = () => {}
	private onTouched: () => void = () => {}

	writeValue(value: string | null): void {
		if (!value) {
			this.uploadedUrl.set(null)
		}
		// Display URL comes from previewUrl() input — parent passes post.image.url
	}

	registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn
	}

	setDisabledState(disabled: boolean): void {
		this.isDisabled.set(disabled)
	}

	onDragOver(e: DragEvent): void {
		e.preventDefault()
		if (!this.isDisabled()) this.isDragging.set(true)
	}

	onDragLeave(e: DragEvent): void {
		const el = e.currentTarget as HTMLElement
		if (!el.contains(e.relatedTarget as Node)) {
			this.isDragging.set(false)
		}
	}

	onDrop(e: DragEvent): void {
		e.preventDefault()
		this.isDragging.set(false)
		if (this.isDisabled()) return
		const file = Array.from(e.dataTransfer?.files ?? []).find(f => f.type.startsWith('image/'))
		if (file) this.upload(file)
	}

	onFileInput(event: Event): void {
		const input = event.target as HTMLInputElement
		const file = input.files?.[0]
		if (file) this.upload(file)
		input.value = ''
	}

	openPicker(fileInput: HTMLInputElement): void {
		if (!this.isDisabled()) fileInput.click()
	}

	remove(): void {
		this.uploadedUrl.set(null)
		this.onChange('')
		this.onTouched()
	}

	private async upload(file: File): Promise<void> {
		const preview = URL.createObjectURL(file)
		this.localPreview.set(preview)
		this.uploading.set(true)

		try {
			const uploaded = await this.fileService.uploadFile(file)
			this.uploadedUrl.set(uploaded.url)
			this.onChange(uploaded.id)
			this.onTouched()
		} catch {
			// silent — upload failed
		} finally {
			this.localPreview.set(null)
			URL.revokeObjectURL(preview)
			this.uploading.set(false)
		}
	}
}
