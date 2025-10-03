import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  menuOpen = false;

  @Output() login = new EventEmitter<void>();

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
