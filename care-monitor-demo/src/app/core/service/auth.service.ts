import { Injectable, signal, computed } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = signal<boolean | null>(null);
  private _userEmail = signal<string | null>(null)


  constructor(private cookieService: CookieService, private router: Router) {
    if (typeof window !== 'undefined') {
      this._isLoggedIn.set(this.cookieService.check('authToken'));
      this._userEmail.set(this.cookieService.get('userEmail') || null);
    }
  }

  readonly isLoggedIn = computed(() => this._isLoggedIn());
  readonly userEmail = computed(() => this._userEmail());


  login(token: string, email: string): void {
    this.cookieService.set('authToken', token);
    this.cookieService.set('userEmail', email);
    this._isLoggedIn.set(true);
    this._userEmail.set(email);
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.cookieService.delete('authToken');
    this.cookieService.delete('userEmail');
    this._isLoggedIn.set(false);
    this._userEmail.set(null);
    this.router.navigate(['/login']);
  }
}
