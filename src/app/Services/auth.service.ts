import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private urlService: UrlService) {}
  register(data: any): Observable<any> {
    return this.http.post(`${this.urlService.getUrl()}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.urlService.getUrl()}/login`, data);
  }
}
