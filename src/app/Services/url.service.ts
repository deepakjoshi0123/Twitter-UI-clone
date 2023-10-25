import { Injectable } from '@angular/core';
import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  getUrl(): string {
    return environment.localUrl;
  }
}
