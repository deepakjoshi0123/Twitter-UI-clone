import { Component, OnInit, Input } from '@angular/core';
import { TweetService } from '../Services/tweet.service';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TweetsComponent } from '../tweets/tweets.component';
import { Router } from '@angular/router';

import { NotificationService } from '../Services/notification.service';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CookieService } from 'ngx-cookie-service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  styleUrls: ['./home.component.css'],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    TweetsComponent,
    FormsModule,
    MatToolbarModule,
  ],
})
export class HomeComponent implements OnInit {
  newTweetText: string = '';
  tweets: any[] = [];

  isTweetButtonDisabled: boolean = true;
  private subscription: Subscription;

  constructor(
    private tweetService: TweetService,
    private router: Router,
    private notificationService: NotificationService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.tweetService.getTweets().subscribe(
      (res) => {
        this.tweets = res.data;
      },
      (error) => {
        //navigate to login page

        this.router.navigate(['/login']);
      }
    );
  }

  addNewTweet() {
    this.tweetService.addTweet({ tweet: this.newTweetText }).subscribe(
      (res) => {
        this.notificationService.showSuccess(res['message']);
      },
      (error) => {
        this.router.navigate(['/login']);
      }
    );
    this.newTweetText = ''; // Clear the input field
  }

  updateTweetButtonDisabledState() {
    // Disable the button if the tweetText length is less than or equal to 1
    this.isTweetButtonDisabled = this.newTweetText.trim().length < 1;
  }

  getName() {
    return this.cookieService.get('name');
  }

  refreshCom() {
    this.ngOnInit();
  }
}
