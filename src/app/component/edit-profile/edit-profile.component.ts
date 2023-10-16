import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NotificationService } from '../../Services/notification.service';

import { UserService } from '../../Services/user.service';
import { ValidationService } from '../../Services/validation.service';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  editForm: FormGroup;
  userDetails: any;
  isFormInitialized = false;

  constructor(
    private notificationService: NotificationService,

    private userService: UserService,
    private validationService: ValidationService,
    private cookieService: CookieService,
    private dialogRef: MatDialogRef<EditProfileComponent>
  ) {}

  ngOnInit() {
    this.userDetails = this.userService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res.data;
        console.log(this.userDetails);
        this.isFormInitialized = true;
        this.initForm();
      },
      (error) => {
        console.log(error);
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
    console.log('check for which this is crashed');
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  editProfile() {
    if (this.editForm.valid) {
      const { DOB, phone, username, ...formValueWithBio } = this.editForm.value;

      this.userService.EditUserProfile(this.editForm.value).subscribe(
        (res) => {
          console.log(res);
          this.notificationService.showSuccess(res.message);
          this.dialogRef.close({ username: this.editForm.value.username });
        },
        (error) => {
          console.log(error);
          let errMsg = error.error.errors
            ? error.error.errors[0].msg
            : error.error.message;
          this.dialogRef.close();
          this.notificationService.showError(errMsg);
        }
      );
      // });
    } else {
      // No data in the requestBody, close the dialogue
      console.log('No data to edit, closing the dialogue');
      this.dialogRef.close();
      // Assuming you have a method to close the dialogue in your NotificationService
      // this.notificationService.closeDialogue();
    }
  }
}
