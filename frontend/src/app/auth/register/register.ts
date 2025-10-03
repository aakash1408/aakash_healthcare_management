import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: []
})
export class Register implements OnInit {
  registerForm!: FormGroup;
  selectedRole: string = 'patient';

  constructor(private fb: FormBuilder, private router: Router, private auth: Auth) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      // Patient fields
      age: [''],
      gender: ['male'],
      contact: [''],
      // Doctor fields
      specialization: [''],
      availableDays: [''],
      startTime: [''],
      endTime: ['']
    });
  }

  onRoleChange(event: any) {
    this.selectedRole = event.target.value;
  }

  async onRegisterSubmit() {
    if (this.registerForm.invalid) return;

    const payload: any = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role: this.registerForm.value.role
    };

    if (this.selectedRole === 'patient') {
      payload.age = this.registerForm.value.age;
      payload.gender = this.registerForm.value.gender;
      payload.contact = this.registerForm.value.contact;
    } else if (this.selectedRole === 'doctor') {
      payload.specialization = this.registerForm.value.specialization;
      payload.availableDays = this.registerForm.value.availableDays.split(',').map((d: string) => d.trim());
      payload.timing = {
        start: this.registerForm.value.startTime,
        end: this.registerForm.value.endTime
      };
    }

    try {
      const res: any = await firstValueFrom(this.auth.register(payload));
      if (res && res.token) {
        localStorage.setItem('token', res.token);
        const role = this.getRoleFromToken(res.token) || payload.role;
        localStorage.setItem('role', role);
        this.router.navigate(['/']);
      } else {
        alert('Invalid register response');
      }
    } catch (err: any) {
      alert(err?.error?.msg || 'Registration failed');
    }
  }

  private getRoleFromToken(token: string): string | null {
    try {
      const payload = token.split('.')[1];
      const json = JSON.parse(atob(payload));
      return json.role || null;
    } catch (e) {
      return null;
    }
  }
}
