import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard/dashboard';

export const routes: Routes = [
	{
		path: '',
		component: Dashboard,
		children: [
			{ path: '', loadComponent: () => import('./dashboard/home/home').then(m => m.Home) },
			{ path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.Login) },
			{ path: 'register', loadComponent: () => import('./auth/register/register').then(m => m.Register) }
		]
	}
];
