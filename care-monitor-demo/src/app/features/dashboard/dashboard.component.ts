import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  userEmail: string | null = null;

  constructor(private cookieService: CookieService) {
    this.userEmail = this.cookieService.get('userEmail');
  }
}
