import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
// import { SpinnerService } from '../../core/service/spinner.service'
import { ErrorBannerComponent } from "../../shared/components/error-banner/error-banner.component";
import { ItemsStore } from '../items/items.store';
import { AuthService } from '../../core/service/auth.service';


// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
// import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule, ErrorBannerComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  loading = false;
  // loadingApp: any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    public store: ItemsStore,
    private authService: AuthService,
    // private SpinnerService: SpinnerService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    // this.loadingApp = this.SpinnerService.loading;
  }

  onSubmit(): void {
    // this.SpinnerService.show();
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.http
      .post<any>('/api/login', this.loginForm.value)
      .subscribe({
        next: (response) => {
          this.authService.login(response.token, response.user.email);
          // this.SpinnerService.hide();
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          // this.SpinnerService.hide();
          const errorMsg = err?.body?.error || 'Login failed';
          this.errorMessage = errorMsg;
        },
        complete: () => {
          // this.SpinnerService.hide();
          this.loading = false;
        },
      });
  }
}
