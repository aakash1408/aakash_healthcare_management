import { Component, OnInit } from '@angular/core';
import { Admin } from '../services/admin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  userName = localStorage.getItem('name');
  doctors: any[] = [];

  showForm = false;
  editingDoctor = false;
  doctorData = { name: '', email: '', specialization: '', password: '' };
  editingId: string | null = null;

  constructor(private adminService: Admin) {}

  ngOnInit(): void {}

  toggleAddForm() {
    this.showForm = !this.showForm;
    this.editingDoctor = false;
    this.doctorData = { name: '', email: '', specialization: '', password: '' };
  }

  fetchDoctors() {
    this.showForm = false; // hide the form
    this.editingDoctor = false;
    this.adminService.getDoctors().subscribe({
      next: (res) => (this.doctors = res),
      error: () => alert('Failed to fetch doctors')
    });
  }

  addDoctor() {
    this.adminService.addDoctor(this.doctorData).subscribe({
      next: () => {
        alert('Doctor added successfully!');
        this.showForm = false;
        this.fetchDoctors();
      },
      error: () => alert('Failed to add doctor')
    });
  }

  editDoctor(doctor: any) {
    this.showForm = true;
    this.editingDoctor = true;
    this.editingId = doctor._id;
    this.doctorData = {
      name: doctor.user?.name,
      email: doctor.user?.email,
      specialization: doctor.specialization,
      password: ''
    };
  }

  updateDoctor() {
    if (!this.editingId) return;
    this.adminService.updateDoctor(this.editingId, this.doctorData).subscribe({
      next: () => {
        alert('Doctor updated successfully!');
        this.showForm = false;
        this.fetchDoctors();
      },
      error: () => alert('Failed to update doctor')
    });
  }

  deleteDoctor(id: string) {
    if (!confirm('Are you sure you want to delete this doctor?')) return;
    this.adminService.deleteDoctor(id).subscribe({
      next: () => {
        alert('Doctor deleted successfully!');
        this.fetchDoctors();
      },
      error: () => alert('Failed to delete doctor')
    });
  }
}
