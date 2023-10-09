import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { Router } from '@angular/router';
import { TweetService } from '../Services/tweet.service';

import { ModalService } from '../Services/modal.service';
import { TweetsComponent } from '../tweets/tweets.component';
import { UserService } from '../Services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    TweetsComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  tweets: any[] = [];
  followers: any[] = [];
  followings: any[] = [];
  username: string = '';

  constructor(
    private router: Router,
    private tweetService: TweetService,
    private modalService: ModalService,
    private userService: UserService,
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {
    this.username = this.cookieService.get('username');
  }

  ngOnInit(): void {
    this.tweetService.getProfileTweets().subscribe(
      (res) => {
        this.tweets = res.data;
      },
      (error) => {
        //navigate to login page
        console.log('error check ...->', error);
        this.router.navigate(['/login']);
      }
    );
  }

  goToHome() {
    // Add the logic to navigate to the home page here
    this.router.navigate(['/home']);
  }

  openEditProfileModal() {
    const dialogRef = this.modalService.openEditProfileModal();

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.username) {
        console.log('Updated Username:', result.username);
        this.username = result.username;
      }
    });
  }

  openFollowersModal() {
    this.userService.getFollowers().subscribe((res) => {
      this.followers = res.data;
      this.modalService.openFollowersModal(this.followers);
    });
  }

  openFollowingsModal() {
    this.userService.getFollowings().subscribe((res) => {
      this.followings = res.data;
      this.modalService.openFollowingsModal(this.followings);
    });
  }
  getUserName() {
    return this.cookieService.get('username');
  }
  getName() {
    return this.cookieService.get('name');
  }

  formatJoinedDate(dateString: string): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${months[monthIndex]} ${year}`;
  }

  getJoinedDate() {
    const dateString = this.cookieService.get('joined');
    if (dateString) {
      return this.formatJoinedDate(dateString);
    }
    return null;
  }
}
