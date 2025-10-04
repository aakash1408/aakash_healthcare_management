import { Component, OnInit } from '@angular/core';
import { Doctor } from '../services/doctor';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.css'
})
export class DoctorDashboard implements OnInit {
  userName = localStorage.getItem('name');
  doctorId = localStorage.getItem('doctorId'); // stored after login
  appointments: any[] = [];
  showAppointments = false;

  constructor(private doctorService: Doctor) {}

  ngOnInit(): void {}

  /** ✅ View all appointments */
  viewAppointments() {
    if (!this.doctorId) {
      alert('Doctor ID not found in localStorage!');
      return;
    }

    this.showAppointments = true;

    this.doctorService.getAppointments(this.doctorId).subscribe({
      next: (res) => (this.appointments = res),
      error: (err) => console.error('Error fetching appointments:', err)
    });
  }

  /** ✅ Mark doctor availability */
  markAvailability() {
    if (!this.doctorId) {
      alert('Doctor ID not found!');
      return;
    }

    const availableDays = prompt('Enter available days (comma separated):', 'Monday,Tuesday');
    const start = prompt('Start time (e.g. 09:00 AM):', '09:00 AM');
    const end = prompt('End time (e.g. 05:00 PM):', '05:00 PM');

    if (availableDays && start && end) {
      const data = {
        availableDays: availableDays.split(',').map((d) => d.trim()),
        timing: { start, end }
      };

      this.doctorService.updateAvailability(this.doctorId, data).subscribe({
        next: () => alert('Availability updated successfully!'),
        error: (err) => console.error('Error updating availability:', err)
      });
    }
  }
}
