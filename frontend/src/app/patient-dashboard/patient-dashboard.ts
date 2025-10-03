import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-dashboard',
  imports: [],
  templateUrl: './patient-dashboard.html',
  styleUrl: './patient-dashboard.css'
})
export class PatientDashboard implements OnInit {
  userName = localStorage.getItem('name');

  constructor() {}

  ngOnInit(): void {}

  // Example: method placeholders
  searchDoctors() { /* search logic */ }
  bookAppointment() { /* booking logic */ }
  cancelAppointment() { /* cancel logic */ }
  viewMedicalHistory() { /* fetch records */ }
  payBills() { /* simulate payment */ }
}
