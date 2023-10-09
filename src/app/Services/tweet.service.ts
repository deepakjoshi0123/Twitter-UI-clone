import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getTweets(): Observable<any> {
    const headers = this.getHeaders(); // Use the getHeaders function
    const options = { headers: headers };

    return this.http.get(
      `http://localhost:8082/api/user/${this.cookieService.get(
        'userId'
      )}/timeline`,
      options
    );
  }

  getProfileTweets(): Observable<any> {
    const headers = this.getHeaders(); // Use the getHeaders function
    const options = { headers: headers };

    let userId = this.cookieService.get('userId');
    console.log('why its null', userId);
    return this.http.get(
      `http://localhost:8082/api/user/${userId}/tweets`,
      options
    );
  }

  addTweet(tweet: any) {
    const headers = this.getHeaders(); // Use the getHeaders function

    const options = { headers: headers };

    return this.http.post(
      `http://localhost:8082/api/user/${this.cookieService.get(
        'userId'
      )}/tweet`,
      tweet,
      options
    );
  }

  private getHeaders(): HttpHeaders {
    const authToken = this.cookieService.get('authToken');

    return new HttpHeaders({
      Authorization: authToken,
    });
  }
}