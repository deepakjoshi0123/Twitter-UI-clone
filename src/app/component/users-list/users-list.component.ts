import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',

  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent {
  @Input() users: any[] = [];

  @Input() context: string; // Input to receive the context (e.g., 'sidebar', 'followersDialog')
  @Output() userSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { users: any[]; context: any }
  ) {
    this.context = data.context;
    this.users = data.users;
  }

  selectUser(user: any) {
    // Emit the selected user
    if (user.isFollow != undefined) {
      user.isFollow = !user.isFollow;
    }

    user.following = !user.following;
    // return;
    this.userSelected.emit(user);
  }

  getButtonLabel(user: any): string {
    if (this.context === 'sidebar') {
      return user.following ? 'following' : 'follow';
    } else if (user.isFollow !== undefined) {
      return user.isFollow ? 'Following' : 'Follow';
    } else {
      return user.following ? 'Follow' : 'Following';
    }
  }

  getModelTitle() {
    return this.context === 'sidebar' ? 'Who To Follow' : this.context;
  }
}
