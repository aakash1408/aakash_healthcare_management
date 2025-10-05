import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Doctor {
  private baseUrl = 'https://aakash-healthcare-management.onrender.com/api';

  constructor(private http: HttpClient) {}

  /** ✅ Get all appointments for this doctor */
  getAppointments(doctorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/appointments/doctor/${doctorId}`);
  }

  /** ✅ Update doctor availability */
  updateAvailability(doctorId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/doctors/${doctorId}`, data);
  }
}
