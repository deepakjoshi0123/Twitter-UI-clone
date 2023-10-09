import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  register(data): Observable<any> {
    return this.http.post('http://localhost:8082/api/register', data);
  }

  login(data): Observable<any> {
    return this.http.post('http://localhost:8082/api/login', data);
  }
}
