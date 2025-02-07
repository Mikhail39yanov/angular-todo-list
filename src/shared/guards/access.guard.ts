import { Injectable } from '@angular/core'
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router'

@Injectable({ providedIn: 'root' })
export class AccessGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const accessParam = route.queryParams['access']

    if (accessParam === 'secret') {
      return true
    } else {
      this.router.navigate(['/home'])
      return false
    }
  }
}
