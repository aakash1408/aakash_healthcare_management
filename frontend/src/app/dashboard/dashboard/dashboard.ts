import { Component, OnInit } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Sidebar, Header, Footer, ReactiveFormsModule, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})

export class Dashboard {

  // Flags to control which content to show
  showLoginForm = false;      // show login form
  showRegisterForm = false;   // show register form
  role: string | null = null; // store user role

  // Forms
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private authService: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if user is already logged in
    this.role = localStorage.getItem('role');

    // Create login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Create register form
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['patient', Validators.required] // default role
    });
  }

  //Switch between login and register forms
  toggleRegister() {
    this.showRegisterForm = !this.showRegisterForm;
    this.showLoginForm = !this.showLoginForm;
  }

  //Login form submit
  onLoginSubmit() {
    // if (this.loginForm.invalid) return;

    // const { email, password } = this.loginForm.value;

    // this.authService.login(email, password).subscribe({
    //   next: (res: any) => {
    //     localStorage.setItem('token', res.token);
    //     localStorage.setItem('role', res.role);
    //     this.role = res.role;

    //     // Hide forms after login
    //     this.showLoginForm = false;
    //     this.showRegisterForm = false;

    //     // Navigate to role-specific dashboard (optional)
    //     this.router.navigate([`/${res.role}-dashboard`]);
    //   },
    //   error: () => alert('Login failed')
    // });
  }

  //Register form submit
  onRegisterSubmit() {
    // if (this.registerForm.invalid) return;

    // const { name, email, password, role } = this.registerForm.value;

    // this.authService.register({ name, email, password, role }).subscribe({
    //   next: () => {
    //     alert('Registration successful! Please login.');
    //     this.toggleRegister(); // switch to login after registration
    //   },
    //   error: () => alert('Registration failed')
    // });
  }
}
