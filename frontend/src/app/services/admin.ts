import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Admin {
  private baseUrl = 'http://localhost:5001/api/doctors';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  addDoctor(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  updateDoctor(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteDoctor(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

