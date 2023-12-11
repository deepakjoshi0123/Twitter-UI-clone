import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlService } from '../../../Services/url.service';

import { LoginOptions } from '../shared/types/login-options.type';
import { RegisterOptions } from '../shared/types/register-options.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private urlService: UrlService) {}
  register(data: RegisterOptions): Observable<any> {
    return this.http.post(`${this.urlService.getUrl()}/register`, data);
  }

  login(data: LoginOptions): Observable<any> {
    return this.http.post(`${this.urlService.getUrl()}/login`, data);
  }
}
