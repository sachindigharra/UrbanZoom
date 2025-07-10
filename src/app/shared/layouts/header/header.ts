import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
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

}
