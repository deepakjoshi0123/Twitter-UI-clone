import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { NotificationService } from '../Services/notification.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (res) => {
          if (res.status === 200) {
            let user = jwt_decode(res.data);

            this.cookieService.set('authToken', res.data);
            this.cookieService.set('userId', user['user']['id']);
            this.cookieService.set('name', user['user']['name']);
            this.cookieService.set('username', user['user']['username']);
            this.cookieService.set('joined', user['user']['createdAt']);

            this.notificationService.showSuccess('Success');

            this.router.navigate(['/home']);
          }
        },
        (error) => {
          let errMsg = error.error.errors
            ? error.error.errors[0].msg
            : error.error.message;
          this.notificationService.showError(errMsg);
        }
      );
    }
  }
}
