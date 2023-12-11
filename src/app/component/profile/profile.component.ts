import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { TweetService } from '../../Services/tweet.service';

import { ModalService } from '../../Services/modal.service';

import { UserService } from '../../Services/user.service';
import { CookieService } from 'ngx-cookie-service';

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

  loading: boolean = false;

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
    this.loading = true;
    this.tweetService.getProfileTweets(this.limit, this.offset).subscribe(
      (res) => {
        this.tweets = res.data.tweets;
        this.totalCount = res.data.totalCount;
        this.loading = false;
      },
      (error) => {
        this.router.navigate(['/login']);
        this.loading = false;
      }
    );
  }

  goToHome() {
    // Add the logic to navigate to the home page here
    this.router.navigate(['/home']);
  }

  openEditProfileModal() {
    const dialogRef = this.modalService.openEditProfileModal();
    this.loading = true;
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.username) {
        this.username = result.username;
      }
      this.loading = false;
    });
  }

  openFollowersModal() {
    this.loading = true;
    this.userService.getFollowers().subscribe((res) => {
      this.followers = res.data.followers;
      this.modalService.openFollowersModal(this.followers);
      this.loading = false;
    });
  }

  openFollowingsModal() {
    this.loading = true;
    this.userService.getFollowings().subscribe((res) => {
      this.followings = res.data.followings;
      this.modalService.openFollowingsModal(this.followings);
      this.loading = false;
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
    this.loading = true;
    this.offset = this.offset + 2;

    this.tweetService.getProfileTweets(this.limit, this.offset).subscribe(
      (res) => {
        this.tweets = this.tweets.concat(res.data.tweets);
        this.loading = false;
      },
      (error) => {
        //navigate to login page
        this.router.navigate(['/login']);
        this.loading = false;
      }
    );
  }

  isShowMoreVisable() {
    return this.tweets.length < this.totalCount;
  }
}
