import { Routes } from '@angular/router';
// import { canAccessAuthGuard } from '../core/guards/can-access-auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const AuthRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [canAccessAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [canAccessAuthGuard],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
