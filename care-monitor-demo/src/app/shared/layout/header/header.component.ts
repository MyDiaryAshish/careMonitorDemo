import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

//Material imports
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-header',
  imports: [RouterModule,MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
