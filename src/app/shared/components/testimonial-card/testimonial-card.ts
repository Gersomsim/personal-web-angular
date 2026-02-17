import { Component, input } from '@angular/core';

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
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
        <img
          [src]="testimonial().avatar"
          [alt]="testimonial().author"
          class="size-12 rounded-full bg-slate-100 object-cover dark:bg-slate-800"
        />
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
}
