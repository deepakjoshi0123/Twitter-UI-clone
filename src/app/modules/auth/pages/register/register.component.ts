import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../Services/notification.service';
import { ValidationService } from '../../../../Services/validation.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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
export class RegisterComponent {
  registerForm: FormGroup;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private validationService: ValidationService
  ) {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
        Validators.minLength(7),
        Validators.maxLength(20),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern(/^[a-zA-Z0-9_]+$/),
        this.validationService.noSpacesValidator,
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
        Validators.maxLength(30),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ]),
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.loading = true;
      const requestBody = this.registerForm.value;

      this.authService.register(requestBody).subscribe(
        (res) => {
          if (res.status === 200) {
            this.notificationService.showSuccess('Registration successful!');
            this.router.navigate(['/login']);
          }
          this.loading = false;
        },
        (error) => {
          this.notificationService.showError(error.error.errors.errors[0].msg);
          this.loading = false;
        }
      );
    }
  }
}
