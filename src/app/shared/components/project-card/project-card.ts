import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Project {
  title: string;
  subtitle?: string;
  description: string;
  problem?: string;
  image: string;
  tags: string[];
  link: string;
  metrics?: string;
  category: 'webapp' | 'mobile' | 'experiment' | 'all';
  featured?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  repoPrivate?: boolean;
  role?: string;
}

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  template: `
    <article class="group relative flex flex-col overflow-hidden rounded-lg border border-slate-200/50 bg-white transition-colors hover:border-slate-300/50 dark:border-slate-800/50 dark:bg-slate-900/50 dark:hover:border-slate-700/50">
      <!-- Image -->
      <div class="aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          [src]="project().image"
          [alt]="project().title"
          class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <!-- Content -->
      <div class="flex flex-1 flex-col p-6">
        <!-- Metrics badge -->
        @if (project().metrics) {
          <div class="mb-3">
            <span class="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {{ project().metrics }}
            </span>
          </div>
        }

        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
          {{ project().title }}
        </h3>

        <p class="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">
          {{ project().description }}
        </p>

        <!-- Tags -->
        <div class="mt-4 flex flex-wrap gap-2">
          @for (tag of project().tags; track tag) {
            <span class="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              {{ tag }}
            </span>
          }
        </div>

        <!-- Link -->
        <a
          [routerLink]="project().link"
          class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-500 transition-colors hover:text-emerald-600"
        >
          Ver caso de estudio
          <svg class="size-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </article>
  `,
})
export class ProjectCard {
  project = input.required<Project>();
}
