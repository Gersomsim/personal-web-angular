import { RenderMode, ServerRoute } from '@angular/ssr'

export const serverRoutes: ServerRoute[] = [
	{
		path: 'portfolio/:slug',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => {
			return [
				{ slug: 'erp-aquos-gestion-de-suscripciones-y-activos' },
				{ slug: 'clientes-aquos' },
				{ slug: 'sistema-sorfi' },
				{ slug: 'crm-aclara-automatizacion-comercial' },
				{ slug: 'gestion-integral-empresarial-erp' },
			]
		},
	},
	// 2. Todo lo demás será SSR puro
	{
		path: '**',
		renderMode: RenderMode.Server,
	},
]
