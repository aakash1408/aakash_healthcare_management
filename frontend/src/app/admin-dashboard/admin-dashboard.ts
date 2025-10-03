import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  userName = localStorage.getItem('name');

  constructor() {}

  ngOnInit(): void {}

  addDoctor() {}
  updateDoctor() {}
  deleteDoctor() {}
  manageAppointments() {}
  manageBilling() {}
  generateReports() {}
}
