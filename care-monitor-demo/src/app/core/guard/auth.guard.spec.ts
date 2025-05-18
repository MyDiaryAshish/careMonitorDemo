import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let cookieService: jasmine.SpyObj<CookieService>;
  let router: Router;

  beforeEach(() => {
    cookieService = jasmine.createSpyObj('CookieService', ['get']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthGuard,
        { provide: CookieService, useValue: cookieService },
      ],
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    spyOn(router, 'parseUrl').and.returnValue('/login' as any);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if the user is authenticated (authToken exists)', () => {
    cookieService.get.and.returnValue('validToken');
    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/some-protected-url' } as RouterStateSnapshot;

    const canActivateResult = guard.canActivate(route, state);

    expect(canActivateResult).toBe(true);
    expect(router.parseUrl).not.toHaveBeenCalled();
  });

  it('should return a UrlTree redirecting to /login if the user is not authenticated (authToken is missing)', () => {
    cookieService.get.and.returnValue('');
    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/some-protected-url' } as RouterStateSnapshot;

    const canActivateResult = guard.canActivate(route, state);

    expect(canActivateResult).toEqual('/login' as any);
    expect(router.parseUrl).toHaveBeenCalledWith('/login');
  });
});
