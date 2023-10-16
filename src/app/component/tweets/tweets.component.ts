import { Component, Input, OnInit } from '@angular/core';
import { TweetComponent } from '../tweets/tweet/tweet.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css'],
})
export class TweetsComponent {
  @Input() tweets: any[] = [];
  ngOnInit() {
    // Log the tweet.text values to the console
    this.tweets.forEach((tweet) => {});
  }
}
