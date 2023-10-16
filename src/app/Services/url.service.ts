import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private liveUrl: string = 'https://twitter-clone-apis.onrender.com/api';
  private localUrl: string = 'http://localhost:8082/api';

  getUrl(): string {
    return this.localUrl;
  }
}
