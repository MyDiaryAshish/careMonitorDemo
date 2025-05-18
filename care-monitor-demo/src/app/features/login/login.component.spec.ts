import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '../../core/service/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { ErrorBannerComponent } from '../../shared/components/error-banner/error-banner.component';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatGridListModule,
      ],
      providers: [
        { provide: AuthService, useValue: authSpy },
        ErrorBannerComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the loginForm', () => {
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.get('email')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
  });
  it('should call authService.login on successful login', () => {
    const mockResponse = { token: 'testToken', user: { email: 'test@example.com' } };
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.onSubmit();

    const req = httpTestingController.expectOne('/api/login');
    req.flush(mockResponse);

    expect(authService.login).toHaveBeenCalledWith('testToken', 'test@example.com');
  });

it('should display error message on failed login', () => {
  component.loginForm.setValue({ email: 'demo@caremonitor.com', password: 'wrongpassword' });
  component.onSubmit();

  const req = httpTestingController.expectOne('/api/login');
  req.error(new ErrorEvent('Network error'), {
    status: 401,
    statusText: 'Unauthorized',
  });

  expect(component.errorMessage).toBe('Login failed');
});

  it('should disable login button when loading', () => {
    component.loading = true;
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });
});
