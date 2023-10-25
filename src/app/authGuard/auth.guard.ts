import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.cookieService.get('authToken');
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);

        // Check if the token is expired

        if (decodedToken.exp * 1000 + 3600000 * 3 > Date.now()) {
          // Token is valid, user is authenticated

          // Check if the user is trying to access the login or register page
          if (
            route.routeConfig?.path === 'login' ||
            route.routeConfig?.path === 'register' ||
            route.routeConfig?.path === ''
          ) {
            // If so, redirect to the home page
            this.router.navigate(['/home']);
            return false;
          }

          // For other routes, allow access
          return true;
        } else {
          // Token is expired, redirect to login page
          this.router.navigate(['/login']);
          this.cookieService.delete('authToken');
          return false;
        }
      } catch (error) {
        // Invalid token, redirect to login page
        this.router.navigate(['/login']);
        this.cookieService.delete('authToken');
        return false;
      }
    } else {
      // Token is not present, redirect to login page
      // this.router.navigate(['/login']);
      return true;
    }
  }
}
