import { Component, computed, forwardRef, inject, input, signal } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

import { FileModel } from '@features/files/models'
import { FileService } from '@features/files/serices/file.service'

interface QueueItem {
	preview: string
	name: string
}

@Component({
	selector: 'app-image-upload',
	templateUrl: './image-upload.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ImageUpload),
			multi: true,
		},
	],
})
export class ImageUpload implements ControlValueAccessor {
	private readonly fileService = inject(FileService)

	label = input<string>('')
	hint = input<string>('')

	protected files = signal<FileModel[]>([])
	protected queue = signal<QueueItem[]>([])
	protected isDragging = signal(false)
	protected isDisabled = signal(false)

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

	private onChange: (value: FileModel[]) => void = () => {}
	private onTouched: () => void = () => {}

	writeValue(value: FileModel[] | null): void {
		this.files.set(value ?? [])
	}

	registerOnChange(fn: (value: FileModel[]) => void): void {
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
		const files = Array.from(e.dataTransfer?.files ?? []).filter(f => f.type.startsWith('image/'))
		this.upload(files)
	}

	onFileInput(event: Event): void {
		const input = event.target as HTMLInputElement
		const files = Array.from(input.files ?? []).filter(f => f.type.startsWith('image/'))
		this.upload(files)
		input.value = ''
	}

	openPicker(fileInput: HTMLInputElement): void {
		if (!this.isDisabled()) fileInput.click()
	}

	remove(id: string): void {
		this.files.update(list => list.filter(f => f.id !== id))
		this.onChange(this.files())
		this.onTouched()
	}

	private async upload(files: File[]): Promise<void> {
		for (const file of files) {
			const preview = URL.createObjectURL(file)
			const item: QueueItem = { preview, name: file.name }
			this.queue.update(q => [...q, item])

			try {
				const uploaded = await this.fileService.uploadFile(file)
				this.files.update(list => [...list, uploaded])
				this.onChange(this.files())
				this.onTouched()
			} catch {
				// silent — upload failed
			} finally {
				this.queue.update(q => q.filter(i => i !== item))
				URL.revokeObjectURL(preview)
			}
		}
	}
}
