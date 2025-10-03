import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard/dashboard';

export const routes: Routes = [
	{
    path: '',
    component: Dashboard,
    children: [
      // Home and Auth
      { path: '', loadComponent: () => import('./dashboard/home/home').then(m => m.Home) },
      { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.Login) },
      { path: 'register', loadComponent: () => import('./auth/register/register').then(m => m.Register) },

      // Standalone dashboards in src/
      { path: 'dashboard/patient', loadComponent: () => import('./patient-dashboard/patient-dashboard').then(m => m.PatientDashboard) },
      { path: 'dashboard/doctor', loadComponent: () => import('./doctor-dashboard/doctor-dashboard').then(m => m.DoctorDashboard) },
      { path: 'dashboard/admin', loadComponent: () => import('./admin-dashboard/admin-dashboard').then(m => m.AdminDashboard) },
    ]
  }
];
