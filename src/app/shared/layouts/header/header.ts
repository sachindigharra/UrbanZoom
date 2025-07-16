import { ChangeDetectorRef, Component, inject, NgZone, OnInit,} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  // calling continous to get real time update
  private subscription: Subscription = new Subscription();
  ngOnInit(): void {
    // for role
    this.subscription.add(
      this.authService.getUserRole().subscribe((res: string | null) => {
        this.role = res || ''; // Simplified: set role to res if truthy, else ''
        console.log(this.role);
        this.cdr.detectChanges()
      })
    );
    // for logIn Status
    this.subscription.add(
      this.authService.isLoggedIn().subscribe((res: boolean) => {
        this.logInStatus = res;
        console.log(this.logInStatus);
        this.cdr.detectChanges()
      })
    );
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }
  constructor(private ngZone: NgZone,private authService:AuthService,private cdr:ChangeDetectorRef,private route:Router) {

  }
    logInStatus:boolean=false;
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
  onLoggedOut(){
    if(this.logInStatus){
      this.authService.logout();
      this.route.navigateByUrl('home')
      this.cdr.detectChanges();
    }else{
      alert('You Already LoggedOut!')
    }
  }
  
  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    this.subscription.unsubscribe();
  }
}
