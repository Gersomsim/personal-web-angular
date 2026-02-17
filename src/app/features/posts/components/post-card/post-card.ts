import { Component, input } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Post } from '@features/posts/models'

@Component({
	selector: 'app-post-card',
	imports: [RouterLink],
	template: `
		<article class="group">
			<a [routerLink]="['/blog', post().slug]" class="block">
				<!-- Meta -->
				<div class="flex items-center gap-3 text-sm text-slate-500">
					<time>{{ post().date }}</time>
					<span class="size-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
					<span>{{ post().readTime }}</span>
				</div>

				<!-- Title -->
				<h3
					class="mt-2 text-lg font-semibold text-slate-900 transition-colors group-hover:text-emerald-500 dark:text-white"
				>
					{{ post().title }}
				</h3>

				<!-- Excerpt -->
				<p class="mt-2 text-slate-600 dark:text-slate-400">
					{{ post().excerpt }}
				</p>

				<!-- Read more -->
				<span class="mt-3 inline-flex items-center gap-1 text-sm font-medium text-emerald-500">
					Leer más
					<svg
						class="size-4 transition-transform group-hover:translate-x-1"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>
				</span>
			</a>
		</article>
	`,
})
export class PostCard {
	post = input.required<Post>()
}
