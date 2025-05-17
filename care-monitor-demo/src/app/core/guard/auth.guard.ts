import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) {}

  /*
     Check if token is presnt or no
  */
  canActivate(): boolean | UrlTree {
    const token = this.cookieService.get('authToken');
    if (token) {
      return true;
    }
    // Redirect to login if no token found
    return this.router.parseUrl('/login');
  }
}
