import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: []
})
export class Home implements OnInit {
  role: string | null = null;

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
  }
}
