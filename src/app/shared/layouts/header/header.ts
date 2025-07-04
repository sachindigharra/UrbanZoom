import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
    isDropdownOpen = false;
  ismobileEnable = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    
  }
  mobileToggle(){
    this.ismobileEnable=!this.ismobileEnable;
  }
}
