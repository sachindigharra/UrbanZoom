import { Component, inject, OnInit,} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }
  //constructor(private authService:AuthService){}
  authService = inject(AuthService);
    role:string='';
    isDropdownOpen = false;
    ismobileEnable = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    
  }
  mobileToggle(){
    this.ismobileEnable=!this.ismobileEnable;
  }
toggleTheme(): void {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

}
