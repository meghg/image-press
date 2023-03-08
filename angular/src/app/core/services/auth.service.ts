import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from 'src/app/core/interfaces/user.interface';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth';

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

  getUsers() {
    return this.http.get<User>(`http://localhost:3000/users/`, { headers: this.getAuthHeader() });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`, { headers: this.getAuthHeader() });
  }

  isLoggedIn(): boolean {
    return !!this.getSessionToken();
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