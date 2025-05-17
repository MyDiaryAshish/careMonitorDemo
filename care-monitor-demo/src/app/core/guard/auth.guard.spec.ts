import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let cookieService: jasmine.SpyObj<CookieService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {

    const cookieServiceSpy = jasmine.createSpyObj('CookieService', ['get']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate', 'parseUrl']);
    // const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: CookieService, useValue: cookieServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow activation if auth token exists', () => {
    cookieService.get.and.returnValue('token123');
    const result = guard.canActivate();
    expect(result).toBeTrue();
  });

  it('should redirect to login if auth token is missing', () => {
    cookieService.get.and.returnValue('');
    const result = guard.canActivate();
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
