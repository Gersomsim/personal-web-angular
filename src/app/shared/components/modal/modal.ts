import { DOCUMENT } from '@angular/common'
import { Component, ContentChild, DestroyRef, Directive, HostListener, computed, effect, inject, input, output } from '@angular/core'

@Directive({ selector: '[modalFooter]', standalone: true })
export class ModalFooter {}

@Component({
	selector: 'app-modal',
	imports: [],
	templateUrl: './modal.html',
	styles: ``,
})
export class Modal {
	private readonly document = inject(DOCUMENT)
	private readonly destroyRef = inject(DestroyRef)

	open = input<boolean>(false)
	title = input<string | null>(null)
	size = input<'sm' | 'md' | 'lg' | 'xl'>('md')

	closed = output<void>()

	@ContentChild(ModalFooter) footer?: ModalFooter

	protected sizeClass = computed(() => {
		const map: Record<string, string> = {
			sm: 'max-w-sm',
			md: 'max-w-lg',
			lg: 'max-w-2xl',
			xl: 'max-w-4xl',
		}
		return map[this.size()]
	})

	protected panelStateClass = computed(() =>
		this.open()
			? 'opacity-100 scale-100 translate-y-0'
			: 'opacity-0 scale-95 -translate-y-2',
	)

	constructor() {
		effect(() => {
			this.document.body.style.overflow = this.open() ? 'hidden' : ''
		})

		this.destroyRef.onDestroy(() => {
			this.document.body.style.overflow = ''
		})
	}

	@HostListener('document:keydown.escape')
	onEscape(): void {
		if (this.open()) this.close()
	}

	close(): void {
		this.closed.emit()
	}
}
