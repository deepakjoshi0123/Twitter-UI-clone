import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  register(data): Observable<any> {
    return this.http.post(
      'https://twitter-clone-apis.onrender.com/api/register',
      data
    );
  }

  login(data): Observable<any> {
    return this.http.post(
      '  https://twitter-clone-apis.onrender.com/api/login',
      data
    );
  }
}
