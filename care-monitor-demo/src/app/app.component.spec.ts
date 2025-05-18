import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './core/service/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './shared/layout/header/header.component';
import { SidenavComponent } from './shared/layout/sidenav/sidenav.component';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'logout']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule, AppComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>; // Assign authService here
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'care-monitor-demo'`, () => {
    expect(component.title).toEqual('care-monitor-demo');
  });

  it('should display the spinner when isLoggedIn() is null', () => {
    authService.isLoggedIn.and.returnValue(null); // Now it's safe to use authService
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.loading-container app-spinner'));
    expect(spinner).toBeTruthy();
    const appWrapper = fixture.debugElement.query(By.css('.app-wrapper'));
    expect(appWrapper).toBeFalsy();
  });

  it('should display the app-wrapper and its content when isLoggedIn() is true', () => {
    authService.isLoggedIn.and.returnValue(true);
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.loading-container app-spinner'));
    expect(spinner).toBeFalsy();
    const appWrapper = fixture.debugElement.query(By.css('.app-wrapper'));
    expect(appWrapper).toBeTruthy();
    expect(fixture.debugElement.query(By.directive(HeaderComponent))).toBeTruthy();
    expect(fixture.debugElement.query(By.directive(SidenavComponent))).toBeTruthy();
    expect(fixture.debugElement.query(By.directive(RouterOutlet))).toBeTruthy();
  });

it('should display the app-wrapper and its content when isLoggedIn() is false', () => {
    authService.isLoggedIn.and.returnValue(false);
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.loading-container app-spinner'));
    expect(spinner).toBeFalsy();
    const appWrapper = fixture.debugElement.query(By.css('.app-wrapper'));
    expect(appWrapper).toBeTruthy();
    expect(fixture.debugElement.query(By.directive(HeaderComponent))).toBeFalsy();
    expect(fixture.debugElement.query(By.directive(SidenavComponent))).toBeFalsy();
    expect(fixture.debugElement.query(By.directive(RouterOutlet))).toBeTruthy();
  });

  it('should call authService.logout() when logout() is called', () => {
    authService.logout.and.stub();
    component.logout();
    expect(authService.logout).toHaveBeenCalledTimes(1);
  });
});
