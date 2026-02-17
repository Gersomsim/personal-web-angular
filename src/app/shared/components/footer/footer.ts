import { Component, signal } from '@angular/core'

interface SocialLink {
	name: string
	url: string
	icon: 'github' | 'linkedin' | 'devto'
}

@Component({
	selector: 'app-footer',
	imports: [],
	templateUrl: './footer.html',
	styles: `
		@keyframes blink {
			0%,
			50% {
				opacity: 1;
			}
			51%,
			100% {
				opacity: 0;
			}
		}
		.cursor {
			animation: blink 1s step-end infinite;
		}
	`,
})
export class Footer {
	currentYear = new Date().getFullYear()

	socials = signal<SocialLink[]>([
		{
			name: 'GitHub',
			url: 'https://github.com/gersomsim',
			icon: 'github',
		},
		{
			name: 'LinkedIn',
			url: 'https://linkedin.com/in/gersom-hernandez',
			icon: 'linkedin',
		},
		{
			name: 'Dev.to',
			url: 'https://dev.to/gersomsim',
			icon: 'devto',
		},
	])
}
