import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'

import { AuthFacade } from '@features/auth/facade'

export const authGuard: CanActivateFn = (route, state) => {
	const authFacade = inject(AuthFacade)
	const router = inject(Router)
	const isAuthenticated = authFacade.isAuthenticated()

	console.log(isAuthenticated)

	if (!isAuthenticated) {
		router.navigate(['/'])
		return false
	}
	return true
}
