import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/layout/header/header.component";
import { SidenavComponent } from "./shared/layout/sidenav/sidenav.component";
import { AuthService } from './core/service/auth.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from "./shared/components/spinner/spinner.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidenavComponent, CommonModule, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'care-monitor-demo';
   public auth = inject(AuthService);

  isLoggedIn = this.auth.isLoggedIn;
  logout() {
    this.auth.logout();
  }
}
