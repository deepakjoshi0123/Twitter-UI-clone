import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../Services/notification.service';
import { ModalService } from '../Services/modal.service';
import { UserService } from '../Services/user.service';
import { ValidationService } from '../Services/validation.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  editForm: FormGroup;

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private validationService: ValidationService,
    private dialogRef: MatDialogRef<EditProfileComponent>
  ) {
    this.initForm();
  }

  initForm() {
    this.editForm = new FormGroup({
      username: new FormControl('', [this.validationService.noSpacesValidator]),
      DOB: new FormControl('', []),
      bio: new FormControl('', []),
      phone: new FormControl('', [Validators.pattern(/^\d{10}$/)]),
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
      const { DOB, ...formValueWithoutDOB } = this.editForm.value;

      const requestBody = { ...formValueWithoutDOB };

      if (DOB) {
        const formattedDate = this.formatDate(DOB);

        requestBody.dob = formattedDate;
      }

      if (Object.values(requestBody).some((value) => !!value)) {
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
}
