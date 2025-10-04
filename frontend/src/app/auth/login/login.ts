import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: []
})
export class Login implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: Auth) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onLoginSubmit() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    try {
      const res: any = await firstValueFrom(this.auth.login(email, password));

      if (res && res.token) {
        // Store token
        localStorage.setItem('token', res.token);

        // Decode token to extract userId, role, name
        const payload = JSON.parse(atob(res.token.split('.')[1]));
        const userId = payload.id || payload.userId;
        const role = payload.role || 'patient';
        const name = payload.name || 'Patient';

        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);
        localStorage.setItem('name', name);

        this.router.navigate(['/']);
      } else {
        alert('Invalid login response');
      }
    } catch (err: any) {
      alert(err?.error?.msg || 'Login failed');
    }
  }
}
