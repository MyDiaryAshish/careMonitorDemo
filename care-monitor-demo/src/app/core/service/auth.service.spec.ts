import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;
  let cookieService: jasmine.SpyObj<CookieService>;
  let router: Router;

  beforeEach(() => {
    const cookieSpy = jasmine.createSpyObj('CookieService', ['check', 'get', 'set', 'delete']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        { provide: CookieService, useValue: cookieSpy },
      ],
    });
    service = TestBed.inject(AuthService);
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set authToken and userEmail cookies on login', () => {
    service.login('testToken', 'test@example.com');
    expect(cookieService.set).toHaveBeenCalledWith('authToken', 'testToken');
    expect(cookieService.set).toHaveBeenCalledWith('userEmail', 'test@example.com');
  });

  it('should set isLoggedIn to true on login', () => {
    service.login('testToken', 'test@example.com');
    expect(service.isLoggedIn()).toBe(true);
  });

    it('should set userEmail on login', () => {
      service.login('testToken', 'test@example.com');
      expect(service.userEmail()).toBe('test@example.com');
  });

  it('should navigate to /dashboard on login', () => {
    service.login('testToken', 'test@example.com');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should delete authToken and userEmail cookies on logout', () => {
    service.logout();
    expect(cookieService.delete).toHaveBeenCalledWith('authToken');
    expect(cookieService.delete).toHaveBeenCalledWith('userEmail');
  });

  it('should set isLoggedIn to false on logout', () => {
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
  });

    it('should set userEmail to null on logout', () => {
        service.logout();
        expect(service.userEmail()).toBeNull();
    });

  it('should navigate to /login on logout', () => {
    service.logout();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
