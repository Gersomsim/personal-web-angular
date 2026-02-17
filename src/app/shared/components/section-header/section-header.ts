import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  imports: [],
  template: `
    <div class="mb-12 text-center">
      <p class="mb-2 font-mono text-sm text-emerald-500">{{ tag() }}</p>
      <h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        {{ title() }}
      </h2>
      @if (subtitle()) {
        <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          {{ subtitle() }}
        </p>
      }
    </div>
  `,
})
export class SectionHeader {
  tag = input.required<string>();
  title = input.required<string>();
  subtitle = input<string>();
}
