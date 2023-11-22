import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7102/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginModel = {
      userName: username,
      password: password,
    };

    return this.http
      .post(`${this.apiUrl}/Account/Login`, loginModel, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        map((response: any) => {
          localStorage.setItem('token', response.token);
          return response;
        }),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
