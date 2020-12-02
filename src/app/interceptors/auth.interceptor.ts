import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JWT_NAME } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({ url: `${environment.BASE_URL}${request.url}` });
    const token = localStorage.getItem(JWT_NAME);
    if (token) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' +
            token
        ),
      });
    }
    return next.handle(request).pipe(
      tap({
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.router.navigate(['login']);
          }
        },
      })
    );
  }
}
