import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from 'src/app/core/interfaces/user.interface';

import { Observable, BehaviorSubject, catchError, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth';
  private isSignedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  signUp(name: string, username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, { name, username, password })
      .pipe(
        map(response => {
          document.cookie = `token=${response.token}`;
          return response;
        })
      );
  }

  signOn(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signon`, { username, password })
      .pipe(
        map(response => {
          document.cookie = `token=${response.token}`;
          return response;
        })
      );
  }

  validate(){
    return this.http.post(`${this.apiUrl}/validate/`, {}, { headers: this.getAuthHeader() })
      .pipe(tap(() => {
        this.setSignedInState(true)
      }),catchError(err => {
        this.setSignedInState(false);
        return of(err);
      }));
  }

  getUsers() {
    return this.http.get<User>(`http://localhost:3000/users/`, { headers: this.getAuthHeader() });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`, { headers: this.getAuthHeader() });
  }

  isLoggedIn(): boolean {
    return !!this.getSessionToken();
  }

  getSignedInState() {
    return this.isSignedIn$;
  }

  setSignedInState(flag: boolean) {
    this.isSignedIn$.next(flag);
  }

  getAuthHeader(): HttpHeaders {
    const token = this.getSessionToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  private getSessionToken(): string {
    return document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)')?.pop() || '';
  }

}