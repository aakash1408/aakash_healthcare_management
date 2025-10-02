import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,Sidebar, Header, Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  role: 'patient' | 'doctor' | 'admin' = 'patient';
}
