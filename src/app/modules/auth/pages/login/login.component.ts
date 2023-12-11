import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../../../Services/notification.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import jwt_decode from 'jwt-decode';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent,
    MatListModule,
    MatIconModule,
    NgIf,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;

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
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe(
        (res) => {
          if (res.status === 200) {
            let user = jwt_decode(res.data);

            this.cookieService.set('authToken', res.data);
            this.cookieService.set('userId', user['user']['id']);
            this.cookieService.set('name', user['user']['name']);
            this.cookieService.set('username', user['user']['username']);
            this.cookieService.set('joined', user['user']['createdAt']);
            this.cookieService.set('expiry', user['exp']);

            this.notificationService.showSuccess('Success');
            this.loading = false;
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          console.log(error);
          let errMsg = error.error.errors
            ? error.error.errors.errors[0].msg
            : error.error.message;
          this.notificationService.showError(errMsg);
          this.loading = false;
        }
      );
    }
  }
}
