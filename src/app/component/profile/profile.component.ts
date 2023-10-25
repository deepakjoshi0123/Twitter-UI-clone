import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { Router } from '@angular/router';
import { TweetService } from '../../Services/tweet.service';

import { ModalService } from '../../Services/modal.service';
import { TweetsComponent } from '../tweets/tweets.component';
import { UserService } from '../../Services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',

  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  tweets: any[] = [];
  followers: any[] = [];
  followings: any[] = [];

  limit: number = 2;
  offset: number = 0;
  totalCount: number = 0;

  username: string = '';

  constructor(
    private router: Router,
    private tweetService: TweetService,
    private modalService: ModalService,
    private userService: UserService,
    private cookieService: CookieService
  ) {
    this.username = this.cookieService.get('username');
  }

  ngOnInit(): void {
    this.tweetService.getProfileTweets(this.limit, this.offset).subscribe(
      (res) => {
        this.tweets = res.data.tweets;
        this.totalCount = res.data.totalCount;
      },
      (error) => {
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
        this.username = result.username;
      }
    });
  }

  openFollowersModal() {
    this.userService.getFollowers().subscribe((res) => {
      this.followers = res.data.followers;
      this.modalService.openFollowersModal(this.followers);
    });
  }

  openFollowingsModal() {
    this.userService.getFollowings().subscribe((res) => {
      this.followings = res.data.followings;
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
  showMore() {
    this.offset = this.offset + 2;

    this.tweetService.getProfileTweets(this.limit, this.offset).subscribe(
      (res) => {
        this.tweets = this.tweets.concat(res.data.tweets);
      },
      (error) => {
        //navigate to login page
        this.router.navigate(['/login']);
      }
    );
  }

  isShowMoreVisable() {
    return this.tweets.length < this.totalCount;
  }
}
