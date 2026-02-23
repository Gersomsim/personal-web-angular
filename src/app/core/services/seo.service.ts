import { Injectable, inject } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'

import { ISEO } from '@core/interfaces/seo.interface'

@Injectable({
	providedIn: 'root',
})
export class SeoService {
	titlService = inject(Title)
	metaService = inject(Meta)

	AddTags(seo: ISEO) {
		const { title, description, keywords, image } = seo
		this.titlService.setTitle(title)
		this.metaService.addTags([
			{ name: 'description', content: description },
			{ name: 'keywords', content: keywords.join(', ') },
		])
		this.socialMetaTags(seo)
	}

	private socialMetaTags(seo: ISEO) {
		const { title, description, image, type, url } = seo
		this.metaService.addTags([
			{ name: 'og:title', content: title },
			{ name: 'og:description', content: description },
			{ name: 'og:type', content: type },
			{ name: 'og:url', content: url },
			{ name: 'og:url', content: url },
		])
		if (image) {
			this.metaService.addTags([{ name: 'og:image', content: image }])
		}
	}
}
