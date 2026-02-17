import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { Footer } from '../../components/footer/footer'
import { Header } from '../../components/header/header'

@Component({
	selector: 'app-blog-layout',
	imports: [Footer, Header, RouterOutlet],
	templateUrl: './blog-layout.html',
	styles: ``,
})
export class BlogLayout {}
