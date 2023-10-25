import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private urlService: UrlService
  ) {}

  getTweets(limit: number, offset: number): Observable<any> {
    return this.http.get(
      `${this.urlService.getUrl()}/user/${this.cookieService.get(
        'userId'
      )}/timeline?limit=${limit}&offset=${offset}`
    );
  }

  getProfileTweets(limit: number, offset: number): Observable<any> {
    return this.http.get(
      `${this.urlService.getUrl()}/user/${this.cookieService.get(
        'userId'
      )}/tweets?limit=${limit}&offset=${offset}`
    );
  }

  addTweet(tweet: any) {
    return this.http.post(
      `${this.urlService.getUrl()}/user/${this.cookieService.get(
        'userId'
      )}/tweet`,
      tweet
    );
  }
}
