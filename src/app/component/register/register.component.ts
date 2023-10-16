import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../Services/notification.service';
import { ValidationService } from '../../Services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

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
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [
        Validators.required,
        this.validationService.noSpacesValidator,
      ]),
      DOB: new FormControl('', []),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6), // Minimum password length is 6 characters
      ]),
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  register() {
    if (this.registerForm.valid) {
      const { DOB, ...formValueWithoutDOB } = this.registerForm.value;

      const requestBody = { ...formValueWithoutDOB };

      if (DOB) {
        const formattedDate = this.formatDate(DOB);

        requestBody.dob = formattedDate;
      }

      this.authService.register(requestBody).subscribe(
        (res) => {
          if (res.status === 200) {
            this.notificationService.showSuccess('Registration successful!');
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          console.error('An error occurred:', error.errors[0].msg);
          this.notificationService.showError(
            'Registration failed. Please try again.'
          );
        }
      );
    }
  }
}
