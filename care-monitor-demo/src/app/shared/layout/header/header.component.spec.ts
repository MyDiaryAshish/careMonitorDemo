import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../core/service/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatIconModule, MatMenuModule, MatButtonModule, HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the CareMonitor link that navigates to /dashboard', () => {
    const link = fixture.debugElement.query(By.css('h1 a'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent).toContain('CareMonitor');
    expect(link.nativeElement.getAttribute('href')).toBe('/dashboard');
  });

  it('should have the account circle icon button', () => {
    const accountButton = fixture.debugElement.query(By.css('button[aria-label="Example icon-button with a menu"]'));
    expect(accountButton).toBeTruthy();
    const accountIcon = accountButton.query(By.css('mat-icon'));
    expect(accountIcon).toBeTruthy();
    expect(accountIcon.nativeElement.textContent).toBe('account_circle');
  });

  it('should have the logout button in the menu', () => {
    const accountButton = fixture.debugElement.query(By.css('button[aria-label="Example icon-button with a menu"]'));
    accountButton.nativeElement.click();
    fixture.detectChanges();

    const logoutButton = fixture.debugElement.query(By.css('button[mat-menu-item]'));
    expect(logoutButton).toBeTruthy();
    const logoutIcon = logoutButton.query(By.css('mat-icon'));
    const logoutText = logoutButton.query(By.css('span'));
    expect(logoutIcon).toBeTruthy();
    expect(logoutIcon.nativeElement.textContent).toBe('logout');
    expect(logoutText).toBeTruthy();
    expect(logoutText.nativeElement.textContent).toBe('Logout');
  });

  it('should call authService.logout() when the logout button is clicked', () => {
    const accountButton = fixture.debugElement.query(By.css('button[aria-label="Example icon-button with a menu"]'));
    accountButton.nativeElement.click();
    fixture.detectChanges();

    const logoutButton = fixture.debugElement.query(By.css('button[mat-menu-item]'));
    logoutButton.nativeElement.click();

    expect(authService.logout).toHaveBeenCalledTimes(1);
  });
});
