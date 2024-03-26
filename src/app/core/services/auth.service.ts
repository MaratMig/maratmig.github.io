
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, takeUntil, tap, throwError } from 'rxjs';

//Move to Shared
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private loginUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.loginUrl, { email, password }).pipe(
      catchError((err) => {
        const message = 'Login failed';
        console.error('Login failed:', err);
        return throwError(() => new Error(message));
      }),
      map((res) => {
        const isAuthenticated = true;
        this.isAuthenticatedSubject.next(isAuthenticated);
        localStorage.setItem('isLoggedIn', 'true');
        return this.isAuthenticatedSubject.getValue();
      })
    );
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('isLoggedIn');
  }

  isAuthenticated(): Observable<boolean> {
    localStorage.getItem('isLoggedIn') === 'true' ? this.isAuthenticatedSubject.next(true) : this.isAuthenticatedSubject.next(false)
    return this.isAuthenticatedSubject.asObservable();
  }
}
