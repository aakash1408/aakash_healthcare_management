import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.css'
})
export class DoctorDashboard implements OnInit {
  userName = localStorage.getItem('name');

  constructor() {}

  ngOnInit(): void {}

  viewAppointments() { /* fetch today’s appointments */ }
  updateDiagnosis() { /* update prescriptions */ }
  markAvailability() { /* set available time slots */ }
}
