import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        this.cookieService.get('authToken')
      ),
    });

    return next.handle(modifiedReq);
  }

  checkExpiry() {
    var cookieTimestamp: number = parseInt(
      this.cookieService.get('expiry'),
      10
    );
    var currentTimestamp: number = new Date().getTime();
    console.log(cookieTimestamp - currentTimestamp);
    if (!isNaN(cookieTimestamp)) {
      var timeDifference: number = currentTimestamp - cookieTimestamp;

      if (timeDifference < 30 * 60 * 1000) {
        console.log('The difference is less than 30 minutes.');
      } else {
        console.log('The difference is 30 minutes or more.');
      }
    } else {
      console.error("Invalid 'iat' cookie value.");
    }
  }
  getRefreshToken() {}
}
