import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private urlService: UrlService
  ) {}

  getFollowRecomendations(): Observable<any> {
    return this.http.get(
      `${this.urlService.getUrl()}/user/${this.cookieService.get(
        'userId'
      )}/recommendation` // replace this with real api
    );
  }

  getFollowers(): Observable<any> {
    return this.http.get(
      `${this.urlService.getUrl()}/user/${this.cookieService.get(
        'userId'
      )}/followers` // replace this with real api
    );
  }

  getFollowings(): Observable<any> {
    return this.http.get(
      `${this.urlService.getUrl()}/user/${this.cookieService.get(
        'userId'
      )}/followings` // replace this with real api
    );
  }

  follow(userId: number): Observable<any> {
    return this.http.post(
      `${this.urlService.getUrl()}/user/${this.cookieService.get(
        'userId'
      )}/follow/${userId}`, // replace this with real api
      null
    );
  }

  unfollow(userId: number): Observable<any> {
    return this.http.delete(
      `${this.urlService.getUrl()}/user/${this.cookieService.get(
        'userId'
      )}/unfollow/${userId}`
    );
  }

  removeFollower(): Observable<any> {
    return this.http.get(
      `${this.urlService.getUrl()}/user/${this.cookieService.get(
        'userId'
      )}/followings` // replace this with real api
    );
  }

  EditUserProfile(data: any): Observable<any> {
    return this.http.put(
      `${this.urlService.getUrl()}/user/${this.cookieService.get('userId')}`,
      data
    );
  }

  getUserProfile(): Observable<any> {
    return this.http.get(
      `${this.urlService.getUrl()}/user/${this.cookieService.get('userId')}`
    );
  }

  searchUsers(query: string): Observable<any> {
    return this.http.get(
      `${this.urlService.getUrl()}/user/${this.cookieService.get(
        'userId'
      )}/search/${query}`
    );
  }
}
