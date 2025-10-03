import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  menuOpen = false;
  isLoggedIn = false;
  userName = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLogin();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkLogin();
      });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  checkLogin() {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');

    this.isLoggedIn = !!token;
    this.userName = name || '';
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.userName = '';
    this.router.navigate(['/login']);
  }
}
