import { Component, effect, inject, input } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs'

@Component({
	selector: 'app-search-box',
	imports: [ReactiveFormsModule],
	templateUrl: './search-box.html',
	styles: ``,
})
export class SearchBox {
	router = inject(Router)
	route = inject(ActivatedRoute)

	placeholder = input<string>('Buscar...')

	search = new FormControl<string>('')

	constructor() {
		effect(() => {
			this.search.setValue(this.route.snapshot.queryParams['search'] || '')
		})
		this.search.valueChanges
			.pipe(
				debounceTime(300),
				map(value => value?.trim() || ''),
				distinctUntilChanged(),
				filter(value => value.length > 0),
				takeUntilDestroyed(),
			)
			.subscribe(value => {
				this.router.navigate([], { queryParams: { search: value }, queryParamsHandling: 'merge' })
			})
	}
	reset() {
		this.search.setValue('')
		this.router.navigate([], { queryParams: { search: null }, queryParamsHandling: 'merge' })
	}
}
