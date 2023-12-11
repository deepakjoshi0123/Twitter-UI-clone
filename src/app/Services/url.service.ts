import { Injectable } from '@angular/core';
import { environment } from '../../env/env.prod';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  getUrl(): string {
    return environment.apiUrl;
  }
}
