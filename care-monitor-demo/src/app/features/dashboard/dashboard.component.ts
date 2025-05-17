import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  userEmail: string | null = null;

  constructor(private cookieService: CookieService, private router: Router) {
    this.userEmail = this.cookieService.get('userEmail');
  }

  logout() {
    this.cookieService.delete('authToken');
    this.cookieService.delete('userEmail');
    this.router.navigate(['/login']);
  }
}
