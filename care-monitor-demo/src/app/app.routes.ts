import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {//lazy loads the list component
    path: 'list',
    loadComponent: () => import('./features/items/items.component').then(m => m.ItemsComponent), canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];
