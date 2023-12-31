import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import { UsersListComponent } from '../component/users-list/users-list.component';
import { EditProfileComponent } from '../component/edit-profile/edit-profile.component';
import { UserService } from './user.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  openEditProfileModal(): MatDialogRef<EditProfileComponent> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '30%';
    dialogConfig.maxWidth = '100vw'; // Set maximum width to 100% of viewport width
    dialogConfig.height = '78%';
    dialogConfig.maxHeight = '100vh'; // Set maximum height to 100% of viewport height

    return this.dialog.open(EditProfileComponent, dialogConfig);
  }

  openFollowersModal(users: any[]) {
    const dialogRef = this.dialog.open(UsersListComponent, {
      width: '30%',
      height: '60%',

      data: { users, context: 'Followers' }, // Pass the users array as data
    });

    // Subscribe to the userSelected event emitted by UsersListComponent
    dialogRef.componentInstance.userSelected.subscribe(
      (selectedUser: string) => {
        if (selectedUser['isFollow']) {
          this.userService.follow(selectedUser['id']).subscribe((res) => {
            this.notificationService.showSuccess(res.message);
          });
          // If user is following, call a function for unfollow
        } else {
          // If user is not following, call a function for follow
          this.userService.unfollow(selectedUser['id']).subscribe((res) => {
            this.notificationService.showSuccess(res.message);
          });
        }
        // Do something with the selected user here
      }
    );
  }

  openFollowingsModal(users: any) {
    const dialogRef = this.dialog.open(UsersListComponent, {
      width: '30%',
      height: '60%',
      data: { users, context: 'Followings' }, // Pass the users array as data
    });

    // Subscribe to the userSelected event emitted by UsersListComponent
    dialogRef.componentInstance.userSelected.subscribe(
      (selectedUser: string) => {
        // since we only intially user would be following these users
        if (!selectedUser['following']) {
          this.userService.follow(selectedUser['id']).subscribe((res) => {
            this.notificationService.showSuccess(res.message);
          });
          // If user is following, call a function for unfollow
        } else {
          // If user is not following, call a function for follow
          this.userService.unfollow(selectedUser['id']).subscribe((res) => {
            this.notificationService.showSuccess(res.message);
          });
        }
      }
    );
  }
}
