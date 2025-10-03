import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: []
})
export class Login implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLoginSubmit() {
    if (this.loginForm.invalid) return;
    const { email } = this.loginForm.value;
    // TODO: replace with real auth call
    localStorage.setItem('role', 'patient');
    localStorage.setItem('token', 'demo-token');
    this.router.navigate(['/']);
  }
}
