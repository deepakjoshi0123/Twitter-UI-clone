import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Tweet } from './tweet.model';
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
  standalone: true,
  imports: [MatCardModule, MatIconModule],
})
export class TweetComponent {
  @Input() tweet: Tweet;

  getTweetDate(tweetDate) {
    const currentDate: any = new Date();
    const diffInMilliseconds = currentDate - tweetDate;
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m `;
    } else if (diffInHours < 24) {
      return `${diffInHours}h `;
    } else {
      return `${diffInDays}d`;
    }
  }

  getDateTime(tweet) {
    const tweetDate = new Date('2023-09-26T10:30:00Z'); // Replace this with the actual tweet date
    const formattedDate = this.getTweetDate(tweetDate);
    return formattedDate;
  }
}
