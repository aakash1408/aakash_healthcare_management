import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: []
})
export class Home implements OnInit {
  role: string | null = null;
  isLoggedIn = false;
  userName: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
    this.role = localStorage.getItem('role')?.toLowerCase() || null;
    this.userName = localStorage.getItem('name');

    // Redirect to dashboard if logged in
    if (this.isLoggedIn) {
      switch (this.role) {
        case 'patient':
          this.router.navigate(['/dashboard/patient']);
          break;
        case 'doctor':
          this.router.navigate(['/dashboard/doctor']);
          break;
        case 'admin':
          this.router.navigate(['/dashboard/admin']);
          break;
      }
    }
  }
}