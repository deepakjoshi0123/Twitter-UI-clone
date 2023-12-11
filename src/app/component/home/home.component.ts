import { Component, OnInit, Input } from '@angular/core';
import { TweetService } from '../../Services/tweet.service';

import { Router } from '@angular/router';

import { NotificationService } from '../../Services/notification.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  newTweetText: string = '';
  tweets: any[] = [];

  limit: number = 4;
  offset: number = 0;
  totalCount: number = 0;

  tweetLengthError: string = '';
  isTweetButtonDisabled: boolean = true;

  loading: boolean = false;

  constructor(
    private tweetService: TweetService,
    private router: Router,
    private notificationService: NotificationService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.tweetService.getTweets(this.limit, this.offset).subscribe(
      (res) => {
        this.tweets = res.data.tweets;
        this.totalCount = res.data.totalCount;
        this.loading = false;
      },
      (error) => {
        //navigate to login page
        this.router.navigate(['/login']);
        this.loading = false;
      }
    );
  }

  addNewTweet() {
    this.loading = true;
    this.tweetService.addTweet({ tweet: this.newTweetText }).subscribe(
      (res) => {
        this.notificationService.showSuccess(res['message']);
        this.loading = false;
      },
      (error) => {
        this.router.navigate(['/login']);
        this.loading = false;
      }
    );
    this.newTweetText = ''; // Clear the input field
  }

  updateTweetButtonDisabledState() {
    this.isTweetButtonDisabled = this.newTweetText.trim().length < 1;

    if (this.newTweetText.trim().length > 100) {
      this.tweetLengthError = 'Tweet must be 100 characters or less.';
      this.isTweetButtonDisabled = true;
    } else {
      this.tweetLengthError = ''; // Clear the error message if tweet length is within the limit
    }
  }

  getName() {
    return this.cookieService.get('name');
  }

  showMore() {
    this.offset = this.offset + 4;
    this.loading = true;
    this.tweetService.getTweets(this.limit, this.offset).subscribe(
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

  refreshCom() {
    this.limit = 4;
    this.offset = 0;
    this.totalCount = 0;
    this.ngOnInit();
  }
}
