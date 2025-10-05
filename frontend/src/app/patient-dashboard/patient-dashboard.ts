import { Component, OnInit } from '@angular/core';
import { Patient } from '../services/patient';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-dashboard',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './patient-dashboard.html',
  styleUrl: './patient-dashboard.css'
})
export class PatientDashboard implements OnInit {
  userName = localStorage.getItem('name') || 'Patient';

  // Dynamic data arrays
  doctors: any[] = [];
  appointments: any[] = [];
  medicalHistory: any[] = [];

  // Flags to show/hide sections
  showDoctors = false;
  showAppointments = false;
  showMedicalRecords = false;
  bookAppointmentMode = false;

  constructor(private patientService: Patient, private router: Router) {}

  ngOnInit(): void {}

  // Show doctors section
  searchDoctors() {
    this.resetFlags();
    this.showDoctors = true;
    this.showAppointments = false;
    this.showMedicalRecords = false;

    this.patientService.getDoctors().subscribe({
      next: (res) => this.doctors = res,
      error: () => alert('Failed to fetch doctors')
    });
  }

  // Show appointments section
  showAppointment() {
    this.resetFlags();
    this.showDoctors = false;
    this.showAppointments = true;
    this.showMedicalRecords = false;

    this.patientService.getAppointments().subscribe({
      next: (res) => this.appointments = res,
      error: () => alert('Failed to fetch appointments')
    });
  }

  // book appointment
  openBookAppointment() {
    this.resetFlags();
    this.bookAppointmentMode = true;
    this.loadDoctors();
  }

  loadDoctors() {
    this.patientService.getDoctors().subscribe({
      next: (res) => {
        this.doctors = res;
      },
      error: () => alert('Failed to fetch doctors')
    });
  }

  bookAppointment(doctorId: string) {
    const appointment = {
      doctorId: doctorId,
      date: new Date().toISOString(), // default to today
      reason: "Consultation"
    };

    this.patientService.bookAppointment(appointment).subscribe({
      next: () => {
        alert('Appointment booked successfully!');
        this.bookAppointmentMode = false; // hide doctor list after booking
        this.showAppointments = false;
      }, 
      error: () => alert('Booking failed')
    });
  }

  // Cancel specific appointmesnt
  cancelAppointment(appointmentId: string) {
    this.patientService.cancelAppointment(appointmentId).subscribe({
      next: () => {
        this.appointments = this.appointments.filter(a => a._id !== appointmentId);
      },
      error: () => alert('Failed to cancel appointment')
    });
  }

  // Show medical records section
  viewMedicalHistory() {
    this.resetFlags();
    this.showDoctors = false;
    this.showAppointments = false;
    this.showMedicalRecords = true;

    this.patientService.getMedicalHistory().subscribe({
      next: (res) => this.medicalHistory = res,
      error: () => alert('Failed to fetch medical history')
    });
  }

  resetFlags() {
    this.showDoctors = false;
    this.showAppointments = false;
    this.showMedicalRecords = false;
    this.bookAppointmentMode = false;
  }

  // Simulate paying bills
  payBills() {
    const bill = { amount: 500, method: 'UPI' };
    this.patientService.payBill(bill).subscribe({
      next: () => alert('Payment successful!'),
      error: () => alert('Payment failed')
    });
  }

  // File upload to AWS S3
  onFileSelected(event: any, record: any) {
    const file = event.target.files[0];
    if (file) record.selectedFile = file;
  }

  uploadToS3(record: any) {
    // if (!record.selectedFile) {
    //   alert('Please select a file first.');
    //   return;
    // }
    // this.patientService.uploadMedicalRecord(record.selectedFile, record._id).subscribe({
    //   next: () => alert('File uploaded successfully!'),
    //   error: () => alert('Failed to upload file')
    // });
  }
}
