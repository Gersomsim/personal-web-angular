import { NgClass } from '@angular/common'
import { Component, computed, input } from '@angular/core'

@Component({
	selector: 'app-cv-button',
	imports: [NgClass],
	templateUrl: './cv-button.html',
	styles: ``,
	host: {
		class: 'bock',
	},
})
export class CvButton {
	color = input<'primary' | 'secondary'>('secondary')

	classesBtn = computed(() => {
		const baseClasses = 'inline-flex items-center gap-2 rounded-md border px-6 py-3 font-medium transition-colors'

		const colorClasses = {
			primary: 'bg-emerald-500 text-white hover:bg-emerald-600',
			secondary:
				'border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800',
		}

		return `${baseClasses} ${colorClasses[this.color()]}`
	})
}
