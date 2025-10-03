import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private baseUrl = 'http://localhost:5000/api/auth'; // change to your backend URL

  constructor(private http: HttpClient) {}

  // Login user
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  // Register user
  register(userData: { name: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  // Optional: Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
