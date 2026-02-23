import { Component, computed, input } from '@angular/core';

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

@Component({
  selector: 'app-testimonial-card',
  imports: [],
  template: `
    <figure class="flex flex-col rounded-lg border border-slate-200/50 bg-white p-6 dark:border-slate-800/50 dark:bg-slate-900/50">
      <!-- Quote -->
      <blockquote class="flex-1">
        <p class="text-slate-600 dark:text-slate-400">
          "{{ testimonial().quote }}"
        </p>
      </blockquote>

      <!-- Author -->
      <figcaption class="mt-6 flex items-center gap-4">
        <div
          class="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 font-mono text-sm font-semibold text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400 dark:ring-emerald-500/15"
          [attr.aria-label]="testimonial().author"
        >
          {{ initials() }}
        </div>
        <div>
          <p class="font-medium text-slate-900 dark:text-white">
            {{ testimonial().author }}
          </p>
          <p class="text-sm text-slate-500">
            {{ testimonial().role }}, {{ testimonial().company }}
          </p>
        </div>
      </figcaption>
    </figure>
  `,
})
export class TestimonialCard {
  testimonial = input.required<Testimonial>();

  protected initials = computed(() => {
    const parts = this.testimonial().author.trim().split(/\s+/)
    if (parts.length === 1) return parts[0][0].toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  })
}
