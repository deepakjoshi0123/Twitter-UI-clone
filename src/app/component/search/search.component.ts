import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../Services/user.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Component, Input, EventEmitter, Output, Inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatListModule } from '@angular/material/list';
import { of } from 'rxjs';

@Component({
  selector: 'app-search',

  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchQuery: string = '';
  searchResults: any[] = [];
  searchControl = new FormControl();
  @Output() userSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(private userService: UserService) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(1000), // Wait for 1 second after the user stops typing
        distinctUntilChanged(), // Only emit if the value has changed
        switchMap((query) => {
          if (query.length === 0) {
            return of({ data: [] });
          }
          return this.userService.searchUsers(query);
        })
      )
      .subscribe(
        (results) => {
          this.searchResults = results['data'];
        },
        (error) => {
          console.error('Error fetching search results:', error);
        }
      );
  }

  selectUser(user: any) {
    // Emit the selected user
    if (user.isFollow != undefined) {
      user.isFollow = !user.isFollow;
    }

    user.following = !user.following;
    // no need to emit here as this not child component so directly call api from here to follow user
    this.userSelected.emit(user);
  }

  getButtonLabel(user: any): string {
    if (user.isFollow !== undefined) {
      return user.isFollow ? 'Following' : 'Follow';
    } else {
      return user.following ? 'Follow' : 'Following';
    }
  }
}
