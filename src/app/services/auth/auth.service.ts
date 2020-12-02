import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user-data.interface';
import { LoginForm } from 'src/app/shared/models/util.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

export const JWT_NAME = 'token';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwthelper: JwtHelperService) {}

  login(loginForm: LoginForm): Observable<string> {
    return this.http
      .post<{ access_token: string }>('users/login', {
        email: loginForm.email,
        password: loginForm.password,
      })
      .pipe(
        tap((token) => {
          localStorage.setItem(JWT_NAME, token.access_token);
        }),
        mapTo('Logged in successfully')
      );
  }

  register(user: User): Observable<string> {
    return this.http.post('users', user).pipe(mapTo('Registered successfully'));
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME) || undefined;
    return !this.jwthelper.isTokenExpired(token);
  }

  getUserId(): Observable<number | undefined> {
    return of(localStorage.getItem(JWT_NAME) || '').pipe(
      switchMap((jwt: string) =>
        of(this.jwthelper.decodeToken<{ user: User }>(jwt)).pipe(
          map((user) => user.user.id)
        )
      )
    );
  }
}
