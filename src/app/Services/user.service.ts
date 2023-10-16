import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
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
    const headers = this.getHeaders(); // Use the getHeaders function

    const options = { headers: headers };

    return this.http.get(
      `${this.urlService.getUrl()}/user/${this.cookieService.get(
        'userId'
      )}/recommendation`, // replace this with real api
      options
    );
  }

  getFollowers(): Observable<any> {
    const headers = this.getHeaders(); // Use the getHeaders function

    const options = { headers: headers };

    return this.http.get(
      `${this.urlService.getUrl()}/user/${this.cookieService.get(
        'userId'
      )}/followers`, // replace this with real api
      options
    );
  }

  getFollowings(): Observable<any> {
    const headers = this.getHeaders(); // Use the getHeaders function

    const options = { headers: headers };

    return this.http.get(
      `${this.urlService.getUrl()}/user/${this.cookieService.get(
        'userId'
      )}/followings`, // replace this with real api
      options
    );
  }

  follow(userId): Observable<any> {
    const headers = this.getHeaders(); // Use the getHeaders function

    const options = { headers: headers };

    return this.http.post(
      `${this.urlService.getUrl()}/user/${this.cookieService.get(
        'userId'
      )}/follow/${userId}`, // replace this with real api
      null,
      options
    );
  }

  unfollow(userId: any): Observable<any> {
    const headers = this.getHeaders(); // Use the getHeaders function

    const options = { headers: headers };

    return this.http.delete(
      `${this.urlService.getUrl()}/user/${this.cookieService.get(
        'userId'
      )}/unfollow/${userId}`,
      options
    );
  }

  removeFollower(): Observable<any> {
    const headers = this.getHeaders(); // Use the getHeaders function

    const options = { headers: headers };

    return this.http.get(
      `${this.urlService.getUrl()}/user/${this.cookieService.get(
        'userId'
      )}/followings`, // replace this with real api
      options
    );
  }

  EditUserProfile(data: any): Observable<any> {
    const headers = this.getHeaders(); // Use the getHeaders function

    const options = { headers: headers };

    return this.http.put(
      `${this.urlService.getUrl()}/user/${this.cookieService.get('userId')}`,
      data,
      options
    );
  }

  getUserProfile(): Observable<any> {
    const headers = this.getHeaders(); // Use the getHeaders function

    const options = { headers: headers };

    return this.http.get(
      `${this.urlService.getUrl()}/user/${this.cookieService.get('userId')}`,
      options
    );
  }

  searchUsers(query: string): Observable<any> {
    const headers = this.getHeaders(); // Use the getHeaders function

    const options = { headers: headers };

    return this.http.get(
      `${this.urlService.getUrl()}
      /user/${this.cookieService.get('userId')}`, // replace this with real api
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
