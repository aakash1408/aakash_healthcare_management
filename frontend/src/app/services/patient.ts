import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Patient {
  private apiUrl = 'https://aakash-healthcare-management.onrender.com/api'; // backend base URL
  private userId = localStorage.getItem('userId') || '';

  constructor(private http: HttpClient) {}

  // Fetch doctors
  getDoctors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors`);
  }

  // Book appointment for current patient
  bookAppointment(data: { doctorId: string; date: string; reason?: string }): Observable<any> {
    const payload = {
      patient: this.userId,
      doctor: data.doctorId,
      date: data.date,
      reason: data.reason || ''
    };
    return this.http.post(`${this.apiUrl}/appointments`, payload);
  }

  // Cancel appointment by ID
  cancelAppointment(appointmentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/appointments/${appointmentId}`);
  }

  // Get medical history for current patient
  getMedicalHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/medical-records?patient=${this.userId}`);
  }

  // Get appointments for current patient
  getAppointments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/appointments?patient=${this.userId}`);
  }

  // Pay bill
  payBill(data: { amount: number; method: string }): Observable<any> {
    const payload = {
      patient: this.userId,
      ...data
    };
    return this.http.post(`${this.apiUrl}/payments`, payload);
  }
}