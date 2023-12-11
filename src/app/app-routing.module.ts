import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './component/landing-page/landing-page.component';

import { HomePageComponent } from './component/home-page/home-page.component';
import { AuthGuard } from './authGuard/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: LandingPageComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.AuthRoutes),
  },
  { path: 'home', canActivate: [AuthGuard], component: HomePageComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
