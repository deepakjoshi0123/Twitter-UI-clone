import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NotificationService } from '../../Services/notification.service';

import { UserService } from '../../Services/user.service';
import { ValidationService } from '../../Services/validation.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  editForm: FormGroup;
  userDetails: any;
  isFormInitialized = false;

  todayDate: Date = new Date();

  startDate: Date = new Date(1950, 0, 1);
  loading: boolean = false;
  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private validationService: ValidationService,
    private cookieService: CookieService,
    private router: Router,
    private dialogRef: MatDialogRef<EditProfileComponent>
  ) {}

  ngOnInit() {
    this.loading = true;
    this.userDetails = this.userService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res.data;
        this.isFormInitialized = true;
        this.initForm();
        this.loading = false;
      },
      (error) => {
        this.router.navigate(['/login']);
        this.loading = false;
      }
    );
  }

  initForm() {
    this.editForm = new FormGroup({
      username: new FormControl(this.userDetails['username'], [
        this.validationService.noSpacesValidator,
      ]),

      DOB: new FormControl(this.userDetails['DOB'], []),
      bio: new FormControl(this.userDetails['bio'], []),
      phone: new FormControl(this.userDetails['phone'], [
        Validators.pattern(/^\d{10}$/),
      ]),
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  editProfile() {
    if (this.editForm.valid) {
      this.loading = true;
      const { DOB, phone, username, ...formValueWithBio } = this.editForm.value;

      this.userService.EditUserProfile(this.editForm.value).subscribe(
        (res) => {
          this.cookieService.set('username', username);
          this.notificationService.showSuccess(res.message);
          this.dialogRef.close({ username: this.editForm.value.username });
          this.loading = false;
        },
        (error) => {
          let errMsg = error.error.errors
            ? error.error.errors[0].msg
            : error.error.message;
          this.dialogRef.close();
          this.notificationService.showError(errMsg);
          this.loading = false;
        }
      );
      // });
    } else {
      // No data in the requestBody, close the dialogue

      this.dialogRef.close();
    }
  }
}
